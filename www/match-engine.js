
/* =====================================================
   FOOTBALL EMPIRE 2.0
   MATCH ENGINE - REBUILT VERSION
   ===================================================== */

/* ---------- KÖMƏKÇİ FUNKSİYALAR ---------- */

const ME_cl = (v, min, max) =>
    Math.max(min, Math.min(max, v));

const ME_rand = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const ME_pick = arr =>
    arr && arr.length
        ? arr[Math.floor(Math.random() * arr.length)]
        : null;

const ME_stat = p => {
    if (!p) return;
    if (typeof p.gl !== "number") p.gl = 0;
    if (typeof p.as !== "number") p.as = 0;
    if (typeof p.inj !== "number") p.inj = 0;
};

const ME_players = t =>
    (t.lu || []).map(id => pl(t, id)).filter(Boolean);

const ME_outfield = t =>
    ME_players(t).filter(p => p.g !== "GK");

const ME_playerRating = p =>
    ME_cl(Number(p?.ovr) || 50, 1, 99);


/* ---------- MATÇIN YARADILMASI ---------- */

function newM(home, away) {
    const h = home;
    const a = away;

    const m = {
        h,
        a,

        r: [rate(h), rate(a)],

        s: [0, 0],
        min: 0,

        st: {
            sh: [0, 0],
            ot: [0, 0],
            po: [0, 0],
            co: [0, 0],
            fo: [0, 0],
            pa: [0, 0],
            yc: [0, 0],
            rc: [0, 0]
        },

        log: [],
        t: 0,

        fin: {
            x: 0.5,
            y: 0.5
        },

        goal: 0,
        y: {},
        red: [0, 0],
        g0: {},

        finished: false
    };

    ME_players(h).concat(ME_players(a)).forEach(p => {
        ME_stat(p);
        m.g0[p.id] = p.gl;
    });

    return m;
}


/* ---------- OYUNÇU SEÇİMİ ---------- */

function scorer(team) {
    const players = ME_players(team);
    if (!players.length) return null;

    const positions = slots(team.form);

    const weighted = players.map((p, i) => {
        const pos = positions[i]?.g || p.g;

        const weight = {
            GK: 0.1,
            DF: 0.7,
            MD: 2.2,
            FW: 5
        }[pos] || 1;

        const shooting =
            Number(p.at?.shoot) || ME_playerRating(p);

        return {
            p,
            w: weight * (shooting + ME_playerRating(p)) / 2
        };
    });

    const total = weighted.reduce((sum, x) => sum + x.w, 0);

    if (total <= 0) return ME_pick(players);

    let roll = Math.random() * total;

    for (const item of weighted) {
        roll -= item.w;
        if (roll <= 0) return item.p;
    }

    return weighted[weighted.length - 1].p;
}


/* ---------- ASSIST SEÇİMİ ---------- */

function assistant(team, goalScorer) {
    const players = ME_outfield(team)
        .filter(p => p.id !== goalScorer?.id);

    if (!players.length) return null;

    const weighted = players.map(p => ({
        p,
        w: Math.max(
            1,
            (Number(p.at?.pass) || ME_playerRating(p)) *
            (p.g === "MD" ? 1.4 : 1)
        )
    }));

    const total = weighted.reduce((s, x) => s + x.w, 0);

    let roll = Math.random() * total;

    for (const item of weighted) {
        roll -= item.w;
        if (roll <= 0) return item.p;
    }

    return weighted[0].p;
}


/* ---------- ZƏRBƏ VƏ QOL ---------- */

function scoreGoal(m, teamIndex, player, reason = "normal") {
    if (!player) return false;

    const team = teamIndex === 0 ? m.h : m.a;

    ME_stat(player);

    m.s[teamIndex]++;
    player.gl++;

    m.goal = 1;

    let assistText = "";

    if (reason === "normal" || reason === "corner") {
        if (Math.random() < 0.72) {
            const assist = assistant(team, player);

            if (assist) {
                ME_stat(assist);
                assist.as++;
                assistText = " | Assist: " + assist.name;
            }
        }
    }

    const labels = {
        normal: "⚽ GOL!",
        penalty: "⚽ PENALTİ GOLÜ!",
        free: "⚽ CƏRİMƏ ZƏRBƏSİNDƏN GOL!",
        corner: "⚽ KORNERDƏN GOL!"
    };

    m.log.unshift(
        m.min + "' " +
        labels[reason] + " " +
        player.name +
        " (" + team.name + ")" +
        assistText
    );

    return true;
}


/* ---------- PENALTI VƏ CƏRİMƏ ---------- */

function taker(team, type) {
    const players = ME_outfield(team);

    if (!players.length) return scorer(team);

    const key = type === "penalty"
        ? "penalty"
        : "shoot";

    return players.sort((a, b) => {
        const av = Number(a.at?.[key]) || ME_playerRating(a);
        const bv = Number(b.at?.[key]) || ME_playerRating(b);
        return bv - av;
    })[0];
}


/* ---------- KOMANDA GÜCÜ ---------- */

function teamStrength(m, index) {
    const base = m.r[index];

    const penalty = Math.pow(0.92, m.red[index] || 0);

    return {
        at: base.at * penalty,
        df: base.df * penalty,
        md: base.md * penalty
    };
}


/* ---------- MATÇ HADİSƏLƏRİ ---------- */

function step(m) {
    if (m.finished) return;

    const teams = [m.h, m.a];

    m.min++;
    m.goal = 0;

    const A = [
        teamStrength(m, 0),
        teamStrength(m, 1)
    ];

    const totalMid = A[0].md + A[1].md;

    const homeChance = totalMid > 0
        ? A[0].md / totalMid
        : 0.5;

    const t = Math.random() < homeChance ? 0 : 1;
    const o = 1 - t;

    const team = teams[t];
    const opponent = teams[o];

    m.t = t;

    m.st.po[t]++;

    const q = A[t].at - A[o].df;
    const x = Math.random();

    let fx = 0.3 + Math.random() * 0.4;
    let fy = t === 0 ? 0.9 : 0.1;

    /* FAUL */

    if (x < 0.055) {
        m.st.fo[o]++;

        m.log.unshift(
            m.min + "' ⚠️ Faul – " + opponent.name
        );

        fx = 0.5;
        fy = 0.5;
    }

    /* ŞUT */

    else if (x < 0.245) {
        m.st.sh[t]++;

        const player = scorer(team);

        const accuracy = ME_cl(
            0.38 + q / 160,
            0.18,
            0.78
        );

        if (Math.random() < accuracy) {
            m.st.ot[t]++;

            const keeper = ME_players(opponent)
                .find(p => p.g === "GK");

            const keeperStrength = keeper
                ? ME_playerRating(keeper)
                : 60;

            const chance = ME_cl(
                0.30 + q / 150 -
                (keeperStrength - 60) / 180,
                0.08,
                0.75
            );

            if (Math.random() < chance) {
                scoreGoal(m, t, player);
            } else {
                m.log.unshift(
                    m.min + "' 🧤 Qapıçı xilas etdi"
                );
            }
        } else {
            m.log.unshift(
                m.min + "' 💨 Şut qapıdan kənara getdi"
            );
        }

        fx = 0.5 + (Math.random() - 0.5) * 0.3;
    }

    /* KORNER */

    else if (x < 0.30) {
        m.st.co[t]++;

        m.log.unshift(
            m.min + "' 🚩 Korner – " + team.name
        );

        fx = Math.random() < 0.5 ? 0.05 : 0.95;
        fy = t === 0 ? 0.97 : 0.03;

        if (Math.random() < ME_cl(0.10 + q / 500, 0.04, 0.22)) {
            m.st.sh[t]++;
            m.st.ot[t]++;

            scoreGoal(m, t, scorer(team), "corner");
        }
    }

    m.fin = { x: fx, y: fy };

    /* ƏLAVƏ HADİSƏLƏR */

    const event = Math.random();

    /* PENALTI */

    if (event < 0.012) {
        const player = taker(team, "penalty");

        m.st.pa[t]++;
        m.st.sh[t]++;
        m.st.ot[t]++;

        const success = ME_cl(
            0.70 + ((Number(player?.at?.penalty) || 65) - 65) / 250,
            0.55,
            0.90
        );

        if (Math.random() < success) {
            scoreGoal(m, t, player, "penalty");
        } else {
            m.log.unshift(
                m.min + "' 🧤 Penalti qaçırıldı – " +
                (player?.name || "Oyunçu")
            );
        }
    }

    /* CƏRİMƏ ZƏRBƏSİ */

    else if (event < 0.032) {
        const player = taker(team, "free");

        m.st.sh[t]++;

        const shooting =
            Number(player?.at?.shoot) || 60;

        if (Math.random() < ME_cl(0.04 + shooting / 1000, 0.05, 0.15)) {
            m.st.ot[t]++;
            scoreGoal(m, t, player, "free");
        } else {
            m.log.unshift(
                m.min + "' 🎯 Cərimə zərbəsi – " +
                (player?.name || "Oyunçu")
            );
        }
    }

    /* OFSAYD */

    else if (event < 0.052) {
        m.log.unshift(
            m.min + "' 🚩 Ofsayd – " + team.name
        );
    }

    /* SARI VƏ QIRMIZI KART */

    else if (event < 0.09) {
        const players = ME_outfield(opponent);
        const player = ME_pick(players);

        if (player) {
            const cards = m.y[player.id] || 0;

            if (cards === 0) {
                m.y[player.id] = 1;
                m.st.yc[o]++;

                m.log.unshift(
                    m.min + "' 🟨 Sarı kart – " + player.name
                );
            } else if (cards === 1) {
                m.y[player.id] = 2;
                m.st.rc[o]++;
                m.red[o]++;

                m.log.unshift(
                    m.min + "' 🟥 İkinci sarıdan qırmızı kart – " +
                    player.name
                );
            }
        }
    }

    /* SAKATLIQ */

    else if (event < 0.098) {
        const player = ME_pick(ME_players(team));

        if (player && !player.inj) {
            player.inj = ME_rand(1, 5);

            m.log.unshift(
                m.min + "' 🚑 Zədələnmə – " + player.name
            );
        }
    }

    /* MATÇIN BİTMƏSİ */

    if (m.min >= 90) {
        m.finished = true;
        m.log.unshift("🏁 Matç başa çatdı!");
    }

    if (m.min === 45) {
        m.log.unshift("⏸️ İlk hissə başa çatdı!");
    }
}


/* ---------- SÜRƏTLİ MATÇ SİMULYASİYASI ---------- */

function poi(lambda) {
    lambda = ME_cl(lambda, 0.05, 5);

    const L = Math.exp(-lambda);

    let p = 1;
    let k = 0;

    do {
        k++;
        p *= Math.random();
    } while (p > L && k < 20);

    return k - 1;
}

function quick(home, away) {
    const A = rate(home);
    const B = rate(away);

    const homeGoals = poi(
        1.35 * Math.pow(
            ME_cl(A.at / Math.max(B.df, 1), 0.4, 2.5),
            1.8
        )
    );

    const awayGoals = poi(
        1.20 * Math.pow(
            ME_cl(B.at / Math.max(A.df, 1), 0.4, 2.5),
            1.8
        )
    );

    return [homeGoals, awayGoals];
}


/* ---------- OYUNÇU REYTİNQLƏRİ ---------- */

function ratings(m) {
    const result = [];

    [m.h, m.a].forEach((team, index) => {
        const difference = m.s[index] - m.s[1 - index];

        ME_players(team).forEach(player => {
            const goals =
                player.gl - (m.g0?.[player.id] || 0);

            const assists = player.as || 0;

            let rating =
                6 +
                (difference > 0 ? 0.35 : difference < 0 ? -0.25 : 0) +
                (ME_playerRating(player) - 60) / 45 +
                goals * 1.15 +
                assists * 0.65;

            if (m.y?.[player.id] === 1) rating -= 0.25;
            if (m.y?.[player.id] === 2) rating -= 1.2;

            if (player.inj > 0) rating -= 0.2;

            rating += Math.random() * 0.5 - 0.25;

            result.push({
                p: player,
                t: team,
                r: ME_cl(rating, 3.5, 10)
            });
        });
    });

    return result;
}

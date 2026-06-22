import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const C1 = "#60a5fa", C2 = "#34d399", C3 = "#a78bfa", C4 = "#fb923c", RED = "#f87171", AMB = "#fbbf24";

const AUTH_PASS = import.meta.env.VITE_AUTH_PASS || null;
const STORAGE_KEY = "ak30_auth";

function LoginGate({ onAuth }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pw === AUTH_PASS) {
      localStorage.setItem(STORAGE_KEY, "1");
      onAuth();
    } else {
      setError(true);
      setPw("");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f1117", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "system-ui,sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 340 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "#4a5568", marginBottom: 8 }}>AK30 · Bostalsee · 2026</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#e2e8f0" }}>Dashboard</div>
        </div>
        <form onSubmit={handleSubmit} style={{ background: "#1a1f2e", border: "1px solid #252d3d", borderRadius: 10, padding: 24 }}>
          <label style={{ display: "block", fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "#4a5568", marginBottom: 8 }}>
            Passwort
          </label>
          <input
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setError(false); }}
            autoFocus
            style={{ width: "100%", boxSizing: "border-box", background: "#111827", border: `1px solid ${error ? RED : "#252d3d"}`, borderRadius: 6, padding: "10px 12px", fontSize: 14, color: "#e2e8f0", outline: "none", marginBottom: error ? 8 : 16 }}
          />
          {error && (
            <div style={{ fontSize: 11, color: RED, marginBottom: 16 }}>Falsches Passwort</div>
          )}
          <button
            type="submit"
            style={{ width: "100%", background: C1, border: "none", borderRadius: 6, padding: "10px 0", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#0f1117", cursor: "pointer" }}
          >
            Einloggen
          </button>
        </form>
      </div>
    </div>
  );
}

const hcpiTeams = [
  { name: "Katharinenhof", s1avg: 6.09, s1med: 6.50, s1n: 8, s2avg: 5.95, s2med: 5.75, s2n: 8, s3avg: 6.29, s3med: 7.00, s3n: 8, s4avg: 7.50, s4med: 6.80, s4n: 8 },
  { name: "Kurpfalz",      s1avg: 8.16, s1med: 8.85, s1n: 8, s2avg: 7.50, s2med: 8.45, s2n: 8, s3avg: 8.95, s3med: 8.55, s3n: 8, s4avg: 6.44, s4med: 7.25, s4n: 8 },
  { name: "Barbarossa",    s1avg: 9.54, s1med: 9.60, s1n: 7, s2avg: 6.83, s2med: 6.20, s2n: 8, s3avg: 9.47, s3med: 8.35, s3n: 8, s4avg: 8.86, s4med: 8.35, s4n: 8 },
  { name: "Westpfalz",     s1avg: 7.96, s1med: 8.30, s1n: 7, s2avg: 10.20, s2med: 10.10, s2n: 8, s3avg: 8.64, s3med: 9.00, s3n: 8, s4avg: 9.66, s4med: 9.60, s4n: 8 },
  { name: "Bostalsee",     s1avg: 7.35, s1med: 6.50, s1n: 8, s2avg: 7.53, s2med: 6.85, s2n: 8, s3avg: 5.84, s3med: 5.90, s3n: 8, s4avg: 6.81, s4med: 6.35, s4n: 8 },
];

const chartData = hcpiTeams.map(t => ({
  name: t.name === "Katharinenhof" ? "Katharinh." : t.name,
  "1.ST": +t.s1avg.toFixed(2),
  "2.ST": +t.s2avg.toFixed(2),
  "3.ST": +t.s3avg.toFixed(2),
  "4.ST": +t.s4avg.toFixed(2),
}));

const st1 = [
  { name: "Katharinenhof", rank: 1, ts: 469, soll: 462, streicher: "Kurt (82), Fischer (82)" },
  { name: "Barbarossa",    rank: 2, ts: 489, soll: 476, streicher: "Recktenwald (90), Schleppi (90)" },
  { name: "Kurpfalz",      rank: 3, ts: 491, soll: 469, streicher: "Rischbode (87), Mühl (87)" },
  { name: "Bostalsee",     rank: 4, ts: 507, soll: 469, streicher: "Ludwig (91), Scholler (93)" },
  { name: "Westpfalz",     rank: 5, ts: 512, soll: 480, streicher: "Jakob (93), Flierl (102)" },
];
const st2 = [
  { name: "Barbarossa",    rank: 1, ts: 502, soll: 480, streicher: "Häusler (90), Wasem (99)" },
  { name: "Kurpfalz",      rank: 2, ts: 505, soll: 482, streicher: "Ruthig (90), Türk (90)" },
  { name: "Katharinenhof", rank: 3, ts: 519, soll: 472, streicher: "— (2× No Return)" },
  { name: "Bostalsee",     rank: 4, ts: 520, soll: 477, streicher: "Schade (94), Reiter (95)" },
  { name: "Westpfalz",     rank: 5, ts: 555, soll: 493, streicher: "Mühe (108) · 1× NR" },
];
const st3 = [
  { name: "Bostalsee",     rank: 1, ts: 503, soll: 476, streicher: "Schneider (94), Schmitt (95)" },
  { name: "Barbarossa",    rank: 2, ts: 508, soll: 492, streicher: "Recktenwald (92), Blauth (99)" },
  { name: "Katharinenhof", rank: 3, ts: 508, soll: 480, streicher: "Fries (94), Becker (96)" },
  { name: "Kurpfalz",      rank: 4, ts: 525, soll: 497, streicher: "Okon (97), Mühl (99)" },
  { name: "Westpfalz",     rank: 5, ts: 550, soll: 501, streicher: "Hammerschmidt (102), Hauck (109)" },
];
const st4 = [
  { name: "Kurpfalz",      rank: 1, ts: 475, soll: 463, streicher: "Borrmann (85), Weißkopf (89)" },
  { name: "Bostalsee",     rank: 2, ts: 483, soll: 475, streicher: "Georg (89), Ludwig (93)" },
  { name: "Westpfalz",     rank: 3, ts: 485, soll: 484, streicher: "Mühe (92), Klingel (95)" },
  { name: "Barbarossa",    rank: 4, ts: 494, soll: 480, streicher: "Blauth (97), Metzmann (NRO)" },
  { name: "Katharinenhof", rank: 5, ts: 504, soll: 468, streicher: "Fries (98), Fischer (NRO)" },
];

const players = [
  { name: "Decker, Y.",    p1: 6,    s1: 76,   str1: false, p2: 6,    s2: 80,   str2: false, p3: 4,    s3: 84,   str3: false, p4: 5,    s4: 76,   str4: false, pf: 6,    sf: 99   },
  { name: "Georg, H.",     p1: null, s1: null, str1: false, p2: 8,    s2: 87,   str2: false, p3: 7,    s3: 86,   str3: false, p4: 7,    s4: 89,   str4: true,  pf: 7,    sf: 81   },
  { name: "Ley, K.",       p1: 3,    s1: 84,   str1: false, p2: null, s2: null, str2: false, p3: 4,    s3: 78,   str3: false, p4: 4,    s4: 77,   str4: false, pf: null, sf: null },
  { name: "Ludwig, T.",    p1: 9,    s1: 91,   str1: true,  p2: 10,   s2: 93,   str2: false, p3: null, s3: null, str3: false, p4: 10,   s4: 93,   str4: true,  pf: null, sf: null },
  { name: "Lyons, C.",     p1: null, s1: null, str1: false, p2: null, s2: null, str2: false, p3: 5,    s3: 89,   str3: false, p4: null, s4: null, str4: false, pf: 8,    sf: 84   },
  { name: "Martin, L.",    p1: 7,    s1: 82,   str1: false, p2: 9,    s2: 83,   str2: false, p3: 8,    s3: 81,   str3: false, p4: 8,    s4: 76,   str4: false, pf: 7,    sf: 89   },
  { name: "Reiter, M.",    p1: 15,   s1: 90,   str1: false, p2: 16,   s2: 95,   str2: true,  p3: null, s3: null, str3: false, p4: 15,   s4: 88,   str4: false, pf: null, sf: null },
  { name: "Rink, N.",      p1: null, s1: null, str1: false, p2: null, s2: null, str2: false, p3: null, s3: null, str3: false, p4: null, s4: null, str4: false, pf: 4,    sf: 78   },
  { name: "Schade, M.",    p1: null, s1: null, str1: false, p2: 11,   s2: 94,   str2: true,  p3: null, s3: null, str3: false, p4: 10,   s4: null, str4: false, pf: 10,   sf: 92   },
  { name: "Schmitt, C.",   p1: 7,    s1: 87,   str1: false, p2: null, s2: null, str2: false, p3: 7,    s3: 95,   str3: true,  p4: null, s4: null, str4: false, pf: null, sf: null },
  { name: "Schneider, C.", p1: null, s1: null, str1: false, p2: 7,    s2: 88,   str2: false, p3: 6,    s3: 94,   str3: true,  p4: 6,    s4: 82,   str4: false, pf: null, sf: null },
  { name: "Scholler, F.",  p1: 11,   s1: 93,   str1: true,  p2: null, s2: null, str2: false, p3: null, s3: null, str3: false, p4: null, s4: null, str4: false, pf: 12,   sf: 87   },
  { name: "Wilhelm, M.",   p1: 5,    s1: 88,   str1: false, p2: 5,    s2: 89,   str2: false, p3: 4,    s3: 85,   str3: false, p4: 5,    s4: 84,   str4: false, pf: 5,    sf: 82   },
];

const PAR1 = 71, PAR2 = 72, PAR3 = 74, PAR4 = 72, PAR5 = 71, PAR_FS = 72;
const DAY5_STORAGE_KEY = "ak30_day5_results";

const day5StartList = [
  { name: "Newsome, Robert", team: "Barbarossa" },
  { name: "Schertz, Patric", team: "Barbarossa" },
  { name: "Metzmann, Florian", team: "Barbarossa" },
  { name: "Kroehnert, Jonas", team: "Barbarossa" },
  { name: "Häusler, Gerold", team: "Barbarossa" },
  { name: "Recktenwald, Tobias", team: "Barbarossa" },
  { name: "Mühlberger, Felix", team: "Barbarossa" },
  { name: "Karol, Kamil", team: "Barbarossa" },

  { name: "Werny, Erik", team: "Katharinenhof" },
  { name: "Klampfer, Erwin", team: "Katharinenhof" },
  { name: "Fischer, Maximilian", team: "Katharinenhof" },
  { name: "Holzer, Sebastian", team: "Katharinenhof" },
  { name: "Becker, Michael", team: "Katharinenhof" },
  { name: "Kirchner, Eric", team: "Katharinenhof" },
  { name: "Schley, Michael", team: "Katharinenhof" },
  { name: "Marullo, Giuseppe", team: "Katharinenhof" },

  { name: "Ley, Karsten", team: "Bostalsee" },
  { name: "Georg, Heiko", team: "Bostalsee" },
  { name: "Martin, Lars", team: "Bostalsee" },
  { name: "Wilhelm, Michael", team: "Bostalsee" },
  { name: "Reiter, Marco", team: "Bostalsee" },
  { name: "Schade, Marc André", team: "Bostalsee" },
  { name: "Ludwig, Tobias", team: "Bostalsee" },
  { name: "Decker, Yannick", team: "Bostalsee" },

  { name: "Leopold, Jens", team: "Kurpfalz" },
  { name: "Kretz, Sascha", team: "Kurpfalz" },
  { name: "Baronello, Roberto", team: "Kurpfalz" },
  { name: "Rischbode, Tjark-Lajos", team: "Kurpfalz" },
  { name: "Bieker, Niels", team: "Kurpfalz" },
  { name: "Weisskopf, Luis", team: "Kurpfalz" },
  { name: "Borrmann, Mirko", team: "Kurpfalz" },
  { name: "Tuerk, Sabri", team: "Kurpfalz" },

  { name: "Wadle, Volker", team: "Westpfalz" },
  { name: "Riedinger, Jan", team: "Westpfalz" },
  { name: "Fusenig, Christian", team: "Westpfalz" },
  { name: "Wiese, Felix", team: "Westpfalz" },
  { name: "Flierl, Jan-Benjamin", team: "Westpfalz" },
  { name: "Hammerschmidt, Thorsten", team: "Westpfalz" },
  { name: "Klingel, Steffen", team: "Westpfalz" },
  { name: "Muehe, Bennet", team: "Westpfalz" },
];

const css = {
  body:  { background: "#0f1117", minHeight: "100vh", padding: 20, fontFamily: "system-ui,sans-serif", color: "#e2e8f0", fontSize: 13 },
  card:  { background: "#1a1f2e", border: "1px solid #252d3d", borderRadius: 8, overflow: "hidden", marginBottom: 16 },
  sec:   { fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#4a5568", padding: "12px 14px 10px", borderBottom: "1px solid #252d3d" },
  th:    { fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "#4a5568", padding: "7px 10px", textAlign: "right", borderBottom: "2px solid #1e2a3a" },
  td:    { padding: "10px", textAlign: "right", color: "#94a3b8", borderBottom: "1px solid #1e2a3a", fontSize: 13 },
  note:  { fontSize: 11, color: "#4a5568", padding: "9px 14px", borderTop: "1px solid #1e2a3a", fontStyle: "italic" },
};

function NavTab({ label, active, onClick }) {
  return (
    <div onClick={onClick} style={{ padding: "9px 16px", fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", color: active ? "#e2e8f0" : "#4a5568", borderBottom: active ? `2px solid ${C1}` : "2px solid transparent", marginBottom: -1 }}>
      {label}
    </div>
  );
}

function SubTab({ label, active, onClick }) {
  return (
    <div onClick={onClick} style={{ padding: "7px 14px", borderRadius: "5px 5px 0 0", fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", border: "1px solid #252d3d", borderBottom: "none", background: active ? "#1a1f2e" : "#111827", color: active ? "#e2e8f0" : "#4a5568" }}>
      {label}
    </div>
  );
}

function StTab({ label, active, onClick }) {
  return (
    <div onClick={onClick} style={{ padding: "5px 14px", borderRadius: 5, fontSize: 11, fontWeight: 600, cursor: "pointer", background: active ? "#252d3d" : "transparent", color: active ? "#e2e8f0" : "#4a5568", border: "1px solid " + (active ? "#374151" : "#1e2a3a") }}>
      {label}
    </div>
  );
}

function Rank({ r }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 4, background: r === 1 ? "#78350f" : "#1e2a3a", color: r === 1 ? "#fbbf24" : r <= 3 ? "#94a3b8" : "#64748b", fontWeight: 700, fontSize: 12 }}>
      {r}
    </span>
  );
}

function DBar({ delta }) {
  const pct = Math.min(100, delta / 55 * 100);
  const c = delta <= 10 ? C2 : delta <= 25 ? AMB : RED;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end" }}>
      <span style={{ color: c, fontWeight: 700, fontSize: 13, minWidth: 32, textAlign: "right" }}>+{delta}</span>
      <div style={{ width: 60, height: 7, background: "#1e2a3a", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: c }} />
      </div>
    </div>
  );
}

function dColor(d) {
  return d <= 0 ? C2 : d <= 5 ? AMB : RED;
}

function TeamTable({ data, title, subnote }) {
  return (
    <div style={css.card}>
      <div style={css.sec}>{title}</div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
          <thead>
            <tr>
              {["Mannschaft", "Rang", "Team-Score", "Soll (6×)", "Δ Ist−Soll", "Ø/Spieler", "Streicher"].map((h, i) =>
                <th key={i} style={{ ...css.th, textAlign: i === 0 || i === 6 ? "left" : "right" }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map(t => {
              const d = t.ts - t.soll;
              const iB = t.name === "Bostalsee";
              const pC = d <= 10 ? C2 : d <= 25 ? AMB : RED;
              return (
                <tr key={t.name} style={{ background: iB ? "#12192a" : "transparent", borderBottom: "1px solid #1e2a3a" }}>
                  <td style={{ ...css.td, textAlign: "left", fontWeight: 700, fontSize: 14, color: iB ? C1 : "#e2e8f0" }}>{t.name}{iB ? " ★" : ""}</td>
                  <td style={css.td}><Rank r={t.rank} /></td>
                  <td style={{ ...css.td, color: C1, fontWeight: 600 }}>{t.ts}</td>
                  <td style={{ ...css.td, color: "#374151" }}>{t.soll}</td>
                  <td style={css.td}><DBar delta={d} /></td>
                  <td style={{ ...css.td, color: pC, fontWeight: 600 }}>+{(d / 6).toFixed(1)}</td>
                  <td style={{ ...css.td, textAlign: "left", fontSize: 11, color: "#4a5568" }}>{t.streicher}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={css.note}>{subnote}</div>
    </div>
  );
}

function Day5LiveScore({ allTeams, pointsAfter4, overParAfter4, results, updateResult, resetResults }) {
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [scoreInput, setScoreInput] = useState("");
  const [isNR, setIsNR] = useState(false);

  const hasEntry = (name) => Object.prototype.hasOwnProperty.call(results, name);

  useEffect(() => {
    if (!selectedPlayer) {
      setScoreInput("");
      setIsNR(false);
      return;
    }
    if (!hasEntry(selectedPlayer)) {
      setScoreInput("");
      setIsNR(false);
      return;
    }
    if (results[selectedPlayer] === null) {
      setScoreInput("");
      setIsNR(true);
      return;
    }
    setScoreInput(String(results[selectedPlayer]));
    setIsNR(false);
  }, [selectedPlayer, results]);

  const sortedPlayers = [...day5StartList].sort((a, b) => a.name.localeCompare(b.name, "de"));

  const teamLive = allTeams.map((team) => {
    const entries = day5StartList
      .filter((p) => p.team === team)
      .map((p) => ({
        name: p.name,
        value: hasEntry(p.name) ? results[p.name] : undefined,
      }));

    const enteredCount = entries.filter((e) => e.value !== undefined).length;
    const nrCount = entries.filter((e) => e.value === null).length;
    const numericScores = entries
      .filter((e) => typeof e.value === "number")
      .map((e) => e.value)
      .sort((a, b) => a - b);

    const countedScores = numericScores.slice(0, 6);
    const counted = countedScores.length;
    const top6 = counted > 0 ? countedScores.reduce((sum, s) => sum + s, 0) : null;
    const day5OverPar = counted > 0 ? top6 - PAR5 * counted : null;
    const totalOverParLive = overParAfter4[team] + (day5OverPar ?? 0);

    return {
      team,
      entries,
      enteredCount,
      nrCount,
      counted,
      top6,
      day5OverPar,
      totalOverParLive,
      inWertung: counted >= 6,
    };
  });

  const rankedDay = [...teamLive].sort((a, b) => {
    if (a.day5OverPar == null && b.day5OverPar == null) return a.team.localeCompare(b.team, "de");
    if (a.day5OverPar == null) return 1;
    if (b.day5OverPar == null) return -1;
    if (a.day5OverPar !== b.day5OverPar) return a.day5OverPar - b.day5OverPar;
    if (a.counted !== b.counted) return b.counted - a.counted;
    return a.team.localeCompare(b.team, "de");
  });

  // Live-Punkte fuer ST5 (5-4-3-2-1) mit Punktteilung bei Gleichstand.
  const calcDay5LivePoints = (rows) => {
    const base = [5, 4, 3, 2, 1];
    const points = Object.fromEntries(rows.map((r) => [r.team, 0]));
    const hasAnyResult = rows.some((r) => r.day5OverPar != null);
    if (!hasAnyResult) return points;

    let i = 0;
    while (i < rows.length) {
      let j = i;
      while (
        j < rows.length - 1 &&
        rows[j].day5OverPar === rows[j + 1].day5OverPar &&
        rows[j].counted === rows[j + 1].counted
      ) {
        j++;
      }

      const share = base.slice(i, j + 1).reduce((a, b) => a + b, 0) / (j - i + 1);
      for (let k = i; k <= j; k++) points[rows[k].team] = share;
      i = j + 1;
    }

    return points;
  };

  const day5LivePoints = calcDay5LivePoints(rankedDay);

  const rankedOverallLive = [...teamLive]
    .map((row) => ({
      ...row,
      day5LivePoints: day5LivePoints[row.team] || 0,
      totalPointsLive: (pointsAfter4[row.team] || 0) + (day5LivePoints[row.team] || 0),
    }))
    .sort((a, b) => {
    const pDiff = b.totalPointsLive - a.totalPointsLive;
    if (pDiff !== 0) return pDiff;
    if (a.totalOverParLive !== b.totalOverParLive) return a.totalOverParLive - b.totalOverParLive;
    return a.team.localeCompare(b.team, "de");
  });

  const formatSigned = (value) => {
    if (value == null) return "-";
    return `${value >= 0 ? "+" : ""}${value}`;
  };

  const saveSelected = () => {
    if (!selectedPlayer || (!scoreInput && !isNR)) return;
    const score = isNR ? null : parseInt(scoreInput, 10);
    if (!isNR && (isNaN(score) || score < 60 || score > 120)) {
      alert("Score muss zwischen 60 und 120 liegen");
      return;
    }
    updateResult(selectedPlayer, score);
  };

  const deleteSelected = () => {
    if (!selectedPlayer || !hasEntry(selectedPlayer)) return;
    updateResult(selectedPlayer, undefined);
  };

  const confirmReset = () => {
    if (window.confirm("Alle Live-Scores wirklich komplett loeschen?")) resetResults();
  };

  const enteredPlayers = day5StartList.filter((p) => hasEntry(p.name));
  const openPlayers = day5StartList.filter((p) => !hasEntry(p.name));

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div style={css.card}>
          <div style={css.sec}>Live Eingabe / Korrektur</div>
          <div style={{ padding: "14px" }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "#4a5568", marginBottom: 6 }}>Spieler waehlen</label>
            <select
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
              style={{ width: "100%", boxSizing: "border-box", background: "#111827", border: "1px solid #252d3d", borderRadius: 6, padding: "8px 10px", fontSize: 13, color: "#e2e8f0", marginBottom: 12, outline: "none" }}
            >
              <option value="">- Spieler -</option>
              {sortedPlayers.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name} ({p.team}){hasEntry(p.name) ? " - erfasst" : ""}
                </option>
              ))}
            </select>

            {selectedPlayer && (
              <>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "#4a5568", marginBottom: 6 }}>Score oder NR</label>
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  <input
                    type="number"
                    value={scoreInput}
                    onChange={(e) => { setScoreInput(e.target.value); setIsNR(false); }}
                    placeholder="z.B. 76"
                    disabled={isNR}
                    style={{ flex: 1, background: "#111827", border: "1px solid #252d3d", borderRadius: 6, padding: "8px 10px", fontSize: 13, color: isNR ? "#374151" : "#e2e8f0", outline: "none", opacity: isNR ? 0.5 : 1 }}
                  />
                  <button
                    onClick={() => { setIsNR(!isNR); setScoreInput(""); }}
                    style={{ padding: "8px 12px", background: isNR ? RED : "#252d3d", border: "1px solid " + (isNR ? RED : "#374151"), borderRadius: 6, fontSize: 11, fontWeight: 600, color: isNR ? "#fff" : "#94a3b8", cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    {isNR ? "NR" : "NR?"}
                  </button>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={saveSelected}
                    style={{ flex: 1, padding: "10px", background: C1, border: "none", borderRadius: 6, fontSize: 12, fontWeight: 700, color: "#0f1117", cursor: "pointer", textTransform: "uppercase", letterSpacing: 1 }}
                  >
                    {hasEntry(selectedPlayer) ? "Aktualisieren" : "Speichern"}
                  </button>
                  <button
                    onClick={deleteSelected}
                    disabled={!hasEntry(selectedPlayer)}
                    style={{ padding: "10px 12px", background: "#252d3d", border: "1px solid #374151", borderRadius: 6, fontSize: 11, fontWeight: 700, color: hasEntry(selectedPlayer) ? "#cbd5e1" : "#4a5568", cursor: hasEntry(selectedPlayer) ? "pointer" : "not-allowed", textTransform: "uppercase" }}
                  >
                    Loeschen
                  </button>
                </div>
              </>
            )}

            <div style={{ fontSize: 11, color: "#4a5568", marginTop: 14, paddingTop: 14, borderTop: "1px solid #252d3d", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <div>
                <div>Erfasst: {enteredPlayers.length}/40</div>
                <div>Offen: {openPlayers.length}</div>
              </div>
              <button
                onClick={confirmReset}
                style={{ padding: "8px 10px", background: "#3a1616", border: "1px solid #7f1d1d", borderRadius: 6, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#fecaca", cursor: "pointer" }}
              >
                Live Reset
              </button>
            </div>
          </div>
        </div>

        <div style={css.card}>
          <div style={css.sec}>Live Tagesscore</div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 460 }}>
              <thead>
                <tr>
                  <th style={{ ...css.th, textAlign: "left" }}>Mannschaft</th>
                  <th style={css.th}>Top 6 (live)</th>
                  <th style={css.th}>Schlaege ueber Par</th>
                  <th style={css.th}>Ergebnisse</th>
                  <th style={css.th}>Wertung</th>
                </tr>
              </thead>
              <tbody>
                {rankedDay.map((t, idx) => (
                  <tr key={t.team} style={{ borderBottom: "1px solid #1e2a3a" }}>
                    <td style={{ ...css.td, textAlign: "left", fontWeight: 700, fontSize: 13, color: "#e2e8f0" }}>{idx + 1}. {t.team}</td>
                    <td style={{ ...css.td, color: t.top6 == null ? "#4a5568" : C1, fontWeight: 700 }}>{t.top6 == null ? "-" : t.top6}</td>
                    <td style={{ ...css.td, color: t.day5OverPar == null ? "#4a5568" : dColor(t.day5OverPar), fontWeight: 700 }}>{formatSigned(t.day5OverPar)}</td>
                    <td style={css.td}>{t.enteredCount}/8</td>
                    <td style={{ ...css.td, color: t.inWertung ? C2 : AMB, fontWeight: 700 }}>{t.inWertung ? "ja" : `${t.counted}/6`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div style={css.card}>
        <div style={css.sec}>Live Gesamttabelle (mit ST5 Effekt)</div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 680 }}>
            <thead>
              <tr>
                <th style={{ ...css.th, textAlign: "left" }}>Pos.</th>
                <th style={{ ...css.th, textAlign: "left" }}>Mannschaft</th>
                <th style={css.th}>Punkte nach ST1-4</th>
                <th style={css.th}>ST5 Live-Punkte</th>
                <th style={css.th}>Punkte gesamt live</th>
                <th style={css.th}>Ueber Par nach ST1-4</th>
                <th style={css.th}>ST5 live ueber Par</th>
                <th style={css.th}>Ueber Par gesamt live</th>
                <th style={css.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {rankedOverallLive.map((t, idx) => (
                <tr key={t.team} style={{ borderBottom: "1px solid #1e2a3a", background: t.team === "Bostalsee" ? "#12192a" : "transparent" }}>
                  <td style={{ ...css.td, textAlign: "left", color: "#94a3b8", fontWeight: 700 }}>{idx + 1}</td>
                  <td style={{ ...css.td, textAlign: "left", color: t.team === "Bostalsee" ? C1 : "#e2e8f0", fontWeight: 700 }}>{t.team}</td>
                  <td style={{ ...css.td, fontWeight: 700, color: "#cbd5e1" }}>{pointsAfter4[t.team] % 1 === 0 ? pointsAfter4[t.team].toFixed(0) : pointsAfter4[t.team].toFixed(1)}</td>
                  <td style={{ ...css.td, fontWeight: 700, color: t.day5LivePoints >= 3.5 ? C2 : t.day5LivePoints >= 2 ? AMB : "#94a3b8" }}>
                    {t.day5LivePoints % 1 === 0 ? t.day5LivePoints.toFixed(0) : t.day5LivePoints.toFixed(1)}
                  </td>
                  <td style={{ ...css.td, fontWeight: 700, color: C1 }}>
                    {t.totalPointsLive % 1 === 0 ? t.totalPointsLive.toFixed(0) : t.totalPointsLive.toFixed(1)}
                  </td>
                  <td style={{ ...css.td, color: dColor(overParAfter4[t.team]), fontWeight: 700 }}>+{overParAfter4[t.team]}</td>
                  <td style={{ ...css.td, color: t.day5OverPar == null ? "#4a5568" : dColor(t.day5OverPar), fontWeight: 700 }}>{formatSigned(t.day5OverPar)}</td>
                  <td style={{ ...css.td, color: dColor(t.totalOverParLive), fontWeight: 700 }}>{formatSigned(t.totalOverParLive)}</td>
                  <td style={{ ...css.td, color: t.inWertung ? C2 : AMB, fontWeight: 700 }}>
                    {t.inWertung ? "vollständig" : `vorläufig ${t.counted}/6`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={css.note}>Diese Tabelle reagiert ab dem ersten Ergebnis. Endgültig korrekt für den Spieltag ist sie bei mindestens 6 gewerteten Scores je Mannschaft.</div>
      </div>

      <div style={css.card}>
        <div style={css.sec}>Live Spielerübersicht je Mannschaft</div>
        <div style={{ overflowX: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 12, minWidth: 1040 }}>
            {allTeams.map((team) => {
              const teamData = teamLive.find((t) => t.team === team);
              if (!teamData) return null;
              const open = teamData.entries.filter((e) => e.value === undefined).length;

              return (
                <div key={team} style={{ border: "1px solid #1f2937", borderRadius: 8, background: team === "Bostalsee" ? "#12192a" : "#0f141e", overflow: "hidden" }}>
                  <div style={{ padding: "10px 10px 8px", borderBottom: "1px solid #1f2937" }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: team === "Bostalsee" ? C1 : "#e2e8f0" }}>{team}</div>
                    <div style={{ marginTop: 4, fontSize: 11, color: "#94a3b8" }}>
                      Erfasst {teamData.enteredCount}/8 | Offen {open} | NR {teamData.nrCount}
                    </div>
                  </div>

                  <div>
                    {teamData.entries.map((entry) => {
                      const isOpen = entry.value === undefined;
                      const isNR = entry.value === null;
                      const label = isOpen ? "offen" : isNR ? "NR" : String(entry.value);

                      return (
                        <div
                          key={entry.name}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 8,
                            padding: "7px 10px",
                            borderBottom: "1px solid #1a2332",
                            background: isOpen ? "#0d1420" : "transparent",
                          }}
                        >
                          <div style={{ fontSize: 12, color: isOpen ? "#64748b" : "#d1d5db", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {entry.name}
                          </div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: isOpen ? "#64748b" : isNR ? RED : C2, minWidth: 38, textAlign: "right" }}>
                            {label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={css.note}>Alle 40 Spieler mit aktuellem Stand: Score, NR oder offen.</div>
      </div>
    </div>
  );
}

export default function App() {
  const [authed, setAuthed] = useState(() => !AUTH_PASS || localStorage.getItem(STORAGE_KEY) === "1");
  const [page, setPage] = useState("hcpi");
  const [sub, setSub] = useState("ms");
  const [stTab, setStTab] = useState("st4");
  const [inclFS, setInclFS] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  const [day5Results, setDay5Results] = useState(() => {
    const stored = localStorage.getItem(DAY5_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  if (!authed) return <LoginGate onAuth={() => setAuthed(true)} />;

  const updateDay5Result = (playerName, value) => {
    setDay5Results((prev) => {
      const next = { ...prev };
      if (value === undefined) delete next[playerName];
      else next[playerName] = value;
      localStorage.setItem(DAY5_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const resetDay5Results = () => {
    setDay5Results({});
    localStorage.removeItem(DAY5_STORAGE_KEY);
  };

  // Points calculation with tie-splitting
  const calcPoints = (results) => {
    const base = [5, 4, 3, 2, 1];
    const pts = {};
    let i = 0;
    while (i < results.length) {
      let j = i;
      while (j < results.length - 1 && results[j].ts === results[j + 1].ts) j++;
      const shared = base.slice(i, j + 1).reduce((a, b) => a + b, 0) / (j - i + 1);
      for (let k = i; k <= j; k++) pts[results[k].name] = shared;
      i = j + 1;
    }
    return pts;
  };
  const p1 = calcPoints(st1);
  const p2 = calcPoints(st2);
  const p3 = calcPoints(st3);
  const p4 = calcPoints(st4);
  const allTeams = ["Barbarossa", "Katharinenhof", "Bostalsee", "Kurpfalz", "Westpfalz"];
  const COUNTED_SCORES = 6;
  const roundData = [
    { results: st1, par: PAR1 },
    { results: st2, par: PAR2 },
    { results: st3, par: PAR3 },
    { results: st4, par: PAR4 },
  ];
  const getRoundStandard = (par) => par * COUNTED_SCORES;

  const getOverParValues = (name) => {
    const values = [];
    for (const round of roundData) {
      const entry = round.results.find(x => x.name === name);
      if (entry) values.push(entry.ts - getRoundStandard(round.par));
    }
    return values;
  };

  const buildTieBreakProfile = (name) => {
    const values = getOverParValues(name);
    const sorted = [...values].sort((a, b) => a - b);
    const bestSums = {};
    for (let n = 1; n <= sorted.length; n++) {
      bestSums[n] = sorted.slice(0, n).reduce((sum, v) => sum + v, 0);
    }
    return {
      values,
      resultCount: values.length,
      bestSums,
      totalOverPar: sorted.length > 0 ? bestSums[sorted.length] : 0,
    };
  };

  const compareByOfficialRule = (a, b) => {
    if (b.total !== a.total) return b.total - a.total;

    // Laut Regel: Bei unterschiedlicher Anzahl verf├╝gbarer Spieltagsergebnisse
    // belegt die Mannschaft mit weniger Ergebnissen den schlechteren Platz.
    if (a.tie.resultCount !== b.tie.resultCount) return b.tie.resultCount - a.tie.resultCount;

    // Danach Kaskade: alle Spieltage, beste 4, beste 3, ... beste 1
    for (let n = a.tie.resultCount; n >= 1; n--) {
      const diff = a.tie.bestSums[n] - b.tie.bestSums[n];
      if (diff !== 0) return diff;
    }

    // Offiziell w├ñre danach Los; hier stabile Anzeige-Sortierung.
    return a.name.localeCompare(b.name, "de");
  };

  const standardSummary = roundData
    .map((round, idx) => `ST${idx + 1}: ${getRoundStandard(round.par)}`)
    .join(" ┬À ");
  const standings = allTeams.map(name => {
    const tie = buildTieBreakProfile(name);
    return {
      name,
      p1: p1[name], p2: p2[name], p3: p3[name], p4: p4[name],
      total: p1[name] + p2[name] + p3[name] + p4[name],
      overPar: tie.totalOverPar,
      tie,
    };
  }).sort(compareByOfficialRule);

  const pointsAfter4 = Object.fromEntries(
    allTeams.map(name => [name, (p1[name] || 0) + (p2[name] || 0) + (p3[name] || 0) + (p4[name] || 0)])
  );
  const overParAfter4 = Object.fromEntries(
    allTeams.map(name => {
      const tie = buildTieBreakProfile(name);
      return [name, tie.totalOverPar];
    })
  );
  const bostalseeGapNeeded = Object.fromEntries(
    allTeams
      .filter(name => name !== "Bostalsee")
      .map(name => [name, Math.max(0, overParAfter4.Bostalsee - overParAfter4[name] + 1)])
  );

  const permute = (arr) => {
    if (arr.length <= 1) return [arr];
    const out = [];
    for (let i = 0; i < arr.length; i++) {
      const rest = arr.slice(0, i).concat(arr.slice(i + 1));
      const restPerms = permute(rest);
      for (const p of restPerms) out.push([arr[i], ...p]);
    }
    return out;
  };

  const rankPoints = { 1: 5, 2: 4, 3: 3, 4: 2, 5: 1 };
  const opponents = allTeams.filter(t => t !== "Bostalsee");
  const permutations = permute(opponents);

  const championshipByBostalseePos = [1, 2, 3, 4, 5].map((bPos) => {
    const remainingPlaces = [1, 2, 3, 4, 5].filter(p => p !== bPos);
    let total = 0;
    let automatic = 0;
    let tiebreak = 0;

    for (const perm of permutations) {
      const placeMap = { Bostalsee: bPos };
      for (let i = 0; i < perm.length; i++) placeMap[perm[i]] = remainingPlaces[i];

      const finalPoints = {};
      for (const team of allTeams) finalPoints[team] = pointsAfter4[team] + rankPoints[placeMap[team]];

      const maxPoints = Math.max(...Object.values(finalPoints));
      const leaders = allTeams.filter(team => finalPoints[team] === maxPoints);

      if (!leaders.includes("Bostalsee")) continue;

      total += 1;
      if (leaders.length === 1) automatic += 1;
      else tiebreak += 1;
    }

    return { bPos, total, automatic, tiebreak };
  });

  const b1 = championshipByBostalseePos.find(x => x.bPos === 1);
  const b2 = championshipByBostalseePos.find(x => x.bPos === 2);

  // Compute per-player averages
  const playersWithAvg = players.map(p => {
    const leagueScores = [[p.s1, p.p1, PAR1], [p.s2, p.p2, PAR2], [p.s3, p.p3, PAR3], [p.s4, p.p4, PAR4]]
      .filter(([s]) => s != null);
    const fsScores = (inclFS && p.sf != null) ? [[p.sf, p.pf, PAR_FS]] : [];
    const allScores = [...leagueScores, ...fsScores];
    const deltas = allScores.map(([s, ph, par]) => s - (par + ph));
    const avgScore = allScores.length > 0 ? (allScores.reduce((a, [s]) => a + s, 0) / allScores.length) : null;
    const avgDelta = deltas.length > 0 ? (deltas.reduce((a, d) => a + d, 0) / deltas.length) : null;
    return { ...p, avgScore, avgDelta, played: allScores.length };
  });

  return (
    <div style={{ ...css.body, padding: isMobile ? "12px 8px" : 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 20, borderBottom: "1px solid #1e2a3a", paddingBottom: 0, flexWrap: "wrap" }}>
        <span style={{ fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "#4a5568", marginRight: 20, whiteSpace: "nowrap" }}>
          AK30 ┬À Bostalsee ┬À 2026
        </span>
        <NavTab label="HCPI-├£bersicht" active={page === "hcpi"} onClick={() => setPage("hcpi")} />
        <NavTab label="Spieltag 5 LIVE" active={page === "day5"} onClick={() => setPage("day5")} />
        <NavTab label="Ergebnis-Analyse" active={page === "ergebnis"} onClick={() => setPage("ergebnis")} />
      </div>

      {page === "hcpi" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(5,1fr)", gap: 10, marginBottom: 16 }}>
            {[
              ["Feld ├ÿ 1. Spieltag", "8.18", C1],
              ["Feld ├ÿ 2. Spieltag", "7.60", C2],
              ["Feld ├ÿ 3. Spieltag", "7.84", C3],
              ["Feld ├ÿ 4. Spieltag", "7.85", C4],
              ["St├ñrkster Gegner", "Katharinenhof", C2],
            ].map(([l, v, c]) => (
              <div key={l} style={{ background: "#1a1f2e", border: "1px solid #252d3d", borderRadius: 8, padding: "14px 16px" }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "#4a5568", marginBottom: 7 }}>{l}</div>
                <div style={{ fontWeight: 700, fontSize: v.length > 8 ? 16 : 28, color: c, lineHeight: 1 }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={css.card}>
            <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: isMobile ? 280 : 760 }}>
                <thead>
                  <tr style={{ background: "#111827" }}>
                    <th rowSpan={2} style={{ ...css.th, textAlign: "left", position: "sticky", left: 0, background: "#111827", zIndex: 2, borderBottom: "2px solid #1e2a3a", verticalAlign: "bottom", paddingBottom: 9 }}>Mannschaft</th>
                    {[["1. Spieltag (09.05.)", "1.ST", C1], ["2. Spieltag (23.05.)", "2.ST", C2], ["3. Spieltag (06.06.)", "3.ST", C3], ["4. Spieltag (20.06.)", "4.ST", C4]].map(([l, s, c]) => (
                      <th key={l} colSpan={isMobile ? 1 : 3} style={{ ...css.th, textAlign: "center", color: c, borderBottom: `2px solid ${c}`, padding: "9px 6px 4px" }}>{isMobile ? s : l}</th>
                    ))}
                    <th rowSpan={2} style={{ ...css.th, borderBottom: "2px solid #1e2a3a", verticalAlign: "bottom", paddingBottom: 9 }}>╬ö├ÿ 1ÔåÆ4</th>
                  </tr>
                  <tr style={{ background: "#111827", borderBottom: "2px solid #1e2a3a" }}>
                    <th style={{ ...css.th, color: C1 }}>├ÿ HCPI</th>
                    {!isMobile && <th style={css.th}>Med</th>}
                    {!isMobile && <th style={css.th}>N</th>}
                    <th style={{ ...css.th, color: C2 }}>├ÿ HCPI</th>
                    {!isMobile && <th style={css.th}>Med</th>}
                    {!isMobile && <th style={css.th}>N</th>}
                    <th style={{ ...css.th, color: C3 }}>├ÿ HCPI</th>
                    {!isMobile && <th style={css.th}>Med</th>}
                    {!isMobile && <th style={css.th}>N</th>}
                    <th style={{ ...css.th, color: C4 }}>├ÿ HCPI</th>
                    {!isMobile && <th style={css.th}>Med</th>}
                    {!isMobile && <th style={css.th}>N</th>}
                  </tr>
                </thead>
                <tbody>
                  {hcpiTeams.map(t => {
                    const d = t.s4avg - t.s1avg;
                    const dc = d > 0.1 ? RED : d < -0.1 ? C2 : "#64748b";
                    return (
                      <tr key={t.name} style={{ borderBottom: "1px solid #1e2a3a" }}>
                        <td style={{ ...css.td, textAlign: "left", fontWeight: 700, fontSize: 14, color: "#e2e8f0", position: "sticky", left: 0, background: "#1a1f2e", zIndex: 1 }}>{t.name}</td>
                        <td style={{ ...css.td, color: C1, fontWeight: 600 }}>{t.s1avg.toFixed(2)}</td>
                        {!isMobile && <td style={css.td}>{t.s1med.toFixed(2)}</td>}
                        {!isMobile && <td style={css.td}>{t.s1n}</td>}
                        <td style={{ ...css.td, color: C2, fontWeight: 600 }}>{t.s2avg.toFixed(2)}</td>
                        {!isMobile && <td style={css.td}>{t.s2med.toFixed(2)}</td>}
                        {!isMobile && <td style={css.td}>{t.s2n}</td>}
                        <td style={{ ...css.td, color: C3, fontWeight: 600 }}>{t.s3avg.toFixed(2)}</td>
                        {!isMobile && <td style={css.td}>{t.s3med.toFixed(2)}</td>}
                        {!isMobile && <td style={css.td}>{t.s3n}</td>}
                        <td style={{ ...css.td, color: C4, fontWeight: 600 }}>{t.s4avg.toFixed(2)}</td>
                        {!isMobile && <td style={css.td}>{t.s4med.toFixed(2)}</td>}
                        {!isMobile && <td style={css.td}>{t.s4n}</td>}
                        <td style={{ ...css.td, fontWeight: 700, color: dc }}>{(d >= 0 ? "+" : "") + d.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div style={css.card}>
            <div style={css.sec}>├ÿ HCPI pro Spieltag ÔÇö alle Mannschaften</div>
            <div style={{ padding: "14px 14px 4px" }}>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData} barGap={3} barCategoryGap="25%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2a3a" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "#4a5568", fontSize: 9, fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 12]} tick={{ fill: "#374151", fontSize: 9 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #252d3d", borderRadius: 6, color: "#e2e8f0", fontSize: 11 }} cursor={{ fill: "#1e2a3a" }} />
                  <Legend wrapperStyle={{ fontSize: 10, color: "#64748b", paddingTop: 6 }} />
                  <Bar dataKey="1.ST" fill={C1} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="2.ST" fill={C2} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="3.ST" fill={C3} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="4.ST" fill={C4} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {page === "day5" && (
        <div>
          <div style={{ ...css.card, marginBottom: 0, borderRadius: "8px 8px 0 0" }}>
            <div style={css.sec}>Spieltag 5 - GC Bostalsee - Par 71 - Live</div>
          </div>
          <Day5LiveScore
            allTeams={allTeams}
            pointsAfter4={pointsAfter4}
            overParAfter4={overParAfter4}
            results={day5Results}
            updateResult={updateDay5Result}
            resetResults={resetDay5Results}
          />
        </div>
      )}

      {page === "ergebnis" && (
        <div>
          <div style={{ display: "flex", gap: 4, marginBottom: 0, flexWrap: "wrap" }}>
            <SubTab label="Mannschaftsvergleich" active={sub === "ms"} onClick={() => setSub("ms")} />
            <SubTab label="Bostalsee Einzel" active={sub === "ei"} onClick={() => setSub("ei")} />
            <SubTab label="Gesamttabelle" active={sub === "gesamt"} onClick={() => setSub("gesamt")} />
          </div>

          {sub === "ms" && (
            <div>
              <div style={{ display: "flex", gap: 6, margin: "14px 0 10px" }}>
                <StTab label="1. Spieltag" active={stTab === "st1"} onClick={() => setStTab("st1")} />
                <StTab label="2. Spieltag" active={stTab === "st2"} onClick={() => setStTab("st2")} />
                <StTab label="3. Spieltag" active={stTab === "st3"} onClick={() => setStTab("st3")} />
                <StTab label="4. Spieltag" active={stTab === "st4"} onClick={() => setStTab("st4")} />
              </div>
              {stTab === "st1" && <TeamTable data={st1} title="Spieltag 1 – 09.05. · GC Katharinenhof · Par 71 · Slope 127 · Top-6" subnote="Soll = Σ(Par+PHCP) der 6 gewerteten Spieler. Δ positiv = über Erwartung." />}
              {stTab === "st2" && <TeamTable data={st2} title="Spieltag 2 – 23.05. · GC Kurpfalz · Par 72 · Slope 134 · Top-6" subnote="Katharinenhof: 2× No Return. Westpfalz: 1× NR." />}
              {stTab === "st3" && <TeamTable data={st3} title="Spieltag 3 – 06.06. · GC Barbarossa · Par 74 · Slope 135 · Top-6" subnote="Bostalsee gewinnt den Spieltag. Katharinenhof Rang 3 trotz gleicher Score wegen CR-Ausgleich (*)." />}
              {stTab === "st4" && <TeamTable data={st4} title="Spieltag 4 – 20.06. · Erster GC Westpfalz · Par 72 · Top-6" subnote="Kurpfalz gewinnt den Spieltag. Bostalsee stark auf Rang 2. Je ein NRO bei Barbarossa und Katharinenhof." />}
            </div>
          )}

          {sub === "gesamt" && (
            <>
              <div style={{ ...css.card, borderRadius: "0 8px 8px 8px" }}>
                <div style={css.sec}>Gesamttabelle nach 4 Spieltagen · Punkte: 1. Platz = 5 Pkt, bei Gleichstand geteilt</div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Pos.", "Mannschaft", "ST1 Score", "ST1 Pkt", "ST2 Score", "ST2 Pkt", "ST3 Score", "ST3 Pkt", "ST4 Score", "ST4 Pkt", "Gesamt", "Schläge über Par"].map((h, i) =>
                        <th key={i} style={{ ...css.th, textAlign: i <= 1 ? "left" : "right", background: i === 10 ? "#161d2c" : "transparent" }}>{h}</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((t, idx) => {
                      const isTop = idx === 0;
                      const isRelegation = idx === standings.length - 1;
                      const isBos = t.name === "Bostalsee";
                      const posColor = isTop ? C2 : isRelegation ? RED : idx === 1 ? "#94a3b8" : "#64748b";
                      const posBg = isTop ? "#064e3b" : isRelegation ? "#7f1d1d" : idx === 1 ? "#1e2a3a" : "#1e2a3a";
                      const fPts = (pts) => {
                        const c = pts === 5 ? C2 : pts >= 3.5 ? AMB : pts >= 2 ? "#94a3b8" : RED;
                        return <span style={{ color: c, fontWeight: 700 }}>{pts % 1 === 0 ? pts.toFixed(0) : pts.toFixed(1)}</span>;
                      };
                      const fScore = (stData, name) => {
                        const entry = stData.find(x => x.name === name);
                        return entry ? <span style={{ color: "#64748b" }}>{entry.ts}</span> : <span style={{ color: "#2d3748" }}>—</span>;
                      };
                      return (
                        <tr key={t.name} style={{ background: isBos ? "#12192a" : "transparent", borderBottom: "1px solid #1e2a3a" }}>
                          <td style={{ ...css.td, textAlign: "left", width: 40 }}>
                            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 4, background: posBg, color: posColor, fontWeight: 700, fontSize: 12 }}>{idx + 1}</span>
                          </td>
                          <td style={{ ...css.td, textAlign: "left", fontWeight: 700, fontSize: 14, color: isRelegation ? RED : isBos ? C1 : "#e2e8f0" }}>{t.name}{isBos ? " ★" : ""}{isRelegation ? " ↓" : ""}</td>
                          <td style={css.td}>{fScore(st1, t.name)}</td>
                          <td style={css.td}>{fPts(t.p1)}</td>
                          <td style={css.td}>{fScore(st2, t.name)}</td>
                          <td style={css.td}>{fPts(t.p2)}</td>
                          <td style={css.td}>{fScore(st3, t.name)}</td>
                          <td style={css.td}>{fPts(t.p3)}</td>
                          <td style={css.td}>{fScore(st4, t.name)}</td>
                          <td style={css.td}>{fPts(t.p4)}</td>
                          <td style={{ ...css.td, background: "#161d2c", fontWeight: 700, fontSize: 15, color: isTop ? C2 : isRelegation ? RED : "#e2e8f0" }}>
                            {t.total % 1 === 0 ? t.total.toFixed(0) : t.total.toFixed(1)}
                          </td>
                          <td style={{ ...css.td, fontWeight: 700, color: t.overPar <= 40 ? C2 : t.overPar <= 100 ? AMB : RED }}>
                            +{t.overPar}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  </table>
                </div>
                <div style={css.note}>Offizielle Tie-Break-Regel bei Punktgleichheit: zuerst Gesamtschlagzahl ├╝ber/unter Par aller Spieltage, dann beste 4, beste 3, beste 2, beste 1. Bei weiterhin vollst├ñndiger Gleichheit entscheidet das Los. Falls nicht gleich viele Spieltagsergebnisse vorliegen, wird die Mannschaft mit weniger Ergebnissen schlechter platziert. Platzstandards: {standardSummary}. ST3: Barbarossa und Katharinenhof schlaggleich (508) ÔåÆ je 3,5 Punkte ┬À ST4: Kurpfalz gewinnt mit 475 ┬À Platz 5 = Absteiger</div>
              </div>

              <div style={{ ...css.card, borderRadius: 8 }}>
                <div style={css.sec}>Unsere Meisterschafts-Konstellationen</div>
                <div style={{ padding: isMobile ? 10 : 14, display: "grid", gap: isMobile ? 10 : 12 }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 10 }}>
                  <div style={{ background: "#10251a", border: "1px solid #1f4d35", borderRadius: 8, padding: 10 }}>
                    <div style={{ fontSize: 10, color: "#7dd3a8", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>Muss passieren</div>
                    <div style={{ color: "#d1fae5", fontWeight: 700, fontSize: isMobile ? 12 : 13, lineHeight: 1.4 }}>Bostalsee muss am 5. Spieltag mindestens Platz 2 erreichen.</div>
                  </div>
                  <div style={{ background: "#2a1d10", border: "1px solid #6b3f16", borderRadius: 8, padding: 10 }}>
                    <div style={{ fontSize: 10, color: "#fbbf24", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>Kritischer Hebel</div>
                    <div style={{ color: "#fde68a", fontWeight: 700, fontSize: isMobile ? 12 : 13, lineHeight: 1.4 }}>Bei Punktgleichheit mit Kurpfalz muss Bostalsee am 5. Spieltag mindestens 18 Schläge besser sein.</div>
                  </div>
                  <div style={{ background: "#2a1515", border: "1px solid #7f1d1d", borderRadius: 8, padding: 10 }}>
                    <div style={{ fontSize: 10, color: "#fca5a5", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>Nicht ausreichend</div>
                    <div style={{ color: "#fecaca", fontWeight: 700, fontSize: isMobile ? 12 : 13, lineHeight: 1.4 }}>Bostalsee auf Platz 3, 4 oder 5: keine Meisterschaft mehr möglich.</div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10 }}>
                  <div style={{ background: "#12192a", border: "1px solid #2a3b59", borderRadius: 8, padding: 12 }}>
                    <div style={{ color: C1, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>Weg A: Bostalsee wird 1.</div>
                    <div style={{ color: "#94a3b8", fontSize: isMobile ? 11 : 12, lineHeight: 1.5 }}>
                      {b1.total} von 24 Konstellationen sind meisterschaftstauglich ({b1.automatic} direkt über Punkte, {b1.tiebreak} über Tie-Breaker).
                    </div>
                    <ul style={{ margin: "8px 0 0", paddingLeft: isMobile ? 16 : 18, color: "#cbd5e1", fontSize: isMobile ? 11 : 12, lineHeight: 1.5 }}>
                      <li>Wenn Barbarossa 2. wird, reicht Platz 1 für Bostalsee nicht (Barbarossa hat dann 18,5 Punkte).</li>
                      <li>Wenn Kurpfalz 2. wird, entscheidet die Schlagdifferenz: Bostalsee muss 18 besser sein als Kurpfalz.</li>
                      <li>Wenn Katharinenhof oder Westpfalz 2. wird, ist Bostalsee mit Platz 1 sicher Meister.</li>            
                    </ul>
                  </div>

                  <div style={{ background: "#12192a", border: "1px solid #2a3b59", borderRadius: 8, padding: 12 }}>
                    <div style={{ color: C1, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>Weg B: Bostalsee wird 2.</div>
                    <div style={{ color: "#94a3b8", fontSize: isMobile ? 11 : 12, lineHeight: 1.5 }}>
                      {b2.total} von 24 Konstellationen sind meisterschaftstauglich ({b2.automatic} direkt ├über Punkte, {b2.tiebreak} ├╝ber Tie-Breaker).
                    </div>
                    <ul style={{ margin: "8px 0 0", paddingLeft: isMobile ? 16 : 18, color: "#cbd5e1", fontSize: isMobile ? 11 : 12, lineHeight: 1.5 }}>
                      <li>Dieser Weg funktioniert nur, wenn Westpfalz den Spieltag gewinnt.</li>
                      <li>Wenn Kurpfalz dabei 3. wird (17 Punkte), braucht Bostalsee wieder 18 Schläge Vorteil auf Kurpfalz.</li>
                      <li>Platz 2 hinter einem anderen Sieger als Westpfalz reicht nicht aus.</li>
                    </ul>
                  </div>
                </div>

                <div style={{ background: "#101826", border: "1px solid #23314a", borderRadius: 8, padding: 12 }}>
                  <div style={{ color: "#93c5fd", fontWeight: 700, fontSize: 12, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Benötigter Schlagvorteil bei Punktgleichheit</div>
                  {isMobile ? (
                    <div style={{ display: "grid", gap: 8 }}>
                      {allTeams.filter(t => t !== "Bostalsee").map(team => {
                        const gap = overParAfter4.Bostalsee - overParAfter4[team];
                        const need = bostalseeGapNeeded[team];
                        return (
                          <div key={team} style={{ border: "1px solid #1e2a3a", borderRadius: 8, padding: "8px 10px", background: "#0f172a" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                              <div style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 12 }}>{team}</div>
                              <div style={{ color: gap > 0 ? RED : C2, fontWeight: 700, fontSize: 12 }}>{gap > 0 ? `+${gap}` : `${gap}`}</div>
                            </div>
                            <div style={{ color: need === 0 ? C2 : AMB, fontWeight: 700, fontSize: 11, lineHeight: 1.4 }}>
                              {need === 0 ? "Kein Vorteil nötig" : `Bostalsee mind. ${need} besser am 5. Spieltag`}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 420 }}>
                        <thead>
                          <tr>
                            <th style={{ ...css.th, textAlign: "left" }}>Gegner</th>
                            <th style={{ ...css.th, textAlign: "right" }}>Rückstand Bostalsee nach ST1-ST4</th>
                            <th style={{ ...css.th, textAlign: "right" }}>Bedingung am 5. Spieltag</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allTeams.filter(t => t !== "Bostalsee").map(team => {
                            const gap = overParAfter4.Bostalsee - overParAfter4[team];
                            const need = bostalseeGapNeeded[team];
                            return (
                              <tr key={team} style={{ borderBottom: "1px solid #1e2a3a" }}>
                                <td style={{ ...css.td, textAlign: "left", color: "#e2e8f0", fontWeight: 600 }}>{team}</td>
                                <td style={{ ...css.td, color: gap > 0 ? RED : C2, fontWeight: 700 }}>{gap > 0 ? `+${gap}` : `${gap}`}</td>
                                <td style={{ ...css.td, color: need === 0 ? C2 : AMB, fontWeight: 700 }}>
                                  {need === 0 ? "Kein Vorteil nötig" : `Bostalsee mind. ${need} besser`}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                </div>
                <div style={css.note}>Legende für Besprechung: "mind. X besser" bedeutet: Bostalsee braucht am 5. Spieltag mindestens X Schläge weniger als der genannte Gegner. Tie-Breaker basiert auf der Gesamtsumme Schläge über Par über alle Spieltage.</div>
              </div>
            </>
          )}

          {sub === "ei" && (
            <div style={{ ...css.card, borderRadius: "0 8px 8px 8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #252d3d", flexWrap: "wrap", gap: 4 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#4a5568",üadding: "12px 14px 10px" }}>
                  Bostalsee – Spieler Δ (Score minus Par+PHCP) pro Spieltag
                </div>
                <div style={{ padding: "10px 14px" }}>
                  <button
                    onClick={() => setInclFS(!inclFS)}
                    style={{ background: inclFS ? AMB : "#252d3d", border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: inclFS ? "#0f1117" : "#4a5568", cursor: "pointer" }}
                  >
                    {inclFS ? "✓ " : ""}Freundschaftsspiele
                  </button>
                </div>
              </div>
              <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: isMobile ? 360 : 1260 }}>
                  <thead>
                    <tr>
                      <th style={{ ...css.th, textAlign: "left", position: "sticky", left: 0, background: "#111827", zIndex: 2 }}>Spieler</th>
                      <th style={{ ...css.th, background: "#19160a", color: AMB, display: isMobile ? "none" : undefined }}>FS PHCP</th>
                      <th style={{ ...css.th, background: "#19160a", color: AMB, display: isMobile ? "none" : undefined }}>FS Soll</th>
                      <th style={{ ...css.th, background: "#19160a", color: AMB }}>FS Sc</th>
                      <th style={{ ...css.th, background: "#19160a", color: AMB }}>FS Δ</th>
                      <th style={{ ...css.th, display: isMobile ? "none" : undefined }}>ST1 PHCP</th>
                      <th style={{ ...css.th, display: isMobile ? "none" : undefined }}>ST1 Soll</th>
                      <th style={css.th}>ST1 Sc</th>
                      <th style={css.th}>ST1 Δ</th>
                      <th style={{ ...css.th, display: isMobile ? "none" : undefined }}>ST2 PHCP</th>
                      <th style={{ ...css.th, display: isMobile ? "none" : undefined }}>ST2 Soll</th>
                      <th style={css.th}>ST2 Sc</th>
                      <th style={css.th}>ST2 Δ</th>
                      <th style={{ ...css.th, display: isMobile ? "none" : undefined }}>ST3 PHCP</th>
                      <th style={{ ...css.th, display: isMobile ? "none" : undefined }}>ST3 Soll</th>
                      <th style={css.th}>ST3 Sc</th>
                      <th style={css.th}>ST3 Δ</th>
                      <th style={{ ...css.th, color: C4, display: isMobile ? "none" : undefined }}>ST4 PHCP</th>
                      <th style={{ ...css.th, color: C4, display: isMobile ? "none" : undefined }}>ST4 Soll</th>
                      <th style={{ ...css.th, color: C4 }}>ST4 Sc</th>
                      <th style={{ ...css.th, color: C4 }}>ST4 Δ</th>
                      <th style={{ ...css.th, background: "#161d2c" }}>Ø Score</th>
                      <th style={{ ...css.th, background: "#161d2c" }}>Ø Δ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {playersWithAvg.map(p => {
                      const d1 = p.p1 != null && p.s1 != null ? p.s1 - (PAR1 + p.p1) : null;
                      const d2 = p.p2 != null && p.s2 != null ? p.s2 - (PAR2 + p.p2) : null;
                      const d3 = p.p3 != null && p.s3 != null ? p.s3 - (PAR3 + p.p3) : null;
                      const d4 = p.p4 != null && p.s4 != null ? p.s4 - (PAR4 + p.p4) : null;
                      const df = p.pf != null && p.sf != null ? p.sf - (PAR_FS + p.pf) : null;
                      const fV = (v, str) => v == null
                        ? <span style={{ color: "#2d3748" }}>—</span>
                        : <span style={{ opacity: str ? 0.4 : 1 }}>{v}</span>;
                      const fD = (d, str) => d == null
                        ? <span style={{ color: "#2d3748" }}>—</span>
                        : <span style={{ color: str ? "#4a5568" : dColor(d), fontWeight: 600, opacity: str ? 0.4 : 1 }}>{d >= 0 ? "+" : ""}{d}</span>;
                      const fS = (ph, par, str) => ph == null
                        ? <span style={{ color: "#2d3748" }}>—</span>
                        : <span style={{ opacity: str ? 0.4 : 1, color: "#4a5568" }}>{par + ph}</span>;
                      const avgScoreColor = p.avgScore != null ? (p.avgScore < 85 ? C2 : p.avgScore < 92 ? AMB : RED) : "#2d3748";
                      const avgDeltaColor = p.avgDelta != null ? dColor(Math.round(p.avgDelta)) : "#2d3748";
                      const mob = isMobile ? "none" : undefined;
                      return (
                        <tr key={p.name} style={{ borderBottom: "1px solid #1e2a3a" }}>
                          <td style={{ ...css.td, textAlign: "left", color: "#cbd5e1", fontWeight: 500, position: "sticky", left: 0, background: "#1a1f2e", zIndex: 1 }}>{p.name}</td>
                          <td style={{ ...css.td, background: "#19160a", display: mob }}>{fV(p.pf, false)}</td>
                          <td style={{ ...css.td, background: "#19160a", display: mob }}>{fS(p.pf, PAR_FS, false)}</td>
                          <td style={{ ...css.td, background: "#19160a" }}>{fV(p.sf, false)}</td>
                          <td style={{ ...css.td, background: "#19160a" }}>{fD(df, false)}</td>
                          <td style={{ ...css.td, display: mob }}>{fV(p.p1, p.str1)}</td>
                          <td style={{ ...css.td, display: mob }}>{fS(p.p1, PAR1, p.str1)}</td>
                          <td style={css.td}>{fV(p.s1, p.str1)}</td>
                          <td style={css.td}>{fD(d1, p.str1)}</td>
                          <td style={{ ...css.td, display: mob }}>{fV(p.p2, p.str2)}</td>
                          <td style={{ ...css.td, display: mob }}>{fS(p.p2, PAR2, p.str2)}</td>
                          <td style={css.td}>{fV(p.s2, p.str2)}</td>
                          <td style={css.td}>{fD(d2, p.str2)}</td>
                          <td style={{ ...css.td, display: mob }}>{fV(p.p3, p.str3)}</td>
                          <td style={{ ...css.td, display: mob }}>{fS(p.p3, PAR3, p.str3)}</td>
                          <td style={css.td}>{fV(p.s3, p.str3)}</td>
                          <td style={css.td}>{fD(d3, p.str3)}</td>
                          <td style={{ ...css.td, display: mob }}>{fV(p.p4, p.str4)}</td>
                          <td style={{ ...css.td, display: mob }}>{fS(p.p4, PAR4, p.str4)}</td>
                          <td style={css.td}>{fV(p.s4, p.str4)}</td>
                          <td style={css.td}>{fD(d4, p.str4)}</td>
                          <td style={{ ...css.td, background: "#161d2c", color: avgScoreColor, fontWeight: 700 }}>
                            {p.avgScore != null ? p.avgScore.toFixed(1) : <span style={{ color: "#2d3748" }}>—</span>}
                          </td>
                          <td style={{ ...css.td, background: "#161d2c", color: avgDeltaColor, fontWeight: 700 }}>
                            {p.avgDelta != null ? (p.avgDelta >= 0 ? "+" : "") + p.avgDelta.toFixed(1) : <span style={{ color: "#2d3748" }}>—</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div style={css.note}>Grün = unter/auf Erwartung · Gelb ≤ +5 · Rot &gt; +5 · FS = Freundschaftsspiel Mommenheim 21.03. · Ø {inclFS ? "inkl. Freundschaftsspiel" : "nur Ligaspiele"}{isMobile ? " · PHCP/Soll ausgeblendet" : " · Ausgegraut = Streicher"}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

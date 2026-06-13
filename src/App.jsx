import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const C1 = "#60a5fa", C2 = "#34d399", C3 = "#a78bfa", RED = "#f87171", AMB = "#fbbf24";

const hcpiTeams = [
  { name: "Katharinenhof", s1avg: 6.09, s1med: 6.50, s1n: 8, s2avg: 5.95, s2med: 5.75, s2n: 8, s3avg: 6.29, s3med: 7.00, s3n: 8 },
  { name: "Kurpfalz",      s1avg: 8.16, s1med: 8.85, s1n: 8, s2avg: 7.50, s2med: 8.45, s2n: 8, s3avg: 8.95, s3med: 8.55, s3n: 8 },
  { name: "Barbarossa",    s1avg: 9.54, s1med: 9.60, s1n: 7, s2avg: 6.83, s2med: 6.20, s2n: 8, s3avg: 9.47, s3med: 8.35, s3n: 8 },
  { name: "Westpfalz",     s1avg: 7.96, s1med: 8.30, s1n: 7, s2avg: 10.20, s2med: 10.10, s2n: 8, s3avg: 8.64, s3med: 9.00, s3n: 8 },
  { name: "Bostalsee",     s1avg: 7.35, s1med: 6.50, s1n: 8, s2avg: 7.53, s2med: 6.85, s2n: 8, s3avg: 5.84, s3med: 5.90, s3n: 8 },
];

const chartData = hcpiTeams.map(t => ({
  name: t.name === "Katharinenhof" ? "Katharinh." : t.name,
  "1.ST": +t.s1avg.toFixed(2),
  "2.ST": +t.s2avg.toFixed(2),
  "3.ST": +t.s3avg.toFixed(2),
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

const players = [
  { name: "Decker, Y.",    p1: 6,    s1: 76,   str1: false, p2: 6,    s2: 80,   str2: false, p3: 4,    s3: 84,   str3: false, pf: 6,    sf: 99   },
  { name: "Georg, H.",     p1: null, s1: null, str1: false, p2: 8,    s2: 87,   str2: false, p3: 7,    s3: 86,   str3: false, pf: 7,    sf: 81   },
  { name: "Ley, K.",       p1: 3,    s1: 84,   str1: false, p2: null, s2: null, str2: false, p3: 4,    s3: 78,   str3: false, pf: null, sf: null },
  { name: "Ludwig, T.",    p1: 9,    s1: 91,   str1: true,  p2: 10,   s2: 93,   str2: false, p3: null, s3: null, str3: false, pf: null, sf: null },
  { name: "Lyons, C.",     p1: null, s1: null, str1: false, p2: null, s2: null, str2: false, p3: 5,    s3: 89,   str3: false, pf: 8,    sf: 84   },
  { name: "Martin, L.",    p1: 7,    s1: 82,   str1: false, p2: 9,    s2: 83,   str2: false, p3: 8,    s3: 81,   str3: false, pf: 7,    sf: 89   },
  { name: "Reiter, M.",    p1: 15,   s1: 90,   str1: false, p2: 16,   s2: 95,   str2: true,  p3: null, s3: null, str3: false, pf: null, sf: null },
  { name: "Rink, N.",      p1: null, s1: null, str1: false, p2: null, s2: null, str2: false, p3: null, s3: null, str3: false, pf: 4,    sf: 78   },
  { name: "Schade, M.",    p1: null, s1: null, str1: false, p2: 11,   s2: 94,   str2: true,  p3: null, s3: null, str3: false, pf: 10,   sf: 92   },
  { name: "Schmitt, C.",   p1: 7,    s1: 87,   str1: false, p2: null, s2: null, str2: false, p3: 7,    s3: 95,   str3: true,  pf: null, sf: null },
  { name: "Schneider, C.", p1: null, s1: null, str1: false, p2: 7,    s2: 88,   str2: false, p3: 6,    s3: 94,   str3: true,  pf: null, sf: null },
  { name: "Scholler, F.",  p1: 11,   s1: 93,   str1: true,  p2: null, s2: null, str2: false, p3: null, s3: null, str3: false, pf: 12,   sf: 87   },
  { name: "Wilhelm, M.",   p1: 5,    s1: 88,   str1: false, p2: 5,    s2: 89,   str2: false, p3: 4,    s3: 85,   str3: false, pf: 5,    sf: 82   },
];

const PAR1 = 71, PAR2 = 72, PAR3 = 74, PAR_FS = 72;

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

export default function App() {
  const [page, setPage] = useState("hcpi");
  const [sub, setSub] = useState("ms");
  const [stTab, setStTab] = useState("st3");
  const [inclFS, setInclFS] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

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
  const allTeams = ["Barbarossa", "Katharinenhof", "Bostalsee", "Kurpfalz", "Westpfalz"];
  const standings = allTeams.map(name => ({
    name,
    p1: p1[name], p2: p2[name], p3: p3[name],
    total: p1[name] + p2[name] + p3[name],
  })).sort((a, b) => b.total - a.total);

  // Compute per-player averages
  const playersWithAvg = players.map(p => {
    const leagueScores = [[p.s1, p.p1, PAR1], [p.s2, p.p2, PAR2], [p.s3, p.p3, PAR3]]
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
          AK30 · Bostalsee · 2026
        </span>
        <NavTab label="HCPI-Übersicht" active={page === "hcpi"} onClick={() => setPage("hcpi")} />
        <NavTab label="Ergebnis-Analyse" active={page === "ergebnis"} onClick={() => setPage("ergebnis")} />
      </div>

      {page === "hcpi" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 10, marginBottom: 16 }}>
            {[
              ["Feld Ø 1. Spieltag", "8.18", C1],
              ["Feld Ø 2. Spieltag", "7.60", C2],
              ["Feld Ø 3. Spieltag", "7.84", C3],
              ["Stärkster Gegner", "Katharinenhof", C2],
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
                    {[["1. Spieltag (09.05.)", "1.ST", C1], ["2. Spieltag (23.05.)", "2.ST", C2], ["3. Spieltag (06.06.)", "3.ST", C3]].map(([l, s, c]) => (
                      <th key={l} colSpan={isMobile ? 1 : 3} style={{ ...css.th, textAlign: "center", color: c, borderBottom: `2px solid ${c}`, padding: "9px 6px 4px" }}>{isMobile ? s : l}</th>
                    ))}
                    <th rowSpan={2} style={{ ...css.th, borderBottom: "2px solid #1e2a3a", verticalAlign: "bottom", paddingBottom: 9 }}>ΔØ 1→3</th>
                  </tr>
                  <tr style={{ background: "#111827", borderBottom: "2px solid #1e2a3a" }}>
                    <th style={{ ...css.th, color: C1 }}>Ø HCPI</th>
                    {!isMobile && <th style={css.th}>Med</th>}
                    {!isMobile && <th style={css.th}>N</th>}
                    <th style={{ ...css.th, color: C2 }}>Ø HCPI</th>
                    {!isMobile && <th style={css.th}>Med</th>}
                    {!isMobile && <th style={css.th}>N</th>}
                    <th style={{ ...css.th, color: C3 }}>Ø HCPI</th>
                    {!isMobile && <th style={css.th}>Med</th>}
                    {!isMobile && <th style={css.th}>N</th>}
                  </tr>
                </thead>
                <tbody>
                  {hcpiTeams.map(t => {
                    const d = t.s3avg - t.s1avg;
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
                        <td style={{ ...css.td, fontWeight: 700, color: dc }}>{(d >= 0 ? "+" : "") + d.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div style={css.card}>
            <div style={css.sec}>Ø HCPI pro Spieltag — alle Mannschaften</div>
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
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
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
              </div>
              {stTab === "st1" && <TeamTable data={st1} title="Spieltag 1 – 09.05. · GC Katharinenhof · Par 71 · Slope 127 · Top-6" subnote="Soll = Σ(Par+PHCP) der 6 gewerteten Spieler. Δ positiv = über Erwartung." />}
              {stTab === "st2" && <TeamTable data={st2} title="Spieltag 2 – 23.05. · GC Kurpfalz · Par 72 · Slope 134 · Top-6" subnote="Katharinenhof: 2× No Return. Westpfalz: 1× NR." />}
              {stTab === "st3" && <TeamTable data={st3} title="Spieltag 3 – 06.06. · GC Barbarossa · Par 74 · Slope 135 · Top-6" subnote="Bostalsee gewinnt den Spieltag. Katharinenhof Rang 3 trotz gleicher Score wegen CR-Ausgleich (*)." />}
            </div>
          )}

          {sub === "gesamt" && (
            <div style={{ ...css.card, borderRadius: "0 8px 8px 8px" }}>
              <div style={css.sec}>Gesamttabelle nach 3 Spieltagen · Punkte: 1. Platz = 5 Pkt, bei Gleichstand geteilt</div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Pos.", "Mannschaft", "ST1 Score", "ST1 Pkt", "ST2 Score", "ST2 Pkt", "ST3 Score", "ST3 Pkt", "Gesamt"].map((h, i) =>
                        <th key={i} style={{ ...css.th, textAlign: i <= 1 ? "left" : "right", background: i === 8 ? "#161d2c" : "transparent" }}>{h}</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((t, idx) => {
                      const isBos = t.name === "Bostalsee";
                      const posColor = idx === 0 ? "#fbbf24" : idx === 1 ? "#94a3b8" : "#64748b";
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
                            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 4, background: idx === 0 ? "#78350f" : "#1e2a3a", color: posColor, fontWeight: 700, fontSize: 12 }}>{idx + 1}</span>
                          </td>
                          <td style={{ ...css.td, textAlign: "left", fontWeight: 700, fontSize: 14, color: isBos ? C1 : "#e2e8f0" }}>{t.name}{isBos ? " ★" : ""}</td>
                          <td style={css.td}>{fScore(st1, t.name)}</td>
                          <td style={css.td}>{fPts(t.p1)}</td>
                          <td style={css.td}>{fScore(st2, t.name)}</td>
                          <td style={css.td}>{fPts(t.p2)}</td>
                          <td style={css.td}>{fScore(st3, t.name)}</td>
                          <td style={css.td}>{fPts(t.p3)}</td>
                          <td style={{ ...css.td, background: "#161d2c", fontWeight: 700, fontSize: 15, color: idx === 0 ? C2 : "#e2e8f0" }}>
                            {t.total % 1 === 0 ? t.total.toFixed(0) : t.total.toFixed(1)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div style={css.note}>ST3: Barbarossa und Katharinenhof schlaggleich (508) → teilen Platz 2+3 → je 3,5 Punkte</div>
            </div>
          )}

          {sub === "ei" && (
            <div style={{ ...css.card, borderRadius: "0 8px 8px 8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #252d3d", flexWrap: "wrap", gap: 4 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#4a5568", padding: "12px 14px 10px" }}>
                  Bostalsee – Spieler Δ (Score minus Par+PHCP)
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
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: isMobile ? 360 : 1060 }}>
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
                      <th style={{ ...css.th, background: "#161d2c" }}>Ø Score</th>
                      <th style={{ ...css.th, background: "#161d2c" }}>Ø Δ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {playersWithAvg.map(p => {
                      const d1 = p.p1 != null ? p.s1 - (PAR1 + p.p1) : null;
                      const d2 = p.p2 != null ? p.s2 - (PAR2 + p.p2) : null;
                      const d3 = p.p3 != null ? p.s3 - (PAR3 + p.p3) : null;
                      const df = p.pf != null ? p.sf - (PAR_FS + p.pf) : null;
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

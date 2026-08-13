import { useState, useEffect, Fragment } from "react";
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
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "#64748b", marginBottom: 8 }}>AK30 · GC Bostalsee · 2026</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#e2e8f0" }}>Dashboard</div>
        </div>
        <form onSubmit={handleSubmit} style={{ background: "#1a1f2e", border: "1px solid #252d3d", borderRadius: 10, padding: 24 }}>
          <label style={{ display: "block", fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "#64748b", marginBottom: 8 }}>
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
  { name: "GC Katharinenhof", s1avg: 6.09, s1med: 6.50, s1n: 8, s2avg: 5.95, s2med: 5.75, s2n: 8, s3avg: 6.29, s3med: 7.00, s3n: 8, s4avg: 7.50, s4med: 6.80, s4n: 8, s5avg: 5.81, s5med: 6.35, s5n: 8 },
  { name: "GC Kurpfalz",      s1avg: 8.16, s1med: 8.85, s1n: 8, s2avg: 7.50, s2med: 8.45, s2n: 8, s3avg: 8.95, s3med: 8.55, s3n: 8, s4avg: 6.44, s4med: 7.25, s4n: 8, s5avg: 5.93, s5med: 6.30, s5n: 8 },
  { name: "GC Barbarossa",    s1avg: 9.54, s1med: 9.60, s1n: 7, s2avg: 6.83, s2med: 6.20, s2n: 8, s3avg: 9.47, s3med: 8.35, s3n: 8, s4avg: 8.86, s4med: 8.35, s4n: 8, s5avg: 6.38, s5med: 5.30, s5n: 8 },
  { name: "EGC Westpfalz",     s1avg: 7.96, s1med: 8.30, s1n: 7, s2avg: 10.20, s2med: 10.10, s2n: 8, s3avg: 8.64, s3med: 9.00, s3n: 8, s4avg: 9.66, s4med: 9.60, s4n: 8, s5avg: 10.89, s5med: 11.20, s5n: 8 },
  { name: "GC Bostalsee",     s1avg: 7.35, s1med: 6.50, s1n: 8, s2avg: 7.53, s2med: 6.85, s2n: 8, s3avg: 5.84, s3med: 5.90, s3n: 8, s4avg: 6.81, s4med: 6.35, s4n: 8, s5avg: 6.06, s5med: 6.00, s5n: 8 },
];

const chartData = hcpiTeams.map(t => ({
  name: t.name === "GC Katharinenhof" ? "Katharinh." : t.name,
  "1.ST": +t.s1avg.toFixed(2),
  "2.ST": +t.s2avg.toFixed(2),
  "3.ST": +t.s3avg.toFixed(2),
  "4.ST": +t.s4avg.toFixed(2),
  "5.ST": +t.s5avg.toFixed(2),
}));

const st1 = [
  { name: "GC Katharinenhof", rank: 1, ts: 469, soll: 462, streicher: "Kurt (82), Fischer (82)" },
  { name: "GC Barbarossa",    rank: 2, ts: 489, soll: 476, streicher: "Recktenwald (90), Schleppi (90)" },
  { name: "GC Kurpfalz",      rank: 3, ts: 491, soll: 469, streicher: "Rischbode (87), Mühl (87)" },
  { name: "GC Bostalsee",     rank: 4, ts: 507, soll: 469, streicher: "Ludwig (91), Scholler (93)" },
  { name: "EGC Westpfalz",     rank: 5, ts: 512, soll: 480, streicher: "Jakob (93), Flierl (102)" },
];
const st2 = [
  { name: "GC Barbarossa",    rank: 1, ts: 502, soll: 480, streicher: "Häusler (90), Wasem (99)" },
  { name: "GC Kurpfalz",      rank: 2, ts: 505, soll: 482, streicher: "Ruthig (90), Türk (90)" },
  { name: "GC Katharinenhof", rank: 3, ts: 519, soll: 472, streicher: "— (2× No Return)" },
  { name: "GC Bostalsee",     rank: 4, ts: 520, soll: 477, streicher: "Schade (94), Reiter (95)" },
  { name: "EGC Westpfalz",     rank: 5, ts: 555, soll: 493, streicher: "Mühe (108) · 1× NR" },
];
const st3 = [
  { name: "GC Bostalsee",     rank: 1, ts: 503, soll: 476, streicher: "Schneider (94), Schmitt (95)" },
  { name: "GC Barbarossa",    rank: 2, ts: 508, soll: 492, streicher: "Recktenwald (92), Blauth (99)" },
  { name: "GC Katharinenhof", rank: 3, ts: 508, soll: 480, streicher: "Fries (94), Becker (96)" },
  { name: "GC Kurpfalz",      rank: 4, ts: 525, soll: 497, streicher: "Okon (97), Mühl (99)" },
  { name: "EGC Westpfalz",     rank: 5, ts: 550, soll: 501, streicher: "Hammerschmidt (102), Hauck (109)" },
];
const st4 = [
  { name: "GC Kurpfalz",      rank: 1, ts: 475, soll: 463, streicher: "Borrmann (85), Weißkopf (89)" },
  { name: "GC Bostalsee",     rank: 2, ts: 483, soll: 475, streicher: "Georg (89), Ludwig (93)" },
  { name: "EGC Westpfalz",     rank: 3, ts: 485, soll: 484, streicher: "Mühe (92), Klingel (95)" },
  { name: "GC Barbarossa",    rank: 4, ts: 494, soll: 480, streicher: "Blauth (97), Metzmann (NRO)" },
  { name: "GC Katharinenhof", rank: 5, ts: 504, soll: 468, streicher: "Fries (98), Fischer (NRO)" },
];

const players = [
  { name: "Decker, Y.",    p1: 6,    s1: 76,   str1: false, p2: 6,    s2: 80,   str2: false, p3: 4,    s3: 84,   str3: false, p4: 5,    s4: 76,   str4: false, pf: 6,    sf: 99,   pr: 6,    sr: 75   },
  { name: "Georg, H.",     p1: null, s1: null, str1: false, p2: 8,    s2: 87,   str2: false, p3: 7,    s3: 86,   str3: false, p4: 7,    s4: 89,   str4: true,  pf: 7,    sf: 81,   pr: 7,    sr: 85   },
  { name: "Ley, K.",       p1: 3,    s1: 84,   str1: false, p2: null, s2: null, str2: false, p3: 4,    s3: 78,   str3: false, p4: 4,    s4: 77,   str4: false, pf: null, sf: null, pr: 4,    sr: 74   },
  { name: "Ludwig, T.",    p1: 9,    s1: 91,   str1: true,  p2: 10,   s2: 93,   str2: false, p3: null, s3: null, str3: false, p4: 10,   s4: 93,   str4: true,  pf: null, sf: null, pr: 10,   sr: 81   },
  { name: "Lyons, C.",     p1: null, s1: null, str1: false, p2: null, s2: null, str2: false, p3: 5,    s3: 89,   str3: false, p4: null, s4: null, str4: false, pf: 8,    sf: 84,   pr: null, sr: null },
  { name: "Martin, L.",    p1: 7,    s1: 82,   str1: false, p2: 9,    s2: 83,   str2: false, p3: 8,    s3: 81,   str3: false, p4: 8,    s4: 76,   str4: false, pf: 7,    sf: 89,   pr: 7,    sr: 77   },
  { name: "Reiter, M.",    p1: 15,   s1: 90,   str1: false, p2: 16,   s2: 95,   str2: true,  p3: null, s3: null, str3: false, p4: 15,   s4: 88,   str4: false, pf: null, sf: null, pr: 15,   sr: 92   },
  { name: "Rink, N.",      p1: null, s1: null, str1: false, p2: null, s2: null, str2: false, p3: null, s3: null, str3: false, p4: null, s4: null, str4: false, pf: 4,    sf: 78,   pr: null, sr: null },
  { name: "Schade, M.",    p1: null, s1: null, str1: false, p2: 11,   s2: 94,   str2: true,  p3: null, s3: null, str3: false, p4: 10,   s4: null, str4: false, pf: 10,   sf: 92,   pr: 10,   sr: 87   },
  { name: "Schmitt, C.",   p1: 7,    s1: 87,   str1: false, p2: null, s2: null, str2: false, p3: 7,    s3: 95,   str3: true,  p4: null, s4: null, str4: false, pf: null, sf: null, pr: 8,    sr: 82   },
  { name: "Schneider, C.", p1: null, s1: null, str1: false, p2: 7,    s2: 88,   str2: false, p3: 6,    s3: 94,   str3: true,  p4: 6,    s4: 82,   str4: false, pf: null, sf: null, pr: null, sr: null },
  { name: "Scholler, F.",  p1: 11,   s1: 93,   str1: true,  p2: null, s2: null, str2: false, p3: null, s3: null, str3: false, p4: null, s4: null, str4: false, pf: 12,   sf: 87,   pr: 6,    sr: null },
  { name: "Wilhelm, M.",   p1: 5,    s1: 88,   str1: false, p2: 5,    s2: 89,   str2: false, p3: 4,    s3: 85,   str3: false, p4: 5,    s4: 84,   str4: false, pf: 5,    sf: 82,   pr: 6,    sr: 85   },
];

const allPlayers = [
  // GC Barbarossa
  { name: "Blauth, Christian",        team: "GC Barbarossa",   p1: null, s1: null, str1: false, p2: null, s2: null, str2: false, p3: 17,   s3: 99,   str3: true,  p4: 17,   s4: 97,   str4: true  },
  { name: "Häusler, Gerold",          team: "GC Barbarossa",   p1: 5,    s1: 78,   str1: false, p2: 6,    s2: 90,   str2: true,  p3: 6,    s3: 87,   str3: false, p4: 6,    s4: 87,   str4: false },
  { name: "Karol, Kamil",             team: "GC Barbarossa",   p1: null, s1: null, str1: false, p2: null, s2: null, str2: false, p3: null, s3: null, str3: false, p4: null, s4: null, str4: false },
  { name: "Kröhnert, Jonas",          team: "GC Barbarossa",   p1: 15,   s1: 85,   str1: false, p2: 16,   s2: 82,   str2: false, p3: 13,   s3: 87,   str3: false, p4: 13,   s4: 83,   str4: false },
  { name: "Metzmann, Florian",        team: "GC Barbarossa",   p1: null, s1: null, str1: false, p2: 11,   s2: 88,   str2: false, p3: 11,   s3: 84,   str3: false, p4: 10,   s4: null, str4: true  },
  { name: "Mühlberger, Felix",        team: "GC Barbarossa",   p1: null, s1: null, str1: false, p2: null, s2: null, str2: false, p3: null, s3: null, str3: false, p4: 8,    s4: 82,   str4: false },
  { name: "Newsome, Robert",          team: "GC Barbarossa",   p1: null, s1: null, str1: false, p2: 0,    s2: 81,   str2: false, p3: null, s3: null, str3: false, p4: 0,    s4: 79,   str4: false },
  { name: "Noll, Matthias",           team: "GC Barbarossa",   p1: null, s1: null, str1: false, p2: 8,    s2: 86,   str2: false, p3: 7,    s3: 86,   str3: false, p4: null, s4: null, str4: false },
  { name: "Pinillos Cediel, Raúl",    team: "GC Barbarossa",   p1: 11,   s1: 86,   str1: false, p2: null, s2: null, str2: false, p3: null, s3: null, str3: false, p4: null, s4: null, str4: false },
  { name: "Recktenwald, Tobias",      team: "GC Barbarossa",   p1: 17,   s1: 90,   str1: true,  p2: null, s2: null, str2: false, p3: 17,   s3: 92,   str3: true,  p4: 16,   s4: 87,   str4: false },
  { name: "Schertz, Patric",          team: "GC Barbarossa",   p1: 4,    s1: 79,   str1: false, p2: 6,    s2: 82,   str2: false, p3: 5,    s3: 81,   str3: false, p4: 5,    s4: 76,   str4: false },
  { name: "Schleppi, Christoph",      team: "GC Barbarossa",   p1: 16,   s1: 90,   str1: true,  p2: null, s2: null, str2: false, p3: null, s3: null, str3: false, p4: null, s4: null, str4: false },
  { name: "Velten, Nick",             team: "GC Barbarossa",   p1: 5,    s1: 78,   str1: false, p2: 7,    s2: 83,   str2: false, p3: 6,    s3: 83,   str3: false, p4: null, s4: null, str4: false },
  { name: "Wasem, Jochen",            team: "GC Barbarossa",   p1: 10,   s1: 83,   str1: false, p2: 11,   s2: 99,   str2: true,  p3: null, s3: null, str3: false, p4: null, s4: null, str4: false },

  // GC Katharinenhof
  { name: "Becker, Michael",          team: "GC Katharinenhof", p1: null, s1: null, str1: false, p2: 9,    s2: 94,   str2: false, p3: 8,    s3: 96,   str3: true,  p4: 8,    s4: 86,   str4: false },
  { name: "Fischer, Maximilian",      team: "GC Katharinenhof", p1: 7,    s1: 82,   str1: true,  p2: 9,    s2: null, str2: true,  p3: null, s3: null, str3: false, p4: 7,    s4: null, str4: true  },
  { name: "Fries, Tobias",            team: "GC Katharinenhof", p1: null, s1: null, str1: false, p2: null, s2: null, str2: false, p3: 20,   s3: 94,   str3: true,  p4: 19,   s4: 98,   str4: true  },
  { name: "Holzer, Sebastian",        team: "GC Katharinenhof", p1: 3,    s1: 79,   str1: false, p2: 4,    s2: 80,   str2: false, p3: 2,    s3: 83,   str3: false, p4: null, s4: null, str4: false },
  { name: "Kirchner, Eric",           team: "GC Katharinenhof", p1: 6,    s1: 75,   str1: false, p2: 6,    s2: 85,   str2: false, p3: null, s3: null, str3: false, p4: 7,    s4: 86,   str4: false },
  { name: "Klampfer, Erwin",          team: "GC Katharinenhof", p1: 6,    s1: 77,   str1: false, p2: 7,    s2: 90,   str2: false, p3: null, s3: null, str3: false, p4: 6,    s4: 83,   str4: false },
  { name: "Kurt, Medeni",             team: "GC Katharinenhof", p1: 10,   s1: 82,   str1: true,  p2: null, s2: null, str2: false, p3: 9,    s3: 89,   str3: false, p4: null, s4: null, str4: false },
  { name: "Lehr, Christian",          team: "GC Katharinenhof", p1: null, s1: null, str1: false, p2: 7,    s2: 88,   str2: false, p3: 5,    s3: 93,   str3: false, p4: null, s4: null, str4: false },
  { name: "Marullo, Giuseppe",        team: "GC Katharinenhof", p1: 5,    s1: 78,   str1: false, p2: 7,    s2: 82,   str2: false, p3: 5,    s3: 77,   str3: false, p4: 4,    s4: 84,   str4: false },
  { name: "Müller, Mike",             team: "GC Katharinenhof", p1: null, s1: null, str1: false, p2: null, s2: null, str2: false, p3: 7,    s3: 83,   str3: false, p4: null, s4: null, str4: false },
  { name: "Schley, Michael",          team: "GC Katharinenhof", p1: 8,    s1: 79,   str1: false, p2: 10,   s2: 103,  str2: true,  p3: 8,    s3: 83,   str3: false, p4: 8,    s4: 81,   str4: false },
  { name: "Weiß, Andreas",            team: "GC Katharinenhof", p1: 8,    s1: 81,   str1: false, p2: null, s2: null, str2: false, p3: null, s3: null, str3: false, p4: null, s4: null, str4: false },
  { name: "Werny, Erik",              team: "GC Katharinenhof", p1: null, s1: null, str1: false, p2: null, s2: null, str2: false, p3: null, s3: null, str3: false, p4: 3,    s4: 84,   str4: false },

  // GC Bostalsee
  { name: "Decker, Yannick",          team: "GC Bostalsee",    p1: 6,    s1: 76,   str1: false, p2: 6,    s2: 80,   str2: false, p3: 4,    s3: 84,   str3: false, p4: 5,    s4: 76,   str4: false },
  { name: "Georg, Heiko",             team: "GC Bostalsee",    p1: null, s1: null, str1: false, p2: 8,    s2: 87,   str2: false, p3: 7,    s3: 86,   str3: false, p4: 7,    s4: 89,   str4: true  },
  { name: "Ley, Karsten",             team: "GC Bostalsee",    p1: 3,    s1: 84,   str1: false, p2: null, s2: null, str2: false, p3: 4,    s3: 78,   str3: false, p4: 4,    s4: 77,   str4: false },
  { name: "Ludwig, Tobias",           team: "GC Bostalsee",    p1: 9,    s1: 91,   str1: true,  p2: 10,   s2: 93,   str2: false, p3: null, s3: null, str3: false, p4: 10,   s4: 93,   str4: true  },
  { name: "Lyons, Clayton",           team: "GC Bostalsee",    p1: null, s1: null, str1: false, p2: null, s2: null, str2: false, p3: 5,    s3: 89,   str3: false, p4: null, s4: null, str4: false },
  { name: "Martin, Lars",             team: "GC Bostalsee",    p1: 7,    s1: 82,   str1: false, p2: 9,    s2: 83,   str2: false, p3: 8,    s3: 81,   str3: false, p4: 8,    s4: 76,   str4: false },
  { name: "Reiter, Marco",            team: "GC Bostalsee",    p1: 15,   s1: 90,   str1: false, p2: 16,   s2: 95,   str2: true,  p3: null, s3: null, str3: false, p4: 15,   s4: 88,   str4: false },
  { name: "Schade, Marc André",       team: "GC Bostalsee",    p1: null, s1: null, str1: false, p2: 11,   s2: 94,   str2: true,  p3: null, s3: null, str3: false, p4: 10,   s4: null, str4: false },
  { name: "Schmitt, Christoph",       team: "GC Bostalsee",    p1: 7,    s1: 87,   str1: false, p2: null, s2: null, str2: false, p3: 7,    s3: 95,   str3: true,  p4: null, s4: null, str4: false },
  { name: "Schneider, Christian",     team: "GC Bostalsee",    p1: null, s1: null, str1: false, p2: 7,    s2: 88,   str2: false, p3: 6,    s3: 94,   str3: true,  p4: 6,    s4: 82,   str4: false },
  { name: "Scholler, Fabian",         team: "GC Bostalsee",    p1: 11,   s1: 93,   str1: true,  p2: null, s2: null, str2: false, p3: null, s3: null, str3: false, p4: null, s4: null, str4: false },
  { name: "Wilhelm, Michael",         team: "GC Bostalsee",    p1: 5,    s1: 88,   str1: false, p2: 5,    s2: 89,   str2: false, p3: 4,    s3: 85,   str3: false, p4: 5,    s4: 84,   str4: false },

  // GC Kurpfalz
  { name: "Baronello, Roberto",       team: "GC Kurpfalz",     p1: null, s1: null, str1: false, p2: null, s2: null, str2: false, p3: null, s3: null, str3: false, p4: -1,   s4: 75,   str4: false },
  { name: "Bieker, Niels",            team: "GC Kurpfalz",     p1: null, s1: null, str1: false, p2: null, s2: null, str2: false, p3: null, s3: null, str3: false, p4: 6,    s4: 81,   str4: false },
  { name: "Borrmann, Mirko",          team: "GC Kurpfalz",     p1: 10,   s1: 82,   str1: false, p2: 11,   s2: 88,   str2: false, p3: 10,   s3: 88,   str3: false, p4: 9,    s4: 87,   str4: true  },
  { name: "Kraus, Sascha",            team: "GC Kurpfalz",     p1: null, s1: null, str1: false, p2: 9,    s2: 87,   str2: false, p3: 8,    s3: 88,   str3: false, p4: null, s4: null, str4: false },
  { name: "Kretz, Sascha",            team: "GC Kurpfalz",     p1: 1,    s1: 80,   str1: false, p2: 2,    s2: 73,   str2: false, p3: null, s3: null, str3: false, p4: 1,    s4: 77,   str4: false },
  { name: "Leopold, Jens",            team: "GC Kurpfalz",     p1: 6,    s1: 84,   str1: false, p2: 7,    s2: 84,   str2: false, p3: 6,    s3: 82,   str3: false, p4: 6,    s4: 80,   str4: false },
  { name: "Mühl, Andreas",            team: "GC Kurpfalz",     p1: 15,   s1: 87,   str1: true,  p2: null, s2: null, str2: false, p3: 15,   s3: 99,   str3: true,  p4: null, s4: null, str4: false },
  { name: "Okon, Philip",             team: "GC Kurpfalz",     p1: 4,    s1: 81,   str1: false, p2: null, s2: null, str2: false, p3: 3,    s3: 97,   str3: true,  p4: null, s4: null, str4: false },
  { name: "Rischbode, Tjark-Lajos",   team: "GC Kurpfalz",     p1: 11,   s1: 87,   str1: true,  p2: 11,   s2: 88,   str2: false, p3: null, s3: null, str3: false, p4: 9,    s4: 77,   str4: false },
  { name: "Ruthig, Simon",            team: "GC Kurpfalz",     p1: null, s1: null, str1: false, p2: 11,   s2: 90,   str2: true,  p3: 11,   s3: 93,   str3: false, p4: null, s4: null, str4: false },
  { name: "Türk, Sabri",              team: "GC Kurpfalz",     p1: null, s1: null, str1: false, p2: 11,   s2: 90,   str2: true,  p3: 10,   s3: 85,   str3: false, p4: 10,   s4: 85,   str4: false },
  { name: "Weißkopf, Luis",           team: "GC Kurpfalz",     p1: 13,   s1: 83,   str1: false, p2: null, s2: null, str2: false, p3: null, s3: null, str3: false, p4: 13,   s4: 89,   str4: true  },
  { name: "Welker, Thomas",           team: "GC Kurpfalz",     p1: 9,    s1: 81,   str1: false, p2: 10,   s2: 85,   str2: false, p3: 8,    s3: 89,   str3: false, p4: null, s4: null, str4: false },

  // EGC Westpfalz
  { name: "Flierl, Jan-Benjamin",     team: "EGC Westpfalz",   p1: 12,   s1: 102,  str1: true,  p2: 14,   s2: null, str2: true,  p3: 13,   s3: 99,   str3: false, p4: 13,   s4: 88,   str4: false },
  { name: "Fusenig, Christian",       team: "EGC Westpfalz",   p1: null, s1: null, str1: false, p2: 10,   s2: 92,   str2: false, p3: 10,   s3: 87,   str3: false, p4: 10,   s4: 84,   str4: false },
  { name: "Hammerschmidt, Thorsten",  team: "EGC Westpfalz",   p1: 12,   s1: 85,   str1: false, p2: 13,   s2: 97,   str2: false, p3: 13,   s3: 102,  str3: true,  p4: 12,   s4: 84,   str4: false },
  { name: "Hauck, Timo",              team: "EGC Westpfalz",   p1: null, s1: null, str1: false, p2: 14,   s2: 92,   str2: false, p3: 13,   s3: 109,  str3: true,  p4: null, s4: null, str4: false },
  { name: "Henniger, Harald",         team: "EGC Westpfalz",   p1: 16,   s1: 92,   str1: false, p2: null, s2: null, str2: false, p3: null, s3: null, str3: false, p4: null, s4: null, str4: false },
  { name: "Jakob, Lars",              team: "EGC Westpfalz",   p1: 9,    s1: 93,   str1: true,  p2: null, s2: null, str2: false, p3: null, s3: null, str3: false, p4: null, s4: null, str4: false },
  { name: "Klingel, Steffen",         team: "EGC Westpfalz",   p1: 10,   s1: 92,   str1: false, p2: 11,   s2: 96,   str2: false, p3: 10,   s3: 101,  str3: false, p4: 11,   s4: 95,   str4: true  },
  { name: "Mühe, Bennet",             team: "EGC Westpfalz",   p1: null, s1: null, str1: false, p2: 24,   s2: 108,  str2: true,  p3: null, s3: null, str3: false, p4: 22,   s4: 92,   str4: true  },
  { name: "Orth, Christian",          team: "EGC Westpfalz",   p1: null, s1: null, str1: false, p2: null, s2: null, str2: false, p3: 13,   s3: 95,   str3: false, p4: null, s4: null, str4: false },
  { name: "Riedinger, Jan",           team: "EGC Westpfalz",   p1: 5,    s1: 78,   str1: false, p2: 6,    s2: 96,   str2: false, p3: null, s3: null, str3: false, p4: 5,    s4: 75,   str4: false },
  { name: "Roschy, Sascha",           team: "EGC Westpfalz",   p1: null, s1: null, str1: false, p2: null, s2: null, str2: false, p3: null, s3: null, str3: false, p4: null, s4: null, str4: false },
  { name: "Wadle, Volker",            team: "EGC Westpfalz",   p1: 6,    s1: 77,   str1: false, p2: null, s2: null, str2: false, p3: 5,    s3: 83,   str3: false, p4: 6,    s4: 73,   str4: false },
  { name: "Wiese, Felix",             team: "EGC Westpfalz",   p1: 5,    s1: 88,   str1: false, p2: 7,    s2: 82,   str2: false, p3: 6,    s3: 85,   str3: false, p4: 6,    s4: 81,   str4: false },
];

const PAR1 = 71, PAR2 = 72, PAR3 = 74, PAR4 = 72, PAR5 = 71;
const PAR_FS_H = 72, PAR_FS_R = 71;

const ALLE_COLUMNS = {
  name:      { label: "Spieler",  type: "string", get: r => r.name },
  team:      { label: "Team",     type: "string", get: r => r.team },
  p1:        { label: "ST1 PHCP", type: "number", get: r => r.p1 },
  soll1:     { label: "ST1 Soll", type: "number", get: r => r.soll1 },
  s1:        { label: "ST1 Sc",   type: "number", get: r => r.s1 },
  d1:        { label: "ST1 Δ",    type: "number", get: r => r.d1 },
  p2:        { label: "ST2 PHCP", type: "number", get: r => r.p2 },
  soll2:     { label: "ST2 Soll", type: "number", get: r => r.soll2 },
  s2:        { label: "ST2 Sc",   type: "number", get: r => r.s2 },
  d2:        { label: "ST2 Δ",    type: "number", get: r => r.d2 },
  p3:        { label: "ST3 PHCP", type: "number", get: r => r.p3 },
  soll3:     { label: "ST3 Soll", type: "number", get: r => r.soll3 },
  s3:        { label: "ST3 Sc",   type: "number", get: r => r.s3 },
  d3:        { label: "ST3 Δ",    type: "number", get: r => r.d3 },
  p4:        { label: "ST4 PHCP", type: "number", get: r => r.p4 },
  soll4:     { label: "ST4 Soll", type: "number", get: r => r.soll4 },
  s4:        { label: "ST4 Sc",   type: "number", get: r => r.s4 },
  d4:        { label: "ST4 Δ",    type: "number", get: r => r.d4 },
  s5:        { label: "ST5 Sc",   type: "number", get: r => r.s5 },
  d5:        { label: "ST5 Δ",    type: "number", get: r => r.d5 },
  avgScore:  { label: "Ø Score",  type: "number", get: r => r.avgScore },
  avgDelta:  { label: "Ø Δ",      type: "number", get: r => r.avgDelta },
};

const compareAlleValues = (a, b, type) => {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  return type === "string" ? a.localeCompare(b, "de") : a - b;
};
const DAY5_STORAGE_KEY = "ak30_day5_results";
const DAY5_SIM_RUN_KEY = "ak30_day5_sim_run";

const day5StartList = [
  { name: "Metzmann, Florian", team: "GC Barbarossa" },
  { name: "Schertz, Patric", team: "GC Barbarossa" },
  { name: "Newsome, Robert", team: "GC Barbarossa" },
  { name: "Kröhnert, Jonas", team: "GC Barbarossa" },
  { name: "Häusler, Gerold", team: "GC Barbarossa" },
  { name: "Velten, Nick", team: "GC Barbarossa" },
  { name: "Karol, Kamil", team: "GC Barbarossa" },
  { name: "Mühlberger, Felix", team: "GC Barbarossa" },

  { name: "Werny, Erik", team: "GC Katharinenhof" },
  { name: "Schley, Michael", team: "GC Katharinenhof" },
  { name: "Weiß, Andreas", team: "GC Katharinenhof" },
  { name: "Holzer, Sebastian", team: "GC Katharinenhof" },
  { name: "Kirchner, Eric", team: "GC Katharinenhof" },
  { name: "Kurt, Medeni", team: "GC Katharinenhof" },
  { name: "Müller, Mike", team: "GC Katharinenhof" },
  { name: "Marullo, Giuseppe", team: "GC Katharinenhof" },

  { name: "Martin, Lars", team: "GC Bostalsee" },
  { name: "Georg, Heiko", team: "GC Bostalsee" },
  { name: "Ley, Karsten", team: "GC Bostalsee" },
  { name: "Schneider, Christian", team: "GC Bostalsee" },
  { name: "Wilhelm, Michael", team: "GC Bostalsee" },
  { name: "Scholler, Fabian", team: "GC Bostalsee" },
  { name: "Schmitt, Christoph", team: "GC Bostalsee" },
  { name: "Decker, Yannick", team: "GC Bostalsee" },

  { name: "Leopold, Jens", team: "GC Kurpfalz" },
  { name: "Baronello, Roberto", team: "GC Kurpfalz" },
  { name: "Kretz, Sascha", team: "GC Kurpfalz" },
  { name: "Borrmann, Mirko", team: "GC Kurpfalz" },
  { name: "Türk, Sabri", team: "GC Kurpfalz" },
  { name: "Okon, Philip", team: "GC Kurpfalz" },
  { name: "Bieker, Niels", team: "GC Kurpfalz" },
  { name: "Weißkopf, Luis", team: "GC Kurpfalz" },

  { name: "Wadle, Volker", team: "EGC Westpfalz" },
  { name: "Mühe, Bennet", team: "EGC Westpfalz" },
  { name: "Fusenig, Christian", team: "EGC Westpfalz" },
  { name: "Hammerschmidt, Thorsten", team: "EGC Westpfalz" },
  { name: "Wiese, Felix", team: "EGC Westpfalz" },
  { name: "Flierl, Jan-Benjamin", team: "EGC Westpfalz" },
  { name: "Roschy, Sascha", team: "EGC Westpfalz" },
  { name: "Henniger, Harald", team: "EGC Westpfalz" },
];

const day5NameSet = new Set(day5StartList.map(p => p.name));

const css = {
  body:  { background: "#0f1117", minHeight: "100vh", padding: 20, fontFamily: "system-ui,sans-serif", color: "#e2e8f0", fontSize: 13 },
  card:  { background: "#1a1f2e", border: "1px solid #252d3d", borderRadius: 8, overflow: "hidden", marginBottom: 16 },
  sec:   { fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#64748b", padding: "12px 14px 10px", borderBottom: "1px solid #252d3d" },
  th:    { fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "#64748b", padding: "7px 10px", textAlign: "right", borderBottom: "2px solid #1e2a3a" },
  td:    { padding: "10px", textAlign: "right", color: "#94a3b8", borderBottom: "1px solid #1e2a3a", fontSize: 13 },
  note:  { fontSize: 11, color: "#64748b", padding: "9px 14px", borderTop: "1px solid #1e2a3a", fontStyle: "italic" },
};

function NavTab({ label, active, onClick }) {
  return (
    <div onClick={onClick} style={{ padding: "9px 16px", fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", color: active ? "#e2e8f0" : "#64748b", borderBottom: active ? `2px solid ${C1}` : "2px solid transparent", marginBottom: -1 }}>
      {label}
    </div>
  );
}

function SubTab({ label, active, onClick }) {
  return (
    <div onClick={onClick} style={{ padding: "7px 14px", borderRadius: "5px 5px 0 0", fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", border: "1px solid #252d3d", borderBottom: "none", background: active ? "#1a1f2e" : "#111827", color: active ? "#e2e8f0" : "#64748b" }}>
      {label}
    </div>
  );
}

function StTab({ label, active, onClick }) {
  return (
    <div onClick={onClick} style={{ padding: "5px 14px", borderRadius: 5, fontSize: 11, fontWeight: 600, cursor: "pointer", background: active ? "#252d3d" : "transparent", color: active ? "#e2e8f0" : "#64748b", border: "1px solid " + (active ? "#374151" : "#1e2a3a") }}>
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
  const absDelta = Math.abs(delta);
  const pct = Math.min(100, absDelta / 55 * 100);
  const c = delta <= 0 ? C2 : delta <= 5 ? AMB : RED;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end" }}>
      <span style={{ color: c, fontWeight: 700, fontSize: 13, minWidth: 32, textAlign: "right" }}>{delta >= 0 ? "+" : ""}{delta}</span>
      <div style={{ width: 60, height: 7, background: "#1e2a3a", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: c, transform: delta < 0 ? "scaleX(-1)" : "scaleX(1)", transformOrigin: "left center" }} />
      </div>
    </div>
  );
}

function dColor(d) {
  return d <= 0 ? C2 : d <= 5 ? AMB : RED;
}

function TeamTable({ data, title, subnote, par }) {
  return (
    <div style={css.card}>
      <div style={css.sec}>{title}</div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
          <thead>
            <tr>
              {["Mannschaft", "Rang", "Team-Score", "Soll (6×)", "Schläge über/unter Par", "Ø/Spieler", "Streicher"].map((h, i) =>
                <th key={i} style={{ ...css.th, textAlign: i === 0 || i === 6 ? "left" : "right" }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map(t => {
              const overPar = par != null ? t.ts - par * 6 : null;
              const iB = t.name === "GC Bostalsee";
              const pC = overPar == null ? "#64748b" : overPar <= 0 ? C2 : overPar <= 5 ? AMB : RED;
              return (
                <tr key={t.name} style={{ background: iB ? "#12192a" : "transparent", borderBottom: "1px solid #1e2a3a" }}>
                  <td style={{ ...css.td, textAlign: "left", fontWeight: 700, fontSize: 14, color: iB ? C1 : "#e2e8f0" }}>{t.name}{iB ? " ★" : ""}</td>
                  <td style={css.td}><Rank r={t.rank} /></td>
                  <td style={{ ...css.td, color: C1, fontWeight: 600 }}>{t.ts}</td>
                  <td style={{ ...css.td, color: "#374151" }}>{par != null ? par * 6 : t.soll}</td>
                  <td style={css.td}>{overPar == null ? "—" : <DBar delta={overPar} />}</td>
                  <td style={{ ...css.td, color: pC, fontWeight: 600 }}>{overPar == null ? "—" : `${overPar >= 0 ? "+" : ""}${(overPar / 6).toFixed(1)}`}</td>
                  <td style={{ ...css.td, textAlign: "left", fontSize: 11, color: "#64748b" }}>{t.streicher}</td>
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

function Day5LiveScore({ allTeams, pointsAfter4, overParAfter4, results, updateResult, resetResults, simulateResults, isMobile, tvFitMode }) {
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [scoreInput, setScoreInput] = useState("");
  const [isNR, setIsNR] = useState(false);
  const [isInputOpen, setIsInputOpen] = useState(true);

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

  // Live-Punkte für ST5 (5-4-3-2-1) mit Punktteilung bei Gleichstand.
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
    if (window.confirm("Alle Live-Scores wirklich komplett löschen?")) resetResults();
  };

  const enteredPlayers = day5StartList.filter((p) => hasEntry(p.name));
  const openPlayers = day5StartList.filter((p) => !hasEntry(p.name));

  const compact = !isMobile;
  const isTvFit = !isMobile && tvFitMode !== "off";
  const thStyle = {
    ...css.th,
    padding: isTvFit ? "6px 8px" : css.th.padding,
    fontSize: isTvFit ? 9 : css.th.fontSize,
  };

  return (
    <div>
      <div style={{ marginBottom: isTvFit ? 8 : compact ? 12 : 16 }}>
        <div style={css.card}>
          <div style={{ ...css.sec, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <span>Live Eingabe</span>
            <button
              onClick={() => setIsInputOpen((prev) => !prev)}
              style={{
                padding: "5px 10px",
                background: "#252d3d",
                border: "1px solid #3b475b",
                borderRadius: 6,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "#cbd5e1",
                cursor: "pointer",
              }}
            >
              {isInputOpen ? "Einklappen" : "Ausklappen"}
            </button>
          </div>

          {!isInputOpen && (
            <div style={{ padding: isTvFit ? "8px 10px" : "10px 12px", fontSize: 11, color: "#94a3b8", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span>Erfasst: {enteredPlayers.length}/40</span>
              <span>Offen: {openPlayers.length}</span>
            </div>
          )}

          {isInputOpen && (
          <div style={{ padding: isTvFit ? "8px 10px" : compact ? "10px 12px" : "14px" }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "#64748b", marginBottom: 6 }}>Spieler wählen</label>
            <select
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
              style={{ width: "100%", boxSizing: "border-box", background: "#111827", border: "1px solid #252d3d", borderRadius: 6, padding: isTvFit ? "6px 8px" : compact ? "7px 9px" : "8px 10px", fontSize: isTvFit ? 12 : 13, color: "#e2e8f0", marginBottom: isTvFit ? 10 : 12, outline: "none" }}
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
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "#64748b", marginBottom: 6 }}>Score oder NR</label>
                <div style={{ display: "flex", gap: 8, marginBottom: isTvFit ? 10 : 12 }}>
                  <input
                    type="number"
                    value={scoreInput}
                    onChange={(e) => { setScoreInput(e.target.value); setIsNR(false); }}
                    placeholder="z.B. 76"
                    disabled={isNR}
                    style={{ flex: 1, background: "#111827", border: "1px solid #252d3d", borderRadius: 6, padding: isTvFit ? "6px 8px" : compact ? "7px 9px" : "8px 10px", fontSize: isTvFit ? 12 : 13, color: isNR ? "#374151" : "#e2e8f0", outline: "none", opacity: isNR ? 0.5 : 1 }}
                  />
                  <button
                    onClick={() => { setIsNR(!isNR); setScoreInput(""); }}
                    style={{ padding: isTvFit ? "7px 10px" : "8px 12px", background: isNR ? RED : "#252d3d", border: "1px solid " + (isNR ? RED : "#374151"), borderRadius: 6, fontSize: isTvFit ? 10 : 11, fontWeight: 600, color: isNR ? "#fff" : "#94a3b8", cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    {isNR ? "NR" : "NR?"}
                  </button>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={saveSelected}
                    style={{ flex: 1, padding: isTvFit ? "8px" : "10px", background: C1, border: "none", borderRadius: 6, fontSize: isTvFit ? 11 : 12, fontWeight: 700, color: "#0f1117", cursor: "pointer", textTransform: "uppercase", letterSpacing: 1 }}
                  >
                    {hasEntry(selectedPlayer) ? "Aktualisieren" : "Speichern"}
                  </button>
                  <button
                    onClick={deleteSelected}
                    disabled={!hasEntry(selectedPlayer)}
                    style={{ padding: isTvFit ? "8px 10px" : "10px 12px", background: "#252d3d", border: "1px solid #374151", borderRadius: 6, fontSize: isTvFit ? 10 : 11, fontWeight: 700, color: hasEntry(selectedPlayer) ? "#cbd5e1" : "#64748b", cursor: hasEntry(selectedPlayer) ? "pointer" : "not-allowed", textTransform: "uppercase" }}
                  >
                    Löschen
                  </button>
                </div>
              </>
            )}

            <div style={{ fontSize: isTvFit ? 10 : 11, color: "#64748b", marginTop: isTvFit ? 10 : 14, paddingTop: isTvFit ? 10 : 14, borderTop: "1px solid #252d3d", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <div>
                <div>Erfasst: {enteredPlayers.length}/40</div>
                <div>Offen: {openPlayers.length}</div>
              </div>
              <button
                onClick={confirmReset}
                style={{ padding: isTvFit ? "7px 9px" : "8px 10px", background: "#3a1616", border: "1px solid #7f1d1d", borderRadius: 6, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#fecaca", cursor: "pointer" }}
              >
                Live Reset
              </button>
              <button
                onClick={simulateResults}
                style={{ padding: isTvFit ? "7px 9px" : "8px 10px", background: "#1d2738", border: "1px solid #334155", borderRadius: 6, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#bfdbfe", cursor: "pointer" }}
              >
                Simulate
              </button>
            </div>
          </div>
          )}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "minmax(300px, 0.85fr) minmax(0, 2.15fr)", gap: isTvFit ? 10 : compact ? 12 : 16, marginBottom: isTvFit ? 10 : compact ? 12 : 16 }}>
        <div style={css.card}>
          <div style={css.sec}>Live Tagesscore</div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 0 }}>
              <thead>
                <tr>
                  <th style={{ ...thStyle, textAlign: "left" }}>Mannschaft</th>
                  <th style={thStyle}>Top 6 (live)</th>
                  <th style={thStyle}>Schläge über Par</th>
                  <th style={thStyle}>Ergebnisse</th>
                  <th style={thStyle}>Wertung</th>
                </tr>
              </thead>
              <tbody>
                {rankedDay.map((t, idx) => (
                  <tr key={t.team} style={{ borderBottom: "1px solid #1e2a3a" }}>
                    <td style={{ ...css.td, textAlign: "left", fontWeight: 700, fontSize: isTvFit ? 11 : compact ? 12 : 13, color: "#e2e8f0", padding: isTvFit ? "6px 8px" : compact ? "8px" : "10px" }}>{idx + 1}. {t.team}</td>
                    <td style={{ ...css.td, color: t.top6 == null ? "#64748b" : C1, fontWeight: 700, padding: isTvFit ? "6px 8px" : compact ? "8px" : "10px" }}>{t.top6 == null ? "-" : t.top6}</td>
                    <td style={{ ...css.td, color: t.day5OverPar == null ? "#64748b" : dColor(t.day5OverPar), fontWeight: 700, padding: isTvFit ? "6px 8px" : compact ? "8px" : "10px" }}>{formatSigned(t.day5OverPar)}</td>
                    <td style={{ ...css.td, padding: isTvFit ? "6px 8px" : compact ? "8px" : "10px" }}>{t.enteredCount}/8</td>
                    <td style={{ ...css.td, color: t.inWertung ? C2 : AMB, fontWeight: 700, padding: isTvFit ? "6px 8px" : compact ? "8px" : "10px" }}>{t.inWertung ? "ja" : `${t.counted}/6`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={css.card}>
          <div style={css.sec}>Live Gesamttabelle</div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 680 }}>
              <thead>
                <tr>
                  <th style={{ ...thStyle, textAlign: "left" }}>Pos.</th>
                  <th style={{ ...thStyle, textAlign: "left" }}>Mannschaft</th>
                  <th style={thStyle}>Punkte nach ST1-4</th>
                  <th style={thStyle}>ST5 Live-Punkte</th>
                  <th style={thStyle}>Punkte gesamt live</th>
                  <th style={thStyle}>über Par nach ST1-4</th>
                  <th style={thStyle}>ST5 live über Par</th>
                  <th style={thStyle}>über Par gesamt live</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {rankedOverallLive.map((t, idx) => (
                  <tr key={t.team} style={{ borderBottom: "1px solid #1e2a3a", background: t.team === "GC Bostalsee" ? "#12192a" : "transparent" }}>
                    <td style={{ ...css.td, textAlign: "left", color: "#94a3b8", fontWeight: 700, fontSize: isTvFit ? 12 : css.td.fontSize, padding: isTvFit ? "6px 8px" : compact ? "8px" : "10px" }}>{idx + 1}</td>
                    <td style={{ ...css.td, textAlign: "left", color: t.team === "GC Bostalsee" ? C1 : "#e2e8f0", fontWeight: 700, fontSize: isTvFit ? 12 : css.td.fontSize, padding: isTvFit ? "6px 8px" : compact ? "8px" : "10px" }}>{t.team}</td>
                    <td style={{ ...css.td, fontWeight: 700, color: "#cbd5e1", fontSize: isTvFit ? 12 : css.td.fontSize, padding: isTvFit ? "6px 8px" : compact ? "8px" : "10px" }}>{pointsAfter4[t.team] % 1 === 0 ? pointsAfter4[t.team].toFixed(0) : pointsAfter4[t.team].toFixed(1)}</td>
                    <td style={{ ...css.td, fontWeight: 700, color: t.day5LivePoints >= 3.5 ? C2 : t.day5LivePoints >= 2 ? AMB : "#94a3b8", fontSize: isTvFit ? 12 : css.td.fontSize, padding: isTvFit ? "6px 8px" : compact ? "8px" : "10px" }}>
                      {t.day5LivePoints % 1 === 0 ? t.day5LivePoints.toFixed(0) : t.day5LivePoints.toFixed(1)}
                    </td>
                    <td style={{ ...css.td, fontWeight: 700, color: C1, fontSize: isTvFit ? 12 : css.td.fontSize, padding: isTvFit ? "6px 8px" : compact ? "8px" : "10px" }}>
                      {t.totalPointsLive % 1 === 0 ? t.totalPointsLive.toFixed(0) : t.totalPointsLive.toFixed(1)}
                    </td>
                    <td style={{ ...css.td, color: dColor(overParAfter4[t.team]), fontWeight: 700, fontSize: isTvFit ? 12 : css.td.fontSize, padding: isTvFit ? "6px 8px" : compact ? "8px" : "10px" }}>+{overParAfter4[t.team]}</td>
                    <td style={{ ...css.td, color: t.day5OverPar == null ? "#64748b" : dColor(t.day5OverPar), fontWeight: 700, fontSize: isTvFit ? 12 : css.td.fontSize, padding: isTvFit ? "6px 8px" : compact ? "8px" : "10px" }}>{formatSigned(t.day5OverPar)}</td>
                    <td style={{ ...css.td, color: dColor(t.totalOverParLive), fontWeight: 700, fontSize: isTvFit ? 12 : css.td.fontSize, padding: isTvFit ? "6px 8px" : compact ? "8px" : "10px" }}>{formatSigned(t.totalOverParLive)}</td>
                    <td style={{ ...css.td, color: t.enteredCount === 8 || t.inWertung ? C2 : AMB, fontWeight: 700, fontSize: isTvFit ? 12 : css.td.fontSize, padding: isTvFit ? "6px 8px" : compact ? "8px" : "10px" }}>
                      {t.enteredCount === 8 ? "vollständig" : t.inWertung ? `in Wertung ${t.enteredCount}/8` : `vorläufig ${t.counted}/6`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={css.note}>Diese Tabelle reagiert ab dem ersten Ergebnis. Endgültig korrekt für den Spieltag ist sie bei mindestens 6 gewerteten Scores je Mannschaft.</div>
        </div>
      </div>

      <div style={css.card}>
        <div style={css.sec}>Live Spielerübersicht je Mannschaft</div>
        <div style={{ overflowX: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: isTvFit ? 8 : 12, minWidth: isTvFit ? 980 : 1040 }}>
            {allTeams.map((team) => {
              const teamData = teamLive.find((t) => t.team === team);
              if (!teamData) return null;
              const open = teamData.entries.filter((e) => e.value === undefined).length;

              return (
                <div key={team} style={{ border: "1px solid #1f2937", borderRadius: 8, background: team === "GC Bostalsee" ? "#12192a" : "#0f141e", overflow: "hidden" }}>
                  <div style={{ padding: isTvFit ? "8px 8px 6px" : "10px 10px 8px", borderBottom: "1px solid #1f2937" }}>
                    <div style={{ fontSize: isTvFit ? 12 : 13, fontWeight: 800, color: team === "GC Bostalsee" ? C1 : "#e2e8f0" }}>{team}</div>
                    <div style={{ marginTop: isTvFit ? 2 : 4, fontSize: isTvFit ? 10 : 11, color: "#94a3b8" }}>
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
                            padding: isTvFit ? "5px 8px" : "7px 10px",
                            borderBottom: "1px solid #1a2332",
                            background: isOpen ? "#0d1420" : "transparent",
                          }}
                        >
                          <div style={{ fontSize: isTvFit ? 11 : 12, color: isOpen ? "#64748b" : "#d1d5db", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {entry.name}
                          </div>
                          <div style={{ fontSize: isTvFit ? 11 : 12, fontWeight: 700, color: isOpen ? "#64748b" : isNR ? RED : C2, minWidth: isTvFit ? 30 : 38, textAlign: "right" }}>
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
  const [alleSortKeys, setAlleSortKeys] = useState([{ key: "team", dir: "asc" }]);
  const [alleSearch, setAlleSearch] = useState("");
  const [alleNurNeu5, setAlleNurNeu5] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  const [tvScaleMode, setTvScaleMode] = useState("off");
  const [day5Results, setDay5Results] = useState(() => {
    const stored = localStorage.getItem(DAY5_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  const seededRandom = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const simulateDay5Results = () => {
    const prevRun = parseInt(localStorage.getItem(DAY5_SIM_RUN_KEY) || "0", 10);
    const run = prevRun + 1;
    const phase = (run - 1) % 5;

    // Rotierender Teamvorteil für klar unterschiedliche Tabellenbilder pro Klick.
    const teamBiasByPhase = {
      0: { "GC Bostalsee": -3, "GC Kurpfalz": 1, "GC Katharinenhof": 2, "GC Barbarossa": 4, "EGC Westpfalz": 6 },
      1: { "GC Kurpfalz": -3, "GC Katharinenhof": 1, "GC Bostalsee": 2, "GC Barbarossa": 4, "EGC Westpfalz": 6 },
      2: { "GC Katharinenhof": -3, "GC Barbarossa": 1, "GC Kurpfalz": 2, "GC Bostalsee": 4, "EGC Westpfalz": 6 },
      3: { "GC Barbarossa": -3, "EGC Westpfalz": 1, "GC Katharinenhof": 2, "GC Kurpfalz": 4, "GC Bostalsee": 6 },
      4: { "EGC Westpfalz": -3, "GC Bostalsee": 1, "GC Barbarossa": 2, "GC Katharinenhof": 4, "GC Kurpfalz": 6 },
    };

    const teamBias = teamBiasByPhase[phase];
    const next = {};

    day5StartList.forEach((player, idx) => {
      const seed = run * 997 + idx * 389 + player.name.length * 17;
      const r = seededRandom(seed);

      // Einige offene Felder und wenige NR für realistische Zwischensituationen.
      const openChance = 0.08 + ((seed % 5) * 0.01);
      const nrChance = 0.03;

      if (r < openChance) return;
      if (r > 1 - nrChance) {
        next[player.name] = null;
        return;
      }

      const base = 79;
      const variation = Math.floor(seededRandom(seed + 31) * 16) - 8; // -8..+7
      const pressure = Math.floor(seededRandom(seed + 73) * 5) - 2;   // -2..+2
      const score = base + variation + pressure + (teamBias[player.team] || 0);
      next[player.name] = Math.max(68, Math.min(102, score));
    });

    localStorage.setItem(DAY5_SIM_RUN_KEY, String(run));
    setDay5Results(next);
    localStorage.setItem(DAY5_STORAGE_KEY, JSON.stringify(next));
  };

  useEffect(() => {
    const handler = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
    };
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
  const allTeams = ["GC Barbarossa", "GC Katharinenhof", "GC Bostalsee", "GC Kurpfalz", "EGC Westpfalz"];
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

    // Laut Regel: Bei unterschiedlicher Anzahl verfügbarer Spieltagsergebnisse
    // belegt die Mannschaft mit weniger Ergebnissen den schlechteren Platz.
    if (a.tie.resultCount !== b.tie.resultCount) return b.tie.resultCount - a.tie.resultCount;

    // Danach Kaskade: alle Spieltage, beste 4, beste 3, ... beste 1
    for (let n = a.tie.resultCount; n >= 1; n--) {
      const diff = a.tie.bestSums[n] - b.tie.bestSums[n];
      if (diff !== 0) return diff;
    }

    // Offiziell wäre danach Los; hier stabile Anzeige-Sortierung.
    return a.name.localeCompare(b.name, "de");
  };

  const standardSummary = roundData
    .map((round, idx) => `ST${idx + 1}: ${getRoundStandard(round.par)}`)
    .join(" | ");
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
      .filter(name => name !== "GC Bostalsee")
      .map(name => [name, Math.max(0, overParAfter4["GC Bostalsee"] - overParAfter4[name] + 1)])
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
  const opponents = allTeams.filter(t => t !== "GC Bostalsee");
  const permutations = permute(opponents);

  const championshipByBostalseePos = [1, 2, 3, 4, 5].map((bPos) => {
    const remainingPlaces = [1, 2, 3, 4, 5].filter(p => p !== bPos);
    let total = 0;
    let automatic = 0;
    let tiebreak = 0;

    for (const perm of permutations) {
      const placeMap = { "GC Bostalsee": bPos };
      for (let i = 0; i < perm.length; i++) placeMap[perm[i]] = remainingPlaces[i];

      const finalPoints = {};
      for (const team of allTeams) finalPoints[team] = pointsAfter4[team] + rankPoints[placeMap[team]];

      const maxPoints = Math.max(...Object.values(finalPoints));
      const leaders = allTeams.filter(team => finalPoints[team] === maxPoints);

      if (!leaders.includes("GC Bostalsee")) continue;

      total += 1;
      if (leaders.length === 1) automatic += 1;
      else tiebreak += 1;
    }

    return { bPos, total, automatic, tiebreak };
  });

  const b1 = championshipByBostalseePos.find(x => x.bPos === 1);
  const b2 = championshipByBostalseePos.find(x => x.bPos === 2);

  // GC Bostalsee holt Heimsieg (wird 1.) - Ausgang je nach Team auf Platz 2
  const bos1ByRunnerUp = opponents.map(runnerUp => {
    const remaining = opponents.filter(t => t !== runnerUp);
    const remPerms = permute(remaining);
    let total = 0, automatic = 0, tiebreak = 0;

    for (const perm of remPerms) {
      const placeMap = { "GC Bostalsee": 1, [runnerUp]: 2 };
      perm.forEach((team, i) => { placeMap[team] = i + 3; });

      const finalPoints = {};
      for (const team of allTeams) finalPoints[team] = pointsAfter4[team] + rankPoints[placeMap[team]];

      const maxPoints = Math.max(...Object.values(finalPoints));
      const leaders = allTeams.filter(team => finalPoints[team] === maxPoints);

      if (!leaders.includes("GC Bostalsee")) continue;
      total += 1;
      if (leaders.length === 1) automatic += 1;
      else tiebreak += 1;
    }

    return { runnerUp, total, automatic, tiebreak, count: remPerms.length };
  });

  // GC Bostalsee wird 2. - Ausgang je nach Team auf Platz 1
  const bos2ByWinner = opponents.map(winner => {
    const remaining = opponents.filter(t => t !== winner);
    const remPerms = permute(remaining);
    let total = 0, automatic = 0, tiebreak = 0;

    for (const perm of remPerms) {
      const placeMap = { "GC Bostalsee": 2, [winner]: 1 };
      perm.forEach((team, i) => { placeMap[team] = i + 3; });

      const finalPoints = {};
      for (const team of allTeams) finalPoints[team] = pointsAfter4[team] + rankPoints[placeMap[team]];

      const maxPoints = Math.max(...Object.values(finalPoints));
      const leaders = allTeams.filter(team => finalPoints[team] === maxPoints);

      if (!leaders.includes("GC Bostalsee")) continue;
      total += 1;
      if (leaders.length === 1) automatic += 1;
      else tiebreak += 1;
    }

    return { winner, total, automatic, tiebreak, count: remPerms.length };
  });

  // Bei gemischtem Ausgang (weder immer noch nie Meister): Aufschlüsselung nach Team auf Platz 3
  const bos2ThirdPlaceDetail = (winner) => {
    const remaining = opponents.filter(t => t !== winner);
    return remaining.map(thirdPlace => {
      const rest = remaining.filter(t => t !== thirdPlace);
      const restPerms = permute(rest);
      let total = 0, automatic = 0, tiebreak = 0;

      for (const perm of restPerms) {
        const placeMap = { "GC Bostalsee": 2, [winner]: 1, [thirdPlace]: 3 };
        perm.forEach((team, i) => { placeMap[team] = i + 4; });

        const finalPoints = {};
        for (const team of allTeams) finalPoints[team] = pointsAfter4[team] + rankPoints[placeMap[team]];

        const maxPoints = Math.max(...Object.values(finalPoints));
        const leaders = allTeams.filter(team => finalPoints[team] === maxPoints);

        if (!leaders.includes("GC Bostalsee")) continue;
        total += 1;
        if (leaders.length === 1) automatic += 1;
        else tiebreak += 1;
      }

      return { thirdPlace, total, automatic, tiebreak, count: restPerms.length };
    });
  };

  // Compute per-player averages
  const playersWithAvg = players.map(p => {
    const leagueScores = [[p.s1, p.p1, PAR1], [p.s2, p.p2, PAR2], [p.s3, p.p3, PAR3], [p.s4, p.p4, PAR4]]
      .filter(([s]) => s != null);
    const fsHinScores = (inclFS && p.sf != null && p.pf != null) ? [[p.sf, p.pf, PAR_FS_H]] : [];
    const fsRueckScores = (inclFS && p.sr != null && p.pr != null) ? [[p.sr, p.pr, PAR_FS_R]] : [];
    const allScores = [...leagueScores, ...fsHinScores, ...fsRueckScores];
    const deltas = allScores.map(([s, ph, par]) => s - (par + ph));
    const avgScore = allScores.length > 0 ? (allScores.reduce((a, [s]) => a + s, 0) / allScores.length) : null;
    const avgDelta = deltas.length > 0 ? (deltas.reduce((a, d) => a + d, 0) / deltas.length) : null;
    return { ...p, avgScore, avgDelta, played: allScores.length };
  });

  const toggleAlleSort = (key, additive) => {
    setAlleSortKeys(prev => {
      const idx = prev.findIndex(s => s.key === key);
      if (additive) {
        if (idx === -1) return [...prev, { key, dir: "asc" }];
        const next = [...prev];
        next[idx] = { key, dir: next[idx].dir === "asc" ? "desc" : "asc" };
        return next;
      }
      if (prev.length === 1 && prev[0].key === key) {
        return [{ key, dir: prev[0].dir === "asc" ? "desc" : "asc" }];
      }
      return [{ key, dir: "asc" }];
    });
  };

  const alleSearchNorm = alleSearch.trim().toLowerCase();
  const allPlayersWithAvg = allPlayers
    .filter(p => !alleSearchNorm || p.name.toLowerCase().includes(alleSearchNorm))
    .map(p => {
      const soll1 = p.p1 != null ? PAR1 + p.p1 : null;
      const soll2 = p.p2 != null ? PAR2 + p.p2 : null;
      const soll3 = p.p3 != null ? PAR3 + p.p3 : null;
      const soll4 = p.p4 != null ? PAR4 + p.p4 : null;
      const d1 = p.p1 != null && p.s1 != null ? p.s1 - soll1 : null;
      const d2 = p.p2 != null && p.s2 != null ? p.s2 - soll2 : null;
      const d3 = p.p3 != null && p.s3 != null ? p.s3 - soll3 : null;
      const d4 = p.p4 != null && p.s4 != null ? p.s4 - soll4 : null;
      const deltas = [d1, d2, d3, d4].filter(d => d != null);
      const rawScores = [p.s1, p.s2, p.s3, p.s4].filter(s => s != null);
      const avgScore = rawScores.length > 0 ? rawScores.reduce((a, s) => a + s, 0) / rawScores.length : null;
      const avgDelta = deltas.length > 0 ? deltas.reduce((a, d) => a + d, 0) / deltas.length : null;
      const entered5 = Object.prototype.hasOwnProperty.call(day5Results, p.name);
      const raw5 = entered5 ? day5Results[p.name] : undefined;
      const nr5 = entered5 && raw5 === null;
      const s5 = entered5 && !nr5 ? raw5 : null;
      const d5 = s5 != null ? s5 - PAR5 : null;
      const neu5 = day5NameSet.has(p.name) && rawScores.length === 0;
      return { ...p, soll1, soll2, soll3, soll4, d1, d2, d3, d4, s5, d5, entered5, nr5, neu5, avgScore, avgDelta, played: rawScores.length };
    })
    .filter(p => !alleNurNeu5 || p.neu5)
    .sort((a, b) => {
      for (const { key, dir } of alleSortKeys) {
        const col = ALLE_COLUMNS[key];
        const c = compareAlleValues(col.get(a), col.get(b), col.type) * (dir === "asc" ? 1 : -1);
        if (c !== 0) return c;
      }
      return alleSortKeys[alleSortKeys.length - 1]?.key === "name" ? 0 : a.name.localeCompare(b.name, "de");
    });

  const isDay5TvFit = page === "day5" && !isMobile && tvScaleMode !== "off";
  const displayScale = isMobile
    ? 1
    : isDay5TvFit
      ? tvScaleMode === "l" ? 1.2 : 1.1
      : tvScaleMode === "l" ? 1.7 : tvScaleMode === "m" ? 1.45 : 1;
  const cycleTvScaleMode = () => {
    setTvScaleMode((prev) => (prev === "off" ? "m" : prev === "m" ? "l" : "off"));
  };
  const tvModeLabel = tvScaleMode === "off" ? "TV Modus: Aus" : tvScaleMode === "m" ? "TV Modus: M" : "TV Modus: L";
  const fRoundDelta = (stData, name, par) => {
    const entry = stData.find(x => x.name === name);
    if (!entry) return <span style={{ color: "#2d3748" }}>—</span>;
    const delta = entry.ts - (par * 6);
    const color = delta <= 0 ? C2 : delta <= 5 ? AMB : RED;
    return <span style={{ color, fontWeight: 700 }}>{delta >= 0 ? "+" : ""}{delta}</span>;
  };

  return (
    <div
      style={{
        ...css.body,
        padding: isMobile ? "12px 8px" : 20,
        zoom: displayScale,
        width: "100%",
        overflowX: displayScale > 1 ? "auto" : "visible",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 20, borderBottom: "1px solid #1e2a3a", paddingBottom: 0, flexWrap: "wrap" }}>
        <span style={{ fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "#64748b", marginRight: 20, whiteSpace: "nowrap" }}>
          AK30 - GC Bostalsee - 2026
        </span>
        <NavTab label="HCPI-Übersicht" active={page === "hcpi"} onClick={() => setPage("hcpi")} />
        <NavTab label="Spieltag 5 LIVE" active={page === "day5"} onClick={() => setPage("day5")} />
        <NavTab label="Ergebnis-Analyse" active={page === "ergebnis"} onClick={() => setPage("ergebnis")} />
        <button
          onClick={cycleTvScaleMode}
          style={{
            marginLeft: "auto",
            marginBottom: 6,
            background: tvScaleMode === "off" ? "#252d3d" : tvScaleMode === "m" ? C2 : C1,
            border: "1px solid " + (tvScaleMode === "off" ? "#374151" : tvScaleMode === "m" ? "#0f5132" : "#1e40af"),
            borderRadius: 6,
            padding: "6px 12px",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: tvScaleMode === "off" ? "#cbd5e1" : "#0f1117",
            cursor: "pointer",
            position: "relative",
            zIndex: 5,
            flexShrink: 0,
          }}
        >
          {tvModeLabel}
        </button>
      </div>

      {page === "hcpi" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: 10, marginBottom: 16 }}>
            {[
              ["Feld-Schnitt 1. Spieltag", "8.18", C1],
              ["Feld-Schnitt 2. Spieltag", "7.60", C2],
              ["Feld-Schnitt 3. Spieltag", "7.84", C3],
              ["Feld-Schnitt 4. Spieltag", "7.85", C4],
              ["Feld-Schnitt 5. Spieltag", "7.01", AMB],
              ["Stärkster Gegner", "GC Katharinenhof", C2],
            ].map(([l, v, c]) => (
              <div key={l} style={{ background: "#1a1f2e", border: "1px solid #252d3d", borderRadius: 8, padding: "14px 16px" }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "#64748b", marginBottom: 7 }}>{l}</div>
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
                    {[["1. Spieltag (09.05.)", "1.ST", C1], ["2. Spieltag (23.05.)", "2.ST", C2], ["3. Spieltag (06.06.)", "3.ST", C3], ["4. Spieltag (20.06.)", "4.ST", C4], ["5. Spieltag (15.08.)", "5.ST", AMB]].map(([l, s, c]) => (
                      <th key={l} colSpan={isMobile ? 1 : 3} style={{ ...css.th, textAlign: "center", color: c, borderBottom: `2px solid ${c}`, padding: "9px 6px 4px" }}>{isMobile ? s : l}</th>
                    ))}
                    <th rowSpan={2} style={{ ...css.th, borderBottom: "2px solid #1e2a3a", verticalAlign: "bottom", paddingBottom: 9 }}>Delta letzter ST</th>
                  </tr>
                  <tr style={{ background: "#111827", borderBottom: "2px solid #1e2a3a" }}>
                    <th style={{ ...css.th, color: C1 }}>Avg HCPI</th>
                    {!isMobile && <th style={css.th}>Med</th>}
                    {!isMobile && <th style={css.th}>N</th>}
                    <th style={{ ...css.th, color: C2 }}>Avg HCPI</th>
                    {!isMobile && <th style={css.th}>Med</th>}
                    {!isMobile && <th style={css.th}>N</th>}
                    <th style={{ ...css.th, color: C3 }}>Avg HCPI</th>
                    {!isMobile && <th style={css.th}>Med</th>}
                    {!isMobile && <th style={css.th}>N</th>}
                    <th style={{ ...css.th, color: C4 }}>Avg HCPI</th>
                    {!isMobile && <th style={css.th}>Med</th>}
                    {!isMobile && <th style={css.th}>N</th>}
                    <th style={{ ...css.th, color: AMB }}>Avg HCPI</th>
                    {!isMobile && <th style={css.th}>Med</th>}
                    {!isMobile && <th style={css.th}>N</th>}
                  </tr>
                </thead>
                <tbody>
                  {hcpiTeams.map(t => {
                    const avgValues = [t.s1avg, t.s2avg, t.s3avg, t.s4avg, t.s5avg].filter((v) => typeof v === "number");
                    const d = avgValues.length >= 2 ? avgValues[avgValues.length - 1] - avgValues[avgValues.length - 2] : 0;
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
                        <td style={{ ...css.td, color: AMB, fontWeight: 600 }}>{t.s5avg.toFixed(2)}</td>
                        {!isMobile && <td style={css.td}>{t.s5med.toFixed(2)}</td>}
                        {!isMobile && <td style={css.td}>{t.s5n}</td>}
                        <td style={{ ...css.td, fontWeight: 700, color: dc }}>{(d >= 0 ? "+" : "") + d.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div style={css.card}>
            <div style={css.sec}>Avg HCPI pro Spieltag - alle Mannschaften</div>
            <div style={{ padding: "14px 14px 4px" }}>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData} barGap={3} barCategoryGap="25%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2a3a" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 9, fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 12]} tick={{ fill: "#374151", fontSize: 9 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#1a1f2e", border: "1px solid #252d3d", borderRadius: 6, color: "#e2e8f0", fontSize: 11 }} cursor={{ fill: "#1e2a3a" }} />
                  <Legend wrapperStyle={{ fontSize: 10, color: "#64748b", paddingTop: 6 }} />
                  <Bar dataKey="1.ST" fill={C1} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="2.ST" fill={C2} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="3.ST" fill={C3} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="4.ST" fill={C4} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="5.ST" fill={AMB} radius={[3, 3, 0, 0]} />
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
            simulateResults={simulateDay5Results}
            isMobile={isMobile}
            tvFitMode={isDay5TvFit ? tvScaleMode : "off"}
          />
        </div>
      )}

      {page === "ergebnis" && (
        <div>
          <div style={{ display: "flex", gap: 4, marginBottom: 0, flexWrap: "wrap" }}>
            <SubTab label="Mannschaftsvergleich" active={sub === "ms"} onClick={() => setSub("ms")} />
            <SubTab label="GC Bostalsee Einzel" active={sub === "ei"} onClick={() => setSub("ei")} />
            <SubTab label="Alle Spieler" active={sub === "alle"} onClick={() => setSub("alle")} />
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
              {stTab === "st1" && <TeamTable data={st1} par={PAR1} title="Spieltag 1 – 09.05. · GC Katharinenhof · Par 71 · Slope 127 · Top-6" subnote="Schläge über/unter Par nach Platzstandard der 6 gewerteten Spieler." />}
              {stTab === "st2" && <TeamTable data={st2} par={PAR2} title="Spieltag 2 – 23.05. · GC Kurpfalz · Par 72 · Slope 134 · Top-6" subnote="GC Katharinenhof: 2× No Return. EGC Westpfalz: 1× NR." />}
              {stTab === "st3" && <TeamTable data={st3} par={PAR3} title="Spieltag 3 – 06.06. · GC Barbarossa · Par 74 · Slope 135 · Top-6" subnote="GC Bostalsee gewinnt den Spieltag. GC Katharinenhof Rang 3 trotz gleicher Score wegen CR-Ausgleich (*)." />}
              {stTab === "st4" && <TeamTable data={st4} par={PAR4} title="Spieltag 4 – 20.06. · Erster GC Westpfalz · Par 72 · Top-6" subnote="GC Kurpfalz gewinnt den Spieltag. GC Bostalsee stark auf Rang 2. Je ein NRO bei GC Barbarossa und GC Katharinenhof." />}
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
                      {["Pos.", "Mannschaft", "ST1 Score", "ST1 ±Par", "ST1 Pkt", "ST2 Score", "ST2 ±Par", "ST2 Pkt", "ST3 Score", "ST3 ±Par", "ST3 Pkt", "ST4 Score", "ST4 ±Par", "ST4 Pkt", "Gesamt", "Schläge über Par"].map((h, i) => {
                        const isTotalCol = h === "Gesamt";
                        const isOverParCol = h === "Schläge über Par";
                        return (
                          <th key={i} style={{ ...css.th, textAlign: i <= 1 ? "left" : "right", background: isTotalCol || isOverParCol ? "#161d2c" : "transparent" }}>{h}</th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((t, idx) => {
                      const isTop = idx === 0;
                      const isRelegation = idx === standings.length - 1;
                      const isBos = t.name === "GC Bostalsee";
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
                          <td style={css.td}>{fRoundDelta(st1, t.name, PAR1)}</td>
                          <td style={css.td}>{fPts(t.p1)}</td>
                          <td style={css.td}>{fScore(st2, t.name)}</td>
                          <td style={css.td}>{fRoundDelta(st2, t.name, PAR2)}</td>
                          <td style={css.td}>{fPts(t.p2)}</td>
                          <td style={css.td}>{fScore(st3, t.name)}</td>
                          <td style={css.td}>{fRoundDelta(st3, t.name, PAR3)}</td>
                          <td style={css.td}>{fPts(t.p3)}</td>
                          <td style={css.td}>{fScore(st4, t.name)}</td>
                          <td style={css.td}>{fRoundDelta(st4, t.name, PAR4)}</td>
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
                <div style={css.note}>Legende: + = über Par, − = unter Par. Offizielle Tie-Break-Regel bei Punktgleichheit: zuerst Gesamtschlagzahl über/unter Par aller Spieltage, dann beste 4, beste 3, beste 2, beste 1. Bei weiterhin vollständiger Gleichheit entscheidet das Los. Falls nicht gleich viele Spieltagsergebnisse vorliegen, wird die Mannschaft mit weniger Ergebnissen schlechter platziert. Platzstandards: {standardSummary}. ST3: GC Barbarossa und GC Katharinenhof schlaggleich (508), je 3,5 Punkte | ST4: GC Kurpfalz gewinnt mit 475 | Platz 5 = Absteiger</div>
              </div>

              <div style={{ ...css.card, borderRadius: 8 }}>
                <div style={css.sec}>Unsere Meisterschafts-Konstellationen</div>
                {(() => {
                  const target = new Date("2026-08-15T00:00:00");
                  const now = new Date();
                  const diffMs = target - now;
                  const diffDays = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
                  return (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, padding: isMobile ? "12px 10px" : "14px 20px", background: "linear-gradient(135deg, #0f1e36 0%, #1a0e2e 100%)", borderBottom: "1px solid #2a3b59" }}>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: isMobile ? 36 : 52, fontWeight: 900, color: diffDays <= 14 ? "#f87171" : diffDays <= 30 ? "#fbbf24" : "#60a5fa", lineHeight: 1, fontVariantNumeric: "tabular-nums", letterSpacing: -2 }}>
                          {diffDays}
                        </div>
                        <div style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1.5, marginTop: 4 }}>
                          {diffDays === 1 ? "Tag" : "Tage"}
                        </div>
                      </div>
                      <div style={{ borderLeft: "1px solid #2a3b59", paddingLeft: 16 }}>
                        <div style={{ fontSize: isMobile ? 11 : 13, color: "#e2e8f0", fontWeight: 700, marginBottom: 2 }}>bis zur Meisterschaftsentscheidung</div>
                        <div style={{ fontSize: isMobile ? 10 : 11, color: "#64748b" }}>15. August 2026 · 5. Spieltag</div>
                      </div>
                    </div>
                  );
                })()}
                <div style={{ padding: isMobile ? 10 : 14, display: "grid", gap: isMobile ? 10 : 12 }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 10, alignItems: "start" }}>
                  <div style={{ background: "#10251a", border: "1px solid #1f4d35", borderRadius: 8, padding: 10 }}>
                    <div style={{ color: "#d1fae5", fontWeight: 700, fontSize: isMobile ? 12 : 13, lineHeight: 1.4, marginBottom: 8 }}>GC Bostalsee holt Heimsieg</div>
                    <div style={{ color: "#7dd3a8", fontSize: isMobile ? 10 : 11, lineHeight: 1.5, marginBottom: 6 }}>
                      {b1.total} von 24 Konstellationen sind meisterschaftstauglich ({b1.automatic} direkt über Punkte, {b1.tiebreak} über Tie-Breaker).
                    </div>
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                          <tr>
                            <th style={{ ...css.th, textAlign: "left", color: "#7dd3a8", borderBottom: "2px solid #1f4d35" }}>2. Platz</th>
                            <th style={{ ...css.th, textAlign: "left", color: "#7dd3a8", borderBottom: "2px solid #1f4d35" }}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bos1ByRunnerUp.map(sc => {
                            const safe = sc.automatic === sc.count;
                            const none = sc.total === 0;
                            const color = safe ? C2 : none ? RED : AMB;
                            const icon = safe ? "✓" : none ? "✗" : "⚠";
                            let label;
                            if (safe) label = "Meister sicher";
                            else if (none) label = "Keine Meisterschaft";
                            else if (sc.tiebreak === sc.count) label = `Tie-Break: mind. ${bostalseeGapNeeded[sc.runnerUp]} Schläge besser`;
                            else label = `${sc.total} von ${sc.count} Fällen (abhängig von Platz 3-5)`;
                            return (
                              <tr key={sc.runnerUp} style={{ borderBottom: "1px solid #1f4d35" }}>
                                <td style={{ ...css.td, textAlign: "left", color: "#d1fae5", fontWeight: 600, padding: "6px 4px" }}>{sc.runnerUp}</td>
                                <td style={{ ...css.td, textAlign: "left", color, fontWeight: 700, padding: "6px 4px" }}>{icon} {label}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div style={{ background: "#2a1d10", border: "1px solid #6b3f16", borderRadius: 8, padding: 10 }}>
                    <div style={{ color: "#fde68a", fontWeight: 700, fontSize: isMobile ? 12 : 13, lineHeight: 1.4, marginBottom: 8 }}>GC Bostalsee wird 2.</div>
                    <div style={{ color: "#fbbf24", fontSize: isMobile ? 10 : 11, lineHeight: 1.5, marginBottom: 6 }}>
                      {b2.total} von 24 Konstellationen sind meisterschaftstauglich ({b2.automatic} direkt über Punkte, {b2.tiebreak} über Tie-Breaker).
                    </div>
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                          <tr>
                            <th style={{ ...css.th, textAlign: "left", color: "#fbbf24", borderBottom: "2px solid #6b3f16" }}>1. Platz</th>
                            <th style={{ ...css.th, textAlign: "left", color: "#fbbf24", borderBottom: "2px solid #6b3f16" }}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bos2ByWinner.map(sc => {
                            const safe = sc.automatic === sc.count;
                            const none = sc.total === 0;
                            const mixed = !safe && !none;
                            const color = safe ? C2 : none ? RED : AMB;
                            const icon = safe ? "✓" : none ? "✗" : "⚠";
                            let label;
                            if (safe) label = "Meister sicher";
                            else if (none) label = "Keine Meisterschaft";
                            else if (sc.tiebreak === sc.count) label = `Tie-Break: mind. ${bostalseeGapNeeded[sc.winner]} Schläge besser`;
                            else label = `${sc.total} von ${sc.count} Fällen (abhängig von Platz 3-5)`;
                            const detail = mixed ? bos2ThirdPlaceDetail(sc.winner) : null;
                            return (
                              <Fragment key={sc.winner}>
                                <tr style={{ borderBottom: mixed ? "none" : "1px solid #6b3f16" }}>
                                  <td style={{ ...css.td, textAlign: "left", color: "#fde68a", fontWeight: 600, padding: "6px 4px" }}>{sc.winner}</td>
                                  <td style={{ ...css.td, textAlign: "left", color, fontWeight: 700, padding: "6px 4px" }}>{icon} {label}</td>
                                </tr>
                                {mixed && (
                                  <tr style={{ borderBottom: "1px solid #6b3f16" }}>
                                    <td colSpan={2} style={{ padding: "0 4px 8px" }}>
                                      <div style={{ display: "grid", gap: 3, paddingLeft: 10, borderLeft: "2px solid #6b3f16" }}>
                                        {detail.map(d => {
                                          const dSafe = d.automatic === d.count;
                                          const dNone = d.total === 0;
                                          const dColor = dSafe ? C2 : dNone ? RED : AMB;
                                          const dIcon = dSafe ? "✓" : dNone ? "✗" : "⚠";
                                          let dLabel;
                                          if (dSafe) dLabel = "Meister sicher";
                                          else if (dNone) dLabel = "Keine Meisterschaft";
                                          else if (d.tiebreak === d.count) dLabel = `Tie-Break: mind. ${bostalseeGapNeeded[d.thirdPlace]} Schläge besser`;
                                          else dLabel = `${d.total} von ${d.count} Fällen`;
                                          return (
                                            <div key={d.thirdPlace} style={{ fontSize: isMobile ? 10 : 11 }}>
                                              <span style={{ color: "#fbbf24", fontWeight: 600 }}>3. {d.thirdPlace}: </span>
                                              <span style={{ color: dColor, fontWeight: 700 }}>{dIcon} {dLabel}</span>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div style={{ background: "#2a1515", border: "1px solid #7f1d1d", borderRadius: 8, padding: 10 }}>
                    <div style={{ fontSize: 10, color: "#fca5a5", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>GC Bostalsee wird 3. oder schlechter</div>
                    <div style={{ color: "#fecaca", fontWeight: 700, fontSize: isMobile ? 12 : 13, lineHeight: 1.4 }}>GC Bostalsee auf Platz 3, 4 oder 5: keine Meisterschaft mehr möglich.</div>
                  </div>
                </div>
                </div>
              </div>
            </>
          )}

          {sub === "ei" && (
            <div style={{ ...css.card, borderRadius: "0 8px 8px 8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #252d3d", flexWrap: "wrap", gap: 4 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#64748b", padding: "12px 14px 10px" }}>
                  GC Bostalsee - Spieler Delta (Score minus Par+PHCP) pro Spieltag
                </div>
                <div style={{ padding: "10px 14px" }}>
                  <button
                    onClick={() => setInclFS(!inclFS)}
                    style={{ background: inclFS ? AMB : "#252d3d", border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: inclFS ? "#0f1117" : "#64748b", cursor: "pointer" }}
                  >
                    {inclFS ? "✓ " : ""}Freundschaftsspiele
                  </button>
                </div>
              </div>
              <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: isMobile ? 360 : 1500 }}>
                  <thead>
                    <tr>
                      <th style={{ ...css.th, textAlign: "left", position: "sticky", left: 0, background: "#111827", zIndex: 2 }}>Spieler</th>
                      <th style={{ ...css.th, background: "#19160a", color: AMB, display: isMobile ? "none" : undefined }}>FS-H PHCP</th>
                      <th style={{ ...css.th, background: "#19160a", color: AMB, display: isMobile ? "none" : undefined }}>FS-H Soll</th>
                      <th style={{ ...css.th, background: "#19160a", color: AMB }}>FS-H Sc</th>
                      <th style={{ ...css.th, background: "#19160a", color: AMB }}>FS-H Δ</th>
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
                      <th style={{ ...css.th, background: "#102016", color: C2, display: isMobile ? "none" : undefined }}>FS-R PHCP</th>
                      <th style={{ ...css.th, background: "#102016", color: C2, display: isMobile ? "none" : undefined }}>FS-R Soll</th>
                      <th style={{ ...css.th, background: "#102016", color: C2 }}>FS-R Sc</th>
                      <th style={{ ...css.th, background: "#102016", color: C2 }}>FS-R Δ</th>
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
                      const dfh = p.pf != null && p.sf != null ? p.sf - (PAR_FS_H + p.pf) : null;
                      const dfr = p.pr != null && p.sr != null ? p.sr - (PAR_FS_R + p.pr) : null;
                      const fV = (v, str) => v == null
                        ? <span style={{ color: "#2d3748" }}>—</span>
                        : <span style={{ opacity: str ? 0.4 : 1 }}>{v}</span>;
                      const fD = (d, str) => d == null
                        ? <span style={{ color: "#2d3748" }}>—</span>
                        : <span style={{ color: str ? "#64748b" : dColor(d), fontWeight: 600, opacity: str ? 0.4 : 1 }}>{d >= 0 ? "+" : ""}{d}</span>;
                      const fS = (ph, par, str) => ph == null
                        ? <span style={{ color: "#2d3748" }}>—</span>
                        : <span style={{ opacity: str ? 0.4 : 1, color: "#64748b" }}>{par + ph}</span>;
                      const avgScoreColor = p.avgScore != null ? (p.avgScore < 85 ? C2 : p.avgScore < 92 ? AMB : RED) : "#2d3748";
                      const avgDeltaColor = p.avgDelta != null ? dColor(Math.round(p.avgDelta)) : "#2d3748";
                      const mob = isMobile ? "none" : undefined;
                      return (
                        <tr key={p.name} style={{ borderBottom: "1px solid #1e2a3a" }}>
                          <td style={{ ...css.td, textAlign: "left", color: "#cbd5e1", fontWeight: 500, position: "sticky", left: 0, background: "#1a1f2e", zIndex: 1 }}>{p.name}</td>
                          <td style={{ ...css.td, background: "#19160a", display: mob }}>{fV(p.pf, false)}</td>
                          <td style={{ ...css.td, background: "#19160a", display: mob }}>{fS(p.pf, PAR_FS_H, false)}</td>
                          <td style={{ ...css.td, background: "#19160a" }}>{fV(p.sf, false)}</td>
                          <td style={{ ...css.td, background: "#19160a" }}>{fD(dfh, false)}</td>
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
                          <td style={{ ...css.td, background: "#102016", display: mob }}>{fV(p.pr, false)}</td>
                          <td style={{ ...css.td, background: "#102016", display: mob }}>{fS(p.pr, PAR_FS_R, false)}</td>
                          <td style={{ ...css.td, background: "#102016" }}>{fV(p.sr, false)}</td>
                          <td style={{ ...css.td, background: "#102016" }}>{fD(dfr, false)}</td>
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
              <div style={css.note}>Grün = unter/auf Erwartung · Gelb ≤ +5 · Rot &gt; +5 · FS-H = Freundschaftsspiel Hinspiel Mommenheim 21.03. · FS-R = Freundschaftsspiel Rückspiel 02.08. · Ø {inclFS ? "inkl. Freundschaftsspiele" : "nur Ligaspiele"}{isMobile ? " · PHCP/Soll ausgeblendet" : " · Ausgegraut = Streicher"}</div>
            </div>
          )}

          {sub === "alle" && (
            <div style={{ ...css.card, borderRadius: "0 8px 8px 8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #252d3d", flexWrap: "wrap", gap: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#64748b", padding: "12px 14px 10px" }}>
                  Alle Spieler - Spieler Delta (Score minus Par+PHCP) pro Spieltag inkl. ST5 live
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", flexWrap: "wrap" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: alleNurNeu5 ? C2 : "#94a3b8", cursor: "pointer", userSelect: "none" }}>
                    <input
                      type="checkbox"
                      checked={alleNurNeu5}
                      onChange={(e) => setAlleNurNeu5(e.target.checked)}
                      style={{ accentColor: C2, cursor: "pointer" }}
                    />
                    Nur ST5-Neuzugänge
                  </label>
                  <input
                    type="text"
                    value={alleSearch}
                    onChange={(e) => setAlleSearch(e.target.value)}
                    placeholder="Spieler suchen…"
                    style={{ background: "#111827", border: "1px solid #252d3d", borderRadius: 6, padding: "6px 10px", fontSize: 12, color: "#e2e8f0", outline: "none", width: 160 }}
                  />
                </div>
              </div>
              <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: isMobile ? 360 : 1380 }}>
                  <thead>
                    <tr>
                      {(() => {
                        const sortTh = (key, extraStyle = {}) => {
                          const sortIdx = alleSortKeys.findIndex(s => s.key === key);
                          const active = sortIdx !== -1;
                          const dir = active ? alleSortKeys[sortIdx].dir : null;
                          return (
                            <th
                              key={key}
                              onClick={(e) => toggleAlleSort(key, e.shiftKey)}
                              title="Klick: sortieren · Shift+Klick: weitere Sortierstufe"
                              style={{ ...css.th, cursor: "pointer", userSelect: "none", whiteSpace: "nowrap", ...extraStyle, color: active ? C1 : extraStyle.color }}
                            >
                              {ALLE_COLUMNS[key].label}
                              {active && (
                                <span style={{ marginLeft: 3 }}>
                                  {dir === "asc" ? "▲" : "▼"}
                                  {alleSortKeys.length > 1 && <sup style={{ fontSize: 8, marginLeft: 1 }}>{sortIdx + 1}</sup>}
                                </span>
                              )}
                            </th>
                          );
                        };
                        const mobHide = { display: isMobile ? "none" : undefined };
                        return (
                          <>
                            {sortTh("name", { textAlign: "left", position: "sticky", left: 0, background: "#111827", zIndex: 2 })}
                            {sortTh("team", { textAlign: "left" })}
                            {sortTh("p1", mobHide)}
                            {sortTh("soll1", mobHide)}
                            {sortTh("s1")}
                            {sortTh("d1")}
                            {sortTh("p2", mobHide)}
                            {sortTh("soll2", mobHide)}
                            {sortTh("s2")}
                            {sortTh("d2")}
                            {sortTh("p3", mobHide)}
                            {sortTh("soll3", mobHide)}
                            {sortTh("s3")}
                            {sortTh("d3")}
                            {sortTh("p4", { color: C4, ...mobHide })}
                            {sortTh("soll4", { color: C4, ...mobHide })}
                            {sortTh("s4", { color: C4 })}
                            {sortTh("d4", { color: C4 })}
                            {sortTh("s5", { color: C2 })}
                            {sortTh("d5", { color: C2 })}
                            {sortTh("avgScore", { background: "#161d2c" })}
                            {sortTh("avgDelta", { background: "#161d2c" })}
                          </>
                        );
                      })()}
                    </tr>
                  </thead>
                  <tbody>
                    {allPlayersWithAvg.map((p, idx) => {
                      const { d1, d2, d3, d4 } = p;
                      const fV = (v, str) => v == null
                        ? <span style={{ color: "#2d3748" }}>—</span>
                        : <span style={{ opacity: str ? 0.4 : 1 }}>{v}</span>;
                      const fD = (d, str) => d == null
                        ? <span style={{ color: "#2d3748" }}>—</span>
                        : <span style={{ color: str ? "#64748b" : dColor(d), fontWeight: 600, opacity: str ? 0.4 : 1 }}>{d >= 0 ? "+" : ""}{d}</span>;
                      const fS = (ph, par, str) => ph == null
                        ? <span style={{ color: "#2d3748" }}>—</span>
                        : <span style={{ opacity: str ? 0.4 : 1, color: "#64748b" }}>{par + ph}</span>;
                      const f5 = !p.entered5
                        ? <span style={{ color: "#2d3748" }}>—</span>
                        : p.nr5
                          ? <span style={{ color: RED, fontWeight: 600 }}>NR</span>
                          : <span>{p.s5}</span>;
                      const fD5 = p.d5 == null
                        ? <span style={{ color: "#2d3748" }}>—</span>
                        : <span style={{ color: dColor(p.d5), fontWeight: 600 }}>{p.d5 >= 0 ? "+" : ""}{p.d5}</span>;
                      const avgScoreColor = p.avgScore != null ? (p.avgScore < 85 ? C2 : p.avgScore < 92 ? AMB : RED) : "#2d3748";
                      const avgDeltaColor = p.avgDelta != null ? dColor(Math.round(p.avgDelta)) : "#2d3748";
                      const mob = isMobile ? "none" : undefined;
                      const isBos = p.team === "GC Bostalsee";
                      const newTeamBlock = alleSortKeys[0]?.key === "team" && (idx === 0 || allPlayersWithAvg[idx - 1].team !== p.team);
                      return (
                        <tr key={p.name + p.team} style={{ borderBottom: "1px solid #1e2a3a", borderTop: newTeamBlock && idx > 0 ? "2px solid #252d3d" : undefined, background: isBos ? "#12192a" : "transparent" }}>
                          <td style={{ ...css.td, textAlign: "left", color: isBos ? C1 : "#cbd5e1", fontWeight: 500, position: "sticky", left: 0, background: isBos ? "#12192a" : "#1a1f2e", zIndex: 1 }}>{p.name}</td>
                          <td style={{ ...css.td, textAlign: "left", fontSize: 11, color: isBos ? C1 : "#64748b" }}>{p.team}</td>
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
                          <td style={css.td}>{f5}</td>
                          <td style={css.td}>{fD5}</td>
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
                {allPlayersWithAvg.length === 0 && (
                  <div style={{ padding: "20px 14px", textAlign: "center", fontSize: 12, color: "#64748b" }}>
                    {alleNurNeu5 ? "Keine ST5-Neuzugänge gefunden" : `Kein Spieler gefunden für "${alleSearch}"`}
                  </div>
                )}
              </div>
              <div style={css.note}>Grün = unter/auf Erwartung · Gelb ≤ +5 · Rot &gt; +5 · Ø nur Ligaspiele (ST1-ST4) · ST5 live aus Live-Eingabe (ohne PHCP, Δ ggü. Par {PAR5}) · ST5-Neuzugänge = in ST5-Startliste, aber ohne Einsatz in ST1-4 · {isMobile ? "PHCP/Soll ausgeblendet" : "Ausgegraut = Streicher"} · {allPlayersWithAvg.length} von {allPlayers.length} Spielern</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


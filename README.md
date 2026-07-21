# AK30 Dashboard · Golfclub Bostalsee · Liga 2026

Liga-Dashboard für die AK30 Herren 2. Liga Süd.

## Einrichtung (einmalig)

### 1. Repository anlegen
- Neues Repository auf GitHub erstellen: `ak30-dashboard`
- Diesen Ordner hochladen oder klonen und pushen

### 2. GitHub Pages aktivieren
- Repository → Settings → Pages
- Source: **GitHub Actions**
- Speichern

### 3. Login-Passwort einrichten
Das Dashboard ist per Passwort geschützt. Ohne dieses Secret ist die Seite entweder dauerhaft gesperrt oder das Login-Gate wird beim Build übersprungen.
- Repository → Settings → Secrets and variables → Actions → New repository secret
- Name: `VITE_AUTH_PASS`, Wert: gewünschtes Passwort

### 4. Lokal einrichten
```bash
npm install --legacy-peer-deps
npm run dev     # lokaler Entwicklungsserver
npm run build   # Production-Build testen
```
`--legacy-peer-deps` ist nötig, da es einen Peer-Dependency-Konflikt zwischen den installierten Paketen gibt (so auch im Deploy-Workflow konfiguriert).

### 5. Nach dem ersten Push
- GitHub Actions baut automatisch (~2 Min)
- Dashboard erreichbar unter:
  `https://<dein-username>.github.io/ak30-dashboard/`

## Daten aktualisieren (pro Spieltag)

Alle Daten liegen in `src/App.jsx` oben im Datei, klar strukturiert:

- `hcpiTeams` — HCPI-Durchschnitt und Median pro Mannschaft pro Spieltag
- `st1`, `st2`, `st3`, ... — Team-Score, Soll, Streicher pro Spieltag
- `players` — Bostalsee Einzelspieler mit PHCP und Score pro Spieltag

Bei neuem Spieltag: neuen Spieltag-Datensatz anhängen, Werte eintragen, pushen → fertig.

## Workflow mit Claude Code

1. Startliste oder Ergebnisliste in Claude Code einfügen
2. Claude aktualisiert `src/App.jsx`
3. Claude committet und pusht
4. GitHub Actions deployed automatisch

# My Budget App - YNAB Style

Eine einfache Budget-Tracking-Anwendung nach YNAB-Prinzipien (You Need a Budget), gebaut mit Next.js, React, TypeScript und Tailwind CSS.

## Features

### 🎯 YNAB-Kernprinzipien

1. **Give Every Dollar a Job** - Jeder Euro bekommt einen Zweck zugewiesen
2. **Envelope Budgeting** - Geld wird in Kategorien (Umschläge) aufgeteilt
3. **Roll With the Punches** - Geld kann zwischen Kategorien verschoben werden
4. **Track Everything** - Alle Einnahmen und Ausgaben werden erfasst

### ✨ Hauptfunktionen

- **Dashboard**: Übersicht über Ihr Budget mit Quick Stats
- **Budget-Verwaltung**: Kategorien erstellen, bearbeiten und Geld zuweisen
- **Transaktionen**: Einnahmen und Ausgaben erfassen
- **Reports & Analytics**: Visualisierungen Ihrer Ausgaben
- **LocalStorage**: Alle Daten werden lokal im Browser gespeichert
- **Daten-Export/Import**: Backup und Wiederherstellung

## Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Production Build erstellen
npm run build

# Production Server starten
npm start
```

Die App läuft standardmäßig auf [http://localhost:3000](http://localhost:3000)

## Verwendung

### 1. Budget erstellen

1. Navigieren Sie zu **Dashboard** oder **Budget**
2. Klicken Sie auf **"+ Add Category"**
3. Geben Sie Name, Budget-Betrag und Farbe ein
4. Speichern Sie die Kategorie

### 2. Einnahmen erfassen

1. Navigieren Sie zu **Transactions**
2. Klicken Sie auf **"+ Add Transaction"**
3. Wählen Sie **"Income"** aus
4. Geben Sie Details ein (Betrag, Quelle, Datum)
5. Speichern Sie die Transaktion

Die Einnahme erscheint nun in "Ready to Assign" und kann Kategorien zugewiesen werden.

### 3. Geld zuweisen

1. Im **Budget**-Bereich sehen Sie "Ready to Assign"
2. Bearbeiten Sie eine Kategorie und weisen Sie einen Betrag zu
3. Der zugewiesene Betrag wird von "Ready to Assign" abgezogen

### 4. Ausgaben erfassen

1. Navigieren Sie zu **Transactions**
2. Klicken Sie auf **"+ Add Transaction"**
3. Wählen Sie **"Expense"** aus
4. Wählen Sie eine Kategorie
5. Geben Sie Betrag und Details ein
6. Die Ausgabe wird automatisch von der Kategorie abgezogen

### 5. Geld verschieben

Im **Budget**-Bereich:
1. Klicken Sie auf **"Move Money Between Categories"**
2. Wählen Sie Quell- und Zielkategorie
3. Geben Sie den Betrag ein
4. Bestätigen Sie die Verschiebung

### 6. Reports anzeigen

Im **Reports**-Bereich sehen Sie:
- **Spending Chart**: Ausgaben nach Kategorien (Pie Chart)
- **Trend Chart**: Einnahmen vs. Ausgaben über Zeit
- **Category Breakdown**: Detaillierte Kategorie-Analyse

### 7. Daten sichern

Im **Reports**-Bereich:
- **Export Data**: Speichert alle Daten als JSON-Datei
- **Import Data**: Stellt Daten aus einer JSON-Datei wieder her
- **Clear All Data**: Löscht alle Daten (mit Bestätigung)

## Technologie-Stack

- **Framework**: Next.js 15
- **UI**: React 19 mit TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: React Context API
- **Storage**: Browser LocalStorage
- **Build**: Next.js App Router

## Projektstruktur

```
my-app/
├── app/                      # Next.js Pages
│   ├── page.tsx             # Dashboard
│   ├── budget/page.tsx      # Budget-Verwaltung
│   ├── transactions/page.tsx # Transaktionen
│   ├── reports/page.tsx     # Reports
│   ├── layout.tsx           # Root Layout
│   └── globals.css          # Globale Styles
├── components/
│   ├── ui/                  # Basis-UI-Komponenten
│   ├── dashboard/           # Dashboard-Komponenten
│   ├── budget/              # Budget-Komponenten
│   ├── transactions/        # Transaktions-Komponenten
│   ├── reports/             # Report-Komponenten
│   └── Navigation.tsx       # Haupt-Navigation
├── lib/
│   ├── types.ts            # TypeScript-Typen
│   ├── utils.ts            # Utility-Funktionen
│   ├── storage.ts          # LocalStorage-Verwaltung
│   └── constants.ts        # Konstanten
├── hooks/
│   ├── useLocalStorage.ts  # LocalStorage Hook
│   ├── useBudget.ts        # Budget-Logik
│   └── useTransactions.ts  # Transaktions-Logik
└── context/
    └── AppContext.tsx      # Globaler State
```

## Wichtige Hinweise

### Geld-Berechnung
- Alle Beträge werden in **Cents** gespeichert (vermeidet Fließkomma-Fehler)
- Ausgaben sind **negative** Zahlen
- Einnahmen sind **positive** Zahlen

### LocalStorage
- Daten werden nur im Browser gespeichert
- Kein Cloud-Sync oder Backend
- Exportieren Sie regelmäßig Backups!

### Browser-Kompatibilität
- Moderne Browser mit LocalStorage-Support erforderlich
- Responsive Design für Mobile und Desktop

## Zukünftige Erweiterungen

Mögliche Features für die Zukunft:
- Multi-Account-Support
- Wiederkehrende Transaktionen
- Auto-Kategorisierung
- Budget-Templates
- Schulden-Tilgungsplanung
- Cloud-Sync
- Bank-Import

## Lizenz

Dieses Projekt ist für Lernzwecke erstellt.

## Support

Bei Fragen oder Problemen öffnen Sie bitte ein Issue im Repository.

---

**Viel Erfolg beim Budgetieren! 💰**

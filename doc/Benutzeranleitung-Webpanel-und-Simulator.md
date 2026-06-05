# Benutzeranleitung: Webpanel und Simulator

## Ziel dieses Handbuchs
Dieses Handbuch erklaert die Nutzung von:
- Webpanel (Kursverwaltung)
- Live-Simulator (Vorschau der App)

Nicht enthalten:
- Mobile-App-Handbuch (kommt separat)

## 1. Anmeldung und Rollen

### 1.1 Anmeldung
1. Oeffnen Sie die Seite `.../de/Umsetzung`.
2. Wenn Sie nicht angemeldet sind, werden Sie automatisch zur Login-Seite geleitet.
3. Melden Sie sich mit Benutzername und Passwort an.

### 1.2 Neues Konto erstellen
1. Klicken Sie auf `Jetzt registrieren`.
2. Geben Sie Benutzername und Passwort ein.
3. Bestaetigen Sie das Passwort.
4. Klicken Sie auf `Registrieren`.

Hinweis:
- Das Passwort muss mindestens 6 Zeichen haben.
- Neue Konten bekommen standardmaessig die Rolle `client`.

### 1.3 Rollen und Rechte
- `admin`: darf Kurse, Termine und Teilnehmer aendern.
- `client`: sieht das Panel nur im Demo-/Lesemodus.

Im Lesemodus:
- alle Aenderungs-Buttons sind gesperrt
- es erscheint ein Hinweis, dass keine Berechtigung vorhanden ist

## 2. Aufbau der Seite

Die Seite hat 2 Bereiche:
- Links: **Kursverwaltung** (AdminPanel)
- Rechts: **App Simulator (Live)** (iFrame-Vorschau)

Wenn links Daten geaendert werden, wird der Simulator automatisch neu geladen.

## 3. Kurse verwalten

### 3.1 Neuen Kurs erstellen
1. Klicken Sie auf `Neuer Kurs`.
2. Fuellen Sie Felder aus:
- Kurstitel (Pflichtfeld)
- Dauer in Minuten
- Beschreibung
- Bild-URL
3. Klicken Sie auf `Speichern`.

Hinweise:
- Ohne Kurstitel wird nicht gespeichert.
- Bei Bild-URL sehen Sie eine Vorschau, wenn der Link gueltig ist.

### 3.2 Kurs bearbeiten
1. Klicken Sie beim Kurs auf `Aendern` (Stift-Symbol).
2. Passen Sie Daten an.
3. Klicken Sie auf `Speichern`.

### 3.3 Kurs loeschen
1. Klicken Sie beim Kurs auf `Loeschen` (Papierkorb).
2. Bestaetigen Sie die Rueckfrage.

Wichtige Regel:
- Ein Kurs kann nur geloescht werden, wenn er **keine Termine** hat.
- Wenn Termine vorhanden sind, erhalten Sie einen Hinweis und muessen zuerst alle Termine entfernen.

## 4. Termine verwalten (pro Kurs)

### 4.1 Terminverwaltung oeffnen
1. Klicken Sie beim Kurs auf `Termine verwalten` (Kalender-Symbol).

Sie sehen:
- Liste vorhandener Termine
- Formular fuer neuen Termin oder Termin-Aenderung

### 4.2 Neuen Termin anlegen
1. Datum waehlen.
2. Uhrzeit waehlen.
3. Max. Teilnehmer eintragen.
4. Auf `Hinzufuegen` klicken.

Regeln:
- Datum und Teilnehmerzahl muessen gesetzt sein.
- Teilnehmerzahl muss groesser als `0` sein.

### 4.3 Termin bearbeiten
1. In der Terminliste auf `Termin aendern` klicken.
2. Daten im Formular anpassen.
3. Auf `Aktualisieren` klicken.

### 4.4 Termin loeschen
1. In der Terminliste auf `Termin loeschen` klicken.
2. Rueckfrage bestaetigen.

Wichtige Regel:
- Ein Termin kann nur geloescht werden, wenn es **keine Buchungen** gibt.
- Bei vorhandenen Buchungen erscheint eine Meldung mit Anzahl der Buchungen.

## 5. Teilnehmer verwalten

Teilnehmerverwaltung kann aus zwei Stellen geoeffnet werden:
- in der Kursliste ueber die Platzanzeige `x / y`
- in der Terminverwaltung ueber die Platzanzeige beim Termin

### 5.1 Was wird angezeigt
- Name (wenn vorhanden) oder Benutzer-ID
- Status:
- `Bestaetigt` (confirmed)
- `Warteliste` (waitlist)

### 5.2 Teilnehmer entfernen
1. Klicken Sie beim Teilnehmer auf `Loeschen`.
2. Bestaetigen Sie die Rueckfrage.

Ergebnis:
- Buchung wird entfernt.
- Listen und Zaehler werden automatisch aktualisiert.

## 6. Platzanzeige verstehen

Anzeigeformat: `Bestaetigt / Maximalplaetze`

Wichtig:
- Gezaehlt werden nur Buchungen mit Status `confirmed`.
- `waitlist` wird in der Teilnehmerliste gezeigt, aber nicht zur Platzbelegung addiert.
- Wenn die Gruppe voll ist (`confirmed >= max`), wird die Anzeige rot dargestellt.

## 7. Live-Simulator

Der rechte Bereich zeigt eine Live-Vorschau der App in einem Smartphone-Rahmen.

Funktionen:
- automatisches Neuladen bei Datenaenderung im Adminpanel
- manuelles Neuladen ueber `Reload`

Technischer Hinweis fuer Support:
- Der Simulator nutzt eine externe URL: `https://course-booker.vercel.app`
- Das ist eine Vorschau, keine direkte Bearbeitung im Simulator

## 8. Typische Faelle und Loesungen

### Fall: Ich kann nichts aendern
Ursache:
- Konto hat keine Admin-Rolle.

Loesung:
- Admin-Rolle in der Benutzertabelle setzen (`users.role = 'admin'`).

### Fall: Kurs kann nicht geloescht werden
Ursache:
- Der Kurs hat noch Termine.

Loesung:
1. Terminverwaltung oeffnen.
2. Alle Termine ohne Buchungen entfernen.
3. Kurs erneut loeschen.

### Fall: Termin kann nicht geloescht werden
Ursache:
- Termin hat bereits Buchungen.

Loesung:
1. Teilnehmerverwaltung oeffnen.
2. Buchungen/Teilnehmer entfernen.
3. Termin loeschen.

### Fall: Speichern von Termin funktioniert nicht
Moegliche Ursachen:
- Datum leer
- Teilnehmerzahl leer oder `0`

Loesung:
- Pflichtfelder korrekt ausfuellen und erneut speichern.

### Fall: Bild wird nicht angezeigt
Ursache:
- Ungueltige oder nicht erreichbare Bild-URL.

Loesung:
- Vollstaendige, direkt erreichbare URL verwenden.

### Fall: Simulator zeigt alte Daten
Loesung:
1. Auf `Reload` klicken.
2. Wenn noetig Browser neu laden.

## 9. Datenquellen (kurz)

Fuer Support und Administration:
- Kursdaten kommen aus Supabase (`courses`, `course_sessions`, `bookings`).
- Login und Rollen kommen aus der Benutzertabelle `users` (Credentials-Login).

## 10. Kurz-Checkliste fuer Admins

1. Als Admin anmelden.
2. Kurs erstellen oder bearbeiten.
3. Mindestens einen Termin mit korrekten Plaetzen anlegen.
4. Im Simulator pruefen.
5. Bei Bedarf Teilnehmerliste und Warteliste kontrollieren.

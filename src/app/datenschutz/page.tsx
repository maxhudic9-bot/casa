import type { Metadata } from "next"

import { LegalNotice, LegalPage, Placeholder } from "@/components/legal-placeholder"

export const metadata: Metadata = {
  title: "Datenschutzerklärung – Casa Ribelle",
  robots: { index: false },
}

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <h2>1. Verantwortlicher</h2>
      <p>Casa Ribelle</p>
      <p>Rotteckring 2</p>
      <p>79098 Freiburg im Breisgau</p>
      <p>
        E-Mail: <Placeholder>[PLATZHALTER: E-Mail-Adresse]</Placeholder>
      </p>

      <h2>2. Datenschutzbeauftragter</h2>
      <p>
        <Placeholder>
          [PLATZHALTER: Name und Kontaktdaten des Datenschutzbeauftragten, falls vorhanden/bestellungspflichtig]
        </Placeholder>
      </p>

      <h2>3. Übersicht der Verarbeitungen</h2>
      <p>
        Nachfolgend geben wir einen Überblick über die Arten der verarbeiteten Daten, die Zwecke der Verarbeitung
        und die betroffenen Personen.
      </p>
      <ul>
        <li>
          Arten der verarbeiteten Daten:{" "}
          <Placeholder>[PLATZHALTER: z. B. Bestandsdaten, Kontaktdaten, Bestelldaten, Nutzungsdaten]</Placeholder>
        </li>
        <li>
          Kategorien betroffener Personen:{" "}
          <Placeholder>[PLATZHALTER: z. B. Website-Besucher, Kund:innen mit Abholbestellung]</Placeholder>
        </li>
        <li>
          Zwecke der Verarbeitung:{" "}
          <Placeholder>[PLATZHALTER: z. B. Bereitstellung des Onlineangebots, Abwicklung von Abholbestellungen]</Placeholder>
        </li>
        <li>
          Rechtsgrundlage: <Placeholder>[PLATZHALTER: z. B. Art. 6 Abs. 1 lit. a/b/f DSGVO]</Placeholder>
        </li>
      </ul>

      <h2>4. Hosting und Server-Logfiles</h2>
      <p>
        Diese Website wird bei <Placeholder>[PLATZHALTER: Hosting-Anbieter, Anschrift]</Placeholder> gehostet. Beim
        Aufruf der Website erhebt der Hosting-Anbieter automatisch sogenannte Server-Logfiles, die Ihr Browser
        übermittelt. Dazu gehören:
      </p>
      <ul>
        <li>IP-Adresse</li>
        <li>Datum und Uhrzeit der Anfrage</li>
        <li>Browsertyp und -version</li>
        <li>Betriebssystem</li>
        <li>Referrer-URL</li>
      </ul>
      <p>
        Speicherdauer: <Placeholder>[PLATZHALTER: z. B. X Tage]</Placeholder>
      </p>

      <h2>5. Cookies und Tracking</h2>
      <p>
        <Placeholder>
          [PLATZHALTER: Auflistung eingesetzter Cookies/Tracking-Technologien, deren Zweck, Rechtsgrundlage und
          Speicherdauer. Falls Consent-pflichtige Tools eingesetzt werden, Hinweis auf das
          Consent-Management-Tool ergänzen.]
        </Placeholder>
      </p>

      <h2>6. Kontaktformular, Bestellung zur Abholung und E-Mail-Kontakt</h2>
      <p>
        Wenn Sie uns per Kontaktformular, über die Online-Bestellfunktion oder per E-Mail kontaktieren, werden Ihre
        Angaben (u. a. Name, Telefonnummer, E-Mail-Adresse sowie die Bestelldaten) zwecks Bearbeitung Ihrer Anfrage
        bzw. Ihrer Bestellung zur Abholung sowie für den Fall von Anschlussfragen bei uns gespeichert.
        Rechtsgrundlage: <Placeholder>[PLATZHALTER: z. B. Art. 6 Abs. 1 lit. b/f DSGVO]</Placeholder>. Diese Daten
        geben wir nicht ohne Ihre Einwilligung weiter.
      </p>

      <h2>7. Zahlungsabwicklung</h2>
      <p>
        Für die Bezahlung Ihrer Bestellung bieten wir PayPal, Kreditkartenzahlung und Apple Pay an. Die
        Zahlungsdaten werden dabei direkt von den jeweiligen Zahlungsdienstleistern verarbeitet:
      </p>
      <ul>
        <li>PayPal (PayPal (Europe) S.à r.l. et Cie, S.C.A.)</li>
        <li>
          Kreditkarte / Apple Pay über Stripe (Stripe Payments Europe, Ltd.)
        </li>
      </ul>
      <p>
        <Placeholder>
          [PLATZHALTER: Details zur Datenweitergabe an die Zahlungsdienstleister ergänzen, sobald die
          Zahlungsanbieter live geschaltet sind, inkl. Links zu deren Datenschutzerklärungen]
        </Placeholder>
      </p>

      <h2>8. Eingebundene Drittanbieter-Dienste</h2>
      <ul>
        <li>
          Analytics: <Placeholder>[PLATZHALTER: z. B. Google Analytics, Matomo — oder „nicht im Einsatz“]</Placeholder>
        </li>
        <li>
          Schriftarten:{" "}
          <Placeholder>[PLATZHALTER: z. B. Google Fonts (lokal eingebunden/extern) — oder „nicht im Einsatz“]</Placeholder>
        </li>
        <li>
          Karten: <Placeholder>[PLATZHALTER: z. B. Google Maps, OpenStreetMap — oder „nicht im Einsatz“]</Placeholder>
        </li>
        <li>Sonstige: <Placeholder>[PLATZHALTER: weitere eingebundene Dienste]</Placeholder></li>
      </ul>

      <h2>9. Ihre Rechte als betroffene Person</h2>
      <p>Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf:</p>
      <ul>
        <li>Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO)</li>
        <li>Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO)</li>
        <li>Einschränkung der Datenverarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung Ihrer Daten (Art. 21 DSGVO)</li>
      </ul>

      <h2>10. Beschwerderecht bei einer Aufsichtsbehörde</h2>
      <p>
        Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde über die Verarbeitung Ihrer
        personenbezogenen Daten durch uns zu beschweren. Zuständige Aufsichtsbehörde:{" "}
        <Placeholder>[PLATZHALTER: zuständige Landesdatenschutzbehörde, für Freiburg i. d. R. der Landesbeauftragte für den Datenschutz Baden-Württemberg]</Placeholder>.
      </p>

      <h2>11. SSL-/TLS-Verschlüsselung</h2>
      <p>
        Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine
        SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des
        Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
      </p>

      <LegalNotice>
        Diese Seite ist eine Platzhalter-Struktur nach DSGVO und muss vor Live-Schaltung mit den echten Angaben
        (Verantwortlicher, eingesetzte Dienste, Speicherfristen etc.) befüllt werden. Sie stellt keine
        Rechtsberatung dar.
      </LegalNotice>
    </LegalPage>
  )
}

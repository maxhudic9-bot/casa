import type { Metadata } from "next"

import { LegalNotice, LegalPage, Placeholder } from "@/components/legal-placeholder"

export const metadata: Metadata = {
  title: "Impressum – Casa Ribelle",
  robots: { index: false },
}

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <h2>Angaben gemäß § 5 TMG</h2>
      <p>Casa Ribelle</p>
      <p>Rotteckring 2</p>
      <p>79098 Freiburg im Breisgau</p>

      <h2>Vertreten durch</h2>
      <p>
        <Placeholder>[PLATZHALTER: Vertretungsberechtigte Person(en), z. B. Geschäftsführer/in]</Placeholder>
      </p>

      <h2>Kontakt</h2>
      <p>Telefon: 0761 21495620</p>
      <p>
        E-Mail: <Placeholder>[PLATZHALTER: E-Mail-Adresse]</Placeholder>
      </p>

      <h2>Registereintrag</h2>
      <p>Eintragung im Handelsregister.</p>
      <p>
        Registergericht: <Placeholder>[PLATZHALTER: Registergericht, falls vorhanden]</Placeholder>
      </p>
      <p>
        Registernummer: <Placeholder>[PLATZHALTER: Registernummer, falls vorhanden]</Placeholder>
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:</p>
      <p>
        <Placeholder>[PLATZHALTER: USt-IdNr., falls vorhanden]</Placeholder>
      </p>

      <h2>Aufsichtsbehörde</h2>
      <p>
        <Placeholder>[PLATZHALTER: Zuständige Aufsichtsbehörde, falls für die Branche zutreffend]</Placeholder>
      </p>

      <h2>Inhaltlich Verantwortlicher gemäß § 18 Abs. 2 MStV</h2>
      <p>
        <Placeholder>
          [PLATZHALTER: Name und Anschrift der inhaltlich verantwortlichen Person, bei redaktionellen Inhalten]
        </Placeholder>
      </p>

      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
        <Placeholder>[PLATZHALTER: Link zur OS-Plattform, z. B. https://ec.europa.eu/consumers/odr/]</Placeholder>.
        Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </p>

      <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
      <p>
        <Placeholder>
          [PLATZHALTER: Angabe, ob und in welchem Umfang die Bereitschaft oder Verpflichtung zur Teilnahme an einem
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle besteht]
        </Placeholder>
      </p>

      <LegalNotice>
        Diese Seite ist eine Platzhalter-Struktur nach § 5 TMG und muss vor Live-Schaltung mit den echten
        Unternehmensdaten befüllt werden. Sie stellt keine Rechtsberatung dar.
      </LegalNotice>
    </LegalPage>
  )
}

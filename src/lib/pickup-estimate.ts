/**
 * Einfache zeitbasierte Schaetzung der Abholzeit (keine echte
 * Auslastungsmessung). Stosszeit 19-21 Uhr (ueblicherweise am vollsten):
 * 30 Minuten, sonst 15 Minuten. Rechnet immer in der Restaurant-Zeitzone
 * (Europe/Berlin), unabhaengig von der Zeitzone des Besuchers.
 */
export function getEstimatedPickupMinutes(date: Date = new Date()): number {
  // formatToParts statt format(): "de-DE" haengt bei reiner Stunden-Ausgabe
  // ein " Uhr" an ("19 Uhr"), was Number(...) zu NaN parsen wuerde.
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(date)
  const hourPart = parts.find((p) => p.type === "hour")?.value ?? "0"
  // Mitternacht kann bei manchen ICU-Implementierungen als "24" statt "00"
  // formatiert werden.
  const hour = Number(hourPart) % 24

  const isPeakHours = hour >= 19 && hour < 21
  return isPeakHours ? 30 : 15
}

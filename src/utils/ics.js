export function downloadSaveTheDate() {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Saloni & Anup Wedding//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "UID:saloni-anup-wedding-20270224@savethedate",
    "DTSTAMP:20260824T000000Z",
    "DTSTART;VALUE=DATE:20270224",
    "DTEND;VALUE=DATE:20270225",
    "SUMMARY:Saloni & Anup's Wedding",
    "DESCRIPTION:Together with their families\\, Saloni & Anup invite you to celebrate their wedding. Venues to be announced.",
    "TRANSP:TRANSPARENT",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  const blob = new Blob([lines.join("\r\n")], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Saloni-Anup-Wedding.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

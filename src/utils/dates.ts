/**
 * Gets a date's strict ISO date string (without time)
 * @param date The date
 * @return The date's strict ISO string
 */
export function getStrictDateISO(date: Date): string {
  return (
    date.getFullYear() +
    '-' +
    `${date.getMonth() + 1}`.padStart(2, '0') +
    '-' +
    `${date.getDate()}`.padStart(2, '0')
  );
}

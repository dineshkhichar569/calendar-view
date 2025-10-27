import type { CalendarEvent } from "../components/Calendar/CalendarView.types";

export const minutesFromStart = (d: Date) => d.getHours() * 60 + d.getMinutes();

export function groupByDay(events: CalendarEvent[]) {
  const groups: Record<number, CalendarEvent[]> = {};
  for (const e of events) {
    const k = new Date(e.startDate).getDay(); // 0..6
    groups[k] ??= [];
    groups[k].push(e);
  }
  return groups;
}

export interface Positioned extends CalendarEvent {
  column: number;
  columnsInGroup: number;
}

export function layoutDay(events: CalendarEvent[]): Positioned[] {
  const sorted = [...events].sort(
    (a, b) =>
      a.startDate.getTime() - b.startDate.getTime() ||
      b.endDate.getTime() -
        b.startDate.getTime() -
        (a.endDate.getTime() - a.startDate.getTime())
  );

  const active: Positioned[] = [];
  const positioned: Positioned[] = [];

  for (const evt of sorted) {
    for (let i = active.length - 1; i >= 0; i--) {
      const a = active[i];
      if (!a) continue;
      if (a.endDate <= evt.startDate) active.splice(i, 1);
    }

    const used = new Set(active.map((e) => e.column));
    let col = 0;
    while (used.has(col)) col++;

    const p: Positioned = { ...evt, column: col, columnsInGroup: 1 };
    active.push(p);
    positioned.push(p);

    const maxCols = Math.max(...active.map((a) => a.column)) + 1;
    active.forEach(
      (a) => (a.columnsInGroup = Math.max(a.columnsInGroup, maxCols))
    );
  }
  return positioned;
}

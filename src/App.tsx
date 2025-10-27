import { useMemo, useState } from "react";
import { addDays, addMinutes } from "date-fns";
import CalendarView from "./components/Calendar/CalendarView";
import type { CalendarEvent } from "./components/Calendar/CalendarView.types";

export default function App() {
  const now = new Date();
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const base: CalendarEvent[] = [
      {
        id: "1",
        title: "Standup",
        startDate: addMinutes(now, 60),
        endDate: addMinutes(now, 120),
        color: "#3b91f7",
      },
      {
        id: "2",
        title: "Design review",
        startDate: addDays(now, 1),
        endDate: addDays(now, 1),
        description: "All-day marker",
        color: "#66b2ff",
      },
    ];
    return base;
  });

  const handlers = useMemo(
    () => ({
      onEventAdd: (e: CalendarEvent) => setEvents((prev) => [...prev, e]),
      onEventUpdate: (id: string, updates: Partial<CalendarEvent>) =>
        setEvents((prev) =>
          prev.map((ev) => (ev.id === id ? { ...ev, ...updates } : ev))
        ),
      onEventDelete: (id: string) =>
        setEvents((prev) => prev.filter((e) => e.id !== id)),
    }),
    []
  );

  return (
    <div className="min-h-screen bg-gray-300 text-black">
      <div className="mx-auto max-w-6xl p-4">
        <h1 className="text-2xl font-semibold mb-4">Calendar View</h1>
        <CalendarView events={events} {...handlers} initialView="month" />
      </div>
    </div>
  );
}

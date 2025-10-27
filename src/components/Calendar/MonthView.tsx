import { isSameMonth, isToday } from "date-fns";
import type { CalendarEvent } from "./CalendarView.types";
import { getCalendarGrid, isSameDay } from "../../utils/date.utils";
import CalendarCell from "./CalendarCell";

interface Props {
  currentDate: Date;
  events: CalendarEvent[];
  onCellCreate: (date: Date) => void;
  onEventClick: (e: CalendarEvent) => void;
  setCurrentDate?: (d: Date) => void;
}

export default function MonthView({
  currentDate,
  events,
  onCellCreate,
  onEventClick,
}: Props) {
  const grid = getCalendarGrid(currentDate);
  return (
    <div className="w-full grid grid-cols-7 grid-rows-6 overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-[0_4px_14px_rgba(0,0,0,0.06)] sm:shadow-sm">
      {grid.map((d, i) => {
        const dayEvents = events.filter((e) => isSameDay(e.startDate, d));
        const visible = dayEvents.slice(0, 3);
        const more = dayEvents.length - visible.length;
        return (
          <CalendarCell
            key={i}
            date={d}
            isToday={isToday(d)}
            isCurrentMonth={isSameMonth(d, currentDate)}
            eventCount={more}
            onCreate={onCellCreate}
          >
            {visible.map((ev) => (
              <button
                key={ev.id}
                className="block w-full truncate rounded-md px-1.5 sm:px-2 py-0.5 sm:py-1 text-left text-[10px] sm:text-[11px] md:text-xs leading-tight shadow-sm ring-1 ring-black/5 hover:shadow transition-all"
                style={{ background: ev.color ?? "#e0e7ff" }}
                onClick={(e) => {
                  e.stopPropagation();
                  onEventClick(ev);
                }}
                title={ev.title}
              >
                {ev.title}
              </button>
            ))}
          </CalendarCell>
        );
      })}
    </div>
  );
}

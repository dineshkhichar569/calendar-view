import {
  addMinutes,
  differenceInMinutes,
  endOfWeek,
  getDay,
  isSameDay,
  startOfDay,
  startOfWeek,
} from "date-fns";
import type { CalendarEvent } from "./CalendarView.types";
import {
  groupByDay,
  layoutDay,
  minutesFromStart,
} from "../../utils/event.utils";

interface Props {
  weekDate: Date;
  events: CalendarEvent[];
  onCellCreate: (date: Date) => void;
  onEventClick: (e: CalendarEvent) => void;
}

const HOURS = Array.from({ length: 24 }, (_, h) => h);
const PPM = 1.5;
const HOUR_PX = 60 * PPM;
const GRID_HEIGHT = HOUR_PX * 24;

export default function WeekView({
  weekDate,
  events,
  onCellCreate,
  onEventClick,
}: Props) {
  const weekStart = startOfWeek(weekDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(weekDate, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }, (_, i) =>
    addMinutes(weekStart, i * 24 * 60)
  );
  const dayGroups = groupByDay(
    events.filter((e) => e.startDate >= weekStart && e.startDate <= weekEnd)
  );

  return (
    <div
      className="
        grid grid-cols-8 overflow-hidden rounded-2xl border border-gray-200 bg-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm
        h-[80vh] overflow-y-auto overscroll-contain
        [&::-webkit-scrollbar]:w-[4px]
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300/40
        [&::-webkit-scrollbar-thumb]:hover:bg-gray-400/60
        [&::-webkit-scrollbar-track]:bg-transparent
        scrollbar-thin scrollbar-thumb-gray-300/30 scrollbar-track-transparent
      "
    >
      <div className="col-span-1 border-r-2 border-gray-200 bg-gradient-to-b from-gray-50 to-gray-100">
        {HOURS.map((h) => (
          <div
            key={h}
            style={{ height: HOUR_PX }}
            className="flex items-start justify-end border-b-2 border-gray-200 px-2 pt-1 text-[10px] text-gray-500"
          >
            {String(h).padStart(2, "0")}:00
          </div>
        ))}
      </div>

      {weekDays.map((day, idx) => {
        const dayKey = getDay(day);
        const positioned = layoutDay(
          (dayGroups[dayKey] ?? []).filter((e) => isSameDay(e.startDate, day))
        );
        return (
          <div
            key={idx}
            style={{ height: GRID_HEIGHT }}
            className="relative col-span-1 border-r-2 border-gray-200 bg-white hover:bg-gray-50/50 last:border-r-0 transition-colors"
          >
            <div
              className="absolute inset-0 cursor-crosshair"
              onDoubleClick={(e) => {
                const rect = (e.target as HTMLElement).getBoundingClientRect();
                const y = e.clientY - rect.top;
                const mins = Math.round(y / PPM);
                onCellCreate(addMinutes(startOfDay(day), mins));
              }}
            />
            {HOURS.map((h) => (
              <div
                key={h}
                className="absolute left-0 right-0 border-b-2 border-gray-200"
                style={{ top: h * 60 * PPM }}
              />
            ))}

            {positioned.map((ev) => {
              const top = minutesFromStart(ev.startDate) * PPM;
              const height = Math.max(
                20,
                differenceInMinutes(ev.endDate, ev.startDate) * PPM
              );
              const widthPct = 100 / ev.columnsInGroup;
              const leftPct = (ev.column / ev.columnsInGroup) * 100;
              return (
                <button
                  key={ev.id}
                  className="absolute overflow-hidden rounded-lg border border-black/5 p-1 text-left text-xs shadow-md transition-all hover:scale-[1.02] hover:shadow-lg focus:outline-none"
                  style={{
                    top,
                    height,
                    width: `${widthPct}%`,
                    left: `${leftPct}%`,
                    background: `linear-gradient(135deg, ${
                      ev.color ?? "#93c5fd"
                    }dd, ${ev.color ?? "#60a5fa"}99)`,
                    boxShadow: `0 4px 10px ${ev.color ?? "#60a5fa"}44`,
                  }}
                  onClick={() => onEventClick(ev)}
                >
                  <div className="font-semibold truncate text-gray-900">
                    {ev.title}
                  </div>
                  <div className="truncate text-[10px] text-gray-700/80">
                    {String(ev.startDate.getHours()).padStart(2, "0")}:
                    {String(ev.startDate.getMinutes()).padStart(2, "0")}–
                    {String(ev.endDate.getHours()).padStart(2, "0")}:
                    {String(ev.endDate.getMinutes()).padStart(2, "0")}
                  </div>
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

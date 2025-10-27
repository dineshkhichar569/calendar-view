import { useMemo, useState, Suspense, lazy } from "react";
import type { CalendarViewProps, CalendarEvent } from "./CalendarView.types";
import { useCalendar } from "../../hooks/useCalendar";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import Button from "../primitives/Button";

const EventModal = lazy(() => import("./EventModal"));

export default function CalendarView(props: CalendarViewProps) {
  const {
    events,
    onEventAdd,
    onEventDelete,
    onEventUpdate,
    initialDate,
    initialView,
  } = props;
  const cal = useCalendar(initialDate ?? new Date(), initialView ?? "month");
  const [draft, setDraft] = useState<Partial<CalendarEvent> | null>(null);

  const visibleEvents = useMemo(() => events, [events]);

  const openCreate = (date: Date) =>
    setDraft({ startDate: date, endDate: date });
  const openEdit = (e: CalendarEvent) => setDraft(e);
  const closeModal = () => setDraft(null);

  const submit = (data: CalendarEvent) => {
    if ("id" in data && events.some((e) => e.id === data.id)) {
      onEventUpdate(data.id, data);
    } else {
      onEventAdd({ ...data, id: crypto.randomUUID() });
    }
    setDraft(null);
  };

  const deleteHandler = useMemo<(() => void) | undefined>(() => {
    if (draft && "id" in draft && draft.id) {
      const id = draft.id;
      return () => {
        onEventDelete(id);
        setDraft(null);
      };
    }
    return undefined;
  }, [draft, onEventDelete]);

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-[28px] border border-white/10 bg-gray-600 text-white shadow-[0_12px_36px_rgba(0,0,0,0.35)] sm:shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
      {/* Subtle grid & glow — toned down on mobile */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.08] sm:opacity-[0.15] [background:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:22px_22px] sm:[background-size:26px_26px]" />
        <div className="hidden md:block absolute -top-48 left-1/2 h-[560px] w-[1300px] -translate-x-1/2 rounded-full blur-3xl opacity-60 bg-[conic-gradient(from_140deg_at_50%_50%,rgba(56,189,248,0.35),rgba(168,85,247,0.35),rgba(34,197,94,0.3),rgba(59,130,246,0.35),rgba(56,189,248,0.35))] animate-[pulse_7s_ease-in-out_infinite]" />
      </div>

      <header className="sticky top-0 z-20 bg-gray-950/30 backdrop-blur-xl border-b border-white/10">
        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 px-3 sm:px-5 py-3 sm:py-4">
          <span className="pointer-events-none absolute inset-x-0 -top-px h-px bg-[linear-gradient(90deg,transparent,rgba(59,130,246,.7),transparent)] animate-[pulse_3s_ease-in-out_infinite]" />

          {/* Left controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <Button
              onClick={cal.goToPrev}
              aria-label="Previous"
              className="rounded-xl bg-white/10 px-3 py-1.5 sm:px-3 sm:py-1.5 hover:bg-white/20 text-white text-sm sm:text-base shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
            >
              ◀
            </Button>
            <Button
              onClick={cal.goToToday}
              className="rounded-xl bg-white/10 px-3 py-1.5 sm:px-3 sm:py-1.5 hover:bg-white/20 text-white text-sm sm:text-base shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
            >
              Today
            </Button>
            <Button
              onClick={cal.goToNext}
              aria-label="Next"
              className="rounded-xl bg-white/10 px-3 py-1.5 sm:px-3 sm:py-1.5 hover:bg-white/20 text-white text-sm sm:text-base shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
            >
              ▶
            </Button>

            <span className="ml-0 sm:ml-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 text-xs sm:text-sm font-semibold text-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              {cal.currentDate.toLocaleDateString(undefined, {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          {/* View toggle — full width on mobile */}
          <div className="relative inline-flex w-full sm:w-auto items-center rounded-full border border-white/10 bg-white/5 p-1 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
            <span
              className={`absolute top-1 bottom-1 w-[calc(50%-0.5rem)] rounded-full transition-all duration-300 ease-out
              ${
                cal.view === "month"
                  ? "left-1 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_8px_24px_rgba(34,197,94,0.28)]"
                  : "left-[calc(50%+0.25rem)] bg-gradient-to-r from-fuchsia-500 to-violet-500 shadow-[0_8px_24px_rgba(168,85,247,0.35)]"
              }`}
            />
            <Button
              variant="ghost"
              onClick={() => cal.setView("month")}
              className={`relative z-10 rounded-full px-4 sm:px-5 py-1.5 text-sm font-medium transition-colors flex-1 sm:flex-none ${
                cal.view === "month"
                  ? "text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Month
            </Button>
            <Button
              variant="ghost"
              onClick={() => cal.setView("week")}
              className={`relative z-10 rounded-full px-4 sm:px-5 py-1.5 text-sm font-medium transition-colors flex-1 sm:flex-none ${
                cal.view === "week"
                  ? "text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Week
            </Button>
          </div>
        </div>
      </header>

      <div className="p-3 sm:p-4">
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_6px_20px_rgba(0,0,0,0.22)] sm:shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
          {/* corner accents hidden on small screens */}
          <span className="hidden md:block pointer-events-none absolute -left-2 -top-2 h-10 w-10 rounded-tr-3xl border-t border-r border-cyan-400/50" />
          <span className="hidden md:block pointer-events-none absolute -right-2 -top-2 h-10 w-10 rounded-tl-3xl border-t border-l border-fuchsia-400/50" />
          <span className="hidden md:block pointer-events-none absolute -left-2 -bottom-2 h-10 w-10 rounded-br-3xl border-b border-r border-blue-400/50" />
          <span className="hidden md:block pointer-events-none absolute -right-2 -bottom-2 h-10 w-10 rounded-bl-3xl border-b border-l border-emerald-400/50" />

          {cal.view === "month" ? (
            <MonthView
              currentDate={cal.currentDate}
              events={visibleEvents}
              onCellCreate={openCreate}
              onEventClick={openEdit}
              setCurrentDate={(d) => cal.setSelectedDate(d)}
            />
          ) : (
            <WeekView
              weekDate={cal.currentDate}
              events={visibleEvents}
              onCellCreate={openCreate}
              onEventClick={openEdit}
            />
          )}
        </div>
      </div>

      <Suspense fallback={null}>
        {draft && (
          <EventModal
            draft={draft}
            onClose={closeModal}
            {...(deleteHandler ? { onDelete: deleteHandler } : {})}
            onSubmit={submit}
          />
        )}
      </Suspense>
    </div>
  );
}

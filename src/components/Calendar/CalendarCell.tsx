import { ReactNode } from "react";

interface Props {
  date: Date;
  isToday: boolean;
  isCurrentMonth: boolean;
  eventCount?: number;
  children?: ReactNode;
  onCreate?: (date: Date) => void;
}

export default function CalendarCell({
  date,
  isToday,
  isCurrentMonth,
  eventCount = 0,
  children,
  onCreate,
}: Props) {
  const label = `${date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })}. ${eventCount} events.`;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={label}
      title={label}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onCreate?.(date);
      }}
      onDoubleClick={() => onCreate?.(date)}
      className={`group relative
        h-auto min-h-24 xs:min-h-28 sm:min-h-28 md:min-h-28 lg:min-h-32
        cursor-pointer rounded-xl border border-gray-200/70
        p-1.5 sm:p-2 md:p-2.5 lg:p-3
        outline-none touch-manipulation
        transition-all duration-200 ease-[cubic-bezier(.2,.8,.2,1)]
        ${!isCurrentMonth ? "bg-gray-50/80 text-gray-400" : "bg-white/90"}
        hover:shadow-md hover:-translate-y-[1px]
        focus-visible:ring-2 focus-visible:ring-primary-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white`}
    >
      <div
        className={`pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${
          isToday
            ? "bg-gradient-to-br from-primary-50/80 via-transparent to-primary-100/40"
            : "bg-gradient-to-br from-gray-50 via-transparent to-gray-100/40"
        }`}
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-center justify-between">
        <span
          className={`inline-flex items-center justify-center
            h-6 w-6 sm:h-7 sm:w-7 md:h-7 md:w-7 lg:h-8 lg:w-8
            rounded-lg
            text-[11px] sm:text-sm md:text-sm lg:text-base
            transition-colors ${
              isToday
                ? "font-semibold text-primary-700 ring-1 ring-primary-200 bg-primary-50"
                : "text-gray-800"
            }`}
        >
          {date.getDate()}
        </span>

        {isToday && (
          <span className="rounded-full bg-gradient-to-r from-primary-100 to-primary-200 text-[6px] sm:text-[10px] md:text-xs px-1 sm:px-2 py-0 shadow-sm ring-1 ring-primary-300/60">
            today
          </span>
        )}
      </div>

      <div className="relative z-10 mt-1 sm:mt-2 md:mt-2 lg:mt-3 space-y-0.5 sm:space-y-1 overflow-hidden">
        {children}
      </div>

      {eventCount > 0 && (
        <div className="relative z-10 mt-1 sm:mt-1.5 inline-block rounded-full bg-gray-100/90 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs text-gray-600 shadow-sm ring-1 ring-gray-200 transition-colors group-hover:bg-primary-50 group-hover:text-primary-700 group-hover:ring-primary-200">
          +{eventCount} more
        </div>
      )}

      <div
        className={`pointer-events-none absolute inset-x-1 bottom-1 h-0.5 md:h-0.5 lg:h-1 rounded-b-xl transition-all duration-200 ${
          isToday
            ? "bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400"
            : "bg-transparent group-hover:bg-gray-200"
        }`}
        aria-hidden="true"
      />

      <div
        className={`pointer-events-none absolute right-2 top-2 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-opacity ${
          isToday ? "bg-primary-400/70" : "bg-gray-300/80 group-hover:opacity-0"
        }`}
        aria-hidden="true"
      />
    </div>
  );
}

import { useEffect, useId, useMemo, useState } from "react";
import { isAfter } from "date-fns";
import type { CalendarEvent } from "./CalendarView.types";
import Modal from "../primitives/Modal";
import Button from "../primitives/Button";

interface Props {
  draft: Partial<CalendarEvent>;
  onSubmit: (data: CalendarEvent) => void;
  onDelete?: () => void;
  onClose: () => void;
}

export default function EventModal({
  draft,
  onSubmit,
  onDelete,
  onClose,
}: Props) {
  const [title, setTitle] = useState(draft.title ?? "");
  const [description, setDescription] = useState(draft.description ?? "");
  const [startDate, setStartDate] = useState(() =>
    draft.startDate ? new Date(draft.startDate) : new Date()
  );
  const [endDate, setEndDate] = useState(() =>
    draft.endDate ? new Date(draft.endDate) : new Date()
  );
  const [color, setColor] = useState(draft.color ?? "#3b91f7");
  const [error, setError] = useState<string | null>(null);

  const isEdit = !!draft.id;
  const labelId = useId();

  useEffect(() => {
    setError(null);
    if (!title.trim()) setError("Title is required");
    if (!isAfter(endDate, startDate))
      setError("End time must be after start time");
  }, [title, startDate, endDate]);

  const data = useMemo<CalendarEvent>(() => {
    const trimmedTitle = title.trim();
    const trimmedDesc = description.trim();

    return {
      id: isEdit ? (draft.id as string) : crypto.randomUUID(),
      title: trimmedTitle,
      startDate,
      endDate,
      color,
      ...(trimmedDesc ? { description: trimmedDesc } : {}),
      ...(draft.category ? { category: draft.category } : {}),
    };
  }, [
    isEdit,
    draft.id,
    draft.category,
    title,
    description,
    startDate,
    endDate,
    color,
  ]);

  return (
    <Modal onClose={onClose} ariaLabelledBy={labelId}>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
        <div className="relative">
          <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500" />
          <div className="flex items-center justify-between px-5 py-4">
            <h2
              id={labelId}
              className="text-lg font-semibold tracking-tight text-gray-900"
            >
              {isEdit ? "Edit Event" : "Create Event"}
            </h2>
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: color }}
              />
              Preview
            </span>
          </div>
        </div>

        <div className="px-5 pb-5">
          <div className="grid grid-cols-2 gap-4">
            <label className="col-span-2 text-sm font-medium text-gray-700">
              Title
              <input
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none ring-primary-500/0 transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/40"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
                placeholder="Add a concise event title"
              />
            </label>

            <label className="col-span-2 text-sm font-medium text-gray-700">
              Description
              <textarea
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none ring-primary-500/0 transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/40"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={500}
                rows={3}
                placeholder="Optional notes, agenda, or link"
              />
            </label>

            <label className="text-sm font-medium text-gray-700">
              Start
              <input
                type="datetime-local"
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none ring-primary-500/0 transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/40"
                value={toLocalInputValue(startDate)}
                onChange={(e) =>
                  setStartDate(fromLocalInputValue(e.target.value))
                }
              />
            </label>

            <label className="text-sm font-medium text-gray-700">
              End
              <input
                type="datetime-local"
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none ring-primary-500/0 transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/40"
                value={toLocalInputValue(endDate)}
                onChange={(e) =>
                  setEndDate(fromLocalInputValue(e.target.value))
                }
              />
            </label>

            <label className="text-sm font-medium text-gray-700">
              Color
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="color"
                  className="h-9 w-12 cursor-pointer rounded-md border border-gray-300 bg-white p-0 shadow-sm"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  title="Pick event color"
                />
                <span className="text-xs text-gray-500">
                  Used for the event chip
                </span>
              </div>
            </label>
          </div>

          {error && (
            <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mt-5 flex items-center justify-end gap-2 border-t border-gray-200 pt-4">
            {onDelete && (
              <Button
                variant="danger"
                onClick={onDelete}
                className="rounded-lg shadow-sm"
              >
                Delete
              </Button>
            )}
            <Button variant="ghost" onClick={onClose} className="rounded-lg">
              Cancel
            </Button>
            <Button
              disabled={!!error}
              onClick={() => onSubmit(data)}
              className="rounded-lg shadow-sm"
            >
              {isEdit ? "Save" : "Create"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function toLocalInputValue(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}
function fromLocalInputValue(s: string) {
  const d = new Date(s);
  return new Date(d.getTime());
}

export const startOfCalendarGrid = (date: Date) => {
const first = new Date(date.getFullYear(), date.getMonth(), 1)
const offset = first.getDay()
const start = new Date(first)
start.setDate(first.getDate() - offset)
return start
}


export const getCalendarGrid = (date: Date): Date[] => {
const start = startOfCalendarGrid(date)
const grid: Date[] = []
for (let i = 0; i < 42; i++) {
grid.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i))
}
return grid
}


export const isSameDay = (a: Date, b: Date) =>
a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
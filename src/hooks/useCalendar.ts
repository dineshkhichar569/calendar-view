import { useCallback, useMemo, useState } from 'react'


type View = 'month' | 'week'


export const useCalendar = (initialDate = new Date(), initialView: View = 'month') => {
const [currentDate, setCurrentDate] = useState<Date>(initialDate)
const [view, setView] = useState<View>(initialView)
const [selectedDate, setSelectedDate] = useState<Date | null>(null)


const goToNext = useCallback(() => {
setCurrentDate(d => view === 'month'
? new Date(d.getFullYear(), d.getMonth() + 1, 1)
: new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7))
}, [view])


const goToPrev = useCallback(() => {
setCurrentDate(d => view === 'month'
? new Date(d.getFullYear(), d.getMonth() - 1, 1)
: new Date(d.getFullYear(), d.getMonth(), d.getDate() - 7))
}, [view])


const goToToday = useCallback(() => setCurrentDate(new Date()), [])
const toggleView = useCallback(() => setView(v => (v === 'month' ? 'week' : 'month')), [])


const state = useMemo(() => ({ currentDate, view, selectedDate }), [currentDate, view, selectedDate])


return { ...state, setSelectedDate, setView, goToNext, goToPrev, goToToday, toggleView }
}
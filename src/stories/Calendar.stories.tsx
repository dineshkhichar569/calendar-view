import type { Meta, StoryObj } from '@storybook/react'
import CalendarView from '../components/Calendar/CalendarView'
import type { CalendarEvent } from '../components/Calendar/CalendarView.types'


const meta = {
title: 'Calendar/CalendarView',
component: CalendarView,
parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof CalendarView>
export default meta


type Story = StoryObj<typeof meta>


const now = new Date()
const demoEvents: CalendarEvent[] = [
{ id: '1', title: 'Team Standup', startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0), endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 0), color: '#3b91f7' },
{ id: '2', title: '1:1', startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 30), endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 30), color: '#66b2ff' },
{ id: '3', title: 'Lunch', startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 0), endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0), color: '#96cdff' },
]


export const DefaultMonth: Story = {
args: {
events: demoEvents,
onEventAdd: () => {},
onEventUpdate: () => {},
onEventDelete: () => {},
initialView: 'month',
},
}


export const WeekViewStory: Story = {
args: {
events: demoEvents,
onEventAdd: () => {},
onEventUpdate: () => {},
onEventDelete: () => {},
initialView: 'week',
},
}


export const EmptyState: Story = {
args: { events: [], onEventAdd: () => {}, onEventUpdate: () => {}, onEventDelete: () => {} },
}
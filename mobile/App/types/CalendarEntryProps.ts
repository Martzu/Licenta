export default interface CalendarEntryProps{
    wholeDescription?: string,
    dayNumber: string,
    month: string,
    description: string,
    textColor: string,
    setCurrentSelectedDayData?: (currentSelectedDayData: string) => void,
    setDisplayCalendarDayDate?: (displayCalendarDayData: boolean) => void
};

import format from "date-fns/format";
import getDaysInMonth from "date-fns/getDaysInMonth";

export const listDaysInCurrentMonthAndYear = (
  month: number,
  year: number
): number[] => {
  const date = new Date(year, month, 1);

  const daysInMonth = getDaysInMonth(date);

  const dayList: number[] = [];
  for (let i = 1; i <= daysInMonth; i++) {
    dayList.push(i);
  }

  return dayList;
};

export const listYears = () => {
  const currentYear = new Date().getFullYear();
  const yearList: number[] = [];

  for (let i = currentYear - 100; i < currentYear + 100; i++) {
    yearList.push(i);
  }

  return yearList;
};

export const getDayPickerDayLabel = (selectedDate: Date, dayNumber: number) => {
  const currentMonth = selectedDate.getMonth();
  const targetDay = new Date(
    selectedDate.getFullYear(),
    currentMonth,
    dayNumber
  );
  const today = new Date();

  const isToday =
    targetDay.getDate() === today.getDate() &&
    targetDay.getMonth() === today.getMonth();

  if (isToday) {
    return "Today";
  }

  return format(targetDay, "E d");
};

export const getDayPickerMonthLabel = (monthNumber: number) => {
  const month = new Date(new Date().getFullYear(), monthNumber, 1);
  return format(month, "MMMM");
};

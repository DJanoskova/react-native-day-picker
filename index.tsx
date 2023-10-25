import React, { ComponentProps, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import ScrollPicker from "react-native-wheel-scrollview-picker";

import {
  getDayPickerDayLabel,
  getDayPickerMonthLabel,
  listDaysInCurrentMonthAndYear,
  listYears,
} from "./utils";

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const years = listYears();

const sharedProps: Pick<
  ComponentProps<typeof ScrollPicker>,
  | "wrapperHeight"
  | "wrapperBackground"
  | "itemHeight"
  | "highlightColor"
  | "highlightBorderWidth"
> = {
  wrapperHeight: 140,
  wrapperBackground: "#FFFFFF",
  itemHeight: 40,
  highlightColor: "#c2c2c2",
  highlightBorderWidth: 1,
};

interface DayPickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export const DayPicker = ({ value, onChange }: DayPickerProps) => {
  const currentDay = value.getDate();
  const currentMonth = value.getMonth();
  const currentYear = value.getFullYear();

  const daysInMonth = useMemo(
    () => listDaysInCurrentMonthAndYear(currentMonth, currentYear),
    [currentMonth, currentYear]
  );

  const dayLabels = useMemo(() => {
    const result: Record<number, string> = {};

    daysInMonth.forEach((day) => {
      result[day] = getDayPickerDayLabel(value, day);
    });

    return result;
  }, [daysInMonth]);

  const monthLabels = useMemo(() => {
    const result: Record<number, string> = {};

    months.forEach((month) => {
      result[month] = getDayPickerMonthLabel(month);
    });

    return result;
  }, [months]);

  const selectedDayIndex = daysInMonth.findIndex((day) => day === currentDay);
  const selectedMonthIndex = months.findIndex(
    (month) => month === currentMonth
  );
  const selectedYearIndex = years.findIndex((year) => year === currentYear);

  const handleSetDaysInAMonth = (date: Date, month: number) => {
    date.setDate(1);
    date.setMonth(month);

    const daysInSelectedMonth = listDaysInCurrentMonthAndYear(
      month,
      date.getFullYear()
    );

    if (selectedDayIndex >= daysInSelectedMonth.length) {
      date.setDate(daysInSelectedMonth.length);
    } else {
      date.setDate(daysInMonth[selectedDayIndex]);
    }
  };

  const handleChangeDay = (day: number) => {
    const newDate = new Date(value);
    newDate.setDate(day);
    onChange(newDate);
  };

  const handleChangeMonth = (month: number) => {
    const newDate = new Date(value);
    handleSetDaysInAMonth(newDate, month);
    onChange(newDate);
  };

  const handleChangeYear = (year: number) => {
    const newDate = new Date(value);
    const currentMonth = months[selectedMonthIndex];

    newDate.setDate(1);
    newDate.setMonth(0);
    newDate.setFullYear(year);

    handleSetDaysInAMonth(newDate, currentMonth);

    onChange(newDate);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollPicker
        dataSource={daysInMonth}
        selectedIndex={selectedDayIndex}
        renderItem={(dayNumber, index) => {
          const isSelected = index === selectedDayIndex;
          return (
            <Text
              style={[
                isSelected ? styles.activeText : styles.inactiveText,
                styles.textRight,
              ]}
            >
              {dayLabels[dayNumber]}
            </Text>
          );
        }}
        onValueChange={handleChangeDay}
        {...sharedProps}
      />
      <ScrollPicker
        dataSource={months}
        selectedIndex={selectedMonthIndex}
        renderItem={(monthNumber, index) => {
          const isSelected = index === selectedMonthIndex;
          return (
            <Text
              style={[
                isSelected ? styles.activeText : styles.inactiveText,
                styles.textCenter,
              ]}
            >
              {monthLabels[monthNumber]}
            </Text>
          );
        }}
        onValueChange={handleChangeMonth}
        {...sharedProps}
      />
      <ScrollPicker
        dataSource={years}
        selectedIndex={selectedYearIndex}
        renderItem={(year, index) => {
          const isSelected = index === selectedYearIndex;
          return (
            <Text
              style={[
                isSelected ? styles.activeText : styles.inactiveText,
                styles.textLeft,
              ]}
            >
              {year}
            </Text>
          );
        }}
        onValueChange={handleChangeYear}
        {...sharedProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
  },
  activeText: {
    color: "#4230dd",
  },
  inactiveText: {
    color: "#565656",
  },
  textLeft: {
    textAlign: "left",
    width: "100%",
  },
  textCenter: {
    textAlign: "center",
    width: "100%",
  },
  textRight: {
    textAlign: "right",
    width: "100%",
  },
});

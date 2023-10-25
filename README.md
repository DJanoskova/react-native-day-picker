# DJanoskova/react-native-day-picker

A Wheel Date Picker that displays the names for days. Style and enhance it however you want!

### Dependencies

- react
- react-native
- date-fns
- [react-native-wheel-scrollview-picker](https://www.npmjs.com/package/react-native-wheel-scrollview-picker)

### Usage

```
const DateForm = () => {
  const [date, setDate] = useState(new Date());

  return (
    <DayPicker
      value={new Date(task.date)}
      onChange={handleChange("date")}
    />
  )
}
```

### Implementation

To check Datepicker's implementation, open the [index.tsx](./index.tsx) file.

### Demo

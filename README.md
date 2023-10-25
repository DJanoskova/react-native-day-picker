# DJanoskova/react-native-day-picker

A Wheel Date Picker that displays the names for days. Style and enhance it however you want!

<img src="https://github.com/DJanoskova/react-native-day-picker/blob/main/public/demo.PNG?raw=true" alt="Demo image" width="300" />

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

<video src="https://github.com/DJanoskova/react-native-day-picker/raw/main/public/demo.mov" width=180 />

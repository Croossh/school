import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scheduleMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  scheduleDays: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31,
  ],
  selectTime: [],
};

const schedule = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    initState: (state) => {
      state.selectTime = initialState.selectTime;
    },
    set28Days: (state) => {
      state.scheduleDays = initialState.scheduleDays.slice(0, 28); // 28일까지 설정
    },
    set30Days: (state) => {
      state.scheduleDays = initialState.scheduleDays.slice(0, 30); // 30일까지 설정
    },
    set31Days: (state) => {
      state.scheduleDays = initialState.scheduleDays.slice(0, 31); // 31일까지 설정
    },
    setSelectTime: (state, action) => {
      const { value } = action.payload;

      state.selectTime = value;

      if (state.selectTime.length === 2) {
        console.log("들어옴");
        const daysOfWeek = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

        const now = new Date();
        const year = now.getFullYear();
        const date = new Date(`${year}-${state.selectTime[0]}-${state.selectTime[1]}`);
        const dayOfWeek = daysOfWeek[date.getDay()];

        state.selectTime.push(dayOfWeek);
      }
    },
    setFirstTime: (state) => {
      state.selectTime = [];
    },
  },
});

export const { initState, set28Days, set30Days, set31Days, setSelectTime, setFirstTime } =
  schedule.actions;

export default schedule.reducer;

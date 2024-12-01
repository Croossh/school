import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectShowArray: [],
  selectScheduleArray: [],
  selectSeatArray: [],
  selectPaymentsArray: [],

  progress: 0,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    // show
    selectFirstMenu: (state, action) => {
      const { name, type } = action.payload;

      state[type][0] = name;
    },
    selectSecondMenu: (state, action) => {
      const { name, type } = action.payload;

      state[type][1] = name;
    },
    selectThirdMenu: (state, action) => {
      const { name, type } = action.payload;

      state[type][2] = name;
    },
    selectFourthMenu: (state, action) => {
      const { name, type } = action.payload;

      state[type][3] = name;
    },
    selectFifthMenu: (state, action) => {
      const { name, type } = action.payload;

      state[type][4] = name;
    },

    goToSchedule: (state, action) => {
      state.selectScheduleArray[0] = "second_0";
    },
    goToSeat: (state, action) => {
      state.selectSeatArray[0] = "third_0";
    },
    goToPayments: (state, action) => {
      state.selectPaymentsArray[0] = "fourth_0";
    },

    // 공통
    deleteLastMenu: (state, action) => {
      const { type } = action.payload;

      if (type === "selectPaymentsArray" && state[type].length === 3 && state[type][2] === "no") {
        state[type].pop();
        state[type].pop();
      } else {
        state[type].pop();
      }
    },
    deleteAllMenu: (state, action) => {
      state.selectShowArray = initialState.selectShowArray;
      state.selectScheduleArray = initialState.selectScheduleArray;
      state.selectSeatArray = initialState.selectSeatArray;
      state.selectPaymentsArray = initialState.selectPaymentsArray;
    },
    checkArray: (state, action) => {
      if (state.selectShowArray.length < 3) {
        state.selectShowArray = ["first_0", "auditorium_1", "one"];
      }
      if (state.selectScheduleArray.length < 3) {
        const daysOfWeek = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
        const day = now.getDate();
        const date = new Date(`${year}-${month}-${day}`);
        const dayOfWeek = daysOfWeek[date.getDay()];
        state.selectScheduleArray = ["second_0", [month, day, dayOfWeek], "one"];
      }
      if (state.selectSeatArray.length < 3) {
        state.selectSeatArray = ["third_0", "2명", "앞쪽"];
      }
    },

    setProgress: (state, action) => {
      const { value } = action.payload;

      state.progress = value;
    },
  },
});

export const {
  selectFirstMenu,
  selectSecondMenu,
  selectThirdMenu,
  selectFourthMenu,
  selectFifthMenu,
  deleteLastMenu,
  deleteAllMenu,
  startFirstSchedule,
  goToSchedule,
  goToSeat,
  goToPayments,
  checkArray,
  setProgress,
} = homeSlice.actions;

export default homeSlice.reducer;

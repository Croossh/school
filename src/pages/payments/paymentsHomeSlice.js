import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  papago: {
    show: {
      auditorium_1: "뮤지컬",
      auditorium_2: "오페라",
      auditorium_3: "연주회",
      one: "첫번째공연",
      two: "두번째공연",
      three: "세번째공연",
    },
    schedule: {
      time1: "12:00~2:59",
      time2: "3:00~5:59",
      time3: "6:00~8:59",
      time4: "9:00~11:59",
    },
    payments: {
      no: "할인없음",
      discount: "할인",
      discount1: "복지카드할인",
      discount2: "통신사할인",
      credit: "카드결제",
      cash: "현금결제",
    },
  },
};

const payments = createSlice({
  name: "payments",
  initialState,
  reducers: {
    initState: (state) => {
      state.selectTime = initialState.selectTime;
    },
  },
});

export const { initState } = payments.actions;

export default payments.reducer;

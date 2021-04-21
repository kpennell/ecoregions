import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'app',
  initialState: {
    error: null,
    isolineResult: null,
    bottomSheetOpen: false,
    forceOAuthLogin: false,
    modalOpen:false
  },
  reducers: {
    setIsolineResult: (state, action) => {
      state.isolineResult = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setBottomSheetOpen: (state, action) => {
      state.bottomSheetOpen = action.payload;
    },
    setDetailData: (state, action) => {
      state.detailData = action.payload;
    },
    setModalOpen: (state, action) => {
      state.modalOpen = action.payload;
    },
  },
});

export default slice.reducer;

export const setIsolineResult = (payload) => ({ type: 'app/setIsolineResult', payload });
export const setError = (payload) => ({ type: 'app/setError', payload });
export const setBottomSheetOpen = (payload) => ({
  type: 'app/setBottomSheetOpen',
  payload,
});
export const setModalOpen = (payload) => ({
  type: 'app/setModalOpen',
  payload,
});
export const setDetailData = (payload) => ({ type: 'app/setDetailData', payload });
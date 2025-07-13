import { configureStore, createSlice } from '@reduxjs/toolkit';
import employeesData from '../employees_data.json';

const employeesSlice = createSlice({
  name: 'employees',
  initialState: {
    list: employeesData,
  },
  reducers: {

  }
});

const changeLanguageSlice = createSlice({
  name: 'language',
  initialState: {
    lang: 'en',
  },
  reducers: {
    setLanguage(state, action) {
      state.lang = action.payload;
    }
  }
});


export const { setLanguage } = changeLanguageSlice.actions;

export const store = configureStore({
  reducer: {
    employees: employeesSlice.reducer,
    language: changeLanguageSlice.reducer
  }
});

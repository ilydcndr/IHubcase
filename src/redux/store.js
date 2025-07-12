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

export const store = configureStore({
  reducer: {
    employees: employeesSlice.reducer,
  }
});

import { configureStore, createSlice } from '@reduxjs/toolkit';
import employeesData from '../employees_data.json';

const employeesSlice = createSlice({
  name: 'employees',
  initialState: {
    list: employeesData,
  },
  reducers: {
    saveEmployee(state,action) {
      state.list.unshift(action.payload);
    },
    editEmployee(state, action) {
      const { id, updatedData } = action.payload;
      state.list = state.list.map(emp => 
        emp.id == id ? { ...emp, ...updatedData } : emp
      );
    },
    deleteEmployee(state,action) {
      const { id } = action.payload;
      state.list = state.list.filter(emp => emp.id !== id);
    }
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
export const { saveEmployee, editEmployee, deleteEmployee } = employeesSlice.actions;

export const store = configureStore({
  reducer: {
    employees: employeesSlice.reducer,
    language: changeLanguageSlice.reducer
  }
});

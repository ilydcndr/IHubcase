import { configureStore, createSlice } from '@reduxjs/toolkit';
import employeesData from '../employees_data.json';

const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('app_state', serializedState);
  } catch (e) {
    console.error('State kaydedilirken hata:', e);
  }
}

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('app_state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('State yüklenirken hata:', e);
    return undefined;
  }
}

const employeesSlice = createSlice({
  name: 'employees',
  initialState: {
    list: employeesData,
  },
  reducers: {
    saveEmployee(state, action) {
      state.list.unshift(action.payload);
    },
    editEmployee(state, action) {
      const updatedEmployee = action.payload;
      state.list = state.list.map(emp =>
        emp.id === updatedEmployee.id ? { ...emp, ...updatedEmployee } : emp
      );
    },
    deleteEmployee(state, action) {
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

const persistedState = loadStateFromLocalStorage();

export const { setLanguage } = changeLanguageSlice.actions;
export const { saveEmployee, editEmployee, deleteEmployee } = employeesSlice.actions;

export const store = configureStore({
  reducer: {
    employees: employeesSlice.reducer,
    language: changeLanguageSlice.reducer
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

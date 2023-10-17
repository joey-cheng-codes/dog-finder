import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../features/loginSlicer'
import filterReducer from '../features/filterSlicer';


const store = configureStore({
  reducer: {
    login: loginReducer,
    filter: filterReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;
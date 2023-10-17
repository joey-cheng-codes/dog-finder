import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface loginState {
  email: string;
  fullName: string;
}

const initialState: loginState = {
  email: '',
  fullName: '',
}
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setFullName: (state, action: PayloadAction<string>) => {
      state.fullName = action.payload;
    },
  }
})

export const { setEmail, setFullName } = loginSlice.actions
export default loginSlice.reducer;
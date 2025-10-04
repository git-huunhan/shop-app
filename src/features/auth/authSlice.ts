import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/index";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const saved = localStorage.getItem("auth");
const initialUser: User | null = saved ? JSON.parse(saved) : null;

const initialState: AuthState = {
  user: initialUser,
  isAuthenticated: Boolean(initialUser),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("auth", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("auth");
    },
    // optional: update profile, etc.
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

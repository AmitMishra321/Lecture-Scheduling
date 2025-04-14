import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface MyJwtPayload extends JwtPayload {
  role: string;
  userId: string;
}

interface AuthState {
  token: string | null;
  role: string | null;
  userId: string | null;
}

const token = localStorage.getItem("token");

let decoded: MyJwtPayload | null = null;
if (token) {
  try {
    decoded = jwtDecode<MyJwtPayload>(token);
  } catch (error) {
    console.error("Invalid token", error);
  }
}

const initialState: AuthState = {
  token: token || null,
  role: decoded?.role || null,
  userId:decoded?.userId ||null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      const decoded = jwtDecode<MyJwtPayload>(token);


      state.token = token;
      state.userId= decoded.userId;
      state.role = decoded.role;
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

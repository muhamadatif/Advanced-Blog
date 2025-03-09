import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
    },

    updatingUser: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },

    deleteStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  login,
  updatingUser,
  deleteStart,
  deleteFailure,
  deleteSuccess,
  logout,
} = userSlice.actions;

export default userSlice.reducer;

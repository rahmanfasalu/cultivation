import {  createSlice } from '@reduxjs/toolkit'
import { Cultivation, addUsersAsync, changeRole, getUsersByCultivation,removeUser } from '../services/UserService'
export interface CounterState {
  users: Cultivation[];
  status:string;
}

const initialState: CounterState = {
  users: [],
  status:''
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersByCultivation.pending, (state) => {
          state.status = 'loading';
      })
      .addCase(getUsersByCultivation.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.users = action.payload;
      })
      .addCase(getUsersByCultivation.rejected, (state) => {
          state.status = 'failed';
      })
      .addCase(addUsersAsync.fulfilled, (state,action)=>{
        state.users = state.users.concat(action.payload); 
      })
      .addCase(removeUser.fulfilled, (state,action)=>{
        state.users = state.users.filter(user => user.user.id !== action.payload.user.id);
      })
      .addCase(changeRole.fulfilled, (state,action)=>{
         const index = state.users.findIndex(user => user.user.id === action.payload.user.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
  },
})

export const actions = usersSlice.actions
export default usersSlice.reducer
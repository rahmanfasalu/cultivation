import {  createSlice } from '@reduxjs/toolkit'
import { Cultivation, addUsersAsync, getUsersByCultivation } from '../services/UserService'
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
    fetchUsers: (state, actions) => {
      state.users = actions.payload
    },
    addUsers:(state, actions) =>{
       state.users.push(actions.payload);
    }
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
        state.users.concat(action.payload)
      })
  },
})

export const { fetchUsers, addUsers } = usersSlice.actions
export default usersSlice.reducer
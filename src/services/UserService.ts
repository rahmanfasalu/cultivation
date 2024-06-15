import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
  id:number;
  name:string;
}

export interface Cultivation {
  user:{
    id: number;
    name: string;
  }
  role: {
    id:string,
    name:string
  };
  description: string;
}

const BASE_API_URL = 'https://14dtv3lu9k.execute-api.eu-central-1.amazonaws.com';

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(BASE_API_URL + '/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const addUsersAsync = createAsyncThunk<User[], User[]>('users/addUsers', async (users) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/users`, users);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding users:', error);
    throw error;
  }
});

export const getUsersByCultivation = createAsyncThunk(
  'users/getAllUsers',
  async () => {
   const cultivationId = '3fb82b92-4fdb-451d-b77e-817ae15826b7';
  try {
    const response = await axios.get(`${BASE_API_URL}/cultivations/${cultivationId}/users`); // TODO : change fixed URL
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
  }
);

/*
export const getUsersByCultivation = async (): Promise<User[]> => {
  const cultivationId = '3fb82b92-4fdb-451d-b77e-817ae15826b7';
  try {
    const response = await axios.get(`${BASE_API_URL}/cultivations/${cultivationId}/users`); // TODO : change fixed URL
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}; */

export const getUserRoles = async (): Promise<Cultivation[]> => {
    try {
      const response = await axios.get(`${BASE_API_URL}/cultivation-roles`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user roles:', error);
      throw error;
    }
  };

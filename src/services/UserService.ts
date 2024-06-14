import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const getAllUsers = async (): Promise<Cultivation[]> => {
  try {
    const response = await axios.get(BASE_API_URL + '/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUsersByCultivation = createAsyncThunk(
  'users',
  async () => {
   const cultivationId = '3fb82b92-4fdb-451d-b77e-817ae15826b7';
  try {
    const response = await axios.get(`${BASE_API_URL}/cultivations/${cultivationId}/users`); // TODO : change fixed URL
    console.log('dd',response.data);
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

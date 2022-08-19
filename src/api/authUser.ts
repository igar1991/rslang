import { User } from '../types/types';
import { url } from './utils';

export const fetchCreateUser = async (user: User) => {
  const response = await fetch(`${url}/users`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const res = await response.json();
  return res;
};

export const fetchLoginUser = async (user: User) => {
  const response = await fetch(`${url}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const res = await response.json();
  return res;
};

export const fetchGetUser = async (id: string, token: string) => {
  const response = await fetch(`${url}/users/${id}`, {
    method: 'GET',
    //credentials: "include",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const res = await response.json();
  return res;
};

export const fetchUpdateUser = async (id: string, token: string, user: User): Promise<User> => {
  const response = await fetch(`${url}/users/${id}`, {
    method: 'PUT',
    //credentials: "include",
    body: JSON.stringify(user),
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const res = await response.json();
  return res;
};

export const fetchDeleteUser = async (id: string, token: string) => {
  const response = await fetch(`${url}/users/${id}`, {
    method: 'DELETE',
    //credentials: "include",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  return response.ok;
};

export const fetchGetUserTokens = async (id: string, refreshToken: string) => {
  const response = await fetch(`${url}/users/${id}/tokens`, {
    method: 'GET',
    //credentials: "include",
    headers: {
      'Authorization': `Bearer ${refreshToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const res = await response.json();
  return res;
};

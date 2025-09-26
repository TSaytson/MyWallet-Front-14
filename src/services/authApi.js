import api from "./api";

export async function signUp(data){
  const response = await api.post('/signUp', data);
  return response.data;
}

export async function signIn(data){
  const response = await api.post('/signIn', data);
  return response.data;
}
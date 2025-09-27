import useConfigHeader from "../hooks/useConfig";
import api from "./api";

export async function createTransaction(transaction, token){
  const headers = useConfigHeader(token);
  const response = await api.post('/transactions', transaction, headers);

  return response.data
}

export async function deleteTransaction(id, token){
  const headers = useConfigHeader(token);
  const response = await api.delete(`/transactions/${id}`, headers);

  return response.data
}

export async function getTransactions(token){
  const headers = useConfigHeader(token)
  const response = await api.get('/transactions', headers);

  return response.data;
}
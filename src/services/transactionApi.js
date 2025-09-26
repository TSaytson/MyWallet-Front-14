import useConfigHeader from "../hooks/useConfig";
import api from "./api";

export async function createTransaction(transaction, token){
  const headers = useConfigHeader(token);
  const response = await api.post('/transactions', transaction, headers);

  return response.data
}

export async function deleteTransaction(){

}

export async function getTransactions(token){
  const headers = useConfigHeader(token)
  const response = await api.get('/transactions', headers);

  return response.data;
}
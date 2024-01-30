import { baseUrl } from "../variables";
import axios from "axios";

export const api = axios.create({
  baseURL: baseUrl
});

export async function getTransactionsByMonth(year: string | number, month: string | number) {
  try {
    const response = await api.get(`${baseUrl}/filter/${year}/${month}`);
    return(response.data);

  } catch (error) {
    console.log("Error", error);

  }
}

async function getAllTransactions() {

  try {
    const response = await fetch(`${baseUrl}/all`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error", error);
  }
}

async function getTransactionsByTitle(title: string) {
  try {
    const response = await fetch(`${baseUrl}/${title}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error", error);
  }
}

export { getAllTransactions, getTransactionsByTitle };

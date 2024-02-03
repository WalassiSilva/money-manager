import { baseUrl } from "../variables";
import axios from "axios";

export const api = axios.create({
  baseURL: baseUrl
});

export async function postTransaction(data = {}) {
  const response = await fetch(`${baseUrl}/add`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(data),
  });
  return response.json();

}

export async function getTransactionsByMonth(year: string | number, month: string | number) {
  try {
    const response = await api.get(`${baseUrl}/filter/${year}/${month}`);
    return (response.data);

  } catch (error) {
    console.log("Error", error);

  }
}

export async function getAllTransactions() {

  try {
    const response = await fetch(`${baseUrl}/all`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error", error);
  }
}

export async function getCategories() {
  try {
    const response = await fetch("http://localhost:3001/api/categories");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error", error);
  }
}

export async function getTransactionsByTitle(title: string) {
  try {
    const response = await fetch(`${baseUrl}/${title}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error", error);
  }
}

export async function updateTransaction(id: number, data) {
  try {
    const response = await api.put(`${baseUrl}/${id}`, data);
    console.log(id);
    return response.data;
  } catch (error) {
    console.log("Error", error);
  }
}

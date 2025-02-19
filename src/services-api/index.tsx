import { TransactionsProps } from "../Types";
import { baseUrl } from "../variables";
import axios from "axios";

export const api = axios.create({
  baseURL: baseUrl
});

export async function postTransaction(data = {}) {
  const response = await fetch(`${baseUrl}`, {
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
    console.log("Error: ", error);

  }
}

export async function getAllTransactions() {

  try {
    const response = await fetch(`${baseUrl}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function getCategories() {
  try {
    const response = await fetch(`${baseUrl}/categories`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
}
export async function getCagetoriesDetails(year: number, month: number, type: number = 0) {
  try {
    const response = await fetch(`${baseUrl}/categories/${year}/${month}/${type}`);
    const data = await response.json();
    return data;

  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function getTransactionsByCategory(category: string, year: number, month: number) {
  try {
    const response = await fetch(`${baseUrl}/filter/month/${category}/${year}/${month}`);
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.log("Error: ", error);
  }
}

export async function getTransactionsByTitle(title: string) {
  try {
    const response = await fetch(`${baseUrl}/filtertitle/${title}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function getTransactionById(id: number) {
  try {
    const response = await fetch(`${baseUrl}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }

}

export async function deleteTransaction(id: number) {
  try {
    await api.delete(`${baseUrl}/${id}`, {
      params: { id }
    });
  } catch (error) {
    console.log("Error :", error);
  }
}

export async function updateTransaction(data: TransactionsProps) {
  try {
    const response = await api.put(`${baseUrl}/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.log("Error", error);
  }
}

export async function getCategoriesSum(year: number | string, month: number | string, type: string | number = 0) {
  try {
    const response = await api.get(`${baseUrl}/categories/${year}/${month}/${type}`);
    return response.data;
  } catch (error) {
    console.log("Error", error);
  }
}

export async function getPatrimony(year: number | string, month: number | string) {
  try {
    const response = await api.get(`${baseUrl}/patrimony/${year}/${month}`);
    return response.data;
  } catch (error) {
    console.log("Error", error);
  }
}

import { TransactionsProps } from "../Types";
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
    console.log("Error: ", error);

  }
}

export async function getAllTransactions() {

  try {
    const response = await fetch(`${baseUrl}/all`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function getCategories() {
  try {
    const response = await fetch("http://localhost:3001/api/categories");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function getTransactionsByTitle(title: string) {
  try {
    const response = await fetch(`${baseUrl}/${title}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function getTransactionById(id: number) {
  try {
    const response = await fetch(`${baseUrl}/id/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }

}

// export async function deleteTransaction(id: number) {
//   try {
//     const response = await fetch(`${baseUrl}/${id}`);

//     console.log();

//   } catch (error) {
//     console.log("Error: ", Error);
//   }
// }
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
    console.log(data.id);
    return response.data;
  } catch (error) {
    console.log("Error", error);
  }
}

export async function getCategoriesSum(year:number | string, month:number | string) {
  try {
    const response = await api.get(`${baseUrl}/group/category/${year}/${month}`);
    return response.data;
  } catch (error) {
    console.log("Error", error);
  }
}

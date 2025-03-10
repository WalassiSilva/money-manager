import { useUser } from "@clerk/clerk-react";
import { TransactionsProps } from "../Types";
import { baseUrl } from "../variables";
import axios from "axios";

export const api = axios.create({
  baseURL: baseUrl,
});

export function getUserID() {
  const { user } = useUser();
  if (!user) {
    throw new Error("User not found");
  }
  return user.id;
}

export async function postTransaction(data = {}) {
  const user_id = getUserID();
  data = { ...data, user_id };

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
  console.log(data);

  return response.json();
}

export async function getTransactionsByMonth(
  year: string | number,
  month: string | number,
  user_id: string
) {
  try {
    const response = await api.get(`${baseUrl}/filter/${year}/${month}`, {
      params: { user_id },
    });
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function getAllTransactions(user_id: string) {
  try {
    const response = await api.get(`${baseUrl}`, {
      params: { user_id },
    });
    return response.data;
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
export async function getCagetoriesDetails(
  year: number,
  month: number,
  type: number = 0,
  user_id: string
) {
  try {
    const response = await api.get(
      `${baseUrl}/categories/${year}/${month}/${type}`,
      { params: { user_id } }
    );
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function getTransactionsByCategory(
  category: string,
  year: number,
  month: number,
  user_id: string
) {
  try {
    const response = await api.get(
      `${baseUrl}/filter/month/${category}/${year}/${month}`,
      {
        params: { user_id },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function getTransactionsByTitle(title: string, user_id: string) {
  try {
    const response = await api.get(`${baseUrl}/filtertitle/${title}`, {
      params: { user_id },
    });
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function getTransactionById(id: string, user_id: string) {
  try {
    const response = await api.get(`${baseUrl}/${id}`, {
      params: { user_id },
    });
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function deleteTransaction(id: string, user_id: string) {
  try {
    await api.delete(`${baseUrl}/${id}`, {
      params: { id, user_id },
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

export async function getCategoriesSum(
  year: number | string,
  month: number | string,
  type: string | number = 0,
  user_id: string
) {
  try {
    const response = await api.get(
      `${baseUrl}/categories/${year}/${month}/${type}`,
      {
        params: { user_id },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error", error);
  }
}

export async function getPatrimony(
  year: number | string,
  month: number | string, 
  user_id: string
) {
  try {
    const response = await api.get(`${baseUrl}/patrimony/${year}/${month}`, {
      params: { user_id },
    });
    return response.data;
  } catch (error) {
    console.log("Error", error);
  }
}

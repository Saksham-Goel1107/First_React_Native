import { useCallback, useState } from "react";

export const useTransactions = (userId) => {
const API_URL = process.env.EXPO_API_URL;
const [Transactions, setTransactions] = useState([]);
  const [Summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [IsLoading, setIsLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [userId, API_URL]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  }, [userId, API_URL]);

  const loadData = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      //call both functions in parallel
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransaction = async (transactionId) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${transactionId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error deleting transaction");
      }
      loadData();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };
  return {
    Transactions,
    Summary,
    IsLoading,
    loadData,
    deleteTransaction,
  };
};

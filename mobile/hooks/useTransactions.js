import { useCallback, useState } from "react";

export const useTransactions = (userId) => {
  const API_URL = process.env.EXPO_API_URL;
  const [Transactions, setTransactions] = useState([]);
  const [Summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });
  const [IsLoading, setIsLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSummary({
        balance: parseFloat(data.balance) || 0,
        income: parseFloat(data.income) || 0,
        expense: parseFloat(data.expense) || 0,
      });
    } catch (error) {
      console.error("Error fetching summary:", error);
      throw error;
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      // Call both functions in parallel
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransaction = async (transactionId) => {
    try {
      const response = await fetch(
        `${API_URL}/transactions/${userId}/${transactionId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await loadData(); // Refresh data after successful deletion
    } catch (error) {
      console.error("Error deleting transaction:", error);
      throw error;
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

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchData } from "../services/apiService";

const useTransactionStore = create(
  persist(
    (set) => ({
      transactions: [],
      summary: {
        totalCredit: 0,
        totalDebit: 0,
        totalBalance: 0,
        totalDeposit: 0,
        totalRevenue: 0,
        withdrawBalance: 0,
      },
      todayRevenue:0,
      loading: false,
      error: null,

      fetchTransactions: async (mobile) => {
        if (!mobile) return set({ error: "Mobile number is required." });

        set({ loading: true, error: null });

        try {
          const response = await fetchData("/api/v1/transactions", {
            params: { mobile },
          });

          const { transactions,todayRevenue, summary } = response.data;
          set({ transactions,todayRevenue, summary, loading: false });
        } catch (err) {
          set({ error: err.message, loading: false });
        }
      },

      clearTransactions: () =>
        set({
          transactions: [],
          summary: {
            totalCredit: 0,
            totalDebit: 0,
            totalBalance: 0,
            totalDeposit: 0,
            totalRevenue: 0,
            withdrawBalance: 0,
          },
          todayRevenue: 0,
        }),
    }),
    { name: "transaction-store" } // Saves state to localStorage
  )
);

export default useTransactionStore;

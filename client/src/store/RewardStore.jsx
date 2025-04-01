import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchData, postData } from "../services/apiService";

const fetchRewardData = async (userId) => {
  try {
    const response = await fetchData("/api/v1/reward", {
      params: { userId },
    });
    return Array.isArray(response?.data) ? response.data : [];
  } catch (err) {
    console.error("Error fetching reward data:", err);
    return []; // Return an empty array in case of an error
  }
};

const storeRewardData = async (userId, rewardId, amount) => {
  try {
    const response = await postData("/api/v1/reward", {
      userId,
      rewardId,
      amount,
    });
    return response?.data || null;
  } catch (err) {
    console.error("Error storing reward data:", err);
    return []; // Return an empty array in case of an error
  }
};

const useRewardStore = create(
  persist(
    (set) => ({
      reward: [],
      loading: false,
      error: null,

      fetchAllRewardData: async (userId) => {
        set({ loading: true, error: null });

        try {
          const data = await fetchRewardData(userId); // Fixed variable
          set({ reward: data, loading: false });
        } catch (error) {
          set({
            error: error.message || "Failed to fetch rewards",
            loading: false,
          });
        }
      },

      storeAllRewardData: async (userId, rewardId, amount) => {
        set({ loading: true, error: null });

        try {
          const newReward = await storeRewardData(userId, rewardId, amount);
          
          if (newReward) {
            set((state) => ({
                reward: [...state.reward, newReward], // Append new reward correctly
                loading: false,
              }));
          }
          
        } catch (error) {
          set({
            error: error.message || "Failed to store rewards",
            loading: false,
          });
        }
      },
    }),
    { name: "reward-store" }
  )
);

export default useRewardStore;

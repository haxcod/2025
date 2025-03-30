import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchData } from "../services/apiService";

// Function to fetch and process products
const fetchProducts = async (mobile) => {
  try {
    // Fetch user-owned products
    const myProducts = await fetchData("/api/v1/my/product", {
      params: { mobile },
    });

    // Fetch all available products
    const products = await fetchData("/api/v1/product");
    

    // Process products to check purchase limits
    const updatedProducts = products?.data?.map((product) => {
 
      const ownedProducts = myProducts?.data?.filter(
        (myProd) => myProd.fundId === product.fundId
      ) || []; // Ensure it defaults to an empty array
      
      
      const canBuyMore = ownedProducts
        ? ownedProducts.length < product.purchaseCount
        : true;

      return {
        ...product,
        isPurchased: !!ownedProducts,
        canBuy: canBuyMore,
        howMuchBuy:ownedProducts.length,
      };
    });
    return updatedProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Zustand Store
const useProductStore = create(
  persist(
    (set) => ({
      products: [],
      loading: false,
      error: null,

      fetchAllProducts: async (mobile) => {
        set({ loading: true, error: null });

        try {
          const data = await fetchProducts(mobile);
          set({ products: data, loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      clearProducts: () => set({ products: [] }),
    }),
    { name: "product-store" } // Saves data in localStorage
  )
);

export default useProductStore;

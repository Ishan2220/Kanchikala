"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import initialCategories from "@/data/categories.json";
import initialProducts from "@/data/products.json";

export interface Category {
  id: string;
  name: string;
  folderName?: string;
  slug: string;
  description: string;
  shortDescription: string;
  coverImage: string;
  images?: string[];
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  price?: string;
  fabric: string;
  description: string;
  details: string[];
  images: string[];
}

interface CatalogContextType {
  categories: Category[];
  products: Product[];
  addCategory: (category: Omit<Category, "id" | "slug"> & { id?: string; slug?: string }) => void;
  updateCategory: (id: string, updated: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addProduct: (product: Omit<Product, "id" | "slug" | "details"> & { id?: string; slug?: string; details?: string[] }) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetCatalog: () => void;
  exportCatalog: () => void;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

const CATEGORIES_KEY = "kanchikala_categories_admin";
const PRODUCTS_KEY = "kanchikala_products_admin";
const CLOUD_DB_URL = "https://jsonblob.com/api/jsonBlob/019f0fd0-796d-79f8-aa8d-3b69d7aadf8d";

export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const isCloudLoadedRef = useRef(false);

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      // Clear any old customer-side caches so regular visitors ALWAYS load the newly compiled GitHub data
      if (typeof window !== "undefined" && sessionStorage.getItem("kanchikala_admin_logged_in") !== "true") {
        localStorage.removeItem("kanchikala_categories_v1");
        localStorage.removeItem("kanchikala_categories_v2");
        return initialCategories as Category[];
      }
      const saved = localStorage.getItem(CATEGORIES_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load categories", e);
    }
    return initialCategories as Category[];
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      if (typeof window !== "undefined" && sessionStorage.getItem("kanchikala_admin_logged_in") !== "true") {
        localStorage.removeItem("kanchikala_products_v1");
        localStorage.removeItem("kanchikala_products_v2");
        return initialProducts as Product[];
      }
      const saved = localStorage.getItem(PRODUCTS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load products", e);
    }
    return initialProducts as Product[];
  });

  // Only fetch cloud DB if admin is actively logged in
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("kanchikala_admin_logged_in") === "true") {
      fetch(CLOUD_DB_URL)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && Array.isArray(data.categories) && Array.isArray(data.products)) {
            setCategories(data.categories);
            setProducts(data.products);
            isCloudLoadedRef.current = true;
          }
        })
        .catch((err) => console.log("Using local offline cache:", err));
    }
  }, []);

  // Save to storage only when admin is modifying
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && sessionStorage.getItem("kanchikala_admin_logged_in") === "true") {
        localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));

        fetch(CLOUD_DB_URL, {
          method: "PUT",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({ categories, products }),
        }).catch((e) => console.error("Cloud sync error:", e));
      }
    } catch (e) {
      console.error("Failed to save storage", e);
    }
  }, [categories, products]);

  const addCategory = (catData: Omit<Category, "id" | "slug"> & { id?: string; slug?: string }) => {
    const slug = catData.slug || catData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const id = catData.id || slug;
    
    const newCategory: Category = {
      ...catData,
      id,
      slug,
      images: catData.images || [catData.coverImage],
    };

    setCategories((prev) => [newCategory, ...prev]);
  };

  const updateCategory = (id: string, updated: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, ...updated } : cat))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
    // Also remove products belonging to this category
    setProducts((prev) => prev.filter((prod) => prod.categoryId !== id));
  };

  const addProduct = (prodData: Omit<Product, "id" | "slug" | "details"> & { id?: string; slug?: string; details?: string[] }) => {
    const slug = prodData.slug || `${prodData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
    const id = prodData.id || `prod-${Date.now()}`;

    const newProduct: Product = {
      ...prodData,
      id,
      slug,
      details: prodData.details?.length ? prodData.details : [
        `Collection: ${prodData.name}`,
        "Occasion: Grand Weddings & Festive Celebrations",
        "Craftsmanship: Authentic Master Artisan Weave",
        "Certificate: Guaranteed Authenticity"
      ],
    };

    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, ...updated } : prod))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
  };

  const resetCatalog = () => {
    localStorage.removeItem(CATEGORIES_KEY);
    localStorage.removeItem(PRODUCTS_KEY);
    setCategories(initialCategories as Category[]);
    setProducts(initialProducts as Product[]);
  };

  const exportCatalog = () => {
    const data = {
      categories,
      products,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kanchikala-catalog-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <CatalogContext.Provider
      value={{
        categories,
        products,
        addCategory,
        updateCategory,
        deleteCategory,
        addProduct,
        updateProduct,
        deleteProduct,
        resetCatalog,
        exportCatalog,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCatalog must be used within a CatalogProvider");
  }
  return context;
}

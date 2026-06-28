"use client";

import React, { useState } from "react";
import { useCatalog, Category, Product } from "@/context/CatalogContext";
import { Plus, Edit2, Trash2, Download, RotateCcw, Shield, Layers, Package, Settings, Search, X, Upload, LogOut, Lock, Globe } from "lucide-react";
import { Helmet } from "react-helmet-async";

const convertImageToWebP = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const webpDataUrl = canvas.toDataURL("image/webp", 0.82);
          resolve(webpDataUrl);
        } else {
          reject(new Error("Canvas context not available"));
        }
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem("kanchikala_admin_logged_in") === "true");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const [isPublishing, setIsPublishing] = useState(false);
  const [publishMessage, setPublishMessage] = useState("");
  const [gitHubToken, setGitHubToken] = useState(() => localStorage.getItem("kanchikala_github_token") || "");
  const [showPublishModal, setShowPublishModal] = useState(false);

  const {
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
  } = useCatalog();

  const [activeTab, setActiveTab] = useState<"categories" | "products" | "settings">("categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");

  // Modal states
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [catForm, setCatForm] = useState({
    name: "",
    slug: "",
    shortDescription: "",
    description: "",
    coverImage: "",
  });

  const [isProdModalOpen, setIsProdModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [prodForm, setProdForm] = useState({
    categoryId: "",
    name: "",
    price: "",
    fabric: "",
    description: "",
    imageUrl: "",
  });

  // Category handlers
  const handleOpenAddCat = () => {
    setEditingCategory(null);
    setCatForm({
      name: "",
      slug: "",
      shortDescription: "",
      description: "",
      coverImage: "/images/categories/banarasi/1.webp",
    });
    setIsCatModalOpen(true);
  };

  const handleOpenEditCat = (cat: Category) => {
    setEditingCategory(cat);
    setCatForm({
      name: cat.name,
      slug: cat.slug,
      shortDescription: cat.shortDescription,
      description: cat.description,
      coverImage: cat.coverImage,
    });
    setIsCatModalOpen(true);
  };

  const handleSaveCat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catForm.name) return;

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name: catForm.name,
        slug: catForm.slug || editingCategory.slug,
        shortDescription: catForm.shortDescription,
        description: catForm.description,
        coverImage: catForm.coverImage,
      });
    } else {
      addCategory({
        name: catForm.name,
        slug: catForm.slug,
        shortDescription: catForm.shortDescription || `Exquisite handwoven ${catForm.name}.`,
        description: catForm.description || `Authentic ${catForm.name} featuring traditional craftsmanship and heirloom luxury.`,
        coverImage: catForm.coverImage || "/images/categories/banarasi/1.webp",
      });
    }
    setIsCatModalOpen(false);
  };

  // Product handlers
  const handleOpenAddProd = () => {
    setEditingProduct(null);
    setProdForm({
      categoryId: categories[0]?.id || "",
      name: "",
      price: "",
      fabric: "Pure Traditional Silk",
      description: "",
      imageUrl: "/images/categories/banarasi/1.webp",
    });
    setIsProdModalOpen(true);
  };

  const handleOpenEditProd = (prod: Product) => {
    setEditingProduct(prod);
    setProdForm({
      categoryId: prod.categoryId,
      name: prod.name,
      price: prod.price || "",
      fabric: prod.fabric,
      description: prod.description,
      imageUrl: prod.images?.[0] || "",
    });
    setIsProdModalOpen(true);
  };

  const handleSaveProd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.name || !prodForm.categoryId) return;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        categoryId: prodForm.categoryId,
        name: prodForm.name,
        price: prodForm.price,
        fabric: prodForm.fabric,
        description: prodForm.description,
        images: [prodForm.imageUrl || editingProduct.images[0]],
      });
    } else {
      addProduct({
        categoryId: prodForm.categoryId,
        name: prodForm.name,
        price: prodForm.price,
        fabric: prodForm.fabric || "Pure Traditional Silk",
        description: prodForm.description || `Exquisite handwoven ${prodForm.name} featuring authentic zari work.`,
        images: [prodForm.imageUrl || "/images/categories/banarasi/1.webp"],
        details: [
          `Collection: ${prodForm.name}`,
          "Occasion: Grand Weddings & Festive Celebrations",
          "Craftsmanship: Authentic Master Artisan Weave",
          "Certificate: Guaranteed Authenticity"
        ],
      });
    }
    setIsProdModalOpen(false);
  };

  // Filtered products
  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategoryFilter === "all" || p.categoryId === selectedCategoryFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.fabric.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isLoggedIn) {
    return (
      <>
        <Helmet>
          <title>Admin Login | KanchiKala</title>
        </Helmet>
        <div className="min-h-screen bg-[#0A0A0A] text-[#E8E5DF] flex items-center justify-center px-4 pt-20">
          <div className="max-w-md w-full bg-[#141414] border border-[#222222] p-8 sm:p-10 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-[#1A1A1A] border border-[#333333] flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                <Lock className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl text-white mb-2">Boutique Administration</h1>
              <p className="text-xs text-gray-400 uppercase tracking-widest">Enter restricted access credentials</p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (usernameInput === "admin" && passwordInput === "kanchikala") {
                sessionStorage.setItem("kanchikala_admin_logged_in", "true");
                setIsLoggedIn(true);
                setLoginError("");
              } else {
                setLoginError("Invalid credentials. Please try again.");
              }
            }} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Username</label>
                <input
                  type="text"
                  required
                  placeholder="Enter username"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              {loginError && (
                <p className="text-xs text-red-400 bg-red-950/40 border border-red-800/50 p-3 rounded-lg text-center">{loginError}</p>
              )}

              <button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-[#0A0A0A] font-semibold py-3 px-4 rounded-lg transition-colors duration-300 text-sm uppercase tracking-widest shadow-md mt-2"
              >
                Access Portal
              </button>

              <div className="pt-4 border-t border-[#222222] text-center">
                <p className="text-[11px] text-gray-500 font-light">
                  Default Credentials: <span className="text-[#D4AF37] font-medium">admin</span> / <span className="text-[#D4AF37] font-medium">kanchikala</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | KanchiKala</title>
      </Helmet>

      <div className="min-h-screen bg-[#0A0A0A] text-[#E8E5DF] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#222222] mb-10">
            <div>
              <div className="flex items-center gap-3 text-[#D4AF37] mb-2">
                <Shield className="w-6 h-6" />
                <span className="text-xs uppercase tracking-[0.3em] font-medium">Administrator Portal</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-wide">Catalog Management</h1>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowPublishModal(true)}
                className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#c29e2f] text-black font-semibold px-4 py-2.5 rounded-lg text-xs uppercase tracking-widest transition-colors shadow-lg shadow-[#D4AF37]/10"
              >
                <Globe className="w-4 h-4 text-black" />
                Publish Live to Web
              </button>
              <button
                onClick={exportCatalog}
                className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white border border-[#333333] px-4 py-2.5 rounded-lg text-xs uppercase tracking-widest transition-colors"
              >
                <Download className="w-4 h-4 text-[#D4AF37]" />
                Export Backup
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to reset the catalog to default factory settings? Any custom additions or edits will be lost.")) {
                    resetCatalog();
                  }
                }}
                className="inline-flex items-center gap-2 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/50 px-4 py-2.5 rounded-lg text-xs uppercase tracking-widest transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Factory
              </button>
              <button
                onClick={() => {
                  sessionStorage.removeItem("kanchikala_admin_logged_in");
                  setIsLoggedIn(false);
                }}
                className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-gray-300 border border-[#333333] px-4 py-2.5 rounded-lg text-xs uppercase tracking-widest transition-colors"
              >
                <LogOut className="w-4 h-4 text-gray-400" />
                Logout
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div className="flex gap-2 bg-[#141414] p-1.5 rounded-xl border border-[#222222]">
              <button
                onClick={() => setActiveTab("categories")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs uppercase tracking-widest font-medium transition-all ${
                  activeTab === "categories"
                    ? "bg-[#D4AF37] text-black shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Layers className="w-4 h-4" />
                Categories ({categories.length})
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs uppercase tracking-widest font-medium transition-all ${
                  activeTab === "products"
                    ? "bg-[#D4AF37] text-black shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Package className="w-4 h-4" />
                Products ({products.length})
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs uppercase tracking-widest font-medium transition-all ${
                  activeTab === "settings"
                    ? "bg-[#D4AF37] text-black shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Settings className="w-4 h-4" />
                Data & Backup
              </button>
            </div>

            {activeTab !== "settings" && (
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder={`Search ${activeTab}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#141414] border border-[#222222] rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                {activeTab === "categories" ? (
                  <button
                    onClick={handleOpenAddCat}
                    className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#c29e2f] text-black px-4 py-2 rounded-lg text-xs uppercase tracking-widest font-semibold transition-transform active:scale-95 whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" /> Add Category
                  </button>
                ) : (
                  <button
                    onClick={handleOpenAddProd}
                    className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#c29e2f] text-black px-4 py-2 rounded-lg text-xs uppercase tracking-widest font-semibold transition-transform active:scale-95 whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" /> Add Product
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Tab 1: Categories */}
          {activeTab === "categories" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((cat) => {
                const prodCount = products.filter((p) => p.categoryId === cat.id).length;
                return (
                  <div
                    key={cat.id}
                    className="bg-[#141414] rounded-2xl border border-[#222222] overflow-hidden hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between group"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-[#1A1A1A]">
                      <img
                        src={cat.coverImage}
                        alt={cat.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md text-[#D4AF37] px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase border border-[#D4AF37]/30">
                        {prodCount} {prodCount === 1 ? "Saree" : "Sarees"}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-xl text-white mb-2">{cat.name}</h3>
                        <p className="text-gray-400 text-xs line-clamp-2 font-light leading-relaxed mb-4">
                          {cat.shortDescription || cat.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#222222]">
                        <button
                          onClick={() => handleOpenEditCat(cat)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#222222] hover:bg-[#333333] text-white rounded text-xs transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Edit
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${cat.name}" category and its ${prodCount} products?`)) {
                              deleteCategory(cat.id);
                            }
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-950/50 hover:bg-red-900/80 text-red-300 rounded text-xs transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 2: Products */}
          {activeTab === "products" && (
            <div>
              {/* Category Filter Bar */}
              <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-6 no-scrollbar">
                <button
                  onClick={() => setSelectedCategoryFilter("all")}
                  className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
                    selectedCategoryFilter === "all"
                      ? "bg-[#D4AF37] text-black font-semibold"
                      : "bg-[#141414] text-gray-400 hover:text-white border border-[#222222]"
                  }`}
                >
                  All Categories ({products.length})
                </button>
                {categories.map((c) => {
                  const count = products.filter((p) => p.categoryId === c.id).length;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategoryFilter(c.id)}
                      className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
                        selectedCategoryFilter === c.id
                          ? "bg-[#D4AF37] text-black font-semibold"
                          : "bg-[#141414] text-gray-400 hover:text-white border border-[#222222]"
                      }`}
                    >
                      {c.name.replace(" Sarees", "")} ({count})
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((prod) => {
                  const parentCat = categories.find((c) => c.id === prod.categoryId);
                  return (
                    <div
                      key={prod.id}
                      className="bg-[#141414] rounded-2xl border border-[#222222] overflow-hidden hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between group"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-[#1A1A1A]">
                        <img
                          src={prod.images?.[0] || parentCat?.coverImage}
                          alt={prod.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        />
                        {prod.price && (
                          <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md text-[#D4AF37] px-3 py-1 rounded text-xs font-semibold tracking-wider border border-[#D4AF37]/40">
                            {prod.price}
                          </div>
                        )}
                        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md text-gray-300 px-2.5 py-1 rounded text-[10px] uppercase tracking-widest border border-white/10">
                          {parentCat?.name.replace(" Sarees", "") || "Saree"}
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif text-lg text-white mb-1 line-clamp-1">{prod.name}</h4>
                          <p className="text-gray-500 text-[11px] uppercase tracking-widest line-clamp-1 mb-4">
                            {prod.fabric}
                          </p>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#222222]">
                          <button
                            onClick={() => handleOpenEditProd(prod)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#222222] hover:bg-[#333333] text-white rounded text-xs transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Edit
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete product "${prod.name}"?`)) {
                                deleteProduct(prod.id);
                              }
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-950/50 hover:bg-red-900/80 text-red-300 rounded text-xs transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 3: Settings */}
          {activeTab === "settings" && (
            <div className="max-w-2xl bg-[#141414] rounded-2xl border border-[#222222] p-8">
              <h3 className="font-serif text-2xl text-white mb-4">Database Persistence & Sync</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Your additions, updates, and deletions are saved securely in your browser's local database. To transfer your changes permanently to another device or commit them into your source repository (`src/data/categories.json` & `products.json`), click Export below.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={exportCatalog}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#c29e2f] text-black font-semibold py-3 px-6 rounded-xl text-xs uppercase tracking-widest transition-transform active:scale-95"
                >
                  <Download className="w-4 h-4" /> Download JSON Backup
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to reset the catalog to default factory settings?")) {
                      resetCatalog();
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/50 py-3 px-6 rounded-xl text-xs uppercase tracking-widest transition-colors"
                >
                  <RotateCcw className="w-4 h-4" /> Reset Factory Catalog
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Modal: Category Form */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141414] border border-[#333333] rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsCatModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-2xl text-white mb-6">
              {editingCategory ? "Edit Category" : "Create New Category"}
            </h3>
            <form onSubmit={handleSaveCat} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Muga Silk Sarees"
                  value={catForm.name}
                  onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">URL Slug (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. muga-silk-sarees"
                  value={catForm.slug}
                  onChange={(e) => setCatForm({ ...catForm, slug: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Cover Image (Upload or URL) *</label>
                <div className="flex flex-col gap-3">
                  <label className="cursor-pointer flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] border border-dashed border-[#444444] hover:border-[#D4AF37] rounded-lg p-3 text-xs text-gray-300 transition-all">
                    <Upload className="w-4 h-4 text-[#D4AF37]" />
                    <span>Upload Image from Device (Auto-converts to WebP)</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const webpUrl = await convertImageToWebP(file);
                            setCatForm({ ...catForm, coverImage: webpUrl });
                          } catch (err) {
                            alert("Error converting image. Please try another file.");
                          }
                        }
                      }}
                    />
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="/images/categories/banarasi/1.webp or Data URL"
                    value={catForm.coverImage}
                    onChange={(e) => setCatForm({ ...catForm, coverImage: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                  {catForm.coverImage && (
                    <div className="w-16 h-16 rounded overflow-hidden border border-[#333333] bg-black">
                      <img src={catForm.coverImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Short Summary</label>
                <input
                  type="text"
                  placeholder="Brief 1-line specialty description"
                  value={catForm.shortDescription}
                  onChange={(e) => setCatForm({ ...catForm, shortDescription: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Full Description</label>
                <textarea
                  rows={3}
                  placeholder="Detailed craftsmanship & heritage summary..."
                  value={catForm.description}
                  onChange={(e) => setCatForm({ ...catForm, description: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCatModalOpen(false)}
                  className="px-5 py-2.5 bg-[#222222] hover:bg-[#333333] text-white rounded-lg text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#c29e2f] text-black font-semibold rounded-lg text-xs uppercase tracking-widest"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Product Form */}
      {isProdModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141414] border border-[#333333] rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsProdModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-2xl text-white mb-6">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h3>
            <form onSubmit={handleSaveProd} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Parent Category *</label>
                <select
                  required
                  value={prodForm.categoryId}
                  onChange={(e) => setProdForm({ ...prodForm, categoryId: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Saree Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Gold Zari Brocade Saree"
                  value={prodForm.name}
                  onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Price (Optional)</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-[#D4AF37] font-semibold">₹</span>
                    <input
                      type="text"
                      placeholder="45,000"
                      value={prodForm.price.replace(/^₹\s*/, "")}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9,.]/g, "");
                        setProdForm({ ...prodForm, price: val ? `₹${val}` : "" });
                      }}
                      className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg pl-8 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Fabric Specification</label>
                  <input
                    type="text"
                    placeholder="e.g. Pure Katan Silk"
                    value={prodForm.fabric}
                    onChange={(e) => setProdForm({ ...prodForm, fabric: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Image (Upload or URL) *</label>
                <div className="flex flex-col gap-3">
                  <label className="cursor-pointer flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] border border-dashed border-[#444444] hover:border-[#D4AF37] rounded-lg p-3 text-xs text-gray-300 transition-all">
                    <Upload className="w-4 h-4 text-[#D4AF37]" />
                    <span>Upload Image from Device (Auto-converts to WebP)</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const webpUrl = await convertImageToWebP(file);
                            setProdForm({ ...prodForm, imageUrl: webpUrl });
                          } catch (err) {
                            alert("Error converting image. Please try another file.");
                          }
                        }
                      }}
                    />
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="/images/categories/... or Data URL"
                    value={prodForm.imageUrl}
                    onChange={(e) => setProdForm({ ...prodForm, imageUrl: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                  {prodForm.imageUrl && (
                    <div className="w-16 h-16 rounded overflow-hidden border border-[#333333] bg-black">
                      <img src={prodForm.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Craftsmanship description..."
                  value={prodForm.description}
                  onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProdModalOpen(false)}
                  className="px-5 py-2.5 bg-[#222222] hover:bg-[#333333] text-white rounded-lg text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#c29e2f] text-black font-semibold rounded-lg text-xs uppercase tracking-widest"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Publish Live Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141414] border border-[#333333] rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-[#222222] mb-4">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <Globe className="w-5 h-5" />
                <h3 className="font-serif text-lg text-white">Publish to Live Website</h3>
              </div>
              <button onClick={() => !isPublishing && setShowPublishModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              To broadcast your catalog changes so <strong className="text-white">everyone on the web sees them immediately</strong>, enter your GitHub Personal Access Token (PAT) with repo permissions for <code className="text-[#D4AF37]">Ishan2220/Kanchikala</code>.
            </p>

            <div className="mb-5">
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">GitHub Token</label>
              <input
                type="password"
                placeholder="ghp_xxxx..."
                value={gitHubToken}
                onChange={(e) => setGitHubToken(e.target.value)}
                disabled={isPublishing}
                className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
              <p className="text-[10px] text-gray-500 mt-1">Saved locally in your browser for future syncs.</p>
            </div>

            {publishMessage && (
              <div className="mb-4 p-3 rounded-lg bg-[#1A1A1A] border border-[#333333] text-xs text-center text-[#D4AF37]">
                {publishMessage}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                disabled={isPublishing}
                onClick={() => setShowPublishModal(false)}
                className="px-4 py-2 bg-[#222222] hover:bg-[#333333] text-white rounded-lg text-xs uppercase tracking-widest disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isPublishing}
                onClick={async () => {
                  if (!gitHubToken) {
                    alert("Please enter a valid GitHub Token.");
                    return;
                  }
                  setIsPublishing(true);
                  setPublishMessage("Connecting to GitHub API...");
                  localStorage.setItem("kanchikala_github_token", gitHubToken);

                  const REPO_OWNER = "Ishan2220";
                  const REPO_NAME = "Kanchikala";
                  const BRANCH = "main";

                  try {
                    const updateGitHubFile = async (path: string, contentObj: any, commitMsg: string) => {
                      const getUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`;
                      const headers = {
                        Authorization: `token ${gitHubToken}`,
                        Accept: "application/vnd.github.v3+json",
                        "Content-Type": "application/json",
                      };

                      const getRes = await fetch(getUrl, { headers });
                      let sha: string | undefined;
                      if (getRes.ok) {
                        const getJson = await getRes.json();
                        sha = getJson.sha;
                      }

                      const contentStr = JSON.stringify(contentObj, null, 2);
                      const base64Content = btoa(unescape(encodeURIComponent(contentStr)));

                      const putUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;
                      const putRes = await fetch(putUrl, {
                        method: "PUT",
                        headers,
                        body: JSON.stringify({
                          message: commitMsg,
                          content: base64Content,
                          branch: BRANCH,
                          ...(sha ? { sha } : {}),
                        }),
                      });

                      if (!putRes.ok) {
                        const errData = await putRes.json();
                        throw new Error(`Failed to update ${path}: ${errData.message || putRes.statusText}`);
                      }
                    };

                    setPublishMessage("Publishing categories to repository...");
                    await updateGitHubFile("src/data/categories.json", categories, "Admin update: categories catalog");

                    setPublishMessage("Publishing products to repository...");
                    await updateGitHubFile("src/data/products.json", products, "Admin update: products catalog");

                    setPublishMessage("🎉 Successfully published! Live website will reflect changes shortly.");
                    setTimeout(() => {
                      setShowPublishModal(false);
                      setIsPublishing(false);
                      setPublishMessage("");
                    }, 3000);
                  } catch (error: any) {
                    console.error("Publish error:", error);
                    setPublishMessage(`❌ Error: ${error.message || "Failed to publish"}`);
                    setIsPublishing(false);
                  }
                }}
                className="px-5 py-2 bg-[#D4AF37] hover:bg-[#c29e2f] text-black font-semibold rounded-lg text-xs uppercase tracking-widest disabled:opacity-50"
              >
                {isPublishing ? "Publishing..." : "Publish Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

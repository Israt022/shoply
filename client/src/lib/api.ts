const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  avatar?: string | null;
  role: "User" | "Seller" | "Admin";
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string | null;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  stock: number;
  image?: string | null;
  categoryId: string;
  userId: string;
  isDeleted?: boolean;
  status: "AVAILABLE" | "OUT_OF_STOCK" | "DISCONTINUED";
  category?: Category;
  user?: Partial<User>;
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string | null;
  userId: string;
  productId: string;
  isDeleted?: boolean;
  user?: Partial<User>;
  product?: Product;
  createdAt?: string;
  updatedAt?: string;
}

export interface Wishlist {
  id: string;
  userId: string;
  productId: string;
  isDeleted?: boolean;
  user?: Partial<User>;
  product?: Product;
  createdAt?: string;
  updatedAt?: string;
}

export const uploadImageToImgBB = async (file: File): Promise<string> => {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_KEY;

  if (!apiKey) {
    throw new Error("ImgBB API key is missing");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error?.message || "Image upload failed");
  }

  return data.data.url;
};

async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  const data = await res.json();
  if (!res.ok || data.success === false) {
    throw new Error(data.message || "An error occurred while fetching data");
  }
  return data;
}

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    return fetcher<{ success: boolean; message: string; data: User }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  register: async (userData: { name: string; email: string; password: string }) => {
    return fetcher<{ success: boolean; message: string; data: User }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },
  getUsers: async () => {
    return fetcher<{ success: boolean; message: string; data: User[] }>("/auth");
  },
};

export const productApi = {
  getAll: async () => {
    return fetcher<{ success: boolean; message: string; data: Product[] }>("/api/products");
  },
  getById: async (id: string) => {
    return fetcher<{ success: boolean; message: string; data: Product }>(`/api/products/${id}`);
  },
  create: async (productData: {
    title: string;
    description?: string;
    price: number;
    stock: number;
    image?: string;
    categoryId: string;
    userId: string;
  }) => {
    return fetcher<{ success: boolean; message: string; data: Product }>("/api/products", {
      method: "POST",
      body: JSON.stringify(productData),
    });
  },
  update: async (
    id: string,
    productData: Partial<{
      title: string;
      description: string;
      price: number;
      stock: number;
      image: string;
      categoryId: string;
    }>
  ) => {
    return fetcher<{ success: boolean; message: string; data: Product }>(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    });
  },
  delete: async (id: string) => {
    return fetcher<{ success: boolean; message: string; data: Product }>(`/api/products/${id}`, {
      method: "DELETE",
    });
  },
};

export const categoryApi = {
  getAll: async () => {
    return fetcher<{ success: boolean; message: string; data: Category[] }>("/api/categories");
  },
  create: async (categoryData: { name: string }) => {
    return fetcher<{ success: boolean; message: string; data: Category }>("/api/categories", {
      method: "POST",
      body: JSON.stringify(categoryData),
    });
  },
};

export const reviewApi = {
  getAll: async () => {
    return fetcher<{ success: boolean; message: string; data: Review[] }>("/api/reviews");
  },
  getById: async (id: string) => {
    return fetcher<{ success: boolean; message: string; data: Review }>(`/api/reviews/${id}`);
  },
  create: async (reviewData: {
    rating: number;
    comment?: string;
    userId: string;
    productId: string;
  }) => {
    return fetcher<{ success: boolean; message: string; data: Review }>("/api/reviews", {
      method: "POST",
      body: JSON.stringify(reviewData),
    });
  },
  update: async (id: string, reviewData: { rating?: number; comment?: string }) => {
    return fetcher<{ success: boolean; message: string; data: Review }>(`/api/reviews/${id}`, {
      method: "PUT",
      body: JSON.stringify(reviewData),
    });
  },
  delete: async (id: string) => {
    return fetcher<{ success: boolean; message: string; data: Review }>(`/api/reviews/${id}`, {
      method: "DELETE",
    });
  },
};

export const wishlistApi = {
  getByUserId: async (userId: string) => {
    return fetcher<{ success: boolean; message: string; data: Wishlist[] }>(`/api/wishlists/user/${userId}`);
  },
  add: async (data: { userId: string; productId: string }) => {
    return fetcher<{ success: boolean; message: string; data: Wishlist }>("/api/wishlists", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  remove: async (id: string) => {
    return fetcher<{ success: boolean; message: string; data: Wishlist }>(`/api/wishlists/${id}`, {
      method: "DELETE",
    });
  },
};

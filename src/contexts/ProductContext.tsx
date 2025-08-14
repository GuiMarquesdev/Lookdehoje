import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Measurements {
  bust?: string;
  waist?: string;
  hips?: string;
  length?: string;
  shoulder?: string;
  sleeve?: string;
  notes?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  additionalImages?: string[];
  description: string;
  size: string;
  available: boolean;
  measurements?: Measurements;
  createdAt: string;
  updatedAt: string;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleAvailability: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

const STORAGE_KEY = 'fashion_rental_products';

// Produtos iniciais para demonstração
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Vestido Elegante Preto',
    category: 'Vestidos',
    price: 'R$ 120/dia',
    image: '/src/assets/dress-1.jpg',
    description: 'Vestido elegante para ocasiões especiais',
    size: 'M',
    available: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Terno Executivo',
    category: 'Ternos',
    price: 'R$ 200/dia',
    image: '/src/assets/suit-1.jpg',
    description: 'Terno executivo para reuniões importantes',
    size: 'G',
    available: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Look Casual Chic',
    category: 'Casual',
    price: 'R$ 80/dia',
    image: '/src/assets/casual-1.jpg',
    description: 'Look casual para o dia a dia',
    size: 'P',
    available: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  // Carregar produtos do localStorage na inicialização
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProducts(JSON.parse(stored));
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        setProducts(initialProducts);
      }
    } else {
      setProducts(initialProducts);
    }
  }, []);

  // Salvar produtos no localStorage sempre que a lista mudar
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id
          ? { ...product, ...updates, updatedAt: new Date().toISOString() }
          : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const toggleAvailability = (id: string) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id
          ? { ...product, available: !product.available, updatedAt: new Date().toISOString() }
          : product
      )
    );
  };

  const getProduct = (id: string) => {
    return products.find(product => product.id === id);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleAvailability,
        getProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
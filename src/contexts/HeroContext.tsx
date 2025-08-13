import React, { createContext, useContext, useEffect, useState } from 'react';

export type HeroImageMode = 'static' | 'carousel';

export interface HeroImage {
  id: string;
  url: string;
  alt: string;
}

interface HeroContextType {
  mode: HeroImageMode;
  images: HeroImage[];
  setMode: (mode: HeroImageMode) => void;
  addImage: (image: Omit<HeroImage, 'id'>) => void;
  updateImage: (id: string, image: Partial<HeroImage>) => void;
  deleteImage: (id: string) => void;
  reorderImages: (images: HeroImage[]) => void;
}

const HeroContext = createContext<HeroContextType | undefined>(undefined);

export const useHero = () => {
  const context = useContext(HeroContext);
  if (!context) {
    throw new Error('useHero must be used within a HeroProvider');
  }
  return context;
};

const HERO_STORAGE_KEY = 'fashion_rental_hero_config';

export const HeroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<HeroImageMode>('static');
  const [images, setImages] = useState<HeroImage[]>([
    {
      id: '1',
      url: '/lovable-uploads/4d8afebf-4451-456f-9224-6d0bb556cd5a.png',
      alt: 'Elegant fashion collection'
    }
  ]);

  useEffect(() => {
    const stored = localStorage.getItem(HERO_STORAGE_KEY);
    if (stored) {
      try {
        const config = JSON.parse(stored);
        setModeState(config.mode || 'static');
        setImages(config.images || images);
      } catch (error) {
        console.error('Erro ao carregar configuração do hero:', error);
      }
    }
  }, []);

  const saveToStorage = (newMode: HeroImageMode, newImages: HeroImage[]) => {
    localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify({
      mode: newMode,
      images: newImages
    }));
  };

  const setMode = (newMode: HeroImageMode) => {
    setModeState(newMode);
    saveToStorage(newMode, images);
  };

  const addImage = (image: Omit<HeroImage, 'id'>) => {
    if (images.length >= 3) {
      throw new Error('Máximo de 3 imagens permitidas');
    }
    const newImage: HeroImage = {
      ...image,
      id: Date.now().toString()
    };
    const newImages = [...images, newImage];
    setImages(newImages);
    saveToStorage(mode, newImages);
  };

  const updateImage = (id: string, imageUpdate: Partial<HeroImage>) => {
    const newImages = images.map(img => 
      img.id === id ? { ...img, ...imageUpdate } : img
    );
    setImages(newImages);
    saveToStorage(mode, newImages);
  };

  const deleteImage = (id: string) => {
    if (images.length <= 1) {
      throw new Error('Pelo menos uma imagem é necessária');
    }
    const newImages = images.filter(img => img.id !== id);
    setImages(newImages);
    saveToStorage(mode, newImages);
  };

  const reorderImages = (newImages: HeroImage[]) => {
    setImages(newImages);
    saveToStorage(mode, newImages);
  };

  return (
    <HeroContext.Provider value={{
      mode,
      images,
      setMode,
      addImage,
      updateImage,
      deleteImage,
      reorderImages
    }}>
      {children}
    </HeroContext.Provider>
  );
};
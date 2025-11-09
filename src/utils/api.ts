import { Dog } from '@/types/siteContent';

const API_BASE = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api' : '/api';

// Fallback to localStorage in development if API fails
const useFallback = process.env.NODE_ENV === 'development';

export const dogApi = {
  getAll: async (): Promise<Dog[]> => {
    try {
      const response = await fetch(`${API_BASE}/dogs`);
      if (!response.ok) throw new Error('Failed to fetch dogs');
      const data = await response.json();
      return data.map((dog: any) => ({
        ...dog,
        isSponsored: dog.is_sponsored
      }));
    } catch (error) {
      if (useFallback) {
        console.warn('API failed, using localStorage fallback');
        const saved = localStorage.getItem('poppy-paws-dogs');
        return saved ? JSON.parse(saved) : [];
      }
      throw error;
    }
  },

  create: async (dog: Omit<Dog, 'id'>): Promise<Dog> => {
    try {
      const response = await fetch(`${API_BASE}/dogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...dog,
          isSponsored: dog.isSponsored
        }),
      });
      if (!response.ok) throw new Error('Failed to create dog');
      const data = await response.json();
      return {
        ...data,
        isSponsored: data.is_sponsored
      };
    } catch (error) {
      if (useFallback) {
        console.warn('API failed, using localStorage fallback');
        const newDog = { ...dog, id: Date.now() };
        const saved = localStorage.getItem('poppy-paws-dogs');
        const dogs = saved ? JSON.parse(saved) : [];
        dogs.push(newDog);
        localStorage.setItem('poppy-paws-dogs', JSON.stringify(dogs));
        return newDog;
      }
      throw error;
    }
  },

  update: async (id: number, dog: Omit<Dog, 'id'>): Promise<Dog> => {
    try {
      const response = await fetch(`${API_BASE}/dogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...dog,
          isSponsored: dog.isSponsored
        }),
      });
      if (!response.ok) throw new Error('Failed to update dog');
      const data = await response.json();
      return {
        ...data,
        isSponsored: data.is_sponsored
      };
    } catch (error) {
      if (useFallback) {
        console.warn('API failed, using localStorage fallback');
        const updatedDog = { ...dog, id };
        const saved = localStorage.getItem('poppy-paws-dogs');
        const dogs = saved ? JSON.parse(saved) : [];
        const index = dogs.findIndex((d: Dog) => d.id === id);
        if (index !== -1) dogs[index] = updatedDog;
        localStorage.setItem('poppy-paws-dogs', JSON.stringify(dogs));
        return updatedDog;
      }
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE}/dogs/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete dog');
    } catch (error) {
      if (useFallback) {
        console.warn('API failed, using localStorage fallback');
        const saved = localStorage.getItem('poppy-paws-dogs');
        const dogs = saved ? JSON.parse(saved) : [];
        const filtered = dogs.filter((d: Dog) => d.id !== id);
        localStorage.setItem('poppy-paws-dogs', JSON.stringify(filtered));
        return;
      }
      throw error;
    }
  },
};
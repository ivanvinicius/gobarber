import React, { createContext, useCallback, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

import ToastContainer from '../components/ToastContainer';

interface IToastContext {
  addToast(message: Omit<IToastMessages, 'id'>): void;
  removeToast(id: string): void;
}

export interface IToastMessages {
  id: string;
  type?: 'info' | 'success' | 'error';
  title: string;
  description?: string;
}

const ToastContext = createContext<IToastContext>({} as IToastContext);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<IToastMessages[]>([]);
  const [limitMessages, setLimitMessages] = useState(0);

  const addToast = useCallback(
    ({ type, title, description }: Omit<IToastMessages, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      if (limitMessages < 5) {
        setLimitMessages((state) => state + 1);
        setMessages((state) => [...state, toast]);
      }
    },
    [limitMessages],
  );

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id));
    setLimitMessages((state) => state - 1);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): IToastContext {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };

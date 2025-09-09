// src/AppInitializer.tsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setClient } from './redux/Slice/ClientSlice';

export const AppInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const client = localStorage.getItem('client');
    if (client) {
      dispatch(setClient(JSON.parse(client)));
    }
  }, [dispatch]);

  return null;
};
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = () => AsyncStorage.getItem('token');

export const setToken = (token: string) => AsyncStorage.setItem('token', token);

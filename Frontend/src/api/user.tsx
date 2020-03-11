import axios from 'axios';
import { apiEndpointOf } from '../const';

export const register = async (user: any) => (await axios(apiEndpointOf('/register'))).data;
export const login = async (email: string, password: string) => (await axios(apiEndpointOf('/login'))).data;
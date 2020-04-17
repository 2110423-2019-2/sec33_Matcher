import axios from 'axios';
import { apiEndpointOf } from '../const';

export const getUserList = async () => (await axios.get(apiEndpointOf('/admin/users'), { withCredentials: true })).data;

export const blackList = async (id: string) => await axios.get(apiEndpointOf(`/admin/blacklist/${id}`), { withCredentials: true });

export const getReport = async () => (await axios.get(apiEndpointOf('/report'), { withCredentials: true })).data;
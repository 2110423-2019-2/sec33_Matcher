import axios from 'axios';
import { apiEndpointOf } from '../const';

export const getPhotographerProfile = async (id: string) =>
    (await axios.get(apiEndpointOf(`/profile/${id}`), { withCredentials: true })).data;
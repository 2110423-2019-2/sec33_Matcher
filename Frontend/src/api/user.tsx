import axios from 'axios';
import { apiEndpointOf } from '../const';

interface LoginPayload {
    email: string;
    password: string;
}

interface RegisterPayload {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    role: string;
}

interface EditProfilePayload {
    password: string;
    firstname: string;
    lastname: string;
}

export const editProfile = async ({ password, firstname, lastname }: EditProfilePayload) =>
    await axios.post(apiEndpointOf('/profile/update'), { password, firstname, lastname }, { withCredentials: true });

export const register = async ({ email, password, firstname, lastname, role }: RegisterPayload) =>
    await axios.post(apiEndpointOf('/register'), { email, password, firstname, lastname, role });

export const login = async ({ email, password }: LoginPayload) =>
    await axios.post(apiEndpointOf('/login'), { email, password }, { withCredentials: true });

export const deleteUser = async (id: string) => await axios.delete(apiEndpointOf(`/profile/delete/${id}`), { withCredentials: true });

export const logout = async () => await axios.get(apiEndpointOf('/logout'), { withCredentials: true });

export const whoami = async () => (await axios.get(apiEndpointOf('/whoami'), { withCredentials: true })).data;
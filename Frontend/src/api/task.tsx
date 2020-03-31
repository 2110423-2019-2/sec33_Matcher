import axios from 'axios';
import { apiEndpointOf } from '../const';


export const matchTask = async (id: string) => (await axios.get(apiEndpointOf(`/task/accept/${id}`), { withCredentials: true })).data;
export const getAllTasks = async () => (await axios.get(apiEndpointOf('/tasks'))).data;
export const getTaskById = async (id: string) => (await axios.get(apiEndpointOf(`/task/${id}`))).data;
export const getAvailableTasks = async () => (await axios.get(apiEndpointOf('/task/available'), { withCredentials: true })).data;
export const getMatchedTasks = async () => (await axios.get(apiEndpointOf('/task/matched'), { withCredentials: true })).data;
export const getFinishedTasks = async () => (await axios.get(apiEndpointOf('/task/finished'), { withCredentials: true })).data;
export const upsertTask = async (id?: string, task?: any) => {
    if (!id) return (await axios.post(apiEndpointOf('/task'), task, { withCredentials: true }));
    return (await axios.put(apiEndpointOf(`/task/${id}`), task, { withCredentials: true }))
}
export const deleteTask = async (id: string) => (await axios.delete(apiEndpointOf(`/task/${id}`), { withCredentials: true })).data;
export const rateTask = (taskId: string, rating: number | null, comment?: string):Promise<any> =>
    (axios.post(apiEndpointOf('/task/rate'), {taskId, rating, comment}));

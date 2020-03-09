import axios from 'axios';
import { apiEndpointOf } from '../const';

export const getAllTasks = async () => (await axios.get(apiEndpointOf('/tasks'))).data;
export const getTaskById = async (id: string) => (await axios.get(apiEndpointOf(`/task/${id}`))).data;
export const upsertTask = async (id?: string, task?: any) => {
    if (!id) return (await axios.post(apiEndpointOf('/createtask')), task).data;
    return (await axios.put(apiEndpointOf(`/task/${id}`), task))
}
export const deleteTask = async (id: string) => (await axios.delete(apiEndpointOf(`/task/${id}`))).data;
import axios from 'axios'
import { apiEndpointOf } from '../const'

//#########  not yet implemented!!!  #########
export const getAllWorkshops = async (name?: string) =>
  (await axios.get(apiEndpointOf('/workshops'), name ? { params: { name } } : {} )).data
export const upsertWorkshop = async (workshop: any, id?: string) => {
  if (!id) return axios.post(apiEndpointOf('/workshop'), workshop) // Create New
  else return axios.put(apiEndpointOf(`/workshop/${id}`), workshop)
}
export const deleteWorkshop = (id: string) => axios.delete(apiEndpointOf(`/workshop/${id}`))
export const getWorkshopById = async (id: string) => (await axios.get(apiEndpointOf(`/workshop/${id}`))).data
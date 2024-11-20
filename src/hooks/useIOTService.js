import axios from 'axios'

const BASE_URL = 'https://www.credizone.online:8089'

const iotService = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const createSensor = async (id, password) => {
    try {
        const requestBody = {
            id,
            password,
            deviceTypeId: 1,
        }

        const response = await iotService.post('/api/v1/iot/init', requestBody)

        return response.data
    } catch (error) {
        console.error('Error al crear el sensor:', error)
        throw error
    }
}
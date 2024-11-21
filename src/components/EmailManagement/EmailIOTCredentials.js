import emailjs from 'emailjs-com'
import ToastManager from '../RentState Components/ToastManager'
import { getUser } from '../../hooks/useUserService'
import { createSensor } from '../../hooks/useIOTService'

export const EmailIOTCredentials = async () => {
    try {
        const userId = localStorage.getItem('userId')
        const token = localStorage.getItem('token')
        const userData = await getUser(userId, token)
        const generatedId = Math.floor(1000 + Math.random() * 9000).toString()
        const generatedPassword = Math.random().toString(36).substring(2, 10)

        console.log('Generando sensor con:', { id: generatedId, password: generatedPassword })

        const sensorResponse = await createSensor(generatedId, generatedPassword)
        console.log('Sensor creado:', sensorResponse)

        const templateParams = {
            NOMBRE_USUARIO: userData.name,
            ID_GENERADO: generatedId,
            CONTRA_GENERADA: generatedPassword,
            email: userData.email,
        }

        console.log('Datos que se enviarán al correo:', templateParams)

        await emailjs.send(
            'service_hdbkc1f', // Service ID
            'template_g3um7zo', // Template ID
            templateParams,
            'EwSLU0vhgjhRMLgY2' // Public Key
        )

        console.log('Correo enviado exitosamente.')
        ToastManager.success('¡Correo enviado exitosamente!')
    } catch (error) {
        console.error('Error al procesar la solicitud:', error)
        ToastManager.error('Hubo un problema al registrar el dispositivo o enviar el correo.')
    }
}
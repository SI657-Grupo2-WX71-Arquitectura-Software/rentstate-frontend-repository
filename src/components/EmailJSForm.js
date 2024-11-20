import React from 'react'
import emailjs from 'emailjs-com'
import ToastManager from './RentState Components/ToastManager'

const EmailJSForm = () => {
    const sendEmail = (e) => {
        e.preventDefault()

        const templateParams = {
        NOMBRE_USUARIO: 'Nirvana',
        ID_GENERADO: '9',
        CONTRA_GENERADA: 'string',
        email: 'gentemortal@gmail.com',
        }

        emailjs
        .send(
            'service_hdbkc1f', // Service ID
            'template_g3um7zo', // Template ID
            templateParams,
            'EwSLU0vhgjhRMLgY2' // Public Key
        )
        .then(
            (result) => {
                console.log('Correo enviado:', result.text)
                ToastManager.success('¡Correo enviado exitosamente!')
            },
            (error) => {
                console.error('Error al enviar correo:', error.text)
                ToastManager.error('Hubo un problema al enviar el correo.')
            }
        )
    }

    return (
        <div>
            <h2>Enviar correo de agradecimiento</h2>
            <form onSubmit={sendEmail}>
                <button type="submit">Enviar correo</button>
            </form>
        </div>
    )
}

export default EmailJSForm
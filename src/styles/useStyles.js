import { makeStyles } from '@mui/styles';

export const useStylesLogin = makeStyles(() => ({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: '20px',
        backgroundImage: 'url("/assets/background-login.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden'
    },
    darkOverlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.28)',
        zIndex: 1
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
        padding: '20px',
        maxWidth: '500px',
        minWidth: '300px',
        width: '80%',
    },
    inputField: { 
        width: '100%',
        maxWidth: '400px',
        minWidth: '250px',
    },
    buttonContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    button: { 
        minWidth: '100px', 
        maxWidth: '300px',
        width: '50%',
    },
    buttonContainerBase: {
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        width: '280px',
        color: '#FFFFFF',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: 20,
        padding: '15px 0',
        minWidth: '2rem',
        maxWidth: 'none',
    },    
    buttonContainerEnabled: {
        backgroundColor: '#00283E',
        cursor: 'pointer',
    },
    buttonContainerDisabled: {
        backgroundColor: '#7E7E7E',
        cursor: 'not-allowed',
    }
   
}));

export const useStylesRegister = makeStyles(() => ({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: '20px',
        backgroundImage: 'url("/assets/background-login.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden'
    },
    darkOverlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.28)',
        zIndex: 1
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
        padding: '20px',
        maxWidth: '500px',
        minWidth: '300px',
        width: '80%',
    },
    inputField: { 
        width: '100%',
        maxWidth: '400px',
        minWidth: '250px',
    },
    buttonContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    button: { 
        minWidth: '100px', 
        maxWidth: '300px',
        width: '50%',
    },
    buttonContainerBase: {
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        width: '280px',
        color: '#FFFFFF',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: 20,
        padding: '15px 0',
        minWidth: '2rem',
        maxWidth: 'none',
    },    
    buttonContainerEnabled: {
        backgroundColor: '#00283E',
        cursor: 'pointer',
    },
    buttonContainerDisabled: {
        backgroundColor: '#7E7E7E',
        cursor: 'not-allowed',
    },
    title: {
        color: 'white', fontWeight: 'lighter', fontSize: '2rem', textAlign: 'center', margin: 0 
    },
    subtitle: {
        color: 'white', fontWeight: 'lighter', fontSize: '1.3rem', textAlign: 'center', marginTop: 0
    },
    fieleditscontainer: {
        display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' 
    },
    returnButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 1000,
        width: 25,
        height: 25,
        padding: 0,
        margin: '30px 10px',
        '&:hover': {
            background: 'none',
            textDecoration: 'none'
        }
    },
    formContainerStep3: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
        padding: '20px',
        maxWidth: '1200px',
        minWidth: '300px',
        width: '80%',
    },
    formContainerStep4: {
        display: 'flex',
        flexDirection: 'row',
        gap: '2rem',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
        width: '100vw',
        height:'100vh'
    },
}));

export const useStylesButtonComponent = makeStyles(() => ({
    buttonBase: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '280px',
        color: '#FFFFFF',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: 20,
        padding: '15px 0',
        minWidth: '2rem',
        maxWidth: 'none',
        backgroundColor: '#00283E',
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
        '&:disabled': {
            backgroundColor: '#7E7E7E',
            cursor: 'not-allowed',
        }
    }
}));
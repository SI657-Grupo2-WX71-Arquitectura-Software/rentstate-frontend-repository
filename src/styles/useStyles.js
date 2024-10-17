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

export const useStylesChat = makeStyles(() => ({
    chat: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    contactList: {
      width: '200px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      marginRight: '20px',
      padding: '20px',
    },
    contactImg: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      objectFit: 'cover',
    },
    receiverImg: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      objectFit: 'cover',
    },
    receiverInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px',
    },
    receiverInfoImg: {
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      objectFit: 'cover',
    },
    receiverInfoSpan: {
      fontSize: '1.2rem',
      fontWeight: 500,
      color: 'white',
    },
    contact: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px',
      cursor: 'pointer',
      borderRadius: '4px',
      transition: 'background-color 0.2s',
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
    },
    contactSelected: {
      backgroundColor: '#4b8af7',
      color: 'white',
    },
    chatBox: {
      width: '400px',
      height: '500px',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '8px',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    },
    top: {
      backgroundColor: '#4b8af7',
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
    },
    center: {
      flex: 1,
      padding: '20px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
    },
    chatDefault: {
      fontWeight: 600,
    },
    chatMessage: {
      maxWidth: '70%',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '10px',
      alignSelf: 'flex-start',
      backgroundColor: '#f0f0f0',
      color: '#333',
      '&.own': {
        alignSelf: 'flex-end',
        backgroundColor: '#99baf3',
      },
    },
    bottom: {
      borderTop: '1px solid #4b8af7',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
    },
    bottomTextarea: {
      flex: 1,
      height: '40px',
      border: 'none',
      borderRadius: '4px',
      padding: '10px',
      resize: 'none',
    },
    bottomButton: {
      marginLeft: '10px',
      padding: '10px 20px',
      backgroundColor: '#4b8af7',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    contactSpan: {
      fontSize: '1rem',
      fontWeight: 500,
      color: 'black',
    }
 }));

export const useStylesMyAccount = makeStyles(() => ({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: '100vh',
        width: '95vw',
    },
    containerDivisor: {
        display: 'flex',
        gap: '2rem',
        justifyContent: 'flex-start',
        padding: '7rem 2rem 2.2rem 2rem',
        width: '100%',
        height: '83vh',
    },
    profileCard: {
        backgroundColor: '#F2F2F2',
        borderRadius: '2rem',
        width: '25rem',
        height: '75vh',
        padding: '2rem',
        paddingRight:'1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    tabsSection: {
        width: '80%',
    },
    title: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#626262',
    },
    subtitle: {
        fontSize: '1rem',
        fontWeight: 'normal',
        color: '#6C6B6B',
    },
    dataContainer: {
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'flex-start', 
        alignItems: 'flex-start',
        gap:'10px',
        margin:'1rem 1rem 1rem 0'
    },
    icon: {
        marginRight: '10px',
    },
    text: {
        fontSize: '1rem',
        fontWeight: 'normal',
        color: '#6C6B6B',
        display: 'flex',
        alignItems: 'center',
    },
    tabsButtons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
    },
    tabButton: {
        backgroundColor: '#F2F2F2',
        padding: '1rem 1.6rem',
        borderRadius: '5rem',
        cursor: 'pointer',
        color: '#6C6B6B',
        transition: 'background-color 0.3s ease',
    },
    tabButtonSelected: {
        backgroundColor: '#CECECE',
    },
    tabContent: {
        margin: '1rem 0',
        height: '71vh',
        padding:'1rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        alignItems: 'center',
    },
    configOption: {
        backgroundColor: '#F2F2F2', 
        padding: '2rem 1.5rem',
        borderRadius: '1rem',
        cursor: 'pointer',
        textAlign: 'left',
        width: '50vw',
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
    },
    switchOptionContainer: {
        padding: '0.5rem 1.5rem',
        borderRadius: '1rem',
        textAlign: 'left',
        width: '50vw',
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonsContainer: {
        display:'flex',
        gap:'1.5rem',
    },
    button: {
        padding: '0.8rem 3rem',
        borderRadius: '1.5rem',
        cursor: 'pointer',
        color: 'white',
        marginTop: '1.5rem',
    }
}));
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
        transition: 'background-color 0.2s ease',
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
        textAlign: 'left',
        width: '50vw',
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background-color 0.2s ease',
        '&:hover': {
            transition: 'background-color 0.2s ease',
            backgroundColor: '#E5E5E5',
            cursor: 'pointer'
        }
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

export const useStylesSearchBarComponent = makeStyles(() => ({
    searchBar: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #C8C8C8',
        borderRadius: '5rem',
        padding: '0.5rem 1rem',
        boxSizing: 'border-box',
        opacity: 0.8,
    },
      input: {
        flex: 1,
        border: 'none',
        outline: 'none',
        fontSize: '1rem',
        backgroundColor: 'transparent',
        color: '#7B7979',
        opacity: 0.8,
    },
      icon: {
        height: '1.3rem',
        cursor: 'pointer',
        color:'#959595'
    }
}));

export const useStylesInquilinoCard = makeStyles(() => ({
    cardContainer: {
        backgroundColor: '#F2F2F2',
        borderRadius: '30px',
        margin: '10px',
        border:'none',
        borderColor:'transparent',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'background-color 0.2s ease',
        width: '25%',        
        '&:hover': {
            transition: 'background-color 0.2s ease',
            backgroundColor: '#E5E5E5',
            cursor: 'pointer'
        }
    },
    profileImage: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover',
        margin:'5px 0'
    },
    title: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#626262',
    },
    text: {
        color: '#6C6B6B',
        fontSize: '1.1rem',     
    },
    active: {
        color: '#487847',
        fontWeight:'bold',
    },
    inactive: {
        color: '#CC3434',
        fontWeight:'bold',
    },
}));

export const useStylesPropertyCard = makeStyles(() => ({
    cardContainer: {
        backgroundColor: '#F2F2F2',
        borderRadius: '20px',
        margin: '15px',
        overflow: 'hidden',
        width: '300px',
        position: 'relative',
        transition: 'background-color 0.2s ease',
        '&:hover': {
            transition: 'background-color 0.2s ease',
            backgroundColor: '#E5E5E5',
            cursor: 'pointer'
        }
    },
    propertyImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
    },
    iconsContainer: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        gap: '10px',
        zIndex: 1000,
        display:'flex',  
        padding:'10px 0',
    },
    icon: {
        width: '24px',
        height: '24px',
        filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 1))'
    },    
    propertyDetails: {
        padding: '10px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        textAlign: 'left',
    },
    title: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#626262',
    },
    active: {
        color: '#487847',
    },
    inactive: {
        color: '#CC3434',
    },

    propertyBottom: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px 15px 20px',
    },
    ownerInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
    },
    ownerImage: {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        objectFit: 'cover',
    },
    viewMapText: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '0.7rem',
        color: '#04476C',
        fontWeight: 'bold',
        cursor: 'pointer',
    }
}));

export const useStylesMyProperties = makeStyles(() => ({
    scrollableDiv: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        maxHeight: '75vh',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: '12px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#D4D4D4',
            borderRadius: '10px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#F0F0F0',
            borderRadius: '10px',
        },
        '&::-webkit-scrollbar-button': {
            display: 'none',
        },
    },
}));

export const useStylesMyTenants = makeStyles(() => ({
    scrollableDiv: {
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        width: '100%',
        maxHeight: '75vh',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: '12px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#D4D4D4',
            borderRadius: '10px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#F0F0F0',
            borderRadius: '10px',        
        },
        '&::-webkit-scrollbar-button': {
            display: 'none',
        },
    },
}));

export const deleteAccountModalStyles = makeStyles(() => ({
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(6px)', 
    },
    modal: {
        backgroundColor: '#FFFFFF',
        borderRadius: '30px',
        padding: '2rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        textAlign: 'left',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '60vh',
    },
    title: {
        color: '#434343',
        fontWeight:'bolder',
        fontSize: '1.5rem',            
    },
    buttonsContainer: {
        display: 'flex',
        gap:'1rem',
        width: '100%',
        marginTop: '20px',
        justifyContent:'center',
    },
    button: {
        padding: '0.8rem 3rem',
        borderRadius: '1.5rem',
        cursor: 'pointer',
        color: 'white',
        '&:first-child': {
            backgroundColor: '#00283E',
        },
        '&:last-child': {
            backgroundColor: '#CC3434',
        },
    },
}));

export const interestedZonesModalStyles = makeStyles(() => ({
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(6px)', 
    },
    modal: {
        backgroundColor: '#FFFFFF',
        borderRadius: '30px',
        padding: '2rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        textAlign: 'left',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100vh',
    },
    textTopContainer: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#434343',
        fontWeight:'bolder',
        fontSize: '1.5rem',            
    },
    buttonsContainer: {
        display: 'flex',
        gap:'1rem',
        width: '100%',
        marginTop: '20px',
        justifyContent:'center',
    },
    button: {
        padding: '0.8rem 3rem',
        borderRadius: '1.5rem',
        cursor: 'pointer',
        color: 'white',
        '&:first-child': {
            backgroundColor: '#00283E',
        },
        '&:last-child': {
            backgroundColor: '#CC3434',
        },
    },
}));

export const preciseNeedsModalStyles = makeStyles(() => ({
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(6px)', 
    },
    modal: {
        backgroundColor: '#FFFFFF',
        borderRadius: '30px',
        padding: '2rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        textAlign: 'left',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100vh',
    },
    textTopContainer: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#434343',
        fontWeight:'bolder',
        fontSize: '1.5rem',            
    },
    buttonsContainer: {
        display: 'flex',
        gap:'1rem',
        width: '100%',
        marginTop: '20px',
        justifyContent:'center',
    },
    button: {
        padding: '0.8rem 3rem',
        borderRadius: '1.5rem',
        cursor: 'pointer',
        color: 'white',
        '&:first-child': {
            backgroundColor: '#00283E',
        },
        '&:last-child': {
            backgroundColor: '#CC3434',
        },
    },
    needContainer : {
        margin:'30px 0 10px 0', 
        padding:'1rem 1rem', 
        display:'flex', 
        gap:'1rem', 
        justifyContent:'center'
    },
    needColumn: {
        backgroundColor: '#EFEFEF',
        padding:'1rem 1.4rem', 
        borderRadius:'1rem',
        textAlign:'left',
        width:'100%',
        height:'40vh',
    },
    titleCard: {
        color: '#6C6B6B',
        fontWeight:'bolder',
        fontSize: '1rem',
        marginBottom:'10px' 
    },
    checkbox: {
        position: 'relative',
        opacity: 0,
        width: '0',
        height: '0',
        '& + span': {
            display: 'inline-block',
            width: '13px',
            height: '12px',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '0.25em',
            verticalAlign: 'middle',
            transition: 'background 0.3s, border-color 0.3s',
            cursor: 'pointer',
            marginRight: '8px',
            marginBottom: '1px',
            position: 'relative',
        },
        '&:checked + span': {
            background: '#00283E',
            borderColor: '#00283E',
            '&::before': {
                content: '"\\2713"',
                color: '#fff',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '10px',
            }
        }
    },    
    
    subtitleCard: {
        margin: '5px 0',
        color: '#6C6B6B',
    }

}));
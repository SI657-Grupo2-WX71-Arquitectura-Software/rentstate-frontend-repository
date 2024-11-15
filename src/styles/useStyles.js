import { makeStyles } from '@mui/styles';

export const navbarStyles = makeStyles(() => ({
    navbar: {
        width: '100%',   
        position: 'fixed',
        top: 0,
        backdropFilter: 'blur(5px)',
        zIndex: 1000,
        padding: '0.8em 0rem',
        backgroundColor: 'rgba(5, 31, 44, 0.938)',
        boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.2)',
        alignContent: 'center',
        textAlign: 'center',
    },
    navbarContainer: {
        display: 'flex',
        gap: '2rem',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0 1.5rem',
    },
    iconButtonContainer: {
        display: 'flex',
        gap: '0.5rem',
    },
    logoButton: {
        padding: 0,
    },
    logoImage: {
        height: '2rem',
        margin: 0,
    },
    iconLinkContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    iconButton: {
        fontSize: '2rem',
        cursor: 'pointer',
        marginRight: '0.3rem',
    }, 
    profileImage: {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        objectFit: 'cover'
    }   
}));

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
        color: '#FFFFFF',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: 20,
        padding: '15px 20px',
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

export const chatStyles = makeStyles(() => ({
    chat: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '80vw',
        gap:'3rem',       
    },
    contactListContainer: {
        //width: '20%',
        width: '25rem',
        backgroundColor: '#F2F2F2',
        borderRadius: '2rem',
        padding: '1rem',
    },
    searchBarContainer: {
        margin: '0.5rem 0 1rem 0'
    },
    contact: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#e8e8e8',
        },
        '&.active': {
            backgroundColor: '#4b8af7',
            color: 'white',
        },
        '&:not(:last-child)': {
            borderBottom: '1px solid #E1E1E1',
        },
        '&:first-child': {         
            '&:hover': {
                borderTopLeftRadius: '1rem',
                borderTopRightRadius: '1rem',
            },
            '&.active': {
                borderTopLeftRadius: '1rem',
                borderTopRightRadius: '1rem',
            }
        },
        '&:last-child': {            
            '&:hover': {
                borderBottomLeftRadius: '1rem',
                borderBottomRightRadius: '1rem',
            },
            '&.active': {
                borderBottomLeftRadius: '1rem',
                borderBottomRightRadius: '1rem',
            }
        }
    },
    contactImg: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        objectFit: 'cover',
    },
    contactFullname: {
        fontSize: '1rem',
        fontWeight: '500',
        color: '#626262',
    },
    contactUser: {
        fontSize: '0.9rem',
        fontWeight: 'light',
        color: '#6C6B6B',
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
        width: '70px',
        height: '70px',
        objectFit: 'cover',
    },
    contactFullnameChat: {
        fontSize: '1.2rem',
        fontWeight: 'bolder',
        color: '#626262',
    },
    contactUsernameChat: {
        fontSize: '1rem',
        fontWeight: 'normal',
        color: '#626262',
    },
    chatBox: {
        width: '50%',
        height: '60%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',  
    },
    top: {
        backgroundColor: '#F6F6F6',
        padding: '1rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: '2rem',
        borderTopRightRadius: '2rem',
    },
    topText: {
        color: '#626262',
        fontSize:'1.2rem',
        paddingLeft:'0.5rem'
    },
    center: {
        flex: 1,
        padding: '2rem 1rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'top',
        backgroundColor: '#F2F2F2',
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
    },
   
    chatDefaultText: {
        color: '#646464',
        fontSize: '1.2rem',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    messageContainerOwn: {
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'end',
        gap: '10px',
        marginLeft: 'auto',
        maxWidth: '80%',
        textAlign: 'right',
    },
    messageContainerNotOwn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'end',
        gap: '10px',
        marginRight: 'auto',
        maxWidth: '80%',
        textAlign: 'left',
    },
    profileImageChat: {
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        objectFit: 'cover',
        margin: '0.5rem 0',
    },
    chatMessage: {
        borderRadius: '1.2rem',
        margin: '0.5rem 0',
        '&.own': {
            backgroundColor: '#00283E',
            color: '#FFFFFF',
            padding: '0 1rem 0 1.2rem',
        },
        '&.notOwn': { 
            backgroundColor: '#FFFFFF',
            color: '#6C6B6B',
            padding: '0 1.2rem 0 1rem',
        },
    },
    bottom: {
        padding: '1rem 2rem 1.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        borderBottomLeftRadius: '2rem',
        borderBottomRightRadius: '2rem',
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
    messageInputContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: '5rem',
        padding: '0 0.5rem',
        width: '100%',
        justifyContent: 'center',
    },
    messageInput: {
        flex: 1,
        border: 'none',
        outline: 'none',
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        color: '#7E7E7E',   
        backgroundColor: 'transparent',
        '&::placeholder': {
            color: '#7E7E7E',
        },
    },
    sendButton: {       
        cursor: 'pointer',
        margin: '0.8rem 0.5rem',
        padding: 0, 
        background: 'none', 
        display: 'flex',
        alignItems: 'center',     
        '&:disabled': {
            cursor: 'not-allowed',
            opacity: 0.2,
            background: 'none', 
        },
        '& img': {
            width: '30px',  
            background: 'none',           
        },
        '&:hover': {
            background: 'none',           

        }
    }, 
}));

export const useStylesMyAccount = makeStyles(() => ({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: '100vh',
        width: '95vw',
    },
    containerTopDivisor: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        justifyContent: 'flex-start',
        width: '100%',
        height: '83vh',
    },
    containerDivisor: {
        display: 'flex',
        gap: '2rem',
        justifyContent: 'flex-start',
        padding: '7rem 2rem 2.2rem 2rem',
        width: '90%',
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
        justifyContent: 'center', 
        alignItems: 'flex-start',
        gap:'10px',
        margin:'1rem 1rem 1rem 0'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: 'white',
        borderColor: props => props.borderColor || '#C8C8C8',
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
        color: '#959595',
    },
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
        margin: '0',
        overflow: 'hidden',
        width: '100%',
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
        zIndex: 999,
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
    propertyGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1rem',
        width: '100%',
        padding: '1rem',
    },
}));

export const useStylesMyTenants = makeStyles(() => ({
    scrollableDiv: {
        display: 'flex', 
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
    closeIcon: {
        display: 'flex',
        justifyContent: 'right',
        cursor: 'pointer',
        width: '100%',
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

export const homeStyles = makeStyles(() => ({ 
    homeContainer: {
        maxWidth: '1400px',
        alignItems: 'center',
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '6rem 0 0 0',
    },
    searchBarContainer: {
        margin: '1rem 0'
    },
    optionsContainer: {
        margin: '2rem 0',
        display: 'flex',
        gap:'1rem',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionButton: {
        backgroundColor: '#F2F2F2',
        borderRadius:'2rem',
        color: '#6C6B6B',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '1rem 2rem',
        transition: 'background-color 0.2s ease',
        '&:hover': {
            transition: 'background-color 0.2s ease',
            backgroundColor: '#E5E5E5',
            cursor: 'pointer'
        }
    },
    filterButton: {
        backgroundColor: '#F2F2F2',
        borderRadius:'1rem',
        padding: '0.5rem',
        color: '#6C6B6B',
        '&:hover': {
            transition: 'background-color 0.2s ease',
            backgroundColor: '#E5E5E5',
            cursor: 'pointer'
        }    },
    propertyGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1rem',
        width: '100%',
        padding: '1rem',
    },


}))

export const otherAccountStyles = makeStyles(() => ({
    homeContainer: {
        maxWidth: '1400px',
        alignItems: 'center',
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '6rem 0 0 0',
    },

}))

export const propertyDetailStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',        
        width: '85vw',
    },
    containerDivisor: {
        display: 'flex',
        gap: '2rem',
        justifyContent: 'flex-start',
        padding: '7rem 2rem 2.2rem 2rem',
        width: '100%',
    },
    propertyCard: {
        backgroundColor: '#F2F2F2',
        borderRadius: '2rem',
        width: '40%',
        height: 'auto',
        padding: '2rem',     
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',  
        textAlign: 'left',
    
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
    iconsContainer: {   
        display: 'flex',  
        justifyContent: 'flex-end', 
    },
    optionsIcon: {
        height:'25px',
        boxShadow:'none',
        cursor: 'pointer',
    },
    imageContainer: {
        width: '100%',
        height: '400px',
        borderRadius: '15px',
        overflow: 'hidden',
    },
    image: {       
        objectFit: 'cover',
        objectPosition: 'center',
        width: '100%',
        height: '100%',
    },
    additionalImagesContainer: {
        display: 'flex',
        gap: '10px',
        width: '106%',
        margin: '1rem 0'
    },
    additionalImage: {
        width: '30%',
        aspectRatio: '16/14',
        borderRadius: '10px',
        overflow: 'hidden',
        position: 'relative',
    },
    additionalImageStyle: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
    },
    additionalImageBlur: {
        width: '30%',
        aspectRatio: '16/14',
        borderRadius: '10px',
        overflow: 'hidden',
        position: 'relative',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '24px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '10px',
    },
    detailSection: {
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
    },
    infoAndMapContainer: {
        padding: '2rem 3rem',
        backgroundColor: '#F2F2F2',
        borderRadius:'1rem',   
        alignItems: 'center',
    },
    optionsContainer: {
        display:'flex',
        gap:'1rem',
        width: '100%',
        margin:'2rem 0'
    },
    contactCard: {
        display:'flex',
        gap:'1rem',
        padding: '1rem 0.5rem',
        backgroundColor: '#F2F2F2',
        borderRadius:'1rem',
        width: '70%',
        alignItems: 'center',
    }, 
    interestButton: {
        display:'flex',
        gap:'2px',
        padding: '1rem 0.5rem',
        backgroundColor: '#F2F2F2',
        borderRadius:'1rem',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        cursor: 'pointer',
    },

    tenantElement: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '1.5rem 1rem',       
        '&:not(:last-child)': {
            borderBottom: '1px solid #E1E1E1',
        },        
    },
    tenantCard: {
        display:'flex',
        gap:'1rem',
        backgroundColor: '#F2F2F2',
        borderRadius:'1rem',
        width: '90%',
        alignItems: 'left',
        margin:'2rem 0 1rem 0', 
        padding:'2rem 3rem',      
        flexDirection:'column', 
        textAlign:'left'
    }, 
    tenantImg: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        objectFit: 'cover',
    },
    tenantFullname: {
        fontSize: '1.2rem',
        fontWeight: '500',
        color: '#626262',
    },
    tenantUser: {
        fontSize: '1rem',
        fontWeight: 'light',
        color: '#6C6B6B',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: '0.8rem 1.5rem',
        borderRadius: '1.5rem',
        cursor: 'pointer',
        color: 'white',
    }
}))

export const filterPropertiesModalStyles = makeStyles(() => ({
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
        position: 'relative',
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
    closeIcon: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        cursor: 'pointer',
        width: '1.5rem',
        height: '1.5rem',
    },
    title: {
        color: '#434343',
        fontWeight: 'bolder',
        fontSize: '1.5rem',            
    },
    inputContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '1rem 0',
    },
    inputWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        borderRadius: '10px',
        padding: '0.5rem',
        width: '45%',
    },
    currencySymbol: {
        position: 'absolute',
        left: '10px',
        color: '#666',
        fontSize: '0.9rem',
    },
    inputField: {
        width: '100%',
        padding: '0.5rem 1rem 0.5rem 2rem',
        border: 'none',
        background: 'transparent',
        fontSize: '1rem',
        color: '#333',
        outline: 'none',
    },
    inputLabel: {
        marginLeft: '5px',
        color: '#666',
        fontSize: '0.9rem',
    },
    buttonsContainer: {
        display: 'flex',
        gap: '1rem',
        width: '100%',
        marginTop: '20px',
        justifyContent: 'center',
    },
    button: {
        padding: '0.8rem 3rem',
        borderRadius: '1.5rem',
        cursor: 'pointer',
        color: 'white',     
    },
    cleanButton: {
        fontWeight: 'bold', 
        backgroundColor: 'transparent', 
        color: '#00283E', 
        border: '1px solid #00283E',
        padding: '0.8rem 2rem',
        borderRadius: '1.5rem',
        cursor: 'pointer',       
    },
}));


export const doubleDraggerStyles = makeStyles(() => ({
    draggerContainer: {
        position: 'relative',
        height: '10px',
        borderRadius: '5px',
        backgroundColor: '#BDBDBD',
    },
    draggerTrack: {
        position: 'absolute',
        height: '100%',
        borderRadius: '5px',
        backgroundColor: '#04476C',
    },
    draggerHandle: {
        position: 'absolute',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: '#04476C',
        cursor: 'pointer',
        transform: 'translate(-50%, -50%)',
        top: '50%',
    },
}));

export const favoritePropertiesStyles = makeStyles(() => ({   
    favContainer: {
        minHeight: '90vh',
        maxWidth: '1400px',
        alignItems: 'center',
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'top',
        textAlign: 'center',
        padding: '6rem 0',
    },
    searchBarContainer: {
        margin: '1rem 0'
    },
    propertyGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1rem',
        width: '100%',
        padding: '1rem',
    },
    text: {
        textAlign: 'center', 
        color: '#6C6B6B', 
        fontSize: '1.2rem',
        margin: '3rem 0'
        
    }
}));

export const renAssistantStyles = makeStyles(() => ({
    renAssistant: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '80px',
        height: '80px',
        backgroundColor: '#04476C',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
        cursor: 'pointer',
        zIndex: 1000,
    },
    hidden: {
        display: 'none',
    },
    icon: {
        width: '50%',
        height: '50%',
    },   
    chatContainer: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '400px',
        height: '600px',
        backgroundColor: '#CDCDCD',
        borderRadius: '15px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1001,
    },
    header: {
        backgroundColor: '#E5E5E5',
        borderTopLeftRadius: '15px',
        borderTopRightRadius: '15px',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'left',
        gap:'20px',
        padding: '20px 20px'
    },
    headerIcon: {
        width: '50px',
        height: '50px',
    },
    headerText: {
        display: 'flex',
        flexDirection: 'column',
    },
    assistantName: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#626262',
    },
    assistantSubtitle: {
        fontSize: '18px',
        color: '#6C6B6B',
    },
    chatBody: {
        flex: 1,
        padding: '10px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        '&::-webkit-scrollbar': {
            width: '12px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#B3B3B3',
            borderRadius: '10px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#F0F0F0',
            borderRadius: '10px',
        },
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#CDCDCD',
        borderBottomLeftRadius: '15px',
        borderBottomRightRadius: '15px',
    },
    input: {
        flex: 1,
        padding: '15px 20px',
        borderRadius: '100px',
        border: '1px solid #CDCDCD',
        outline: 'none',
        fontSize: '16px',
        color: '#7E7E7E',
        '&::placeholder': {
        color: '#7E7E7E',
        },
    },
    sendButton: {
        marginLeft: '10px',
        backgroundColor: '#04476C',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFFFFF',
        paddingLeft:'4px',
        cursor: 'pointer',
    },
    assistantMessage: {
        backgroundColor: "#FFFFFF",
        color: "#333",
        borderRadius: "10px",
        margin: "5px 0",
        alignSelf: "flex-start",
        textAlign: 'left',
        maxWidth: '80%',
        width: 'fit-content',
        marginRight: 'auto',
        padding: '10px 15px'
    },
    userMessage: {
        backgroundColor: "#00283E",
        color: "#fff",
        padding: "10px",
        borderRadius: "10px",
        margin: "5px 0",
        alignSelf: "flex-end",
        textAlign: 'right',
        maxWidth: '80%',
        width: 'fit-content',
        marginLeft: 'auto',
    },
    
    loadingContainer: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginTop: "5px",
    },
    chatDefaultText: {
        color: '#646464',
        fontSize: '1.1rem',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding:'0 2rem'
    },
    minimizeIcon: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        cursor: 'pointer',
    },
    
}));
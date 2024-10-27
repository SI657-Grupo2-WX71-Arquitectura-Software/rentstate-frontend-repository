import React, { useCallback, useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Select, MenuItem, InputLabel, FormControl, Skeleton } from '@mui/material';
import { doubleDraggerStyles, useStylesButtonComponent, useStylesInquilinoCard, useStylesPropertyCard, useStylesSearchBarComponent } from '../../styles/useStyles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { searchIcon, peru, trashIcon, markerMap, editIcon, favoriteIcon } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { deleteProperty } from '../../hooks/usePropertyService';
import { DeletePropertyModal } from '../Modals/DeletePropertyModal';

const theme = createTheme({
    palette: { primary: { main: '#ffffff' }},
    components: {
        MuiOutlinedInput: { 
            styleOverrides: { 
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'transparent',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'transparent',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'transparent',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: 'rgba(0, 0, 0, 0.54)'
                    },
                    backgroundColor: 'white',
                    padding: '0 10px',
                    borderRadius: '10px 10px 0 0',
                    overflow: 'hidden',
                    left:-14
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    textAlign: 'left',
                    paddingLeft: '10px', 
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: 'white',
                    borderRadius: 10,
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'transparent',
                        },
                        '&:hover fieldset': {
                            borderColor: 'transparent',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'transparent',
                        },
                    },
                },
            },
        },    
    },
});
  
export const FieldEdit = ({ id, label, type, value, onChange, endAdornment }) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        if (!value) {
            setFocused(false);
        }
    };

    const InputProps = {
        endAdornment: endAdornment,
        style: { backgroundColor: 'white', borderRadius: 10, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }
    };

    const inputLabelStyles = {
        position: 'absolute',
        left: focused || value ? '0' : '6px',  
        top: focused || value ? -6 : '50%', 
        transform: focused || value ? 'scale(0.75)' : 'translate(0, -50%)',
        transformOrigin: 'top left',
        backgroundColor: 'white',
        padding: '0 12px 0 10px',
        pointerEvents: 'none', 
        transition: 'all 0.2s ease-in-out',
        borderRadius: '10px 10px 0 0',
        overflow: 'hidden'
    };

    return (
        <ThemeProvider theme={theme}>
            <TextField
                fullWidth
                variant="outlined"
                id={id}
                label={label}
                type={type}
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                InputProps={InputProps}
                InputLabelProps={{
                    style: inputLabelStyles,
                    shrink: focused || value,
                }}
            />
        </ThemeProvider>
    );
};

export const FieldEditPassword = ({ id, label, value, onChange, backgroundColor, textColor, boxShadow }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        if (!value) {
            setFocused(false);
        }
    };

    const inputLabelStyles = {
        position: 'absolute',
        left: focused || value ? '0' : '6px',  
        top: focused || value ? -6 : '50%', 
        transform: focused || value ? 'scale(0.75)' : 'translate(0, -50%)',
        transformOrigin: 'top left',
        backgroundColor: backgroundColor || 'white',
        padding: '0 12px 0 10px',
        pointerEvents: 'none', 
        transition: 'all 0.2s ease-in-out',
        borderRadius: '10px 10px 0 0',
        overflow: 'hidden',
        color: textColor || 'black',
    };

    const customInputStyle = {
        backgroundColor: backgroundColor || 'white',
        color: textColor || 'black',
        borderRadius: 10,
        boxShadow: boxShadow || "0px 4px 8px rgba(0, 0, 0, 0.1)"
    };

    const InputProps = {
        endAdornment: (
            <InputAdornment position="end">
                <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    aria-label="toggle password visibility"
                >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>
        ),
        style: customInputStyle
    };

    return (
        <ThemeProvider theme={theme}>
            <TextField
                fullWidth
                variant="outlined"
                id={id}
                label={label}
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                InputProps={InputProps}
                InputLabelProps={{
                    style: inputLabelStyles,
                    shrink: focused || value,
                }}
            />
        </ThemeProvider>
    );
};

export const FieldEditPhone = ({ id, label, value, onChange }) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        if (!value) {
            setFocused(false);
        }
    };

    const inputLabelStyles = {
        position: 'absolute',
        left: focused || value ? 0 : 70, 
        top: focused || value ? -6 : '50%', 
        transform: focused || value ? 'scale(0.75)' : 'translate(0, -50%)',
        transformOrigin: 'top left',
        backgroundColor: 'white',
        padding: '0 12px 0 10px',
        pointerEvents: 'none', 
        transition: 'all 0.2s ease-in-out',
        borderRadius: '10px 10px 0 0',
        overflow: 'hidden'
    };

    return (
        <ThemeProvider theme={theme}>
            <TextField
                fullWidth
                variant="outlined"
                id={id}
                label={label}
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start" style={{ marginRight: '5px' }}>
                            <img src={peru} alt="Flag" style={{ width: 24, height: 15, marginRight: 5 }} />
                            <span style={{ color: '#AAAAAA' }}>+51</span>
                        </InputAdornment>
                    ),
                    style: { backgroundColor: 'white', borderRadius: 10, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }
                }}
                InputLabelProps={{
                    style: inputLabelStyles,
                    shrink: focused || value,
                }}
            />
        </ThemeProvider>
    );
};

export const FieldEditMapFinder = ({ id, type, value, onChange, endAdornment, inputRef }) => {
    const [, setFocused] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        if (!value) {
            setFocused(false);
        }
    };

    const InputProps = {
        endAdornment: endAdornment,
        style: { backgroundColor: 'white', borderRadius: 10, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }
    };

    return (
        <ThemeProvider theme={theme}>
            <TextField
                fullWidth
                variant="outlined"
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                InputProps={InputProps}
                inputRef={inputRef}
                InputLabelProps={{
                    style: { display: 'none' }
                }}
            />
        </ThemeProvider>
    );
};

export const FieldSelect = ({ id, label, value, onChange, options }) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        if (!value) {
            setFocused(false);
        }
    };

    const inputLabelStyles = {
        position: 'absolute',
        left: focused || value ? '0' : '6px', 
        top: focused || value ? -6 : '50%', 
        transform: focused || value ? 'scale(0.75)' : 'translate(0, -50%)',
        transformOrigin: 'top left',
        backgroundColor: 'white',
        padding: '0 12px 0 10px',
        pointerEvents: 'none', 
        transition: 'all 0.2s ease-in-out',
        borderRadius: '10px 10px 0 0',
        overflow: 'hidden'
    };

    return (
        <ThemeProvider theme={theme}>
            <FormControl fullWidth variant="outlined" style={{ backgroundColor: 'white', borderRadius: 10, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", position: 'relative' }}>
                <InputLabel style={inputLabelStyles}>{label}</InputLabel>
                <Select
                    id={id}
                    value={value}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    label=""
                    fullWidth
                    MenuProps={{
                        getContentAnchorEl: null,
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left"
                        },
                        transformOrigin: {
                            vertical: "top",
                            horizontal: "left"
                        },
                        PaperProps: {
                            style: {
                                borderRadius: 10
                            }
                        }
                    }}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </ThemeProvider>
    );
};

export const FieldDatePicker = ({ id, label, selectedDate, setSelectedDate }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <DatePicker
                    id={id}
                    label={label}
                    value={selectedDate}
                    onChange={setSelectedDate}
                    renderInput={(params) => (
                        <TextField 
                            {...params} 
                            fullWidth
                        />
                    )}
                />
            </ThemeProvider>
        </LocalizationProvider>
    );
};

export const Button = ({ children, onClick, disabled = false, type = 'submit', icon, width, height, ...props }) => {
    const classes = useStylesButtonComponent();
    return (
        <button
            type={type}
            className={classes.buttonBase}
            onClick={onClick}
            disabled={disabled}
            style={{ width, height, ...props.style }}
            {...props}
        >
            {icon && <img src={icon} alt="" style={{ marginRight: '5px' }} />}
            {children}
        </button>
    );
};

export const ButtonUpload = ({ children, onClick, disabled = false, type = 'submit', icon, iconWidth = '24px', iconHeight = 'auto', ...props }) => {
    const classes = useStylesButtonComponent();
    return (
        <button
            type={type}
            className={classes.buttonBase}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {icon && <img src={icon} alt="Icon" style={{ width: iconWidth, height: iconHeight, marginRight: '8px' }} />}
            {children}
        </button>
    );
};  

export const SearchBar = ({ placeholder = 'Buscar', height, width, value, onChange, borderColor, ...props }) => {
    const classes = useStylesSearchBarComponent({ borderColor });

    return (
        <div className={classes.searchBar} style={{ height, width, ...props.style }}>
            <input
                type="text"
                className={classes.input}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...props}
            />
            <img src={searchIcon} alt="Buscar" className={classes.icon} />
        </div>
    );
};

export const InquilinoCard = ({ photoUrl, name, lastName, isActive, property }) => {
    const classes = useStylesInquilinoCard();
  
    return (
      <div className={classes.cardContainer}>
        <img src={photoUrl} alt={`${name} ${lastName}`} className={classes.profileImage} />
        <div className={classes.title}>{name} {lastName}</div>
        <div className={classes.text}>
          Inquilino 
          <span className={isActive ? classes.active : classes.inactive} style={{marginLeft:'5px'}}>
            {isActive ? 'Activo' : 'Inactivo'}            
          </span>
        </div>
        <div className={classes.text} style={{marginTop:'10px'}}>En inmueble <span style={{fontWeight:'bold'}}>{property}</span></div>
      </div>
    );
};

export const PropertyCard = ({ property, owner, onDelete }) => {
    const classes = useStylesPropertyCard();
    const navigate = useNavigate();
    const currentUserId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleMapClick = (event) => {
        event.stopPropagation();
        const mapUrl = `https://www.google.com/maps?q=${property.latitude},${property.longitude}`;
        window.open(mapUrl, '_blank');
    };

    const handleOwnerClick = (event) => {
        event.stopPropagation();
        if (String(owner?.id) === String(currentUserId)) {
            navigate('/perfil');
        } else {
            navigate(`/perfil/${owner?.id}`);
        }
    };

    const handleCardClick = () => {
        navigate(`/property/${property.id}`);
    };

    const handleDeleteClick = (event) => {
        event.stopPropagation();
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleDeleteProperty = async () => {
        setIsLoading(true);
        try {
            await deleteProperty(property.id, token);
            setIsDeleteModalOpen(false);
            onDelete();
        } catch (error) {
            console.error('Error al eliminar la propiedad:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={classes.cardContainer} onClick={handleCardClick}>
            <img src={property.cardimage} alt="Property" className={classes.propertyImage} />
            <div className={classes.iconsContainer}>
                {String(currentUserId) === String(owner?.id) ? (
                    <>
                        <img src={trashIcon} alt="Delete" className={classes.icon} onClick={handleDeleteClick} />
                        <img src={editIcon} alt="Edit" className={classes.icon} />
                    </>
                ) : (
                    <img src={favoriteIcon} alt="Favorite" className={classes.icon} />
                )}
            </div>
            <div className={classes.propertyDetails}>
                {String(currentUserId) === String(owner?.id) ? (
                    <div className={classes.title}>
                        {property.district} ·
                        <span className={property.available ? classes.active : classes.inactive} style={{ marginLeft: '5px' }}>
                            {property.available ? 'Activo' : 'Inactivo'}
                        </span>
                    </div>
                ) : (
                    <div className={classes.title}>{property.district}</div>
                )}
                <div style={{ color: '#6C6B6B' }}>{property.location}</div>
                <div style={{ color: '#6C6B6B' }}>S/. {property.price}</div>
            </div>
            <div className={classes.propertyBottom}>
                <div className={classes.ownerInfo} onClick={handleOwnerClick}>
                    <img src={owner?.photoUrl} alt="Owner" className={classes.ownerImage} />
                    <div className={classes.viewMapText} style={{ color: '#6C6B6B', fontWeight: 'normal' }}>
                        {owner?.name} {owner?.lastName}
                    </div>
                </div>
                <div className={classes.viewMapText} onClick={handleMapClick}>
                    <img src={markerMap} alt="Map" style={{ width: '10px' }} />
                    Ver en Mapa
                </div>
            </div>
            {isDeleteModalOpen && (
                <DeletePropertyModal
                    open={isDeleteModalOpen} 
                    handleClose={handleCloseDeleteModal} 
                    handleDelete={handleDeleteProperty} 
                    district={property.district}
                    location={property.location}
                />
            )}
            {isLoading && <div className={classes.loadingOverlay}>Cargando...</div>}
        </div>
    );
};

export const SkeletonPropertyCard = () => {
    const classes = useStylesPropertyCard();

    return (
        <div className={classes.cardContainer}>
            <Skeleton variant="rectangular" className={classes.propertyImage} height={180} />
            <div className={classes.iconsContainer}>
                <Skeleton variant="circular" className={classes.icon} width={24} height={24} />
                <Skeleton variant="circular" className={classes.icon} width={24} height={24} />
            </div>
            <div className={classes.propertyDetails}>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="50%" />
            </div>
            <div className={classes.propertyBottom}>
                <Skeleton variant="circular" className={classes.ownerImage} width={32} height={32} />
                <Skeleton variant="text" width="30%" />
                <Skeleton variant="text" width="20%" />
            </div>
        </div>
    );
};

export const DoubleDragger = ({ min = 0, max = 1000000, width = '100%', onChange, leftValue = min, rightValue = max }) => {
    const classes = doubleDraggerStyles();
    const containerRef = useRef(null);
    const [leftPos, setLeftPos] = useState((leftValue / max) * 100);
    const [rightPos, setRightPos] = useState((rightValue / max) * 100);

    useEffect(() => {
        setLeftPos((leftValue / max) * 100);
        setRightPos((rightValue / max) * 100);
    }, [leftValue, rightValue, max]);

    const updateValues = useCallback(() => {
        const left = Math.round((leftPos / 100) * (max - min) + min);
        const right = Math.round((rightPos / 100) * (max - min) + min);
        onChange && onChange({ left, right });
    }, [leftPos, rightPos, min, max, onChange]);

    useEffect(() => {
        updateValues();
    }, [leftPos, rightPos, updateValues]);

    const handleDrag = (event, setPosition, posValue, oppositePosValue, isLeft) => {
        event.preventDefault();
        const containerRect = containerRef.current.getBoundingClientRect();
        const startPos = event.clientX;
        
        const onMouseMove = (moveEvent) => {
            const newPos = posValue + ((moveEvent.clientX - startPos) / containerRect.width) * 100;
            const limitedPos = Math.max(0, Math.min(100, newPos));

            if (isLeft && limitedPos < oppositePosValue) {
                setPosition(limitedPos);
            } else if (!isLeft && limitedPos > oppositePosValue) {
                setPosition(limitedPos);
            }
        };

        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div ref={containerRef} className={classes.draggerContainer} style={{ width }}>
            <div
                className={classes.draggerTrack}
                style={{
                    left: `${leftPos}%`,
                    right: `${100 - rightPos}%`
                }}
            ></div>
            <div
                className={classes.draggerHandle}
                style={{ left: `${leftPos}%` }}
                onMouseDown={(event) => handleDrag(event, setLeftPos, leftPos, rightPos, true)}
            />
            <div
                className={classes.draggerHandle}
                style={{ left: `${rightPos}%` }}
                onMouseDown={(event) => handleDrag(event, setRightPos, rightPos, leftPos, false)}
            />           
        </div>
    );
};
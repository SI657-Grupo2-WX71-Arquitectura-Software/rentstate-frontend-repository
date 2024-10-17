import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { fieldEditPasswordStyles, useStylesButtonComponent, useStylesInquilinoCard, useStylesPropertyCard, useStylesSearchBarComponent } from '../../styles/useStyles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { searchIcon, peru, trashIcon, markerMap, editIcon } from '../../assets';

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

export const FieldEditSearch = ({ value, onChange, placeholder, width, height }) => {
    return (
        <div style={{
            display: 'flex', 
            alignItems: 'center', 
            width: width, 
            height: height, 
            backgroundColor: 'white', 
            borderRadius: '20px', 
            padding: '0 10px'
        }}>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={{ border: 'none', flexGrow: 1, fontSize: '16px' }}
            />
            <button style={{ border: 'none', background: 'transparent', marginBottom:'1rem', paddingRight:'0' }}>
                <IconButton aria-label="search">
                    <SearchIcon />
                </IconButton>
            </button>
        </div>
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

export const SearchBar = ({ placeholder = 'Buscar', height, width, value, onChange, ...props }) => {
    const classes = useStylesSearchBarComponent();
  
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

export const PropertyCard = ({ property }) => {
    const classes = useStylesPropertyCard();

    return (
        <div className={classes.cardContainer}>
            <img src={property.photoUrl} alt="Property" className={classes.propertyImage} />
            <div className={classes.iconsContainer}>
                <img src={trashIcon} alt="Delete" className={classes.icon}/>
                <img src={editIcon} alt="Edit" className={classes.icon} />
            </div>
            <div className={classes.propertyDetails}>
                <div className={classes.title}>{property.district} ·  
                    <span className={property.isActive ? classes.active : classes.inactive} style={{marginLeft:'5px'}}>
                        {property.isActive ? 'Activo' : 'Inactivo'}            
                    </span>
                </div>
                <div style={{color:'#6C6B6B'}}>{property.address}</div>
                <div  style={{color:'#6C6B6B'}}>S/. {property.price}</div>
            </div>
            <div className={classes.propertyBottom}>
                <div className={classes.ownerInfo}>
                    <img src={property.ownerPhotoUrl} alt="Owner" className={classes.ownerImage} />
                    <div className={classes.viewMapText} style={{color:'#6C6B6B', fontWeight:'normal'}}>{property.ownerName} {property.ownerLastName}</div>
                </div>
                <div className={classes.viewMapText}>
                    <img src={markerMap} alt="Map" style={{ width: '10px' }} />
                    Ver en Mapa
                </div>
            </div>
        </div>
    );
};
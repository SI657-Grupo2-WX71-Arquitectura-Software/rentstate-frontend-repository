import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import peruFlag from '../../assets/peru.svg';
import { useStylesButtonComponent } from '../../styles/useStyles';

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
                root: {'&.Mui-focused': {color: 'rgba(0, 0, 0, 0.54)'}}
            }
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    textAlign: 'left',
                    paddingLeft: '10px', 
                }
            }
        }
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
        left: 0, 
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

export const FieldEditPassword = ({ id, label, value, onChange }) => {
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
        left: 0, 
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
        style: { backgroundColor: 'white', borderRadius: 10, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }
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
                            <img src={peruFlag} alt="Flag" style={{ width: 24, height: 15, marginRight: 5 }} />
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
        left: 0, 
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
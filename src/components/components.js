import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useStylesButtonComponent } from '../styles/useStyles';

const theme = createTheme({
    palette: { primary: { main: '#ffffff' }},
    components: {
        MuiOutlinedInput: { 
            styleOverrides: { 
                notchedOutline: { borderColor: 'transparent' },
                root: {
                    '&:hover $notchedOutline, &$focused $notchedOutline, &.Mui-focused:hover $notchedOutline': {
                    borderColor: 'transparent',
                    },
                    '&$focused': {
                    borderColor: 'transparent',
                    },
                    '&:hover': {
                    borderColor: 'transparent',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' }
                    },
                },
            },
        },
        MuiInputLabel: {styleOverrides: {root: {'&$focused': {color: 'transparent'}}}},
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

    return (
        <ThemeProvider theme={theme}>
        <TextField
            fullWidth
            variant="outlined"
            id={id}
            label={!focused && !value ? label : ''}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            InputProps={InputProps}
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
                label={!focused && !value ? label : ''}
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                InputProps={InputProps}
            />
        </ThemeProvider>
    );
};

export const Button = ({ children, onClick, disabled = false }) => {
    const classes = useStylesButtonComponent();
    return (
        <button
            type="submit"
            className={classes.buttonBase}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
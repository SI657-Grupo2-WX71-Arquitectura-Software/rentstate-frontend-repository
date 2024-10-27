import React, { useState, useEffect } from 'react';
import { filterPropertiesModalStyles } from '../../styles/useStyles';
import { closeIcon } from '../../assets';
import { DoubleDragger } from '../RentState Components/components';

export const PropertyFiltersModal = ({ open, handleClose, handleDelete }) => {
    const classes = filterPropertiesModalStyles();
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(1000000);

    useEffect(() => {
        if (!open) {
            setMinValue(0);
            setMaxValue(1000000);
        }
    }, [open]);

    if (!open) return null;

    const handleRangeChange = ({ left, right }) => {
        setMinValue(left);
        setMaxValue(right);
    };

    const handleApplyFilters = () => {
        handleClose(minValue, maxValue);
    };

    const handleClearFilters = () => {
        setMinValue(0);
        setMaxValue(1000000);
        handleDelete();
    };

    return (
        <div className={classes.overlay}>
            <div className={classes.modal}>
                <div className={classes.closeIcon}>
                    <img
                        src={closeIcon}
                        alt="Cerrar"
                        onClick={() => handleClose(minValue, maxValue)}
                        style={{ width: '1rem' }}
                    />
                </div>
                <div className={classes.title}>Filtros</div>
                <p style={{ color: '#434343' }}>Rango de Precios</p>
                
                <div style={{ margin: '1rem 0' }}>
                    <DoubleDragger
                        min={0}
                        max={1000000}
                        width="100%"
                        leftValue={minValue}
                        rightValue={maxValue}
                        onChange={handleRangeChange}
                    />
                </div>

                <div className={classes.inputContainer}>
                    <div className={classes.inputWrapper}>
                        <span className={classes.currencySymbol}>S/</span>
                        <input
                            type="number"
                            className={classes.inputField}
                            value={minValue}
                            readOnly
                        />
                        <span className={classes.inputLabel}>mín.</span>
                    </div>
                    <div className={classes.inputWrapper}>
                        <span className={classes.currencySymbol}>S/</span>
                        <input
                            type="number"
                            className={classes.inputField}
                            value={maxValue}
                            readOnly
                        />
                        <span className={classes.inputLabel}>máx.</span>
                    </div>
                </div>

                <div className={classes.buttonsContainer}>                   
                    <div className={classes.cleanButton} onClick={handleClearFilters}>
                        Limpiar
                    </div>
                    <div className={classes.button} onClick={handleApplyFilters} style={{ backgroundColor: '#00283E' }}>
                        Filtrar
                    </div>
                </div>
            </div>
        </div>
    );
};
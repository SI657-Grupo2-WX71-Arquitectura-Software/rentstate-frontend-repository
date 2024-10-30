
import React, { useState } from 'react';
import { preciseNeedsModalStyles } from '../../styles/useStyles';
import { needsIcon } from '../../assets';

export const PreciseNeedsModal = ({ open, handleClose, handleDelete }) => {
    const classes = preciseNeedsModalStyles(); 

    const [checkedState, setCheckedState] = useState({
        "Tipo de Inmueble": false,
        "Ubicación": false,
        "Precio": false,
        "Habitaciones": false,
        "Baños": false,
        "Estacionamientos": false
    });

    const handleCheckboxChange = (item) => {
        const newState = { ...checkedState, [item]: !checkedState[item] };
        setCheckedState(newState);
        console.log(`${item} está ahora en ${newState[item] ? 'true' : 'false'}`);
    };

    const items = [
        "Tipo de Inmueble", "Ubicación", "Precio", "Habitaciones", "Baños", "Estacionamientos"
    ];

    if (!open) return null;

    return (
        <div className={classes.overlay}>
            <div className={classes.modal}>
                <div className={classes.textTopContainer}>
                    <div>
                        <img src={needsIcon} alt="googleMapsLogo" className={classes.icon} style={{height: '70px'}}/>
                    </div>
                    <div>
                        <div className={classes.title}>¡Necesidades Precisas!</div>
                        <p style={{ color: '#434343', margin:'10px 0 0 0' }}>Ingresa el detalle de las caracterisitcas y necesidades que buscas en tu inmueble ideal (Requerido para uso de Asistente Virtual Ren). Por favor completa todos los campos en la presente vista.</p>
                    </div>
                </div>

                <div className={classes.needContainer}>
                    <div className={classes.needColumn}>
                        <div className={classes.titleCard}>General</div>
                        {items.map(item => (
                            <div key={item} className={classes.subtitleCard}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={checkedState[item]}
                                        onChange={() => handleCheckboxChange(item)}
                                        className={classes.checkbox}
                                    />
                                    <span></span>
                                    {item}
                                </label>
                            </div>
                        ))}

                    </div>
                    <div className={classes.needColumn}>
                        <div className={classes.titleCard}>Amenidades</div>
                        {items.map(item => (
                            <div key={item} className={classes.subtitleCard}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={checkedState[item]}
                                        onChange={() => handleCheckboxChange(item)}
                                        className={classes.checkbox}
                                    />
                                    <span></span>
                                    {item}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className={classes.needColumn}>
                        <div className={classes.titleCard}>Costos</div>
                        {items.map(item => (
                            <div key={item} className={classes.subtitleCard}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={checkedState[item]}
                                        onChange={() => handleCheckboxChange(item)}
                                        className={classes.checkbox}
                                    />
                                    <span></span>
                                    {item}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

               

                <div className={classes.buttonsContainer}>                  
                    <div className={classes.button} onClick={handleClose} style={{ backgroundColor: '#7E7E7E' }}>
                        Cancelar
                    </div>
                    <div className={classes.button} style={{ backgroundColor: '#00283E' }}>
                        Guardar Necesidades
                    </div>
                </div>
            </div>
        </div>
    );
};
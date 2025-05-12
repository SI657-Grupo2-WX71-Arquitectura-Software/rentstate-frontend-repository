import React, { useState } from 'react';
import { deleteAccountModalStyles } from '../../styles/useStyles';
import { closeIcon } from '../../assets';
import { FieldEdit} from '../RentState Components/components';
import {MenuItem, Select} from "@mui/material";
import ToastManager from "../RentState Components/ToastManager";

export const ScheduleMeetingModal = ({ open, properties, handleClose, handleScheduleMeeting }) => {
    const classes = deleteAccountModalStyles();
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [message, setMessage] = useState('');
    const [property, setProperty] = useState('');

    if (!open) return null;

    const handleModalClick = (event) => {
        event.stopPropagation();
    };

    const handleCloseClick = (event) => {
        event.stopPropagation();
        handleClose();
    };

    const meetingData = {
        startTime,
        endTime,
        message,
        property,
    };
    
    const handleSchedule = () => {
        if (!startTime || !endTime || !message || !property) {
            ToastManager.warning('Por favor, completa todos los campos');
            return;
        }
        handleScheduleMeeting(meetingData);
        handleClose();
    };

    const truncateText = (text, maxWords) => {
        const words = text.split(' ');
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(' ') + '...';
        }
        return text;
    };

    return (
        <div className={classes.overlay} onClick={handleModalClick}>
            <div className={classes.modal} onClick={handleModalClick}>
                <div className={classes.closeIcon}>
                    <img
                        src={closeIcon}
                        alt="Cerrar"
                        onClick={handleCloseClick}
                        style={{ width: '1rem', cursor: 'pointer' }}
                    />
                </div>
                <div className={classes.title}>Agendar Reunión</div>
                <div style={{marginTop:'2rem'}}></div>
                <FieldEdit
                    id="startTime"
                    label="Fecha y hora de inicio"
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                />
                <div style={{marginTop:'0.8rem'}}></div>
                <FieldEdit
                    id="endTime"
                    label="Fecha y hora de finalizacion"
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                />
                <div style={{marginTop:'0.8rem'}}></div>
                <FieldEdit
                    id="message"
                    label="Mensaje"
                    multiline
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe un mensaje para la reunión"
                />
                <div style={{marginTop:'0.8rem'}}></div>
                <Select variant={"outlined"} fullWidth
                        value={property}
                        onChange={(e) => setProperty(e.target.value)}>
                    {properties.map((actProperty, index) => (
                        <MenuItem key={index} value={actProperty.id} style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ fontSize: '0.8rem', lineHeight: '0.5rem' }}>
                                {`${actProperty.location}`}
                            </div>
                            <div style={{ fontSize: '0.6rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {truncateText(actProperty.description, 15)}
                            </div>
                        </MenuItem>
                    ))}
                </Select>
                <div style={{marginTop:'2rem'}}></div>
                <button className={classes.button} onClick={handleSchedule}
                     style={{ backgroundColor: '#00283E', cursor: 'pointer', textAlign: 'center', marginTop: '0' }}>
                    Agendar
                </button>
            </div>
        </div>
    );
};
import React, { useState } from 'react';
import { deleteAccountModalStyles } from '../../styles/useStyles';
import { closeIcon } from '../../assets';
import { FieldEdit} from '../RentState Components/components';

export const ScheduleMeetingModal = ({ open, handleClose, handleScheduleMeeting }) => {
    const classes = deleteAccountModalStyles();
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [message, setMessage] = useState('');

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
    };
    
    const handleSchedule = () => {     
        handleScheduleMeeting(meetingData);    
        handleClose();
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
                <div style={{marginTop:'2rem'}}></div>
                <FieldEdit
                    id="endTime"
                    label="Fecha y hora de fin"
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                />
                <div style={{marginTop:'2rem'}}></div>
                <FieldEdit
                    id="message"
                    label="Mensaje"
                    multiline
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe un mensaje para la reunión"
                />
                <div style={{marginTop:'2rem'}}></div>
                <div className={classes.button} onClick={handleSchedule} style={{ backgroundColor: '#00283E', cursor: 'pointer', textAlign: 'center'}}>
                    Agendar
                </div>   
            </div>
        </div>
    );
};
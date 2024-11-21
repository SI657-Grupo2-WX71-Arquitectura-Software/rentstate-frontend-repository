import React from 'react';
import { interestedZonesModalStyles } from '../../styles/useStyles';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { closeIcon } from '../../assets';

export const PropertyPhotosModal = ({ property, handleClose }) => {
    const classes = interestedZonesModalStyles();

    return (
        <div className={classes.overlay}>
            <div className={classes.modal}>
                <div className={classes.closeIcon}>
                    <img
                        src={closeIcon}
                        alt="Cerrar"
                        onClick={handleClose}
                        style={{ width: '1rem', cursor: 'pointer' }} // Añade cursor: pointer para indicar que es clicable
                    />
                </div>
                <div className={classes.carouselContainer}>
                    <Carousel
                        showThumbs={true}
                        infiniteLoop
                        useKeyboardArrows
                        renderArrowPrev={(onClickHandler, hasPrev) =>
                            hasPrev && (
                                <button
                                    className={`${classes.arrowButton} ${classes.arrowLeft}`}
                                    onClick={onClickHandler}
                                >
                                    ‹
                                </button>
                            )
                        }
                        renderArrowNext={(onClickHandler, hasNext) =>
                            hasNext && (
                                <button
                                    className={`${classes.arrowButton} ${classes.arrowRight}`}
                                    onClick={onClickHandler}
                                >
                                    ›
                                </button>
                            )
                        }
                        renderIndicator={(onClickHandler, isSelected, index) => (
                            <li
                                onClick={onClickHandler}
                                style={{
                                    display: 'inline-block',
                                    width: '10px',
                                    height: '10px',
                                    backgroundColor: isSelected ? '#333' : '#ccc',
                                    borderRadius: '50%',
                                    margin: '0 5px',
                                    cursor: 'pointer',
                                }}
                            ></li>
                        )}
                    >
                        {property.cardimage.map((image, index) => (
                            <div key={index}>
                                <img
                                    src={image}
                                    alt={`Property Image ${index + 1}`}
                                    style={{ maxHeight: '550px', objectFit: 'contain' }}
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

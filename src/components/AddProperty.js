import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Select, MenuItem, Button, InputLabel, FormControl, IconButton } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/Booking.css';
import { DeleteOutline } from '@mui/icons-material';

const AddProperty = ({ onBookingSuccess }) => {

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [distrito, setDistrito] = useState('');
    const [caracteristicas, setCaracteristicas] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [categoria, setCategoria] = useState('');
    const [direccion, setDireccion] = useState('');

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const propertyData = {
            image,
            distrito,
            caracteristicas,
            descripcion,
            precio,
            categoria,
            direccion,
        };
        console.log(propertyData);
        onBookingSuccess(propertyData);
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    const handleImageRemove = () => {
        setImage(null);
        setImagePreview(null);
    };

    return (
        <div className="bookingContainer" style={{height:'90vh', display:'flex', justifyContent:'center'}}>
            
          

            <div style={{display:'flex', gap:'4rem'}}>         
                <div style={{display:'block'}}>

                    <div className="formColumn">
                        <h2>Publique su Inmueble</h2>

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoria}
                                label="Categoria"
                                onChange={(e) => setCategoria(e.target.value)}
                            >
                               <MenuItem value="casa">Casa</MenuItem>
                                <MenuItem value="departamento">Departamento</MenuItem>
                                <MenuItem value="oficina">Oficina</MenuItem>
                                <MenuItem value="habitacion">Habitación</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            label="Distrito"
                            value={distrito}
                            onChange={(e) => setDistrito(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                        />

                        <TextField                           
                            label="Precio"
                            type="number"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                        />
                       

                    </div>

                    <div className="formColumn">                       
                        <TextField
                            label="Dirección"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                        />

                        <TextField
                            label="Características"
                            value={caracteristicas}
                            onChange={(e) => setCaracteristicas(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                        />

                        <TextField
                            label="Descripción"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                        />
                    </div>

                    <div className="formActions" style={{gap: '1rem', display:'flex', justifyContent:'center', margin:'2rem'}}>
                        <Button variant="contained" color="primary" onClick={handleBackToHome}>
                            Regresar a Inicio
                        </Button>
                        <Button variant="contained" color="secondary" type="submit">
                            Publicar
                        </Button>
                    </div>
                </div>

                <div className="formColumn" style={{ width: '40%', justifyContent:'center', display:'block', alignContent:'center'}}>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="upload-image"
                        type="file"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="upload-image">
                        <Button variant="contained" component="span">
                            Subir Foto del Inmueble
                        </Button>
                    </label>
                    <div className="imagePreviewContainer">
                        {imagePreview ? (
                            <div className="imagePreview" style={{display:'block'}}>
                                <div> <img style={{width:'30vw'}} src={imagePreview} alt="Previsualización" /></div>
                                <div>
                                    <IconButton onClick={handleImageRemove} className="deleteButton">
                                        <DeleteOutline />
                                    </IconButton>
                                </div>
                            </div>
                        ) : (
                            <div className="imagePlaceholder">
                                <p>Previsualización de la imagen</p>
                            </div>
                        )}
                        </div>
                </div>
                
            </div>        

        </div>
    );
    };

export default AddProperty;

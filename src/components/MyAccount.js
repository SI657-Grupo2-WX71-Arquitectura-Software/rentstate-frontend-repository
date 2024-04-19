import React, { useState } from "react";
import "../styles/MyAccount.css";
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const MyAccount = () => {
  const [avatarImage, setAvatarImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = () => {
    // Lógica para eliminar la cuenta
    console.log("Deleting account...");
  };

  return (
    <div className="myAccount-container">
      <div className="avatar-container">
        <label htmlFor="upload-avatar" className="avatar">
          {avatarImage ? (
            <img src={avatarImage} alt="Avatar" />
          ) : (
            <span>Upload Avatar</span>
          )}
          <input
            type="file"
            accept="image/*"
            id="upload-avatar"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className="info-container">
        <div className="info-header">
          <h2>Información del usuario</h2>
          <IconButton className="edit-icon" aria-label="edit">
            <EditIcon />
          </IconButton>
        </div>
        <div className="info-form">
          <div className="form-row">
            <TextField label="Name" variant="outlined" fullWidth />
            <TextField label="Last Name" variant="outlined" fullWidth />
          </div>
          <div className="form-row">
            <TextField label="Email" variant="outlined" fullWidth />
            <TextField label="Password" type="password" variant="outlined" fullWidth />
          </div>
          <div className="form-row">
            <TextField label="Address" variant="outlined" fullWidth />
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select label="Gender" defaultValue="">
                <MenuItem value="">Select Gender</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="non-binary">Non-binary</MenuItem>
                <MenuItem value="undisclosed">Prefer not to say</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="form-row">
            <TextField label="Age" type="number" variant="outlined" fullWidth />
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Description</InputLabel>
              <Select label="Description" defaultValue="">
                <MenuItem value="">Select an option</MenuItem>
                <MenuItem value="tenant">Inquilino</MenuItem>
                <MenuItem value="landlord">Propietario</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className="delete-account-container">
        <Button
          className="delete-account-button"
          variant="outlined"
          onClick={handleDeleteAccount}
        >
          Eliminar cuenta
        </Button>
      </div>

    </div>
  );
};

export default MyAccount;

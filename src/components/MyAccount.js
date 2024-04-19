import React, { useState } from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "../styles/MyAccount.css";

const MyAccount = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving changes...");
  };

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
          {!isEditing && (
            <IconButton className="edit-icon" aria-label="edit" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          )}
        </div>
        <div className="info-form">
          <div className="form-row">
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              disabled={!isEditing}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              disabled={!isEditing}
            />
          </div>
          <div className="form-row">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              disabled={!isEditing}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              disabled={!isEditing}
            />
          </div>
          <div className="form-row">
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              disabled={!isEditing}
            />
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                label="Gender"
                defaultValue=""
                disabled={!isEditing}
              >
                <MenuItem value="">Select Gender</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="non-binary">Non-binary</MenuItem>
                <MenuItem value="undisclosed">Prefer not to say</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="form-row">
            <TextField
              label="Age"
              type="number"
              variant="outlined"
              fullWidth
              disabled={!isEditing}
            />
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Description</InputLabel>
              <Select
                label="Description"
                defaultValue=""
                disabled={!isEditing}
              >
                <MenuItem value="">Select an option</MenuItem>
                <MenuItem value="tenant">Inquilino</MenuItem>
                <MenuItem value="landlord">Propietario</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        {isEditing && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            fullWidth
            style={{ marginTop: 20 }}
          >
            Guardar Cambios
          </Button>
        )}
      </div>
      <div className="delete-account-container">
        <Button
          className="delete-account-button"
          variant="outlined"
          color="error"
          onClick={() => console.log("Deleting account...")}
          fullWidth
        >
          Eliminar cuenta
        </Button>
      </div>
    </div>
  );
};

export default MyAccount;

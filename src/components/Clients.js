import { Typography, Button } from '@mui/material';
import '../styles/Clients.css'
const Clients = () => {


  return (
    <div className="clients">
      <Typography variant="h6">
        Clientes Interesados:
      </Typography>

      <div className="interestedClient">
        <Typography>Pepita</Typography>
        <div  className="button">
          <Button
            variant="outlined"
            color="primary"
            className="accept_button"
          >
            Aceptar
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            
          >
            Rechazar
          </Button>
        </div>
      </div>

    </div>
  );
};

export default Clients;

import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { validateLicaKey } from '../../utils/validateLicaKey'
import { validateMelissaKey } from '../../utils/validateMelissaKey'


const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [licaError, setLicaError] = React.useState(false)
  const [melissaError, setMelissaError] = React.useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const licaKey = data.get('licaKey');
    const melissaKey = data.get('melissaKey');
    const validatedLicaKey = await validateLicaKey(licaKey);
    const validatedMelissaKey = await validateMelissaKey(melissaKey);

    validatedLicaKey ? setLicaError(false) : setLicaError('invalid token')
    validatedMelissaKey ? setMelissaError(false) : setMelissaError('invalid token')

    if(validatedLicaKey && validatedMelissaKey) {
      localStorage.setItem('MelissaToken', melissaKey);
      localStorage.setItem('LicaToken', licaKey);
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              error={licaError}
              helperText={licaError}
              id="licaKey"
              label="Lica CRM Token"
              name="licaKey"
              autoComplete="crm-key"
            />
            <TextField
              margin="normal"
              fullWidth
              error={melissaError}
              helperText={melissaError}
              name="melissaKey"
              label="Melissa CRM Token"
              id="melissaKey"
              autoComplete="crm-key"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, p: 1.5 }}
            >
              Setup
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
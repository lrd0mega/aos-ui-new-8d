import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from './ProTip';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button';
import { ConnectButton } from "arweave-wallet-kit";
import AoConnect from './AoConnect';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  const [processName, setProcessName] = useState("default");
  const [connecting, setConnecting] = useState(false);
  const [connectProcessId, setConnectProcessId] = useState("");
  const [connectedAddress, setConnectedAddress] = useState("");
  const [loadText, setLoadText] = useState("");
  const [showEditor, setShowEditor] = useState(false);

  const handleClose = () => setShowEditor(false);
  const handleOpen = () => setShowEditor(true);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h1" component="h1" gutterBottom align="center">
          Welcome to the AI Network Platform
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Connect your Arweave wallet and manage your AI processes effortlessly.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Connect Wallet" />
              <CardContent>
                <ConnectButton />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Process Management" />
              <CardContent>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                  Load Lua Code
                </Button>
                <Dialog open={showEditor} onClose={handleClose} fullWidth>
                  <DialogTitle>Lua Code Editor</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      name="text"
                      label="Enter Lua Code into process..."
                      variant="standard"
                      multiline
                      rows={6}
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Load</Button>
                  </DialogActions>
                </Dialog>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box mt={5}>
          <ProTip />
          <Copyright />
        </Box>
      </Box>
    </Container>
  );
}

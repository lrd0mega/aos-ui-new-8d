import React, { useState, useRef, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from './ProTip';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardHeader from "@mui/material/CardHeader";
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ConnectButton, useActiveAddress } from "arweave-wallet-kit";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import AoConnect from './AoConnect';

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

  const terminalRef = useRef(null);
  const terminal = useRef(null);
  const fitAddon = useRef(null);

  const activeAddress = useActiveAddress();

  useEffect(() => {
    if (terminalRef.current) {
      terminal.current = new Terminal();
      fitAddon.current = new FitAddon();
      terminal.current.loadAddon(fitAddon.current);
      terminal.current.open(terminalRef.current);
      fitAddon.current.fit();
      terminal.current.writeln('Welcome to the AI Network Platform');

      terminal.current.onKey(({ key, domEvent }) => {
        if (domEvent.key === 'Enter') {
          handleEvaluate();
        } else {
          terminal.current.write(key);
        }
      });
    }
  }, []);

  const handleEvaluate = async () => {
    const input = terminal.current.buffer.active.getLine(terminal.current.buffer.active.cursorY - 1)?.translateToString(false).trim();
    if (input) {
      terminal.current.write('\r\n');
      try {
        const result = await AoConnect.evaluate(connectProcessId, input);
        terminal.current.writeln(result);
      } catch (error) {
        terminal.current.writeln(`Error: ${error.message}`);
      }
    }
  };

  const handleClose = () => setShowEditor(false);
  const handleOpen = () => setShowEditor(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const text = formJson.text;
    console.log(text);
    setLoadText(text);

    try {
      const result = await AoConnect.evaluate(connectProcessId, text);
      terminal.current && terminal.current.write(result);
    } catch (error) {
      console.error(error);
    }
    handleClose();
  };

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
                {activeAddress && <Typography>{`Connected: ${activeAddress}`}</Typography>}
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
                    <Button type="submit" onClick={handleSubmit}>Load</Button>
                  </DialogActions>
                </Dialog>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box mt={5}>
          <div ref={terminalRef} style={{ height: '400px', width: '100%', backgroundColor: '#000' }} />
          <ProTip />
          <Copyright />
        </Box>
      </Box>
    </Container>
  );
}

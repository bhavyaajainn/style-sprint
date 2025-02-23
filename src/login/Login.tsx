import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Tabs, Tab, useTheme, Paper } from '@mui/material';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../config/FirebaseConfig';
import { googleProvider, auth } from '../config/FirebaseConfig';
import GoogleIcon from '@mui/icons-material/Google';

interface LoginProps {
  onSignIn: (user: any) => void;
  onSignUp: () => void;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onSignIn, onSignUp, onClose }) => {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();

  const handleTabChange = (event: React.SyntheticEvent, newValue: 'login' | 'signup') => {
    setTab(newValue);
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      onSignIn(userCredential.user); // Pass the signed-in user to the parent component
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      onSignUp();
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onSignIn(result.user); // Pass the signed-in user to the parent component
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <Paper sx={{ padding: 3, boxShadow: "none" }}>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          mb: 2,
          '& .MuiTab-root': {
            color: theme.palette.text.primary,
          },
          '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        <Tab label="Login" value="login" />
        <Tab label="Signup" value="signup" />
      </Tabs>
      <Box>
        {tab === 'login' ? (
          <>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant="body2" color="textSecondary">
                OR
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: "100%"}}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleGoogleSignIn}
                sx={{ mb: 2 }}
              >
                <GoogleIcon sx={{ mr: 1 }} />
                Sign in with Google
              </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: "flex-end", mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleSignIn} sx={{marginRight:"1em"}}>
                Login
              </Button>
              <Button variant="outlined" color="secondary" onClick={onClose}>
                Close
              </Button>
            </Box>
          </>
        ) : (
          <>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box sx={{ display: 'flex', justifyContent: "flex-end", mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleSignUp} sx={{marginRight:"1em"}}>
                Signup
              </Button>
              <Button variant="outlined" color="secondary" onClick={onClose}>
                Close
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default Login;

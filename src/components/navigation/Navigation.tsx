import React, { useState, useEffect } from 'react';
import { Avatar, Box, Menu, MenuItem, Typography, useTheme, Dialog, Paper, IconButton, Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material'; // Import the cart icon
import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../config/FirebaseConfig';
import { setUser, clearUser } from '../../redux/actions/productActions';
import Login from '../../login/Login';
import { useNavigate } from 'react-router-dom'; 

interface NavigationProps {
  hideCartIcon?: boolean; 
}

const Navigation: React.FC<NavigationProps> = ({ hideCartIcon }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const user = useSelector((state: any) => state.auth.user);
  const [cartItemCount, setCartItemCount] = useState(0); // State for cart item count
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [photoURL, setPhotoURL] = useState<string>('https://source.unsplash.com/random'); 

  useEffect(()=>{
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(setUser(parsedUser));
      if (parsedUser.photoURL) {
        setPhotoURL(parsedUser.photoURL); 
      }
    }

    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      const cartItems = JSON.parse(storedCart);
      const itemCount = cartItems.reduce((total: number, item: any) => total + item.quantity, 0);
      setCartItemCount(itemCount); // Update the cart item count
    }

  },[])

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(setUser(parsedUser));
      if (parsedUser.photoURL) {
        setPhotoURL(parsedUser.photoURL); 
      }
    }

    // Load cart items from local storage
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      const cartItems = JSON.parse(storedCart);
      const itemCount = cartItems.reduce((total: number, item: any) => total + item.quantity, 0);
      setCartItemCount(itemCount); // Update the cart item count
    }
  }, [dispatch]);

  useEffect(() => {
    if (user && user.photoURL) {
      setPhotoURL(user.photoURL); 
    }
  }, [user]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      localStorage.removeItem('user'); 
      setPhotoURL('https://source.unsplash.com/random'); 
    } catch (error) {
      console.error('Error signing out:', error);
    }
    handleMenuClose();
  };

  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false);
  };

  const handleSignInSuccess = (user: any) => {
    dispatch(setUser(user));
    localStorage.setItem('user', JSON.stringify(user)); 
    if (user.photoURL) {
      setPhotoURL(user.photoURL); 
    }
    handleCloseLoginDialog();
  };

  const handleSignUpSuccess = () => {
    handleCloseLoginDialog();
  };

  const handleNavigateHome = () => {
    navigate('/'); 
  };

  const handleCartClick = () => {
    navigate('/cart'); 
  };

  return (
    <Box
      sx={{
        width: "100%",
        objectFit: "cover",
        overflow: "hidden",
        backgroundColor: "#3E362E",
        color: theme.palette.common.white,
        display: "flex",
        alignItems: "center",
        padding: "1em 0",
        justifyContent: "space-between"
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          variant='h1'
          sx={{
            marginLeft: "1em",
            cursor: "pointer"
          }}
          onClick={handleNavigateHome} 
        >
          Style Sprint
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', marginRight: "1em" }}>
        {!hideCartIcon && (
          <IconButton sx={{ marginRight: 2 }} onClick={handleCartClick}>
            <Badge badgeContent={cartItemCount} color="primary" showZero>
              <ShoppingCart sx={{ color: 'white' }} />
            </Badge>
          </IconButton>
        )}

        {/* Avatar and Menu */}
        <Avatar
          sx={{ marginLeft: 'auto', cursor: 'pointer' }}
          onClick={handleMenuOpen}
          src={photoURL} // Use photoURL state (default or updated)
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {user ? (
            <>
              <MenuItem disabled>Logged in as {user.displayName || user.email}</MenuItem>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </>
          ) : (
            <MenuItem onClick={() => setOpenLoginDialog(true)}>Login</MenuItem>
          )}
        </Menu>
      </Box>

      {/* Login Dialog */}
      <Dialog
        open={openLoginDialog}
        onClose={handleCloseLoginDialog}
        hideBackdrop 
      >
        <Paper sx={{ padding: 3 }}>
          <Login
            onSignIn={handleSignInSuccess}
            onSignUp={handleSignUpSuccess}
            onClose={handleCloseLoginDialog}
          />
        </Paper>
      </Dialog>
    </Box>
  );
};

export default Navigation;

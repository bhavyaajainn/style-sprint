import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Dialog, Paper, Box, Typography, Button, List, ListItem, Avatar, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the Delete icon
import emailjs from 'emailjs-com';
import { setUser } from '../../redux/actions/productActions';
import Login from '../../login/Login';
import Navigation from '../../components/navigation/Navigation';
import theme from '../../styles/theme';

const Cart = () => {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]); // State to store cart items
  const [totalPrice, setTotalPrice] = useState(0); // State to store total price
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false); // State for checkout modal
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect if it's mobile

  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Message for Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success'); // Snackbar severity

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(setUser(parsedUser));
    }
  }, [dispatch]);

  // Fetch cart items from localStorage on component mount
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      const items = JSON.parse(storedCartItems);
      setCartItems(items);
      updateTotalPrice(items);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setOpenLoginDialog(true); // Open login dialog if user is not logged in
    }
  }, [user]);

  const updateTotalPrice = (items: any[]) => {
    const total = items.reduce((acc: number, item: any) => {
      const priceAsNumber = parseFloat(item.price.replace('$', '')); // Convert price from string to number
      return acc + priceAsNumber * item.quantity;
    }, 0);
    setTotalPrice(total);
  };

  const handleRemoveItem = (index: number) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1); // Remove the item from the array
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Update localStorage
    updateTotalPrice(updatedCartItems); // Recalculate the total price
    setSnackbarMessage('Item removed from the cart');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false);
  };

  const handleSignInSuccess = (user: any) => {
    dispatch(setUser(user));
    localStorage.setItem('user', JSON.stringify(user)); // Save user to localStorage
    setOpenLoginDialog(false);
    navigate('/'); // Redirect to home page on successful sign-in
  };

  const handleSignUpSuccess = () => {
    setOpenLoginDialog(false);
    navigate('/');
  };

  const handleCheckoutClick = () => {
    setCheckoutDialogOpen(true); // Open the checkout confirmation dialog
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleCheckoutConfirm = async () => {
    setCheckoutDialogOpen(false);
  
    const templateParams = {
      user_email: user.email,
      total_price: totalPrice.toFixed(2),
    };
  
    try {
      const response = await emailjs.send(
        'service_m5is751',    // Replace with your EmailJS Service ID
        'template_1oc8a5v',   // Replace with your EmailJS Template ID
        templateParams,
        'eizsZ8AIw7THNH7NI'   // Replace with your EmailJS Public Key
      );
      console.log('Email sent successfully:', response.status, response.text);
  
      // Show success snackbar
      setSnackbarMessage('Email sent successfully! Proceeding to checkout.');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error sending email:', error);
  
      // Show error snackbar
      setSnackbarMessage('Failed to send email. Please check the console for more details.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };
  
  

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <Navigation hideCartIcon={true} />

      {/* Back Arrow and "Back" Text */}
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '1rem', cursor: 'pointer' }} onClick={handleBackClick}>
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="body1">Back</Typography>
      </Box>

      {/* Happy Shopping Heading */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
        <Typography variant="h3" sx={{ marginRight: '10px', fontSize: isMobile ? '1.8em' : '2.5em' }}>
          Happy Shopping!!
        </Typography>
        <SentimentSatisfiedAltIcon fontSize={isMobile ? 'medium' : 'large'} />
      </Box>

      <Box sx={{ padding: '2rem', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between' }}>
        {/* Cart Items on the left */}
        <Box sx={{ flexBasis: isMobile ? '100%' : '60%' }}>
          {cartItems.length > 0 ? (
            <List>
              {cartItems.map((item, index) => (
                <ListItem key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '2rem', borderBottom: '1px solid #e0e0e0', paddingBottom: '1rem' }}>
                  <Typography component={Link} to={`/product/${item.id}`} sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold', fontSize: '1.5em', marginBottom: '1rem', '&:hover': { textDecoration: 'underline' } }}>
                    {item.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 3, width: '100%', flexDirection: isMobile ? 'column' : 'row' }}>
                    <Avatar src={item.image} alt={item.name} variant="square" sx={{ width: '200px', height: '200px' }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Typography variant="body1">Price: {item.price}</Typography>
                      <Typography variant="body1">Quantity: {item.quantity}</Typography>
                      <Typography variant="body1">Size: {item.size}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
                        <Typography
                          variant="body2"
                          sx={{ cursor: 'pointer', marginRight: '0.5rem', color: 'error.main' }}
                          onClick={() => handleRemoveItem(index)}
                        >
                          Remove Item
                        </Typography>
                        <IconButton onClick={() => handleRemoveItem(index)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1">Your cart is empty.</Typography>
          )}
        </Box>

        {/* Summary and Checkout */}
        <Box sx={{ flexBasis: isMobile ? '100%' : '40%', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f9f9f9', marginTop: isMobile ? '2rem' : 0, alignSelf: 'flex-start' }}>
          <Typography variant="h5" sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>Summary</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item, index) => {
                  const priceAsNumber = parseFloat(item.price.replace('$', '')); // Convert price from string to number
                  return (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">${priceAsNumber.toFixed(2)}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">${(priceAsNumber * item.quantity).toFixed(2)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Total Price */}
          <Typography variant="h6" sx={{ marginTop: '1rem', fontWeight: 'bold' }}>Total: ${totalPrice.toFixed(2)}</Typography>

          {cartItems.length > 0 && (
            <Button variant="contained" color="primary" onClick={handleCheckoutClick} fullWidth sx={{ marginTop: '1rem' }}>Checkout</Button>
          )}
        </Box>
      </Box>

      {/* Checkout Confirmation Modal */}
      <Dialog open={checkoutDialogOpen} onClose={() => setCheckoutDialogOpen(false)}>
        <DialogTitle>Confirm Purchase</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Do you want to proceed with the purchase?</Typography>
          <Typography variant="h6" sx={{ marginTop: '1rem', fontWeight: 'bold' }}>Total: ${totalPrice.toFixed(2)}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCheckoutDialogOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleCheckoutConfirm} variant="contained" color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Success/Error */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Cart;

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for back navigation
import { fetchProductDetailRequest } from "../../redux/actions/productActions";
import ImageCarousel from "../../components/carousel/ProductDetailCarousel";
import { Box, CircularProgress, Typography, Button, IconButton, Rating, useTheme } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'; // Import back icon
import { DetailsTab } from "../../components/tabs/DetailsTab";
import Navigation from "../../components/navigation/Navigation";
import Footer from "../../components/footer/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const [images, setImages] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1); // For quantity control
  const [selectedSize, setSelectedSize] = useState("M"); // Default preselected size
  const [isInCart, setIsInCart] = useState(false); // To track if the item is in the cart
  const details = useSelector((state: any) => state.productDetail.info);
  const loading = useSelector((state: any) => state.productDetail.loading);
  const error = useSelector((state: any) => state.productDetail.error);

  const productRatings = useSelector((state: any) => state.product.ratings);
  const productRating = productRatings?.find((product: any) => product.goods_id === id)?.rating || 4.5; // Default to 4.5 if no rating found

  const [availableSizes, setAvailableSizes] = useState<string[]>([]); // Array to hold sizes from API

  // Check if the item is in local storage (cart) on component mount
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const isProductInCart = cartItems.find((item: any) => item.id === id);
    if (isProductInCart) {
      setIsInCart(true);
      setQuantity(isProductInCart.quantity);
      setSelectedSize(isProductInCart.size);
    }
  }, [id]);

  useEffect(() => {
    dispatch(fetchProductDetailRequest(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (details.info) {
      setImages(
        details.info.allColorDetailImages[id || ""]?.map(
          (img: any) => img.origin_image
        )
      );

      if (details?.info?.availableSizes) {
        setAvailableSizes(details.info.availableSizes);
      } else {
        setAvailableSizes(["S", "M", "L", "XL", "XXL"]); // Fallback sizes
      }
    }
  }, [id, details.info]);

  const handleQuantityChange = (change: number) => {
    if (!isInCart) {
      setQuantity((prev) => Math.max(1, prev + change)); // Ensures minimum quantity is 1
    }
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size); // Update selected size
  };

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    const productDetails = {
      id, 
      quantity, 
      size: selectedSize,
      name: details?.info?.goods_name, // Product name
      price: details?.info?.retail_price?.amountWithSymbol, // Product price
      image: images[0] // Assuming the first image is the main product image
    };

    // Check if the product is already in the cart, update it if necessary
    const updatedCart = cartItems.find((item: any) => item.id === id)
      ? cartItems.map((item: any) =>
          item.id === id ? { ...item, quantity, size: selectedSize } : item
        )
      : [...cartItems, productDetails];

    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setIsInCart(true); // Mark as added to cart
  };

  const handleRemoveFromCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const updatedCart = cartItems.filter((item: any) => item.id !== id);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setIsInCart(false); // Mark as removed from cart
    setQuantity(1); // Reset quantity
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "30vh",
        }}
      >
        <CircularProgress sx={{ color: theme.palette.primary.main }} size={80}/>
      </Box>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Navigation />
      {/* Back Button */}
      <Box sx={{ padding: "1em", display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => navigate(-1)}>
        <IconButton>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography variant="body1">Back</Typography>
      </Box>
      
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, 
          width: "100%",
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "50%" }, padding: 2 }}>
          <ImageCarousel images={images} />
        </Box>
        <Box sx={{ width: { xs: "100%", md: "50%" }, padding: 2 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              textAlign: "center",
              color: theme.palette.background.default,
              marginBottom: 2,
            }}
          >
            {details?.info?.goods_name}
          </Typography>

          {/* Product Price */}
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.primary.main,
              textAlign: 'center',
              marginTop: 4,
              paddingTop: 2,
              marginBottom: 2,
            }}
          >
            {details?.info?.retail_price?.amountWithSymbol || "$0.00"}
          </Typography>

          {/* Rating */}
          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
            <Rating
              name="product-rating"
              value={productRating}
              precision={0.5}
              readOnly
            />
          </Box>

          {/* Size Selector */}
          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2, flexWrap: "wrap", gap: "10px" }}>
            {availableSizes.map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "contained" : "outlined"}
                color={selectedSize === size ? "secondary" : "primary"}
                onClick={() => handleSizeSelect(size)}
                sx={{ minWidth: "50px", textTransform: "none" }}
              >
                {size}
              </Button>
            ))}
          </Box>

          {/* Quantity and Add to Cart */}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 2 }}>
            <IconButton onClick={() => handleQuantityChange(-1)} disabled={isInCart}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="h6" sx={{ padding: "0 20px" }}>
              {quantity}
            </Typography>
            <IconButton onClick={() => handleQuantityChange(1)} disabled={isInCart}>
              <AddIcon />
            </IconButton>
          </Box>

          {/* Add to Cart Button */}
          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
            {isInCart ? (
              <Button
                variant="contained"
                color="success"
                startIcon={<ShoppingCartIcon />}
                sx={{ padding: "10px 20px" }}
                disabled
              >
                Added to Cart
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                sx={{ padding: "10px 20px" }}
              >
                Add to Cart
              </Button>
            )}
          </Box>

          {/* Remove from Cart Button */}
          {isInCart && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleRemoveFromCart}
                sx={{ padding: "10px 20px" }}
              >
                Remove from Cart
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      <DetailsTab details={details} />
      <Footer />
    </>
  );
};

export default ProductDetail;

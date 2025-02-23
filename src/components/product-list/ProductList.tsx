import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsRequest } from "../../redux/actions/productActions";
import {
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Paper,
  Pagination,
  Rating,
  Box,
  Chip,
} from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { styled } from "@mui/system";
import theme from "../../styles/theme";
import { Link } from 'react-router-dom';
import SearchFilterComp from "../search-and-filter/SearchFilterComp";

const CardWrapper = styled(Card)({
  width: "100%",
  height: "auto", 
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const ZoomCardMedia = styled(CardMedia)({
  position: "relative",
  height: "200px", 
  overflow: "hidden",
});

const ZoomImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)", 
  },
});

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.product.products);
  const productRatings = useSelector((state: any) => state.product.ratings); 
  const loading = useSelector((state: any) => state.product.loading);
  const error = useSelector((state: any) => state.product.error);

  const [page, setPage] = useState(1);
  const [visibleProducts, setVisibleProducts] = useState<any[]>([]);
  const [filteredProductCount, setFilteredProductCount] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);
  const productListRef = useRef<HTMLDivElement | null>(null);
  const rowsPerPage = 16;
  const [filters, setFilters] = useState({ price: 0, searchQuery: "" });
  const [originalProducts, setOriginalProducts] = useState<any[]>([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  useEffect(() => {
    const storedFilters = localStorage.getItem("productFilters");
    if (storedFilters) {
      const parsedFilters = JSON.parse(storedFilters);
      setFilters(parsedFilters);
      setIsFilterApplied(true); // Mark that a filter is applied if found in local storage
    }
  }, []);
  
  useEffect(() => {
    dispatch(fetchProductsRequest({ page }));
  }, [dispatch, page]);

  useEffect(() => {
    if (products?.info?.products && originalProducts.length === 0) {
      setOriginalProducts(products.info.products); 
    }
  }, [products]);

  useEffect(() => {
    if (originalProducts.length > 0) {
      const filteredProducts = originalProducts
        .map((product: any) => {
          const productRating = productRatings.find(
            (p: any) => p.goods_id === product.goods_id
          );
          const rating = productRating?.rating || 4.5;
          return { ...product, rating };
        })
        .filter((product: any) => {
          const matchesPrice = filters.price === 0 || Number(product.retailPrice.amount) >= filters.price;
          const matchesQuery = product.goods_name
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase());
          return matchesPrice && matchesQuery;
        });

      setFilteredProductCount(filteredProducts.length); // Set the count of filtered products

      const startIndex = (page - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      setVisibleProducts(filteredProducts.slice(startIndex, endIndex));
    }
  }, [originalProducts, filters, page, productRatings, rowsPerPage]);
  
  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    const loadMoreRef = document.getElementById("loadMore");
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreProducts();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef) {
      observer.current.observe(loadMoreRef);
    }
  }, [visibleProducts]);

  const loadMoreProducts = () => {
    const startIndex = visibleProducts.length;
    const endIndex = startIndex + rowsPerPage;

    const filteredProducts = originalProducts
      .map((product: any) => {
        const productRating = productRatings.find(
          (p: any) => p.goods_id === product.goods_id
        );
        const rating = productRating?.rating || 4.5;
        return { ...product, rating };
      })
      .filter((product: any) => {
        const matchesPrice = filters.price === 0 || Number(product.retailPrice.amount) >= filters.price;
        const matchesQuery = product.goods_name
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase());
        return matchesPrice && matchesQuery;
      });

    setVisibleProducts((prevVisibleProducts) => [
      ...prevVisibleProducts,
      ...filteredProducts.slice(startIndex, endIndex), 
    ]);
  };
  
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleFilterChange = (newFilters: { price: number; searchQuery: string }) => {
    setFilters(newFilters);
    setIsFilterApplied(true);
    setPage(1); 
    localStorage.setItem("productFilters", JSON.stringify(newFilters));
  };

  const handleRemovePriceFilter = () => {
    const updatedFilters = { ...filters, price: 0 };
    setFilters(updatedFilters);
    localStorage.setItem("productFilters", JSON.stringify(updatedFilters));
    if (!updatedFilters.searchQuery) setIsFilterApplied(false);
  };

  const handleRemoveSearchFilter = () => {
    const updatedFilters = { ...filters, searchQuery: "" };
    setFilters(updatedFilters);
    localStorage.setItem("productFilters", JSON.stringify(updatedFilters));
    if (!updatedFilters.price) setIsFilterApplied(false);
  };

  useEffect(() => {
    if (!loading && visibleProducts.length > 0 && productListRef.current && page > 1) {
      productListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading, visibleProducts, page]);

  if (loading)
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
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <SearchFilterComp onFilterChange={handleFilterChange} />
      {isFilterApplied && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, margin: '1em 0' }}>
          {filters.searchQuery && (
            <Chip
              label={`Search: ${filters.searchQuery}`}
              onDelete={handleRemoveSearchFilter}
              color="primary"
            />
          )}
          {filters.price !== 0 && (
            <Chip
              label={`Price: $${filters.price} +`}
              onDelete={handleRemovePriceFilter}
              color="primary"
            />
          )}
        </Box>
      )}
      {visibleProducts.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 4,
            marginBottom: 4,
            textAlign: 'center',
          }}
        >
          <SentimentDissatisfiedIcon sx={{ fontSize: 60, color: theme.palette.grey[500] }} />
          <Typography variant="h6" sx={{ marginTop: 2, color: theme.palette.text.secondary }}>
            No products match your search criteria.
          </Typography>
        </Box>
      ) : (
        <Paper sx={{ padding: 2 }} ref={productListRef}>
          <Grid container spacing={3}>
            {visibleProducts.map((product: any) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.goods_id}>
                <Link to={`/product/${product.goods_id}`} style={{ textDecoration: 'none' }}>
                  <CardWrapper>
                    <ZoomCardMedia>
                      <ZoomImage src={product.goods_img} alt={product.goods_name} />
                    </ZoomCardMedia>
                    <CardContent>
                      <Typography variant="h6" sx={{ textAlign: 'center', fontSize: '1.1em' }}>
                        {product.goods_name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.background.default, fontSize: "1em", textAlign: 'center' }}>
                        {product.retailPrice.amountWithSymbol}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '0.5em' }}>
                        <Rating
                          name={`rating-${product.goods_id}`}
                          value={product.rating} 
                          precision={0.5}
                          readOnly
                        />
                      </Box>
                    </CardContent>
                  </CardWrapper>
                </Link>
              </Grid>
            ))}
          </Grid>
          <div id="loadMore" style={{ height: "20px", margin: "20px 0" }}></div>
          <Pagination
            count={Math.ceil(filteredProductCount / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
            sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
          />
        </Paper>
      )}
    </div>
  );
};

export default ProductList;

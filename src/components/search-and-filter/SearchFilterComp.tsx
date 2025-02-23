import {
  Button,
  MenuItem,
  Select,
  TextField,
  useTheme,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

interface SearchFilterCompProps {
  onFilterChange: (filters: { price: number; searchQuery: string }) => void;
}

const SearchFilterComp: React.FC<SearchFilterCompProps> = ({ onFilterChange }) => {
  const theme = useTheme();
  const [price, setPrice] = useState<number | "">(0);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const priceChangeHandler = (e: SelectChangeEvent<number | "">) => {
    const selectedPrice = e.target.value === "" ? "" : Number(e.target.value); // Convert to a number if not empty
    setPrice(selectedPrice);
  };

  const searchQueryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const applyFilters = () => {
    onFilterChange({ price: price as number, searchQuery });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-around",
        alignItems: { xs: "stretch", sm: "center" },
        p: 2,
        gap: 2,
      }}
    >
      <FormControl
        sx={{
          minWidth: { xs: "100%", sm: "150px", md: "200px" },
        }}
      >
        <InputLabel>Price</InputLabel>
        <Select
          value={price}
          onChange={priceChangeHandler}
          label="Price"
          sx={{
            fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
          }}
        >
          <MenuItem value={0}>All Prices</MenuItem>
          <MenuItem value={5}>$5 +</MenuItem>
          <MenuItem value={10}>$10 +</MenuItem>
          <MenuItem value={20}>$20 +</MenuItem>
          <MenuItem value={30}>$30 +</MenuItem>
          <MenuItem value={40}>$40 +</MenuItem>
          <MenuItem value={50}>$50 +</MenuItem>
        </Select>
      </FormControl>
      <Box
        sx={{
          flexGrow: 1,
          minWidth: { xs: "100%", sm: "auto" },
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search by product name..."
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={searchQueryChangeHandler}
          sx={{
            fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
          }}
        />
      </Box>
      <Button
        onClick={applyFilters}
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.info.main,
          p: { xs: 1, sm: 1.5, md: 2 },
          fontSize: { xs: "0.5rem", sm: "0.7rem", md: "0.9rem" },
          width: { xs: "100%", sm: "auto" },
          "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.info.main,
          },
        }}
      >
        Apply filters
      </Button>
    </Box>
  );
};

export default SearchFilterComp;

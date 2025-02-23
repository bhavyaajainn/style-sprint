import React from "react";
import { Box, Typography, Button } from "@mui/material";

const FallbackPage: React.FC<{
  error: Error;
  resetErrorBoundary: () => void;
}> = ({ resetErrorBoundary }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h4" sx={{ color: "#3E362E" }}>
        Something went wrong!
      </Typography>
      <Button
        variant="contained"
        onClick={resetErrorBoundary}
        sx={{
          margin: 5,
          backgroundColor: "#93785B",
          color: "white",
          "&:hover": {
            backgroundColor: "#AC8968",
          },
        }}
      >
        Try Again
      </Button>
      <Button
        variant="contained"
        onClick={() => window.location.reload()}
        sx={{
          backgroundColor: "#93785B",
          color: "white",
          "&:hover": {
            backgroundColor: "#AC8968",

          },
        }}
      >
        Reload Page
      </Button>
    </Box>
  );
};

export default FallbackPage;

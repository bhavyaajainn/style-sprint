import { Box, useTheme } from '@mui/material';
import React from 'react'

const Footer = () => {
    const theme = useTheme();

    return (
      <Box
        sx={{
          width: "100%",
          objectFit: "cover",
          overflow: "hidden",
          backgroundColor: "#3E362E",
          color: theme.palette.common.white,
          textAlign: "center",
          padding: "0.6em 0",
          fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" }
        }}
      >
          © 2024 Style Sprint. Your style, our commitment. All rights reserved.
        </Box>
    );
}

export default Footer
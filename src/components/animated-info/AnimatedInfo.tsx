import { Box, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';

const AnimatedInfo = () => {
  const theme = useTheme();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hoverOffset, setHoverOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = event;
    const offset = clientX - currentTarget.getBoundingClientRect().left;
    setHoverOffset(offset);
  };

  return (
    <Box
      sx={{
        width: "100%",
        objectFit: "cover",
        overflow: "hidden",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        display: "flex",
        alignItems: "center",
        padding: { xs: "0.4em 0", sm: "0.6em 0", md: "0.8em 0" },
        position: "relative",
      }}
      onMouseMove={handleMouseMove} 
    >
      <Box
        component="span"
        sx={{
          display: "inline-block",
          transform: `translateX(${scrollPosition * 0.5 + hoverOffset * 0.2}px)`, 
          whiteSpace: "nowrap",
          fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem", lg: "1.5rem" },
          transition: "transform 0.1s linear", // Smooth transition
        }}
      >
        Unleash Your Style: Exclusive Discounts on the Latest Trends! 🌟 Limited time offer, 20% off on all items! 🎉 Don't miss out!
      </Box>
    </Box>
  );
};

export default AnimatedInfo;

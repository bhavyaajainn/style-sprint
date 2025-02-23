import React from "react";
import Box from "@mui/material/Box";
import { Button, Typography, useTheme } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { images, settings } from "../../utils/BannerUtils";

interface BannerProps {
  onShopNowClick: () => void; // Explicitly typing the prop
}
const Banner: React.FC<BannerProps> = ({ onShopNowClick }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        position="relative"
        height={{ xs: "70vh", sm: "60vh", md: "50vh", overflow: "hidden" }}
      >
        <Slider {...settings}>
          {images.map((image, index) => (
            <Box
              key={index}
              height={{ xs: "70vh", sm: "60vh", md: "50vh" }}
              sx={{
                p: 0,
              }}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Slider>

        <Box
          textAlign="center"
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex={10}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            color: theme.palette.info.main,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            px: { xs: 2, sm: 4, md: 6 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontSize: { xs: "1.7rem", sm: "2.2rem", md: "2.8rem" },
            }}
          >
            Style Sprint
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
            }}
          >
            Elevate Your Style – Shop the Latest Trends Now!
          </Typography>
          <Button
            onClick={onShopNowClick}
            sx={{
              backgroundColor: theme.palette.info.main,
              color: "black",
              p: { xs: 1, sm: 1.5, md: 2 },
              fontSize: { xs: "0.75rem", sm: "1rem", md: "1.25rem" },
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.info.main,
              },
            }}
          >
            Shop Now
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Banner;

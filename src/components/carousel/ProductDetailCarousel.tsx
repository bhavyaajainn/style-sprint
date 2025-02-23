import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface ImageCarouselProps {
  images: string[];
}

const CarouselContainer = styled(Box)({
  position: 'relative',
});

const Thumbnail = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  cursor: 'pointer',
  border: isActive ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
  padding: '4px',
  '&:hover': {
    border: `2px solid ${theme.palette.primary.light}`,
  },
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  borderRadius: '4px',
}));

const ThumbnailContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '8px',
  marginTop: '16px',
});

const MainImage = styled('img')({
  width: '100%',
  height: '400px',
  objectFit: 'cover',
  borderRadius: '8px',
});

const ArrowButton = styled(IconButton)({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1,
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    images?.length>=0 ?
    <CarouselContainer sx={{marginTop: "1em"}}>
      <ArrowButton onClick={handlePrevClick} style={{ left: '16px' }}>
        <ArrowBackIosIcon />
      </ArrowButton>
      <MainImage
        src={images[activeIndex]}
        alt={`Main display ${activeIndex}`}
      />
      <ArrowButton onClick={handleNextClick} style={{ right: '16px' }}>
        <ArrowForwardIosIcon />
      </ArrowButton>
      <ThumbnailContainer>
        {images.length>0 && images.map((image, index) => (
          <Thumbnail
            key={index}
            isActive={index === activeIndex}
            onClick={() => handleThumbnailClick(index)}
          >
            <img src={image} alt={`Thumbnail ${index}`} width="60px" height="60px" />
          </Thumbnail>
        ))}
      </ThumbnailContainer>
    </CarouselContainer>: 
  <></>
  );
};

export default ImageCarousel;

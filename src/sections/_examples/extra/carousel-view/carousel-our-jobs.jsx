import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { m } from 'framer-motion';
import { varFade, MotionViewport } from 'src/components/animate';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import Carousel, { useCarousel, CarouselDots, CarouselArrows } from 'src/components/carousel';
import { Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { color, margin } from '@mui/system';

// ----------------------------------------------------------------------

export default function CarouselOurJobs({ data, currentSliderJob }) {
  const theme = useTheme();

  const carousel = useCarousel({
    autoplay: true,
    ...CarouselDots({
      rounded: true,
      sx: { mt: 2 },
    }),
  });

  useEffect(() => {
    currentSliderJob(carousel.currentIndex);
  }, [carousel]);

  return (
    <Box
      sx={{
        // mt: 2,
        position: 'relative',
        '& .slick-list': {
          borderRadius: 1,
          // boxShadow: theme.customShadows.z16,
          // width: '100%',
          // height: '450px',
        },
      }}
    >
      <CarouselArrows sx={{color:'white', margin:`0px ${window.screen.width > 720 ? '80px':'0px'} 0px ${window.screen.width > 720 ? '80px':'0px'}`}} shape="rounded" icon='eva:arrow-forward-outline' onNext={carousel.onNext} onPrev={carousel.onPrev}>
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {data.map((item) => (
            <CarouselItem key={item.id} item={item} />
          ))}
        </Carousel>
      </CarouselArrows>
      
    </Box>
  );
}

CarouselOurJobs.propTypes = {
  data: PropTypes.array,
  currentSliderJob: PropTypes.any,
};

// ----------------------------------------------------------------------

function CarouselItem({ item }) {
  const { coverUrl, title } = item;

  return (
   
    <Image
      // style={{
      //   boxShadow: '-3px 0px 100px -8px rgba(0,0,0,0.67)',
      // }}
      alt={title}
      src={coverUrl}
      ratio="16/9"
    />
  );
}

CarouselItem.propTypes = {
  item: PropTypes.object,
};

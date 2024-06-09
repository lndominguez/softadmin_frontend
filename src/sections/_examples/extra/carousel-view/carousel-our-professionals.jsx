import PropTypes from 'prop-types';

import { m } from 'framer-motion';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import { alpha, useTheme } from '@mui/material/styles';
import { varFade, MotionViewport } from 'src/components/animate';

import { bgGradient } from 'src/theme/css';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';
import { Card, CardHeader, Stack, Typography } from '@mui/material';
import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

export default function CarouselOurProfessionals({ data }) {
  const carousel = useCarousel({
    slidesToShow: 3,
    centerMode: false,
    centerPadding: '60px',
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: '0' },
      },
    ],
  });

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <CarouselArrows
        // filled
        icon="eva:arrow-forward-fill"
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
      >
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {data.map((item, index) => (
            <Box key={index} sx={{ px: 1 }}>
              <CarouselItem item={item} />
            </Box>
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}

CarouselOurProfessionals.propTypes = {
  data: PropTypes.array,
};

// ----------------------------------------------------------------------

function CarouselItem({ item }) {
  const { t } = useTranslate();
  
  return (
      <Stack spacing={1} direction="row" justifyContent="center" sx={{ width: 1, height:350 }}>
        <m.div variants={varFade().inRight}>
          <Paper
            sx={{
              width: 250,
              borderRadius: 2,
              boxShadow: (theme) => theme.customShadows.z20,
            }}
          >
            <CardHeader
              title={t(item.name)}
              // subheader={item.role}
              titleTypographyProps={{
                typography: 'subtitle2',
                sx: { mb: 0.25, textAlign: 'center' },
              }}
              subheaderTypographyProps={{ typography: 'caption', textAlign:'center' }}
              sx={{ p: 2 }}
            />
            <Box sx={{ px: 1, py:1 }}>
              <Image
                alt="cover-url"
                src={item.imageUrl}
                ratio="4/3"
                sx={{
                  borderRadius: 1.5,
                }}
              />
            </Box>
          </Paper>
        </m.div>
      </Stack>

  );
}

CarouselItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
};

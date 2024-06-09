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
import Carousel, { useCarousel, CarouselArrows, CarouselDots } from 'src/components/carousel';
import { Avatar, Badge, Card, CardHeader, Grid, Rating, Stack, Typography } from '@mui/material';
import DataGridCustom from '../../mui/data-grid-view/data-grid-custom';
import { margin, width } from '@mui/system';
import CarouselCustomDots from 'src/components/carousel/carousel-custom-dots';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

export default function CarouselReviews({ data }) {
  const carousel = useCarousel({
    slidesToShow: 1,
    centerMode: false,
    ...CarouselCustomDots({
      rounded: true,
      sx: { mt: 3 },
      // styleDots:{ width: 20, height: 20, bgcolor: 'gray'},
    }),
    centerPadding: '60px',
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
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
      {/* <CarouselArrows
        filled
        icon="eva:arrow-forward-fill"
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
      > */}
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {data.map((item, index) => (
          <Box key={index} sx={{ px: 1 }}>
            <CarouselItem item={item} />
          </Box>
        ))}
      </Carousel>
      {/* </CarouselArrows> */}
    </Box>
  );
}

CarouselReviews.propTypes = {
  data: PropTypes.array,
};

// ----------------------------------------------------------------------

function CarouselItem({ item }) {
  const { currentLang } = useLocales();
  console.log(`${item.review}.${currentLang.value}`);

  return (
    <Stack
      spacing={3}
      direction="row"
      justifyContent="center"
      alignContent="space-between"
      sx={{ width: 1 }}
    >
      <m.div variants={varFade().in}>
        <Paper
          sx={{
            // width: 320,
            borderRadius: 2,
            bgcolor: '#0C3F5B',

            // boxShadow: (theme) => theme.customShadows.z20,
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs></Grid>
            <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'center' }}>
              <CardHeader
                title={item.name}
                subheader={
                  <>
                    <Typography sx={{ fontSize: 14 }}>{item.role}</Typography>
                    <Typography sx={{ fontSize: 14 }}>{item.job}</Typography>
                    {/* <Rating size="small" value={Number(item.rating)} precision={0.5} readOnly /> */}
                  </>
                }
                style={{ justifyContent: 'center', display: 'flex', textAlign: 'left' }}
                avatar={
                  <Avatar
                    alt={item.name}
                    src={item.imageUrl}
                    sx={{
                      width: 100,
                      height: 100,
                      border: `solid 3px`,
                      borderRadius: '20px',
                      borderColor: '#EFB00A',
                    }}
                  />
                }
                titleTypographyProps={{
                  typography: 'subtitle2',
                  sx: { mb: 0.25 },
                  color: 'white',
                }}
                subheaderTypographyProps={{ typography: 'caption' }}
                sx={{ p: 1 }}
              />
            </Grid>
            <Grid item xs></Grid>
          </Grid>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item xs={12} md={8}>
              {/* <CardContent> */}
              <Typography
                variant="body1"
                sx={{
                  color: 'white',
                  pt: 2,
                  px: 0,
                  textAlign: 'center',
                  fontStyle: 'italic',
                  fontSize: '20px',
                }}
              >
                "... {currentLang.value === 'es' ? item.review.es : item.review.en}"
              </Typography>
              {/* </CardContent> */}
            </Grid>
            <Grid item xs></Grid>
          </Grid>
        </Paper>
      </m.div>
    </Stack>
  );
}

CarouselItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
};

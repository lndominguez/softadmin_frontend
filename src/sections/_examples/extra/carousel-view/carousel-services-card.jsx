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
import { Card, Typography } from '@mui/material';
import { useTranslate } from 'src/locales';
import { useState } from 'react';
import { fontSize, width } from '@mui/system';

// ----------------------------------------------------------------------

export default function CarouselServicesCard({ data }) {
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
        icon="eva:arrow-forward-outline"
        // icon="eva:arrow-forward-fill"
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
       
        
      >
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {data.map((item, index) => (
            <Box key={index} sx={{ px: 1 }}>
              <CarouselItem item={item} index={index} />
            </Box>
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}

CarouselServicesCard.propTypes = {
  data: PropTypes.array,
};

// ----------------------------------------------------------------------

function CarouselItem({ item, index }) {
  const theme = useTheme();
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const { t } = useTranslate();

  const { coverUrl, title } = item;

  return (
    <m.div variants={varFade().inUp} key={item.title}>
      <Card
        sx={{
          textAlign: 'center',
          boxShadow: { md: 'none' },
          bgcolor: 'background.default',
          p: (theme) => theme.spacing(10, 5),
          ...(index % 2 !== 0 && {
            boxShadow: (theme) => ({
              md: `-5px 5px 5px ${
                theme.palette.mode === 'light'
                  ? alpha(theme.palette.grey[500], 0.16)
                  : alpha(theme.palette.common.black, 0.4)
              }`,
            }),
          }),
        }}
      >
        <Box
          component="img"
          src={item.icon}
          alt={t(item.title)}
          sx={{ mx: 'auto', width: 50, height: 50 }}
        />

        <Typography variant="h5" sx={{ mt: 8, mb: 2 }}>
          {t(item.title)}
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          {isReadMore
            ? t(`${item.title}_description`).slice(0, 100)
            : t(`${item.title}_description`)}
          {/* {t(`${item.title}_description`)} */}
          <span onClick={toggleReadMore} className="read-or-hide" style={{ color: 'green' }}>
            {isReadMore ? `...${t('read_more')}` : `  ${t('show_less')}`}
          </span>
        </Typography>
      </Card>
    </m.div>

    // <Paper
    //   sx={{
    //     borderRadius: 2,
    //     overflow: 'hidden',
    //     position: 'relative',
    //   }}
    // >
    //   <Image alt={title} src={coverUrl} ratio="3/4" />

    //   <CardContent
    //     sx={{
    //       bottom: 0,
    //       zIndex: 9,
    //       width: '100%',
    //       textAlign: 'left',
    //       position: 'absolute',
    //       color: 'common.white',
    //       ...bgGradient({
    //         direction: 'to top',
    //         startColor: `${theme.palette.grey[900]} 25%`,
    //         endColor: `${alpha(theme.palette.grey[900], 0)} 100%`,
    //       }),
    //     }}
    //   >
    //     <TextMaxLine variant="h4" sx={{ mb: 2 }}>
    //       {title}
    //     </TextMaxLine>

    //     <Link
    //       color="inherit"
    //       variant="overline"
    //       sx={{
    //         opacity: 0.72,
    //         alignItems: 'center',
    //         display: 'inline-flex',
    //         transition: theme.transitions.create(['opacity']),
    //         '&:hover': { opacity: 1 },
    //       }}
    //     >
    //       learn More
    //       <Iconify icon="eva:arrow-forward-fill" width={16} sx={{ ml: 1 }} />
    //     </Link>
    //   </CardContent>
    // </Paper>
  );
}

CarouselItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
};

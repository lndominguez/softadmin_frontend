import PropTypes from 'prop-types';

import { m } from 'framer-motion';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
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
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

export default function CarouselApps({ data }) {
  const mdUp = useResponsive('up', 'md');

  const carousel = useCarousel({
    autoplay: true,
    ...CarouselDots({
      rounded: true,
      sx: { mt: 4 },
    }),
  });

  function subList(array, cantidad) {
    var resultado = [];
    for (var i = 0; i < array.length; i += cantidad) {
      resultado.push(array.slice(i, i + cantidad));
    }
    return resultado;
  }
  return (
    <CarouselArrows
      // filled
      icon="eva:arrow-forward-outline"
      // icon="eva:arrow-forward-fill"
      onNext={carousel.onNext}
      onPrev={carousel.onPrev}
    >
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {subList(data, mdUp && 9 || 8).map((item, index) => (
          <Box key={index} sx={{ px: 5 }}>
            <CarouselItem data={item} />
          </Box>
        ))}
        {/* [0, 1].map((value, position) => (
        <CarouselItem data={data} key={position} />
      ))} */}
      </Carousel>
    </CarouselArrows>
  );
}

CarouselApps.propTypes = {
  data: PropTypes.array,
};

// ----------------------------------------------------------------------

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // backgroundColor: 'Highlight',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '90px',
  height: '90px',
}));

function CarouselItem({ data }) {
  return (
    <Stack
      spacing={{ xs: 1, sm: 4 }}
      direction="row"
      useFlexGap
      flexWrap="wrap"
      justifyContent="space-around"
    >
      {data.map((item, index) => (
        <Item
          key={index}
          style={{
            backgroundImage: `url("${item.image}")`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '80%',
          }}
        ></Item>
      ))}
    </Stack>
  );
}

CarouselItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
};

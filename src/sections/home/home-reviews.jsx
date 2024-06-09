import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { useResponsive } from 'src/hooks/use-responsive';

import { _homePlans } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';
import { Card, CardContent } from '@mui/material';
import CarouselReviews from '../_examples/extra/carousel-view/carousel-reviews';
import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

const CARDS = [
  {
    imageUrl: 'assets/images/home/hero/professionals/amador.jpeg',
    name: 'Ph.D. Luis Amador',
    role: 'Coordinador de doctorados',
    job: 'Andrews University',
    date: 'Febrero 12, 2019',
    rating: 5,
    review:{
      es:'He estado utilizando los servicios de este equipo para varios proyectos durante aproximadamente cinco años. Desde la fase de planificación, pasando por la implementación y hasta el soporte, he notado un incremento constante en su nivel de profesionalismo. En cada situación, demostraron saber qué hacer y buscaron alternativas adicionales cuando fue necesario. Ante varias opciones, siempre prefiero la oferta de esta compañía',
      en:"I have been using the services of this team for several projects for about five years. From planning, through implementation, and finally support, I have noticed a growing level of professionalism. In every situation, they knew what to do and sought additional alternatives. Faced with several offers, I prefer this company's"
    }
  },
  
];

export default function HomeReviews() {
  const mdUp = useResponsive('up', 'md');
  const { t } = useTranslate();

  const [currentTab, setCurrentTab] = useState('Standard');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const renderDescription = (
    <Stack spacing={3} sx={{ mb: 2, textAlign: 'center' }}>
      <m.div variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ mb: 2, color: '#00A76F' }}>
          {t('success_stories')}
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography variant="h3" color="white">
        {t('success_stories_title')}
        </Typography>
      </m.div>
    </Stack>
  );

  return (
    <Box
      sx={{
        py: { xs: 10, md: 15 },
        // bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
        bgcolor: '#0C3F5B',
      }}
    >
      <Container component={MotionViewport}>
        {renderDescription}

        <Card style={{ boxShadow: 'none', borderRadius: 0 }}>
          {/* <CardHeader title="Carousel Animation" /> */}
          <CardContent sx={{ bgcolor: '#0C3F5B' }}>
            <CarouselReviews data={CARDS} />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function PlanCard({ plan, sx, ...other }) {
  const { license, commons, options, icons } = plan;

  const standardLicense = license === 'Standard';

  const plusLicense = license === 'Standard Plus';

  return (
    <Stack
      spacing={5}
      sx={{
        p: 5,
        pt: 10,
        ...(plusLicense && {
          borderLeft: (theme) => `dashed 1px ${theme.palette.divider}`,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...sx,
        }),
      }}
      {...other}
    >
      <Stack spacing={2}>
        <Typography variant="overline" component="div" sx={{ color: 'text.disabled' }}>
          License
        </Typography>

        <Box sx={{ position: 'relative' }}>
          <Typography variant="h4">{license}</Typography>
          <Box
            sx={{
              left: 0,
              bottom: 4,
              width: 40,
              height: 8,
              opacity: 0.48,
              bgcolor: 'error.main',
              position: 'absolute',
              ...(standardLicense && { bgcolor: 'primary.main' }),
              ...(plusLicense && { bgcolor: 'warning.main' }),
            }}
          />
        </Box>
      </Stack>

      {standardLicense ? (
        <Box component="img" alt={icons[1]} src={icons[1]} sx={{ width: 20, height: 20 }} />
      ) : (
        <Stack direction="row" spacing={2}>
          {icons.map((icon) => (
            <Box component="img" key={icon} alt={icon} src={icon} sx={{ width: 20, height: 20 }} />
          ))}
        </Stack>
      )}

      <Stack spacing={2.5}>
        {commons.map((option) => (
          <Stack key={option} spacing={1} direction="row" alignItems="center">
            <Iconify icon="eva:checkmark-fill" width={16} />
            <Typography variant="body2">{option}</Typography>
          </Stack>
        ))}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {options.map((option, optionIndex) => {
          const disabled =
            (standardLicense && optionIndex === 1) ||
            (standardLicense && optionIndex === 2) ||
            (standardLicense && optionIndex === 3) ||
            (plusLicense && optionIndex === 3);

          return (
            <Stack
              spacing={1}
              direction="row"
              alignItems="center"
              sx={{
                ...(disabled && { color: 'text.disabled' }),
              }}
              key={option}
            >
              <Iconify icon={disabled ? 'mingcute:close-line' : 'eva:checkmark-fill'} width={16} />
              <Typography variant="body2">{option}</Typography>
            </Stack>
          );
        })}
      </Stack>

      <Stack alignItems="flex-end">
        <Button
          color="inherit"
          size="small"
          target="_blank"
          rel="noopener"
          href={paths.minimalUI}
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          Learn more
        </Button>
      </Stack>
    </Stack>
  );
}

PlanCard.propTypes = {
  plan: PropTypes.object,
  sx: PropTypes.object,
};

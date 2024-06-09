import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { alpha, styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { bgBlur, bgGradient, textGradient } from 'src/theme/css';

import { varFade, MotionViewport } from 'src/components/animate';
import { HEADER } from 'src/layouts/config-layout';
import { Button, CardContent, CardHeader } from '@mui/material';
import CarouselServicesCard from '../_examples/extra/carousel-view/carousel-services-card';
import { _mock } from 'src/_mock';
import { useTranslate } from 'src/locales';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

const StyledQuienesSomos = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.paper, theme.palette.mode === 'light' ? 0.9 : 0.94),
    // imgUrl: '/assets/background/overlay_3.jpg',
  }),
  width: '100%',
  height: '100vh',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    position: 'fixed',
  },
}));

const _carouselsExample = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.postTitle(index),
  coverUrl: _mock.image.cover(index),
  description: _mock.description(index),
}));
// ----------------------------------------------------------------------

export default function HomeMinimal({ openDialog }) {
  const { t } = useTranslate();
  const mdUp = useResponsive('up', 'md');

  const CARDS = [
    {
      icon: ' /assets/icons/home/ai.png',
      title: 'artificial_intelligence',
    },
    {
      icon: '/assets/icons/home/ic_development.svg',
      title: 'software_development',
    },
    {
      icon: ' /assets/icons/home/ic_design.svg',
      title: 'ui_design',
    },
    {
      icon: ' /assets/icons/home/commerce.png',
      title: 'e_commerce',
    },
    {
      icon: '/assets/icons/home/mobile.png',
      title: 'apps_development',
    },
    {
      icon: ' /assets/icons/home/quality_assurance.png',
      title: 'quality_assurance',
    },

    {
      icon: ' /assets/icons/home/support.png',
      title: 'maintenance_and_support',
    },
    {
      icon: ' /assets/icons/home/staffing_services.png',
      title: 'staffing_services',
    },
    {
      icon: '/assets/icons/home/it_consulting.png',
      title: 'it_consulting',
    },
    {
      icon: ' /assets/icons/home/infrastructure.png',
      title: 'infrastructure',
    },

    {
      icon: ' /assets/icons/home/outsourcing_it.png',
      title: 'outsourcing_it',
    },
  ];

  const urls = [];
  urls[0] = '/assets/background/bg_random/banner_0.png';
  urls[1] = '/assets/background/bg_random/banner_1.png';
  urls[2] = '/assets/background/bg_random/banner_2.png';
  urls[3] = '/assets/background/bg_random/banner_3.png';

  const urlPosition = Math.floor(Math.random() * urls.length);
  return (
    <>
      {/* <div
      
        style={{
          backgroundImage: `url(${urls[urlPosition]})`,
          backgroundSize: `${mdUp && '95%' || '100%'}`,
          backgroundPosition: `${mdUp && 'right center' || 'center'}`,
          backgroundRepeat:  `${mdUp && 'no-repeat' || 'no-repeat'}`,
          backgroundAttachment: `${mdUp && 'initial' || 'initial !important'}`,
        }}
      >
    
        <div
          style={{
            height: '30rem',
            background:
              'linear-gradient(120deg, rgba(234,140,25,1) 0%, rgba(241,196,2,1) 18%, rgba(235,149,22,1) 45%, rgba(235,149,22,0.5172269591430323) 75%)',
          }}
        > */}
      <Box
        sx={{
          // height: { md: 680 },
          py: { xs: 10, md: 0 },
          overflow: 'hidden',
          position: 'relative',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // backgroundAttachment:'fixed',
          backgroundImage:
            `linear-gradient(120deg, rgba(234,140,25,1) 0%, rgba(241,196,2,1) 18%, rgba(235,149,22,1) 45%, rgba(235,149,22,0.5172269591430323) 75%), url(${urls[urlPosition]})`,
        }}
      >
        
        <Container
          component={MotionViewport}
          sx={{
            py: { xs: 10, md: 15 },
          }}
        >
          <Stack
            alignItems="left"
            justifyContent="center"
            sx={{
              height: 1,
              px: 3,
              maxWidth: 550,
              color: 'white',
            }}
          >
            <m.div variants={varFade({ durationIn: 1.5 }).inLeft}>
              <Typography
                variant="h2"
                sx={{
                  textAlign: 'left',
                }}
              >
                {t('why_choose_us')}
              </Typography>
            </m.div>

            <m.div variants={varFade({ durationIn: 1.5 }).inRight}>
              <Typography variant="body1" sx={{ textAlign: 'left', maxWidth: 350 }}>
                {t('why_choose_us_info')}
              </Typography>
            </m.div>
          </Stack>
        </Container>
        {/* </div>
      </div> */}
      </Box>
      <Container
        component={MotionViewport}
        sx={{
          py: { xs: 10, md: 15 },
        }}
      >
        <Stack
          spacing={3}
          sx={{
            textAlign: 'center',
            mb: { xs: 5, md: 10 },
          }}
        >
          <m.div variants={varFade().inUp}>
            <Typography
              component="div"
              variant="overline"
              sx={{ color: 'text.disabled', fontSize: '12px' }}
            >
              {t('services')}
            </Typography>
          </m.div>

          <m.div variants={varFade().inDown} style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h2" color="#0C3F5B" style={{ width: 400 }}>
              {t('services_title')}
              {/* ¿Sabes cuales son <br /> nuestros servicios? */}
            </Typography>
          </m.div>
        </Stack>
        {/* <Box
          gap={{ xs: 3, lg: 10 }}
          display="grid"
          alignItems="center"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        > */}
        <Card style={{ boxShadow: 'none' }}>
          {/* <CardHeader title="Carousel Animation" /> */}
          <CardContent>
            <CarouselServicesCard data={CARDS} />
          </CardContent>
        </Card>

        <m.div variants={varFade({ durationIn: 1.5 }).inRight}>
          <Stack
            spacing={1.5}
            direction={{ xs: 'column-reverse', sm: 'row' }}
            sx={{ mb: 2, mt: 2, display: 'flex', justifyContent: 'center' }}
          >
            <Button
              color="inherit"
              size="medium"
              variant="outlined"
              // startIcon={<Iconify icon="eva:external-link-fill" width={24} />}
              target="_blank"
              rel="noopener"
              // href={paths.figma}
              onClick={openDialog.onTrue}
              sx={{ borderColor: '#C4CDD5' }}
            >
              <Typography variant="h6" color="#0C3F5B">
                {t('request_service')}
              </Typography>
            </Button>
          </Stack>
        </m.div>
      </Container>
    </>
  );
}

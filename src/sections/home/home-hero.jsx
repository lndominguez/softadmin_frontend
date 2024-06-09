import { m, useScroll } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { alpha, styled, useTheme } from '@mui/material/styles';
import emailjs from '@emailjs/browser';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { HEADER } from 'src/layouts/config-layout';
import { bgBlur, bgGradient, textGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';
import { varFade, MotionContainer } from 'src/components/animate';
import FormDialog from '../_examples/mui/dialog-view/form-dialog';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  // ...bgGradient({
  //   direction:'to right',
  //   startColor:'#F4F6F8 30%',
  //   endColor:'#DFE3E8 50%',
  //   color:'#DFE3E8'
  //   // color: alpha('#DFE3E8', theme.palette.mode === 'light' ? 9 : 94),
  //   // imgUrl: '/assets/background/overlay_3.jpg',
  // }),
  background:' linear-gradient(180deg, #F4F6F8 0%, #DFE3E8 100%)',
  width: '100%',
  height: '100vh',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    position: 'fixed',
  },
}));

const StyledWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  // [theme.breakpoints.up('md')]: {
  //   marginTop: HEADER.H_DESKTOP_OFFSET,
  // },
}));

const StyledTextGradient = styled(m.h1)(({ theme }) => ({
  ...textGradient(
    `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.warning.main} 75%, ${theme.palette.primary.main} 100%`
  ),
  padding: 0,
  marginTop: 8,
  lineHeight: 1,
  fontWeight: 900,
  marginBottom: 24,
  letterSpacing: 8,
  textAlign: 'center',
  backgroundSize: '400%',
  fontSize: `${64 / 16}rem`,
  fontFamily: theme.typography.fontSecondaryFamily,
  [theme.breakpoints.up('md')]: {
    fontSize: `${96 / 16}rem`,
  },
}));

const StyledEllipseTop = styled('div')(({ theme }) => ({
  top: -80,
  width: 480,
  right: -80,
  height: 480,
  borderRadius: '50%',
  position: 'absolute',
  filter: 'blur(100px)',
  WebkitFilter: 'blur(100px)',
  backgroundColor: alpha(theme.palette.primary.dark, 0.12),
}));

const StyledEllipseBottom = styled('div')(({ theme }) => ({
  height: 400,
  bottom: -200,
  left: '10%',
  right: '10%',
  borderRadius: '50%',
  position: 'absolute',
  filter: 'blur(100px)',
  WebkitFilter: 'blur(100px)',
  backgroundColor: alpha(theme.palette.primary.dark, 0.12),
}));

const StyledPolygon = styled('div')(({ opacity = 1, anchor = 'left', theme }) => ({
  // ...bgBlur({
  //   opacity,
  //   color: '#EFB00A',
  // }),
  background: 'linear-gradient(120deg, rgba(235,149,22,0.3) 30%, rgba(234,140,25,0.5) 50%)',

  zIndex: 9,
  bottom: 0,
  height: 80,
  width: '50%',
  position: 'absolute',
  clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
  ...(anchor === 'left' && {
    left: 0,
    ...(theme.direction === 'rtl' && {
      transform: 'scale(-1, 1)',
    }),
  }),
  ...(anchor === 'right' && {
    right: 0,
    transform: 'scaleX(-1)',
    ...(theme.direction === 'rtl' && {
      transform: 'scaleX(1)',
    }),
  }),
}));

// ----------------------------------------------------------------------

export default function HomeHero({ openDialog }) {
  const mdUp = useResponsive('up', 'md');
  const screen = window.screen;
  const theme = useTheme();
  const { t } = useTranslate();
  const heroRef = useRef(null);

  const { scrollY } = useScroll();

  const [percent, setPercent] = useState(0);

  const lightMode = theme.palette.mode === 'light';

  const getScroll = useCallback(() => {
    let heroHeight = 0;

    if (heroRef.current) {
      heroHeight = heroRef.current.offsetHeight;
    }

    scrollY.on('change', (scrollHeight) => {
      const scrollPercent = (scrollHeight * 100) / heroHeight;

      setPercent(Math.floor(scrollPercent));
    });
  }, [scrollY]);

  useEffect(() => {
    getScroll();
  }, [getScroll]);

  const transition = {
    repeatType: 'loop',
    ease: 'linear',
    duration: 60 * 4,
    repeat: Infinity,
  };

  const opacity = 1 - percent / 100;

  const hide = percent > 120;

  const renderDescription = (
    <Stack
      alignItems="left"
      justifyContent="center"
      sx={{
        height: (mdUp && 1 )|| 0.8,
        mx: 'auto',
        maxWidth: 450,
        opacity: opacity > 0 ? opacity : 0,
        mt: {
          md: `-${HEADER.H_DESKTOP + percent * 2.5}px`,
        },
      }}
    >
      <m.div variants={varFade().in}>
        <Typography
          variant="h2"
          color='#0C3F5B'
          sx={{
            textAlign: 'left',
          }}
        >
          {t('start_your_proyect')} <br />
          {t('with_us')}
        </Typography>
      </m.div>
      <m.div variants={varFade().in}>
        <StyledTextGradient
          sx={{
            textAlign: 'left',
          }}
          animate={{ backgroundPosition: '200% center' }}
          transition={{
            repeatType: 'reverse',
            ease: 'linear',
            duration: 20,
            repeat: Infinity,
          }}
        >
        </StyledTextGradient>
      </m.div>

      <m.div variants={varFade().in}>
        <Typography variant="body1" color='#637381' sx={{ textAlign: 'left', mt: -2.5, width:'90%' }}>
          {t('start_now_info')}
        </Typography>
      </m.div>

      <m.div variants={varFade().inLeft}>
        <Stack spacing={1.5} direction={{ xs: 'column-reverse', sm: 'row' }} sx={{ mb: 2, mt: 2 }}>
          <Button
            color="inherit"
            size="large"
            variant="outlined"
            // startIcon={<Iconify icon="eva:external-link-fill" width={24} />}
            target="_blank"
            rel="noopener"
            // href={paths.figma}
            onClick={openDialog.onTrue}
            sx={{ borderColor: '#C4CDD5' }}
          >
             <Typography variant="h6" color='#0C3F5B'>
            {t('btn_start_now')}
             </Typography>
          </Button>
        </Stack>
      </m.div>
    </Stack>
  );

  const renderSlides = (
    <Stack
      direction="row"
      alignItems="flex-start"
      sx={{
        height: '150%',
        position: 'absolute',
        opacity: opacity > 0 ? opacity : 0,
        transform: `skew(${-16 - percent / 24}deg, ${4 - percent / 16}deg)`,
        ...(theme.direction === 'rtl' && {
          transform: `skew(${16 + percent / 24}deg, ${4 + percent / 16}deg)`,
        }),
        
        // box-shadow: 6px 9px 100px 100px rgba(0, 0, 0, 0.51);
      }}
    >
      <Stack
        component={m.div}
        variants={varFade().in}
        sx={{
          width: 200,
          marginRight: '5%',
          position: 'relative',
        }}
      >
        <Box
          component={m.img}
          animate={{ y: ['0%', '100%'] }}
          transition={transition}
          alt={lightMode ? 'light3' : 'dark_1'}
          src={
            lightMode
              ? `/assets/images/home/hero/light_3.png`
              : `/assets/images/home/hero/dark_1.webp`
              
          }
          sx={{ position: 'absolute', mt: -5, boxShadow: '0px 0px 70px 20px rgba(0,0,0,0.40)' }}
        />
        <Box
          component={m.img}
          animate={{ y: ['-100%', '0%'] }}
          transition={transition}
          alt={lightMode ? 'light3' : 'dark_1'}
          src={
            lightMode
              ? `/assets/images/home/hero/light_3.png`
              : `/assets/images/home/hero/dark_1.webp`
          }
          sx={{ position: 'absolute' ,  boxShadow: '0px 0px 70px 20px rgba(0,0,0,0.40)'}}
        />
      </Stack>

      <Stack
        component={m.div}
        variants={varFade().in}
        sx={{ width: 300, position: 'relative', ml: -3 }}
      >
        <Box
          component={m.img}
          animate={{ y: ['100%', '0%'] }}
          transition={transition}
          alt={lightMode ? 'light_2' : 'dark_2'}
          src={
            lightMode
              ? `/assets/images/home/hero/light_3.png`
              : `/assets/images/home/hero/dark_2.webp`
          }
          sx={{ position: 'absolute', mt: -5 ,  boxShadow: '0px 0px 70px 20px rgba(0,0,0,0.30)'}}
        />
        <Box
          component={m.img}
          animate={{ y: ['0%', '-100%'] }}
          transition={transition}
          alt={lightMode ? 'light_2' : 'dark_2'}
          src={
            lightMode
              ? `/assets/images/home/hero/light_3.png`
              : `/assets/images/home/hero/dark_2.webp`
          }
          sx={{ position: 'absolute', boxShadow: '0px 0px 70px 20px rgba(0,0,0,0.30)' }}
        />
      </Stack>
      <Stack
        component={m.div}
        variants={varFade().in}
        sx={{ width: 350, position: 'relative', ml: 2.5 }}
      >
        <Box
          component={m.img}
          animate={{ y: ['0%', '100%'] }}
          transition={transition}
          alt={lightMode ? 'light_2' : 'dark_2'}
          src={
            lightMode
              ? `/assets/images/home/hero/light_3.png`
              : `/assets/images/home/hero/dark_2.webp`
          }
          sx={{ position: 'absolute', mt: -5 ,  boxShadow: '0px 0px 70px 20px rgba(0,0,0,0.30)'}}
        />
        <Box
          component={m.img}
          animate={{ y: ['-100%', '0%'] }}
          transition={transition}
          alt={lightMode ? 'light_2' : 'dark_2'}
          src={
            lightMode
              ? `/assets/images/home/hero/light_3.png`
              : `/assets/images/home/hero/dark_2.webp`
          }
          sx={{ position: 'absolute' ,  boxShadow: '0px 0px 70px 20px rgba(0,0,0,0.30)'}}
        />
      </Stack>
    </Stack>
  );

  const renderPolygons = (
    <>
      <StyledPolygon
        style={{
          background:
            'linear-gradient(120deg, rgba(234,140,25,1) 4%, rgba(241,196,2,1) 50%, rgba(235,149,22,1) 100%, rgba(235,149,22,0.5172269591430323) 75%)',
        }}
      />
      <StyledPolygon anchor="right" opacity={0.48} />
      <StyledPolygon anchor="right" opacity={0.48} sx={{ height: 50, zIndex: 10 }} />
      <StyledPolygon anchor="right" sx={{ zIndex: 11, height: 25 }} />
    </>
  );
  const renderPolygons2 = (
    <>
      <StyledPolygon
        sx={{
          background:
            `linear-gradient(120deg, rgba(234,140,25,1) ${0.05*screen.width}%, rgba(241,196,2,1) ${0.12*screen.width}%, rgba(235,149,22,1) 100%, rgba(235,149,22,0.5172269591430323) 75%)`,
          height: 100,
          zIndex: 0,
        }}
      />
      <StyledPolygon anchor="right" opacity={0.2} sx={{ height: 100, zIndex: 10 }} />
      <StyledPolygon anchor="right" opacity={0.2} sx={{ height: 55, zIndex: 10 }} />
      <StyledPolygon anchor="right" sx={{ zIndex: 11, height: 35 }} />
    </>
  );

  const renderEllipses = (
    <>
      {mdUp && <StyledEllipseTop />}
      <StyledEllipseBottom />
    </>
  );

  return (
    <>
      <StyledRoot
        ref={heroRef}
        sx={{
          ...(hide && {
            opacity: 0,
          }),
        }}
      >
        <StyledWrapper>
          <Container component={MotionContainer} sx={{ height: 1 }}>
            <Grid container columnSpacing={{ md: 10 }} sx={{ height: 1 }}>
              <Grid xs={12} md={6}>
                {renderDescription}
              </Grid>

              {mdUp && <Grid md={6}>{renderSlides}</Grid>}
            </Grid>
          </Container>
          {mdUp && renderEllipses}
        </StyledWrapper>
      </StyledRoot>
      {mdUp && renderPolygons}

      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}

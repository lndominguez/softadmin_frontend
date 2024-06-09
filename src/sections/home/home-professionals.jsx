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
import CarouselOurProfessionals from '../_examples/extra/carousel-view/carousel-our-professionals';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

const CARDS = [
  {
    imageUrl: 'assets/images/home/hero/professionals/e-commerce.png',
    name: 'e_commerce',
    role: 'CEO',
  },
  {
    imageUrl: 'assets/images/home/hero/professionals/ia.jpg',
    name: 'artificial_intelligence',
    role: 'COO',
  },
  {
    imageUrl: 'assets/images/home/hero/professionals/education.png',
    name: 'education',
    role: 'CTO',
  },
];

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

export default function HomeProfessionals({ openDialog }) {
  const mdUp = useResponsive('up', 'md');

  const { t } = useTranslate();
  return (
    <>
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
            mb: { xs: 5, md: 4 },
          }}
        >
          <m.div variants={varFade().inUp}>
            <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
              {t('our_business_focus')}
            </Typography>
          </m.div>

          {(mdUp && (
            <m.div
              variants={varFade().inDown}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <Typography variant="h2" color="#0C3F5B">
                {t('our_business_focus_title.exp')}
              </Typography>
              <div
                style={{
                  backgroundColor: '#EFB00A',
                  borderRadius: '20px',
                  width: '10px',
                  height: '10px',
                  margin: '15px',
                }}
              ></div>
              <Typography variant="h2" color="#0C3F5B">
                {t('our_business_focus_title.dedication')}
              </Typography>
              <div
                style={{
                  backgroundColor: '#EFB00A',
                  borderRadius: '20px',
                  width: '10px',
                  height: '10px',
                  margin: '15px',
                }}
              ></div>
              <Typography variant="h2" color="#0C3F5B">
                {t('our_business_focus_title.innovation')}
              </Typography>
            </m.div>
          )) || (
            <m.div variants={varFade().inDown}>
              <div style={{display:'flex',justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant="h2" color="#0C3F5B">
                  {t('our_business_focus_title.exp')}
                </Typography>
                <div
                  style={{
                    backgroundColor: '#EFB00A',
                    borderRadius: '20px',
                    width: '10px',
                    height: '10px',
                    margin: '15px',
                  }}
                ></div>
                <Typography variant="h2" color="#0C3F5B">
                  {t('our_business_focus_title.dedication')}
                </Typography>
              </div>
              <Typography variant="h2" color="#0C3F5B">
                {t('our_business_focus_title.innovation')}
              </Typography>
            </m.div>
          )}
        </Stack>

        <m.div variants={varFade().inDown} style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body1" style={{ width: 750, textAlign:'center' }}>
            {t('our_business_focus_description')}
          </Typography>
        </m.div>
        <Card style={{ boxShadow: 'none' }}>
          <CardContent>
            <CarouselOurProfessionals data={CARDS} />
          </CardContent>
        </Card>

        {/* <m.div variants={varFade({ durationIn: 1.5 }).inRight}>
          <Stack
            spacing={1.5}
            direction={{ xs: 'column-reverse', sm: 'row' }}
            sx={{ mb: 2, mt: 2, display: 'flex', justifyContent: 'center' }}
          >
            <Button
              color="inherit"
              size="large"
              variant="outlined"
              // startIcon={<Iconify icon="eva:external-link-fill" width={24} />}
              target="_blank"
              rel="noopener"
              // href={paths.figma}
              onClick={openDialog.onTrue}
              sx={{ borderColor: 'text.primary' }}
            >
              {t('btn_contact')}
            </Button>
          </Stack>
        </m.div> */}
      </Container>
    </>
  );
}

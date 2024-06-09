import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';
import { Card, Grid, Paper, Typography } from '@mui/material';
import BookingWidgetSummary from '../overview/booking/booking-widget-summary';
import Image from 'src/components/image';
import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

export default function HomeAdvertisement({ openDialog }) {
  const theme = useTheme();
  const { t } = useTranslate();

  const renderDescription = (
    <Box
      sx={{
        textAlign: {
          xs: 'center',
          md: 'left',
        },
      }}
    >
      <Box
        component={m.div}
        variants={varFade().inDown}
        sx={{ color: 'common.white', mb: 5, typography: 'h2' }}
      >
        {t('contact_us')}
        <Typography sx={{ mb: 3,  }}>{t('contact_info')}</Typography>
      </Box>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent={{ xs: 'center', md: 'flex-start' }}
        spacing={2}
      >
        <m.div variants={varFade().inRight}>
          <Button
            color="primary"
            size="large"
            variant="contained"
            target="_blank"
            rel="noopener"
            // href={paths.minimalUI}
            onClick={openDialog.onTrue}
            sx={{
              color: 'grey.800',
              bgcolor: 'common.white',
            }}
          >
            {t('btn_contact')}
          </Button>
        </m.div>
      </Stack>
    </Box>
  );

  const renderImg = (
    <Stack component={m.div} variants={varFade().inUp} alignItems="center">
      <Box
        component={m.img}
        animate={{
          y: [-20, 0, -20],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        alt="rocket"
        src="/assets/images/home/board.png"
        sx={{ maxWidth: 460, px: 10, py: 10, width: '320px' }}
      />
    </Stack>
  );

  return (
    <Container component={MotionViewport}>
      <Stack
        alignItems="center"
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          ...bgGradient({
            direction: '135deg',
            startColor: theme.palette.primary.main,
            endColor: theme.palette.primary.dark,
          }),
          borderRadius: 2,
          pb: { xs: 5, md: 5 },
          mt: 5,
          mb: 3,
        }}
      >
        {renderImg}

        {renderDescription}
      </Stack>
      <Stack
        spacing={3}
        direction="row"
        justifyContent="space-between"
        sx={{ width: 1, height: 120 }}
      >
        {/* <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={6} md={6}>
            <Card
              sx={{
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'end',
                p: 2,
                pl: 3,
              }}
            >
              <Box sx={{ textAlign: 'end', mr: 2 }}>
                <Box sx={{ color: 'text.secondary', typography: 'subtitle2' }}>Visitas</Box>
                <Box sx={{ typography: 'h3' }}>{3256600}</Box>
              </Box>

              <Box
                sx={{
                  width: 70,
                  mb: 1,
                  // height: 120,
                  lineHeight: 0,
                  // borderRadius: '50%',
                  // bgcolor: 'background.neutral',
                }}
              >
                <Image
                  alt="cover-url"
                  src="assets/icons/home/ic_download.png"
                  // ratio="16/9"
                  sx={{
                    borderRadius: 1.5,
                  }}
                />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={6} md={6}>
            <Card
              sx={{
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'end',
                p: 2,
                pl: 3,
              }}
            >
              <Box sx={{ textAlign: 'end', mr: 2 }}>
                <Box sx={{ color: 'text.secondary', typography: 'subtitle2' }}>Proyectos</Box>
                <Box sx={{ typography: 'h3' }}>{300}</Box>
              </Box>

              <Box
                sx={{
                  width: 70,
                  mb: 1,
                  // height: 120,
                  lineHeight: 0,
                  // borderRadius: '50%',
                  // bgcolor: 'background.neutral',
                }}
              >
                <Image
                  alt="cover-url"
                  src="assets/icons/home/ic_folder.png"
                  // ratio="16/9"
                  sx={{
                    borderRadius: 1.5,
                  }}
                />
              </Box>
            </Card>
          </Grid>
        </Grid> */}
      </Stack>
    </Container>
  );
}

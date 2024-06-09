import { color, m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import emailjs from '@emailjs/browser';

import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';
import { Card, Grid, IconButton, InputAdornment, Paper, Typography } from '@mui/material';
import BookingWidgetSummary from '../overview/booking/booking-widget-summary';
import Image from 'src/components/image';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useTranslate } from 'src/locales';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function HomeSubscribe() {
  const { t } = useTranslate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  const social_media = [
    {
      icon: '/assets/icons/platforms/ic_facebook.png',
      title: 'Facebook',
      url: 'https://www.facebook.com/apexucode',
    },
    {
      icon: '/assets/icons/platforms/ic_instagram.png',
      title: 'Instagram',
      url: 'https://www.instagram.com/apexucode/',
    },
    {
      icon: '/assets/icons/platforms/ic_linkedin.png',
      title: 'Linkedin',
      url: 'https://www.linkedin.com/company/apexuc/',
    },
  ];
  const theme = useTheme();
  const SubscribeSchema = Yup.object().shape({
    email: Yup.string().required(`${t('required_email')}`).email(`${t('valid_email')}`),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(SubscribeSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const renderDescription = (
    <Box
      sx={{
        textAlign: {
          xs: 'center',
          md: 'left',
        },
        maxWidth: { xs: '60%', md: '30%' },
        mt: 'inherit',
      }}
    >
      <Box
        component={m.div}
        variants={varFade().inDown}
        sx={{ color: 'common.white', mb: 5, typography: 'h3' }}
      >
        {t('join_our_community')}
        <Typography sx={{ mb: 3, mr: 2 }}>{t('join_our_community_info')}</Typography>
      </Box>
    </Box>
  );

  const onSubmit = handleSubmit(async (data) => {
    try {
      emailjs
        .send('service_wo9m1rh', 'template_8ys1g5r', data, {
          publicKey: 'UI8eE5zTslc0fA-dp',
        })
        .then(
          () => {
            console.log('SUCCESS!');
            reset();
            emailjs
              .send('service_wo9m1rh', 'template_k08mixj', data, {
                publicKey: 'UI8eE5zTslc0fA-dp',
              })
              .then(() => {
                console.log('SUCCESS sending WELCOME!');
                enqueueSnackbar(`${t('success_email_sent')}`, {
                  variant: 'success',
                })
              });
          },
          (error) => {
            console.log('FAILED...', error.text);
          }
        );
    } catch (error) {
      console.error(error);
      reset();
    }
  });

  const renderForm = (
    <Stack component={m.div} variants={varFade().inUp} alignItems="center">
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <RHFTextField
          fullWidth
          label={t('email')}
          name="email"
          variant="filled"
          InputProps={{
            style: {
              backgroundColor: 'white',
              borderRadius: '10px',
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    console.log('prongdfsf');
                    onSubmit();
                  }}
                  edge="end"
                  sx={{ color: 'darkPrimary' }}
                >
                  <Iconify icon={'solar:arrow-right-outline'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

      </FormProvider>
    </Stack>
  );

  return (
    <Box
      sx={{
        py: { xs: 10, md: 15 },
        // bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
        // bgcolor: '#0C3F5B',
        ...bgGradient({
          direction: '180deg',
          startColor: '#DFE3E8',
          endColor: '#FFFFFF',
        }),
      }}
    >
      <Container component={MotionViewport}>
        <Stack
          alignItems="center"
          direction={{ xs: 'column', md: 'row' }}
          sx={{
            bgcolor: '#0C3F5B',
            borderRadius: 2,
            pb: { xs: 5, md: 0 },
            mt: 5,
            // mb: 3,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          {renderDescription}
          {renderForm}
        </Stack>

        {/* REDES SOCIALES & TERMINO Y CONDICIONES */}
        <Stack spacing={3} sx={{ textAlign: 'center', mt: 10 }}>
          <m.div variants={varFade().in} style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="body2" sx={{ opacity: 0.48, mr: 2 }}>
              Politicas de privacidad
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.48, ml: 2 }}>
              Terminos y condiciones
            </Typography>
          </m.div>

          <Stack spacing={2} direction="row" justifyContent="center" style={{marginTop:45}}>
            {social_media.map((item, index) => (
              <m.div key={index} variants={varFade().in}>
                <a target="_blank" title={item.title} href={item.url}>
                  <Box
                    component="img"
                    alt={item.icon}
                    src={item.icon}
                    sx={{ width: 40, height: 40 }}
                  />
                </a>
              </m.div>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

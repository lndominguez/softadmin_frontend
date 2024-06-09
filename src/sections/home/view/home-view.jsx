import { useScroll } from 'framer-motion';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import ScrollProgress from 'src/components/scroll-progress';
import HomeHero from '../home-hero';
import HomeMinimal from '../home-minimal';
import HomeAdvertisement from '../home-advertisement';
import HomeOurJobs from '../home-our-jobs';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { m } from 'framer-motion';
import { varFade } from 'src/components/animate';

import { useBoolean } from 'src/hooks/use-boolean';
import FormProvider, { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';

import { LoadingButton } from '@mui/lab';
import emailjs from '@emailjs/browser';
import HomeHugePackTegnologies from '../home-hugepack-tecnologies';
import HomeProfessionals from '../home-professionals';
import HomeReviews from '../home-reviews';
import HomeSubscribe from '../home-subscribe';
import { useSnackbar } from 'notistack';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { SnackbarProvider } from 'src/components/snackbar';
import { useTranslate } from 'src/locales';
import { useState } from 'react';
import HomeWeAreFamily from '../home-we-are-family';
import HomeContactUs from '../home-contact-us';

// ----------------------------------------------------------------------

const StyledPolygon = styled('div')(({ anchor = 'top', theme }) => ({
  left: 0,
  zIndex: 9,
  height: 80,
  width: '100%',
  position: 'absolute',
  clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
  backgroundColor: theme.palette.background.default,
  display: 'block',
  lineHeight: 0,
  ...(anchor === 'top' && {
    top: -1,
    transform: 'scale(-1, -1)',
  }),
  ...(anchor === 'bottom' && {
    bottom: -1,
    backgroundColor: theme.palette.grey[900],
  }),
}));

// ----------------------------------------------------------------------

function MyApp() {
  const { scrollYProgress } = useScroll();
  const { enqueueSnackbar } = useSnackbar();
  const formServices = useBoolean();
  const dialog = useBoolean();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslate();
  const SubscribeSchema = Yup.object().shape({
    email: Yup.string()
      .required(`${t('required_email')}`)
      .email(`${t('valid_email')}`),
    name: Yup.string().required(`${t('required_name')}`),
    service: Yup.string().required(`${t('required_service')}`),
    message: Yup.string().required(`${t('required_message')}`),
  });

  const handleClickVariant = (variant, message) => {
    enqueueSnackbar(message, variant);
  };

  const services = [
    'artificial_intelligence',
    'software_development',
    'ui_design',
    'e_commerce',
    'apps_development',
    'quality_assurance',
    'maintenance_and_support',
    'staffing_services',
    'it_consulting',
    'infrastructure',
    'outsourcing_it',
    '',
  ];

  const defaultValues = {
    email: '',
    name: '',
    message: '',
    service: '',
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

  const onDialogCancel = () => {
    reset();
    formServices.onFalse();
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      emailjs
        .send('service_wo9m1rh', 'template_8ys1g5r', data, {
          publicKey: 'UI8eE5zTslc0fA-dp',
        })
        .then(
          () => {
            reset();
            dialog.onFalse;
            formServices.onFalse();
            emailjs
              .send('service_wo9m1rh', 'template_k08mixj', data, {
                publicKey: 'UI8eE5zTslc0fA-dp',
              })
              .then(() => {
                setLoading(false);
                handleClickVariant('success', t('success_email_sent'));
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

  const renderFormServices = (
    <Stack spacing={3}>
      <m.div variants={varFade().inUp}>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
        >
          <RHFTextField fullWidth label={t('name')} name="name" />
          <RHFTextField fullWidth label={t('email')} name="email" />
        </Box>
      </m.div>
      <m.div variants={varFade().inUp}>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
        >
          <RHFAutocomplete
            name="service"
            label={t('service_type')}
            options={services}
            getOptionLabel={(option) => t(`${option}`)}
          />
          <RHFTextField fullWidth label={t('enter_message')} multiline rows={3} name="message" />
        </Box>
      </m.div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onDialogCancel} variant="outlined" color="inherit">
          {t('cancel')}
        </Button>
        <LoadingButton
          // fullWidth
          color="inherit"
          size="medium"
          type="submit"
          variant="contained"
          loading={loading}
        >
          {t('send')}
        </LoadingButton>
      </div>
    </Stack>
  );

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />

      <HomeHero openDialog={formServices} />

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <HomeMinimal openDialog={formServices} />

        {/* <Box sx={{ position: 'relative' }}>
          <StyledPolygon />
          <HomeForDesigner />
          <StyledPolygon anchor="bottom" />
        </Box> */}

        {/* <HomeDarkMode /> */}
        <HomeOurJobs />
        {/* <HomeJobs/> */}

        {/* <HomeHugePackElements /> */}
        <HomeHugePackTegnologies />
        <HomeWeAreFamily />
        {/* <HomeColorPresets /> */}

        {/* <HomeCleanInterfaces /> */}
        <HomeProfessionals openDialog={formServices} />

        <HomeReviews />

        {/* <HomeLookingFor /> */}
        <HomeContactUs renderForm={renderFormServices}/>
        {/* <HomeAdvertisement openDialog={formServices} /> */}
        <HomeSubscribe />
      </Box>

      {/* FORMULARIO DE SERVICIOS */}
      <Dialog open={formServices.value} onClose={onDialogCancel}>
        <DialogTitle>
          <span style={{ fontWeight: 'initial' }}>{t('request_service')} </span>: {values.service}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 3 }}>{t('please_complete_form')}</Typography>
          <FormProvider methods={methods} onSubmit={onSubmit}>
            {renderFormServices}
          </FormProvider>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
}

export default function HomeView() {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp />
    </SnackbarProvider>
  );
}

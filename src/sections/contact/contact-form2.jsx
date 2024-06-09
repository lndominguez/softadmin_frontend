import { m } from 'framer-motion';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
import emailjs from '@emailjs/browser';

import { varFade, MotionViewport } from 'src/components/animate';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useTranslate } from 'src/locales';
import { Box } from '@mui/material';
import FormProvider, { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';

import { LoadingButton } from '@mui/lab';
import { useBoolean } from 'src/hooks/use-boolean';
import RHFCustomAutocomplete from 'src/components/hook-form/rhf-custom-autocomplete';
import { enqueueSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function ContactForm2() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslate();
  const formServices = useBoolean();

  const SubscribeSchema = Yup.object().shape({
    email: Yup.string()
      .required(`${t('required_email')}`)
      .email(`${t('valid_email')}`),
    name: Yup.string().required(`${t('required_name')}`),
    service: Yup.string().required(`${t('required_service')}`),
    message: Yup.string().required(`${t('required_message')}`),
  });
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

  const handleClickVariant = (variant, message) => {
    enqueueSnackbar(message, variant);
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
      handleClickVariant('error', t('error_email_sent'));
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
          <RHFTextField
            fullWidth
            label={t('name')}
            name="name"
            InputProps={{
              style: {
                backgroundColor: 'white',
                borderRadius: '10px',
              },}}
          />
          <RHFTextField
            fullWidth
            label={t('email')}
            name="email"
            InputProps={{
              style: {
                backgroundColor: 'white',
                borderRadius: '10px',
              },}}
          />
        </Box>
      </m.div>
      <RHFTextField
        fullWidth
        label={t('enter_message')}
        multiline
        rows={3}
        name="message"
        InputProps={{
          style: {
            backgroundColor: 'white',
            borderRadius: '10px',
          },}}
      />

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
          <RHFCustomAutocomplete
            name="service"
            label={t('service_type')}
            options={services}
            getOptionLabel={(option) => t(`${option}`)}
            

          />
          <LoadingButton
            // fullWidth
            color="primary"
            size="medium"
            type="submit"
            variant="contained"
            loading={loading}
            sx={{ color: 'white', height: '52px' }}
          >
            {t('send')}
          </LoadingButton>
        </Box>
      </m.div>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderFormServices}
    </FormProvider>
  );
}

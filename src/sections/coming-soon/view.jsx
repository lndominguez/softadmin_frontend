import * as Yup from 'yup';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
// import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

import { useCountdownDate } from 'src/hooks/use-countdown';

import { _socials } from 'src/_mock';
import gear from 'src/assets/images/gear2.png';
import logo from 'src/assets/images/apexuc.png';
// import { ComingSoonIllustration } from 'src/assets/illustrations';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';


// ----------------------------------------------------------------------

export default function ComingSoonView() {
  const { days, hours, minutes, seconds } = useCountdownDate(new Date('01/15/2024 00:00'));
  const [errorMsg, setErrorMsg] = useState('');
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const subscribeSchema = Yup.object().shape({
     email: Yup.string().required('Email is required').matches(emailRegex, 'Please enter a valid email')
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(subscribeSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });


  return (
    <>

      <div className='logo_container'>
        <div>
          <img className='logo' src={logo} alt='logo' />
        </div>
        <div>
          <img className='gear' src={gear} alt='gear' />
        </div>
      </div>

      <Typography variant="h3" sx={{ mb: 2 }}>
        <div className='title'>
          <h1>COMING SOON</h1>
        </div>
      </Typography>

      <Typography sx={{ color: 'text.secondary' }}>
        We are currently working hard on this page!
      </Typography>

      <Stack
        direction="row"
        justifyContent="center"
        divider={<Box sx={{ mx: { xs: 1, sm: 2.5 } }}>:</Box>}
        sx={{ typography: 'h2' }}
      >
        <TimeBlock label="Days" value={days} />

        <TimeBlock label="Hours" value={hours} />

        <TimeBlock label="Minutes" value={minutes} />

        <TimeBlock label="Seconds" value={seconds} />
      </Stack>

      {/* <ComingSoonIllustration sx={{ my: 10, height: 240 }} /> */}
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <RHFTextField
          fullWidth
          name="email"
          placeholder="Enter your email"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LoadingButton
                  fullWidth
                  color="inherit"
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Notify Me
                </LoadingButton>
              </InputAdornment>
            ),
            sx: {
              pr: 0.5,
              [`&.${outlinedInputClasses.focused}`]: {
                boxShadow: (theme) => theme.customShadows.z20,
                transition: (theme) =>
                  theme.transitions.create(['box-shadow'], {
                    duration: theme.transitions.duration.shorter,
                  }),
                [`& .${outlinedInputClasses.notchedOutline}`]: {
                  border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
                },
              },
            },
          }}
          sx={{ my: 5 }}
        />
      </FormProvider>

      <Stack spacing={1} alignItems="center" justifyContent="center" direction="row">
        {_socials.map((social) => (
          <IconButton
            key={social.name}
            sx={{
              color: social.color,
              '&:hover': {
                bgcolor: alpha(social.color, 0.08),
              },
            }}
          >
            <Iconify icon={social.icon} />
          </IconButton>
        ))}
      </Stack>
    </>
  );
}

// ----------------------------------------------------------------------

function TimeBlock({ label, value }) {
  return (
    <div>
      <Box> {value} </Box>
      <Box sx={{ color: 'text.secondary', typography: 'body1' }}>{label}</Box>
    </div>
  );
}

TimeBlock.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};

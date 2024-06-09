import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useMemo, useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';

import { countries, roles } from 'src/assets/data';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import { useSnackbar } from 'src/components/snackbar';
import { useBoolean } from 'src/hooks/use-boolean';

import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import { useAuthContext } from 'src/auth/hooks';
import { createUser, deleteUser, updateUser } from 'src/api/user';
import { Input, TextField } from '@mui/material';
import { getValue } from '@mui/system';
import axiosInstance, { endpoints, uploadImage } from 'src/utils/axios';
import useSWR from 'swr';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { IMAGE_API } from 'src/config-global';

// ----------------------------------------------------------------------
export default function UserNewEditForm({ currentUser }) {
  const router = useRouter();
  const password = useBoolean();
  const confirm = useBoolean();
  const [pathImage, setPathImage] = useState('');
  const [file, setFile] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
    phoneNumber: Yup.string().required('PhoneNumber is required'),
    role: Yup.string().required('Role is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    address: Yup.string(),
    zipCode: Yup.string(),
    avatarUrl: Yup.mixed().nullable(),
    // not required
    status: Yup.string(),
    isVerified: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      _id: currentUser?._id || null,
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      city: currentUser?.city || '',
      role: currentUser?.role || 'guest',
      email: currentUser?.email || '',
      password: currentUser?.password || '',
      state: currentUser?.state || '',
      status: currentUser?.status || 'pending',
      address: currentUser?.address || '',
      country: currentUser?.country || '',
      zipCode: currentUser?.zipCode || '',
      avatarUrl: (currentUser && `${IMAGE_API}/${currentUser?.avatarUrl}`) || '',
      phoneNumber: currentUser?.phoneNumber || '',
      isVerified: currentUser?.isVerified || true,
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const handleDelete = async () => {
    try {
      if (currentUser) {
        await deleteUser?.(currentUser?._id);
        reset();
        enqueueSnackbar('Delete success!');
        router.push(paths.dashboard.user.list);
      }
    } catch (error) {
      console.error(error);
      reset();
      enqueueSnackbar('Delete error!', { variant: 'error' });
    }
  };

  const onSubmit = handleSubmit(async (user) => {
    try {
      const path = `${Date.now()}_${values.firstName}_${pathImage}`;
      if (user.avatarUrl !== null || user.avatarUrl !== '') {
        user.avatarUrl = path;
      }
      if (currentUser) {
        await updateUser(user)
          .then((res) => {
            if (res.status === 200) {
              if (file !== null) {
                const newfile = new File([file], path, { type: file.type });
                uploadImage(newfile).then((response) => {
                  if (response.status !== 200) {
                    enqueueSnackbar(
                      'Usuario actualizado pero ocurrio un error al guardar la imagen',
                      {
                        variant: 'warning',
                      }
                    );
                  } else {
                    enqueueSnackbar('Update success!');
                  }
                });
              }
              reset();
              router.push(paths.dashboard.user.list);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        await createUser(user)
          .then((res) => {
            if (res.status === 200) {
              if ( file !== null) {
                const newfile = new File([file], path, { type: file.type });
                uploadImage(newfile).then((response) => {
                  if (response.status !== 200) {
                    enqueueSnackbar('Usuario creado pero ocurrio un error al guardar la imagen', {
                      variant: 'warning',
                    });
                  } else {
                    enqueueSnackbar('Create success!');
                  }
                });
              }
              reset();
              router.push(paths.dashboard.user.list);
            } else {
              enqueueSnackbar('Ha ocurriedo un error en servidor', {
                variant: 'error',
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.error(error);
      reset();
      enqueueSnackbar(currentUser ? 'Update error!' : 'Create error!', { variant: 'error' });
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setPathImage(file.path);
      setFile(file);
      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12} md={4}>
            <Card sx={{ pt: 10, pb: 5, px: 3 }}>
              {currentUser && (
                <Label
                  color={
                    (values.status === 'active' && 'success') ||
                    (values.status === 'banned' && 'error') ||
                    'warning'
                  }
                  sx={{ position: 'absolute', top: 24, right: 24 }}
                >
                  {values.status}
                </Label>
              )}

              <Box sx={{ mb: 5 }}>
                <RHFUploadAvatar
                  name="avatarUrl"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 3,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.disabled',
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
              </Box>

              {currentUser && (
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          {...field}
                          checked={field.value !== 'active'}
                          onChange={(event) =>
                            field.onChange(event.target.checked ? 'banned' : 'active')
                          }
                        />
                      )}
                    />
                  }
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        Banned
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Apply disable account
                      </Typography>
                    </>
                  }
                  sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
                />
              )}

              <RHFSwitch
                name="isVerified"
                labelPlacement="start"
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Email Verified
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Disabling this will automatically send the user a verification email
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />

              {currentUser && (
                <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                  <Button variant="soft" color="error" onClick={confirm.onTrue}>
                    Delete User
                  </Button>
                </Stack>
              )}
            </Card>
          </Grid>

          <Grid xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <RHFTextField name="firstName" label="First Name" />
                <RHFTextField name="lastName" label="Last Name" />
                <RHFTextField name="email" label="Email Address" />

                <RHFTextField
                  name="password"
                  label="Password"
                  type={password.value ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={password.onToggle} edge="end">
                          <Iconify
                            icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <RHFTextField name="phoneNumber" label="Phone Number" />
                <RHFAutocomplete
                  name="role"
                  label="Role"
                  placeholder="Choose a role"
                  fullWidth
                  options={roles}
                  getOptionLabel={(option) => option}
                />
              </Box>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(3, 1fr)',
                }}
                sx={{ mt: 3 }}
              >
                {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}> */}
                <RHFAutocomplete
                  name="country"
                  type="country"
                  label="Country"
                  placeholder="Choose a country"
                  fullWidth
                  options={countries.map((option) => option.label)}
                  getOptionLabel={(option) => option}
                />

                <RHFTextField name="state" label="State/Region" />
                <RHFTextField name="city" label="City" />
                {/* </Stack> */}
              </Box>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
                sx={{ mt: 3 }}
              >
                <RHFTextField name="address" label="Address" />
                <RHFTextField name="zipCode" label="Zip/Code" />
              </Box>
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentUser ? 'Create User' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete user <strong> {currentUser?.firstName} </strong> ?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDelete();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

UserNewEditForm.propTypes = {
  currentUser: PropTypes.any,
};

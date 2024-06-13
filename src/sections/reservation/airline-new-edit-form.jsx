import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useMemo, useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { m } from 'framer-motion';
import { varFade, MotionViewport } from 'src/components/animate';
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
import { createItem, deleteItem, updateItem } from 'src/api/airline';
import { Input, TextField } from '@mui/material';
import { getValue, margin } from '@mui/system';
import axiosInstance, { endpoints, uploadImage } from 'src/utils/axios';
import useSWR from 'swr';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { IMAGE_API } from 'src/config-global';
import RHFCustomAutocomplete from 'src/components/hook-form/rhf-custom-autocomplete';

// ----------------------------------------------------------------------
export default function AirlineNewEditForm({ currentUser, showAirlineForm, mutate }) {
  const router = useRouter();
  const password = useBoolean();
  const confirm = useBoolean();
  const [pathImage, setPathImage] = useState('');
  const [file, setFile] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name required'),
    phoneNumber: Yup.string().required('PhoneNumber is required'),
    description: Yup.string(),
    logoUrl: Yup.mixed().nullable(),
    status: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      _id: currentUser?._id || null,
      name: currentUser?.name || '',
      description: currentUser?.description || '',
      logoUrl: (currentUser && `${IMAGE_API}/${currentUser?.logoUrl}`) || '',
      phoneNumber: currentUser?.phoneNumber || '',
      status: currentUser?.status || null,
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
        await deleteItem?.(currentUser?._id);
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      const path = `${Date.now()}_${values.name}_${pathImage}`;
      if (data.logoUrl !== null || data.logoUrl !== '') {
        data.logoUrl = path;
      }
      if (currentUser) {
        await updateItem(data)
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
              showAirlineForm.onFalse();
              // router.push(paths.dashboard.user.list);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        await createItem(data)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              if (file !== null) {
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
              showAirlineForm.onFalse();
              mutate();
              // router.push(paths.dashboard.user.list);
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
        setValue('logoUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack
          direction="column"
          alignItems="center"
          width="100%"
          spacing={3}
          p={2}
          marginBottom={2}
          sx={{ backgroundColor: '#e1e1e169' }}
        >
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <RHFUploadAvatar
              name="logoUrl"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <RHFTextField
                  name="name"
                  label="Name Airline"
                  size="small"
                  sx={{
                    marginTop: 1,
                  }}
                />
              }
            />
            <Box
              rowGap={2}
              columnGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            >
              <RHFTextField name="phoneNumber" label="Phone Number" size="small" />
              <RHFCustomAutocomplete
                name="status"
                label="Status"
                options={['active', 'inactive']}
                size="small"
                getOptionLabel={(option) => option}
                bgColor="transparent"
              />
              <RHFTextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                name="description"
                size="small"
              />
            </Box>
          </Box>

          <Stack
            alignItems="flex-start"
            display="flex"
            sx={{ mt: 1 }}
            direction="row"
            width="100%"
            justifyContent="space-between"
          >
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => {
                showAirlineForm.onFalse(), reset();
              }}
            >
              {'cancel'}
            </Button>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!currentUser ? 'Create Airline' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </>
  );
}

AirlineNewEditForm.propTypes = {
  currentUser: PropTypes.any,
  showAirlineForm: PropTypes.any,
  mutate: PropTypes.any,
};

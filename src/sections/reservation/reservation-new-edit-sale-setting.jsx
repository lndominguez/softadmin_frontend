import { useFormContext } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { _addressBooks } from 'src/_mock';

import Iconify from 'src/components/iconify';

import { AddressListDialog, AddressNewForm } from '../address';
import { AirlineListDialog, ProviderListDialog } from './components/dialogs';
import { useTranslate } from 'src/locales';
import { Avatar, Box } from '@mui/material';
import Label from 'src/components/label';
import { useGetItems as useAirlines } from 'src/api/airline';
import { useGetItems as useProviders } from 'src/api/provider';
import { IMAGE_API } from 'src/config-global';

// ----------------------------------------------------------------------

export default function ReservationNewEditSaleSetting() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { t } = useTranslate();
  const newAirline = useBoolean(false);

  const mdUp = useResponsive('up', 'md');

  const values = watch();

  const { salesAgent, provider, airline } = values;

  const from = useBoolean();

  const to = useBoolean();
  const airlineDialog = useBoolean();

  const writeFullAddress=(data) =>{
    const fullText = `${!data.address ? ' ' : data.address + ','} 
    ${!data.city ? ' ' : data.city + ','}
    ${!data.zipCode ? ' ' : data.zipCode + ','}
    ${data?.country}`;
    const capitalize = (text) => {
      return text.replace(/\b[a-z]/g, (c) => c.toUpperCase());
    };
    return (
      <Typography
        variant="caption"
        sx={{
          mt: 0.5,
          display: 'flex',
          alignItems: 'center',
          color: 'text.secondary',
        }}
      >
        {capitalize(fullText)}
      </Typography>
    );
  }

  return (
    <>
      <Stack
        spacing={{ xs: 3, md: 5 }}
        direction={{ xs: 'column', md: 'row' }}
        divider={
          <Divider
            flexItem
            orientation={mdUp ? 'vertical' : 'horizontal'}
            sx={{ borderStyle: 'dashed' }}
          />
        }
        sx={{ p: 3 }}
      >
        {/* AIRLINE */}
        <Stack sx={{ width: 1 }}>
          <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h6" sx={{ color: 'text.disabled', flexGrow: 1 }}>
              {t('navigation_menu.airline')}:{' '}
              {airline && (
                <Label color={airline.status ==='active' ? 'success':'error'}>{airline.status}</Label>
              )}
            </Typography>

            <IconButton onClick={airlineDialog.onTrue}>
              <Iconify icon={airline ? 'solar:pen-bold' : 'mingcute:add-line'} />
            </IconButton>
          </Stack>

          {airline ? (
            <Stack direction="row" alignItems="center" width="100%" spacing={2}>
              <Avatar
                alt={airline.name}
                src={airline.logoUrl ? IMAGE_API + '/' + airline.logoUrl : airline.name}
                sx={{ width: 50, height: 50,  borderStyle: 'solid', borderWidth: '2px', borderColor: `${airline.status == 'active' ? '#DBF6E5': '#ffe4dd'}`}}
              />

              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2">{airline.name}</Typography>
                {airline.phoneNumber && (
                  <Box sx={{ color: 'primary.main', typography: 'caption' }}>
                    {airline.phoneNumber}
                  </Box>
                )}
                <Typography
                  variant="caption"
                  sx={{
                    mt: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.secondary',
                  }}
                >
                  {airline.description}
                </Typography>
              </Box>
            </Stack>
          ) : (
            <Typography typography="caption" sx={{ color: 'error.main' }}>
              {errors.airline?.message}
            </Typography>
          )}
        </Stack>

        {/* PROVIDER */}
        <Stack sx={{ width: 1 }}>
          <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h6" sx={{ color: 'text.disabled', flexGrow: 1 }}>
              {t('navigation_menu.provider')}:{' '}
              {provider && (
                <Label color={provider.status ==='active' ? 'success':'error'}>{provider.status}</Label>
              )}
            </Typography>

            <IconButton onClick={from.onTrue}>
              <Iconify icon={provider ? 'solar:pen-bold' : 'mingcute:add-line'} />
            </IconButton>
          </Stack>

          {provider ? (
            <Stack direction="row" alignItems="center" width="100%" spacing={2}>
              <Avatar
              variant='circular'
                alt={provider.fullName}
                src={provider.avatarUrl ? IMAGE_API + '/' + provider.avatarUrl : provider.fullName}
                sx={{ width: 50, height: 50,  borderStyle: 'solid', borderWidth: '2px', borderColor: `${provider.status == 'active' ? '#DBF6E5': '#ffe4dd'}`}}
              />

              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2">{provider.fullName}</Typography>
                {provider.email && (
                  <Box sx={{ color: 'primary.main', typography: 'caption' }}>
                    {provider.email}
                  </Box>
                )}
                <Typography
                  variant="caption"
                  sx={{
                    mt: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.secondary',
                  }}
                >
                  {writeFullAddress(provider)}
                </Typography>
              </Box>
            </Stack>
          ) : (
            <Typography typography="caption" sx={{ color: 'error.main' }}>
              {errors.provider?.message}
            </Typography>
          )}
        </Stack>

        {/* SALES AGENT */}
        <Stack sx={{ width: 1 }}>
          <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h6" sx={{ color: 'text.disabled', flexGrow: 1 }}>
              {t('sales_agent')}:
            </Typography>

            <IconButton onClick={to.onTrue}>
              <Iconify icon={salesAgent ? 'solar:pen-bold' : 'mingcute:add-line'} />
            </IconButton>
          </Stack>

          {salesAgent ? (
            <Stack spacing={1}>
              <Typography variant="subtitle2">{salesAgent.name}</Typography>
              <Typography variant="body2">{salesAgent.fullAddress}</Typography>
              <Typography variant="body2"> {salesAgent.phoneNumber}</Typography>
            </Stack>
          ) : (
            <Typography typography="caption" sx={{ color: 'error.main' }}>
              {errors.salesAgent?.message}
            </Typography>
          )}
        </Stack>
      </Stack>

      <AirlineListDialog
        title="Airlines"
        open={airlineDialog.value}
        onClose={airlineDialog.onFalse}
        selected={(selectedId) => airline?.id === selectedId}
        onSelect={(item) => setValue('airline', item)}
        list={useAirlines().items}
        showAirlineForm = {newAirline}
        mutate={useAirlines().itemsMutate}
        action={
          <Button
            size="small"
            startIcon={<Iconify icon="mingcute:add-line" />}
            sx={{ alignSelf: 'flex-end' }}
            onClick={newAirline.onTrue}
           
          >
            New
          </Button>
        }
        />
       

      <ProviderListDialog
        title="Provider"
        open={from.value}
        onClose={from.onFalse}
        selected={(selectedId) => provider?.id === selectedId}
        onSelect={(item) => setValue('provider', item)}
        list={useProviders().items}
        // action={
        //   <Button
        //     size="small"
        //     startIcon={<Iconify icon="mingcute:add-line" />}
        //     sx={{ alignSelf: 'flex-end' }}
        //   >
        //     New
        //   </Button>
        // }
      />

      <AddressListDialog
        title="Agent Details"
        open={to.value}
        onClose={to.onFalse}
        selected={(selectedId) => provider?.id === selectedId}
        onSelect={(address) => setValue('salesAgent', address)}
        list={_addressBooks}
        action={
          <Button
            size="small"
            startIcon={<Iconify icon="mingcute:add-line" />}
            sx={{ alignSelf: 'flex-end' }}
          >
            New
          </Button>
        }
      />
    </>
  );
}

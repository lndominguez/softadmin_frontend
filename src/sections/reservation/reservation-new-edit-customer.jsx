import { Controller, useFormContext } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import CustomerListDialog from './components/dialogs/customer-list-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import { useGetUsers } from 'src/api/user';
import { Button, IconButton } from '@mui/material';
import Iconify from 'src/components/iconify';
import CustomerForm from './customer-form';

// ----------------------------------------------------------------------

export default function ReservationNewEditCustomer() {
  const { control, watch, setValue } = useFormContext();
  const searchOrNewCustomer = useBoolean(false);

  const values = watch();
  const { customer } = values;

  return (
    <>
      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'column' }}
        sx={{ p: 3, bgcolor: 'background.neutral' }}
      >
        <Button
          variant="outlined"
          endIcon={<Iconify icon="mingcute:add-line" />}
          sx={{ alignSelf: 'flex-start' }}
          onClick={searchOrNewCustomer.onTrue}
        >
          Buscar & crear Customer
        </Button>

        <CustomerForm currentUser={customer}/>
      </Stack>
      <CustomerListDialog
        title="Customers list"
        open={searchOrNewCustomer.value}
        onClose={searchOrNewCustomer.onFalse}
        selected={(selectedId) => customer?._id === selectedId}
        onSelect={(item) => setValue('customer', item)}
        list={useGetUsers().users}
        // showAirlineForm = {newAirline}
        mutate={useGetUsers().usersMutate}
        action={
          <Button
            size="small"
            startIcon={<Iconify icon="mingcute:add-line" />}
            sx={{ alignSelf: 'flex-end' }}
            onClick={searchOrNewCustomer.onTrue}
          >
            New
          </Button>
        }
      />
    </>
  );
}

import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemButton, { listItemButtonClasses } from '@mui/material/ListItemButton';
import { styled } from '@mui/material/styles';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import SearchNotFound from 'src/components/search-not-found';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import AirlineNewEditForm from '../../airline-new-edit-form';
import { useBoolean } from 'src/hooks/use-boolean';
import { Button, IconButton } from '@mui/material';
import { IMAGE_API } from 'src/config-global';

// ----------------------------------------------------------------------
const StyledBadge = styled(Badge)(({ theme }, color) => ({
  '& .MuiBadge-badge': {
    backgroundColor: { color },
    color: { color },
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      // animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function CustomerListDialog({
  title = 'Customers List',
  list,
  action,
  mutate,
  //
  open,
  onClose,
  //
  selected,
  // showAirlineForm,
  onSelect,
}) {
  const [searchData, setSearchData] = useState('');
  const dataFiltered = applyFilter({
    inputData: list,
    query: searchData,
  });

  const notFound = !dataFiltered.length && !!searchData;

  const handleSearchData = useCallback((event) => {
    setSearchData(event.target.value);
  }, []);

  const handleSelectData = useCallback(
    (data) => {
      onSelect(data);
      setSearchData('');
      onClose();
    },
    [onClose, onSelect]
  );

  const renderList = (
    <Stack
      spacing={0.5}
      sx={{
        p: 0.5,
        maxHeight: 80 * 8,
        overflowX: 'hidden',
      }}
    >
      {dataFiltered.map((data, index) => (
        <Stack
          key={index}
          spacing={0.5}
          disabled = {data.status ==='inactive'}
          component={ListItemButton}
          selected={selected(`${data.id}`)}
          onClick={() => handleSelectData(data)}
          sx={{
            py: 1,
            px: 1.5,
            borderRadius: 1,
            flexDirection: 'column',
            alignItems: 'flex-start',
            [`&.${listItemButtonClasses.selected}`]: {
              bgcolor: 'action.selected',
              '&:hover': {
                bgcolor: 'action.selected',
              },
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            spacing={2}
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
              color={data.status == 'active' ? 'success' : 'error'}
            >
              <Avatar
                alt={data.name}
                src={data.logoUrl ? IMAGE_API + '/' + data.logoUrl : data.name}
                sx={{
                  width: 50,
                  height: 50,
                  borderStyle: 'solid',
                  borderColor: `${data.status == 'active' ? '#DBF6E5' : '#ffe4dd'}`,
                  borderWidth: '2px',
                }}
              />
            </StyledBadge>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2">{data.name}</Typography>
              {data.phoneNumber && (
                <Box sx={{ color: 'primary.main', typography: 'caption' }}>{data.phoneNumber}</Box>
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
                {data.description}
              </Typography>
            </Box>

            {data.status && (
              <Box>
                <Label
                  color={data.status === 'active' ? 'success' : 'error'}
                  sx={{ width: '80px' }}
                >
                  {data.status}
                </Label>
              </Box>
            )}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 3, pr: 1.5 }}
      >
        <Typography variant="h6"> {title} </Typography>

        {/* {action && action} */}
      </Stack>
      {/* <Box sx={{ flexGrow: 1 }} display={showAirlineForm.value === false ? 'none' : 'contents'}>
        <AirlineNewEditForm showAirlineForm={showAirlineForm} mutate={mutate} />
      </Box> */}

      <Stack sx={{ p: 2, pt: 0 }}>
        <TextField
          value={searchData}
          onChange={handleSearchData}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {notFound ? <SearchNotFound query={searchData} sx={{ px: 3, pt: 5, pb: 10 }} /> : renderList}
    </Dialog>
  );
}

CustomerListDialog.propTypes = {
  action: PropTypes.node,
  // showAirlineForm: PropTypes.any,
  mutate: PropTypes.any,
  list: PropTypes.array,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  open: PropTypes.bool,
  selected: PropTypes.func,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function applyFilter({ inputData, query }) {
  if (query) {
    return inputData.filter(
      (item) =>
        item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.phoneNumber && (item.phoneNumber.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
        `${item.status}`.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return inputData;
}

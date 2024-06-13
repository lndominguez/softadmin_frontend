import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemButton, { listItemButtonClasses } from '@mui/material/ListItemButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import SearchNotFound from 'src/components/search-not-found';
import { IMAGE_API } from 'src/config-global';
import { Avatar } from '@mui/material';

// ----------------------------------------------------------------------

export default function SalesAgentListDialog({
  title = 'Sales Agent List',
  list,
  action,
  //
  open,
  onClose,
  //
  selected,
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
          disabled={data.status === 'inactive'}
          spacing={0.5}
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
            <Avatar
              alt={data.fullName}
              src={data.avatarUrl ? IMAGE_API + '/' + data.avatarUrl : data.fullName}
              sx={{
                width: 50,
                height: 50,
                borderStyle: 'solid',
                borderColor: `${data.status == 'active' ? '#DBF6E5' : '#ffe4dd'}`,
                borderWidth: '2px',
              }}
            />

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2">{data.fullName}</Typography>
              {data.email && <Box sx={{ color: 'gray', typography: 'caption' }}>{data.email}</Box>}

              {writeFullAddress(data)}
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

  function writeFullAddress(data) {
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
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 3, pr: 1.5 }}
      >
        <Typography variant="h6"> {title} </Typography>

        {action && action}
      </Stack>

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

SalesAgentListDialog.propTypes = {
  action: PropTypes.node,
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
        item.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        (item.phoneNumber && item.phoneNumber.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
        (item.email && item.email.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
        (item.zipCode && item.zipCode.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
        `${item.status}`.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return inputData;
}

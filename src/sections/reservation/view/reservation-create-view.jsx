import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ReservationNewEditForm from '../reservation-new-edit-form';

// ----------------------------------------------------------------------

export default function ReservationCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new reservation"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Reservation',
            href: paths.dashboard.reservation.root,
          },
          {
            name: 'New Reservation',
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ReservationNewEditForm />
    </Container>
  );
}

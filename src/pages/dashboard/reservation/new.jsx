import { Helmet } from 'react-helmet-async';

import { ReservationCreateView } from 'src/sections/reservation/view';

// ----------------------------------------------------------------------

export default function ReservationCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new reservation</title>
      </Helmet>

      <ReservationCreateView  />
    </>
  );
}

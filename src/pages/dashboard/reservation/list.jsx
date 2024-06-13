import { Helmet } from 'react-helmet-async';
import { useTranslate } from 'src/locales';

import { ReservationListView } from 'src/sections/reservation/view';

// ----------------------------------------------------------------------

export default function ReservationListPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title> Dashboard: {t("navigation_menu.reservation")} List</title>
      </Helmet>

      <ReservationListView />
    </>
  );
}

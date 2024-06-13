import { Helmet } from 'react-helmet-async';
import { useTranslate } from 'src/locales';

import { useParams } from 'src/routes/hooks';

import { ReservationDetailsView } from 'src/sections/reservation/view';

// ----------------------------------------------------------------------

export default function ReservationDetailsPage() {
  const params = useParams();
  const { t } = useTranslate();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: {t("navigation_menu.reservation")} Details</title>
      </Helmet>

      <ReservationDetailsView id={`${id}`} />
    </>
  );
}

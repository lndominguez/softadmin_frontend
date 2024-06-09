import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import { useSettingsContext } from 'src/components/settings';
import { varFade, MotionViewport } from 'src/components/animate';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import CarouselBasic3 from '../_examples/extra/carousel-view/carousel-basic-3';
import { _mock } from 'src/_mock';
import CarouselOurJobs from '../_examples/extra/carousel-view/carousel-our-jobs';
import { useState } from 'react';
import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

export default function HomeOurJobs() {
  const settings = useSettingsContext();
  const [currentSliderJob, setCurrentSliderJob] = useState(0);
  const { t } = useTranslate();

  const jobsList = [
    {
      id: 0,
      title: `${t('web_development')}`,
      description: `${t('web_development')} - Despega Express`,
      coverUrl: '/assets/images/home/hero/slider/web_dev.jpg',
      url: 'https://despegaexpress.com',
    },
    {
      id: 1,
      title: `${t('apps_development')}`,
      description: `${t('web_development')} - ApexUDelivery`,
      coverUrl: '/assets/images/home/hero/slider/app_dev.png',
      url: '#',
    },
    {
      id: 2,
      title: `${t('desktop_development')}`,
      description: `${t('desktop_development')} - ApexUTravel`,
      coverUrl: '/assets/images/home/hero/slider/desktop_dev.png',
      url: '#',
    },
  ];

  const renderDescription = (
    <Stack alignItems="center" spacing={3}>
      <m.div variants={varFade().inUp}>
        <Typography
          component="div"
          variant="overline"
          sx={{ color: '#00A76F', fontSize: '12px' }}
        >
          {t('jobs')}
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp} style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h2" sx={{ color: 'common.white', }}>
          {t('our_jobs')}
        </Typography>
      </m.div>
    </Stack>
  );
  const _carouselsExample = [...Array(20)].map((_, index) => ({
    id: _mock.id(index),
    title: _mock.postTitle(index),
    coverUrl: _mock.image.cover(index),
    description: _mock.description(index),
  }));

  const renderCarouserl = (
    <Card sx={{ bgcolor: '#0C3F5B', boxShadow: 'none', width: `${window.screen.width > 800 ? '60%': '120%'} `, justifySelf: 'center' }}>
      {/* <CardHeader title="Carousel Animation" /> */}
      <CardContent>
        <CarouselOurJobs
          data={jobsList}
          currentSliderJob={(e) => {
            setCurrentSliderJob(e);
          }}
        />
      </CardContent>
    </Card>
    // <m.div variants={varFade().inUp}>
    //   <CarouselOurJobs data={jobsList} />
    // </m.div>
  );

  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        md: 'repeat(1, 1fr)',
      }}
      sx={{
        textAlign: 'center',
        bgcolor: '#0C3F5B',
        pt: { xs: 5, md: 10 },
        pb: { xs: 5, md: 15 },
      }}
    >
      {renderDescription}
      {renderCarouserl}
      {jobsList &&
        jobsList
          .filter((job) => job.id === currentSliderJob)
          .map((job) => {
            return (
              <m.div key={job.id}>
                <Typography variant="h5" sx={{ color: 'common.white' }}>
                  {job.title}
                </Typography>
                <Typography variant="body1" sx={{ color: 'common.white' }}>
                  {job.description}
                </Typography>
                {/* <m.div>
                  <Stack
                    spacing={1.5}
                    direction={{ xs: 'column-reverse', sm: 'row' }}
                    sx={{ mb: 2, mt: 2, display: 'flex', justifyContent: 'center' }}
                  >
                    <Button
                      color="primary"
                      size="large"
                      variant="outlined"
                      // startIcon={<Iconify icon="eva:external-link-fill" width={24} />}
                      target="_blank"
                      rel="noopener"
                      href={job.url}
                      sx={{ borderColor: 'text.white', marginX:3 }}
                    >
                      Visitar {job.title}
                    </Button>
                  </Stack>
                </m.div> */}
              </m.div>
            );
          })}
    </Box>
  );
}

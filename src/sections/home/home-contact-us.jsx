import { m } from 'framer-motion';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Alert from '@mui/material/Alert';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import AlertTitle from '@mui/material/AlertTitle';
import AvatarGroup from '@mui/material/AvatarGroup';
import ToggleButton from '@mui/material/ToggleButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { paths } from 'src/routes/paths';

import { useResponsive } from 'src/hooks/use-responsive';

import { _mock } from 'src/_mock';

import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';
import { useTranslate } from 'src/locales';
import CarouselApps from '../_examples/extra/carousel-view/carousel-apps';
import { Card, CardContent } from '@mui/material';
import CarouselBasic3 from '../_examples/extra/carousel-view/carousel-basic-3';
import ContactForm from '../contact/contact-form';
import ContactForm2 from '../contact/contact-form2';

// ----------------------------------------------------------------------

export default function HomeContactUs() {
  const mdUp = useResponsive('up', 'md');

  const [slider, setSlider] = useState(24);

  const [select, setSelect] = useState('Option 1');

  const [app, setApp] = useState('chat');

  const [rating, setRating] = useState(2);

  const [currentTab, setCurrentTab] = useState('Angular');
  const { t } = useTranslate();

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const handleChangeSelect = useCallback((event) => {
    setSelect(event.target.value);
  }, []);

  const viewAllBtn = (
    <m.div variants={varFade().inUp}>
      <Button
        size="large"
        color="inherit"
        variant="outlined"
        target="_blank"
        rel="noopener"
        href={paths.components}
        endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
      >
        View All Components
      </Button>
    </m.div>
  );

  const renderDescription = (
    <Box
      sx={{
        height: { md: 450, xs: 300 },
        py: { xs: 1, md: 0 },
        overflow: 'hidden',
        position:'relative',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage:'url(/assets/images/home/contactImage.png)'
      }}
    ></Box>
  );
  const _carouselsExample = [...Array(20)].map((_, index) => ({
    id: _mock.id(index),
    title: _mock.postTitle(index),
    coverUrl: _mock.image.cover(index),
    description: _mock.description(index),
  }));

  const renderContent = (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        md: 'repeat(1, 1fr)',
      }}
      sx={{
        mb: 3,
        alignItems: 'flex-start',
      }}
    >
      <Typography component="div" variant="h6" sx={{ color: '#0C3F5B', textAlign:'left' }}>
        {t('contact_us_description')}
      </Typography>
      <Typography component="span" variant="h6" sx={{ color: 'orange', textAlign:'left', marginTop:'-25px' }}>
        {t('contact_us')}
      </Typography>

      <ContactForm2 />
    </Box>
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
        bgcolor: '#F3F0F5',
      }}
    >
      <Container
        component={MotionViewport}
        sx={{
          py: { xs: 10, md: 15 },
        }}
      >
        <Grid container direction={{ xs: 'column', md: 'row' }} spacing={5}>
          <Grid xs={12} md={6}>
            {renderDescription}
          </Grid>

          <Grid xs={12} md={6}>
            {renderContent}
          </Grid>

          {/* {!mdUp && (
          <Grid xs={12} sx={{ textAlign: 'center' }}>
            {viewAllBtn}
          </Grid>
        )} */}
        </Grid>
      </Container>
    </Box>
  );
}

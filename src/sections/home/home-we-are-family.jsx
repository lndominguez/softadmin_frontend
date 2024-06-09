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
import { alpha, useTheme } from '@mui/material/styles';
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
import { bgBlur, bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------
const listTecnologies = [
  {
    name: 'React',
    image: '/assets/background/home_bgQSomos.jpg',
  },
];

export default function HomeWeAreFamily() {
  const mdUp = useResponsive('up', 'md');
  const theme = useTheme();

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
    <Stack
      sx={{
        textAlign: { xs: 'center', md: 'left' },
        pl: { md: 5 },
        position: 'relative',
        zIndex: 10,
        // pt: { md: 15 },
      }}
    >
      <m.div variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ color: 'white' }}>
          {t('meet_our_team')}
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ my: 3 }} color="white">
          {t('we_are_not_only_team')} <span  style={{color:'#EFB00A'}}>
          {t('we_are_family')}
        </span>
        </Typography>
       
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          sx={{
            mb: 5,
            color: 'white',
            fontSize: '20px'
          }}
          variant="body1"
        >
          {t('we_are_family_description')}
        </Typography>
      </m.div>
    </Stack>
  );

  const renderContent = (
    <Stack
      component={Paper}
      variant="outlined"
      alignItems="center"
      spacing={{ xs: 3, md: 5 }}
      sx={{
        borderRadius: 2,
        bgcolor: 'unset',
        borderStyle: 'dashed',
        p: { xs: 3, md: 5 },
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {
        // mdUp && (
        <>
          {/* Row 6 */}
          <Stack spacing={3} direction="row" justifyContent="center" sx={{ width: 1 }}>
            <Grid
              container
              spacing={{ xs: 3, md: 6 }}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              {listTecnologies.map((item, index) => (
                <Grid key={index}>
                  <m.div variants={varFade().inUp}>
                    <Paper
                      sx={{
                        width: `${(mdUp && '450px') || '300px'}`,
                        height: `${(mdUp && '450px') || '300px'}`,
                        borderRadius: 1,
                        boxShadow: (theme) => theme.customShadows.z20,
                        backgroundImage: `url("${item.image}")`,
                        backgroundSize: '100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        objectFit: 'contain',
                      }}
                    >
                      {/* <Image
                        alt="cover-url"
                        src={item.image}
                        ratio="4/3"
                        sx={{
                          borderRadius: 1.5,
                          
                        }}
                        
                      /> */}
                    </Paper>
                  </m.div>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </>
        // )
      }
    </Stack>
  );
  const barStyles = {
    // background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  };

  return (

     // <Box
    //   sx={{
    //     // height: { md: 560 },
    //     py: { xs: 10, md: 0 },
    //     overflow: 'hidden',
    //     position: 'relative',
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //     backgroundImage:
    //       'url(/assets/background/overlay_1.svg), url(/assets/background/bg_our_time.png)',
    //   }}
    // >
   
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.grey[900], 0.9),
          imgUrl: '/assets/background/bg_our_time.png',
        }),
        overflow: 'hidden',
        height: { md: 840 },
        py: { xs: 10, md: 0 },
      }}
    >

      <Container
        component={MotionViewport}
        sx={{
          py: { xs: 10, md: 15 },
        }}
      >
        <Grid container direction={{ xs: 'column', md: 'row' }} spacing={5}>
          {/* <Grid xs={12} md={6}>
            {renderContent}
          </Grid> */}

          <Grid xs={12} md={6}>
            {renderDescription}
          </Grid>

          {/* {!mdUp && (
          <Grid xs={12} sx={{ textAlign: 'center' }}>
            {viewAllBtn}
          </Grid>
        )} */}
        </Grid>
      </Container>

    </Box>
    // </div>
  );
}

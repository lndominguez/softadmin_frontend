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

// ----------------------------------------------------------------------
const listTecnologies = [
  {
    name: 'Java',
    image: '/assets/icons/home/skills_tecnologies/java.png',
  },
  {
    name: 'Java 2 EE',
    image: '/assets/icons/home/skills_tecnologies/j2ee.png',
  },
  {
    name: '.Net',
    image: '/assets/icons/home/skills_tecnologies/net.png',
  },
  {
    name: 'Python',
    image: '/assets/icons/home/skills_tecnologies/python.png',
  },
  {
    name: 'Php',
    image: '/assets/icons/home/skills_tecnologies/php.png',
  },
  {
    name: 'Go',
    image: '/assets/icons/home/skills_tecnologies/go.png',
  },
  {
    name: 'SpringBoot',
    image: '/assets/icons/home/skills_tecnologies/spring_boot.png',
  },
  {
    name: 'Git',
    image: '/assets/icons/home/skills_tecnologies/git.png',
  },
  {
    name: 'Gitlab',
    image: '/assets/icons/home/skills_tecnologies/gitlab.png',
  },
  {
    name: 'Apache',
    image: '/assets/icons/home/skills_tecnologies/apache.png',
  },
  {
    name: 'Mongodb',
    image: '/assets/icons/home/skills_tecnologies/mongodb.png',
  },
  {
    name: 'Oracle',
    image: '/assets/icons/home/skills_tecnologies/oracle.png',
  },
  {
    name: 'Mysql',
    image: '/assets/icons/home/skills_tecnologies/mysql.png',
  },
  {
    name: 'Maven',
    image: '/assets/icons/home/skills_tecnologies/maven.png',
  },
  {
    name: 'SQL Server',
    image: '/assets/icons/home/skills_tecnologies/sql_server.png',
  },
  {
    name: 'PostgreSQL',
    image: '/assets/icons/home/skills_tecnologies/postgresql.png',
  },
  {
    name: 'Js',
    image: '/assets/icons/home/skills_tecnologies/js.png',
  },
  {
    name: 'TypeScript',
    image: '/assets/icons/home/skills_tecnologies/typescript.png',
  },
  {
    name: 'Angular',
    image: '/assets/icons/home/skills_tecnologies/angular.png',
  },
  {
    name: 'Nodejs',
    image: '/assets/icons/home/skills_tecnologies/nodejs.png',
  },
  {
    name: 'React',
    image: '/assets/icons/home/skills_tecnologies/reactjs.png',
  },
  {
    name: 'Firebase',
    image: '/assets/icons/home/skills_tecnologies/firebase.png',
  },
  {
    name: 'Wordpress',
    image: '/assets/icons/home/skills_tecnologies/wordpress.png',
  },

  {
    name: 'Symfony',
    image: '/assets/icons/home/skills_tecnologies/symfony.png',
  },
  {
    name: 'Ionic',
    image: '/assets/icons/home/skills_tecnologies/ionic.png',
  },
  {
    name: 'Swift',
    image: '/assets/icons/home/skills_tecnologies/swift.png',
  },
  {
    name: 'Vue',
    image: '/assets/icons/home/skills_tecnologies/vuejs.png',
  },

  {
    name: 'LitElement',
    image: '/assets/icons/home/skills_tecnologies/litelement.png',
  },
  {
    name: 'Flutter',
    image: '/assets/icons/home/skills_tecnologies/flutter.png',
  },
  {
    name: 'React Native',
    image: '/assets/icons/home/skills_tecnologies/react_native.png',
  },
  {
    name: 'Kotlin',
    image: '/assets/icons/home/skills_tecnologies/kotlin.webp',
  },
  {
    name: 'Android Studio',
    image: '/assets/icons/home/skills_tecnologies/android_studio.png',
  },
  {
    name: 'IOS',
    image: '/assets/icons/home/skills_tecnologies/ios.png',
  },

  {
    name: 'Xamarin',
    image: '/assets/icons/home/skills_tecnologies/xamarin.webp',
  },
  {
    name: 'Cypress.io',
    image: '/assets/icons/home/skills_tecnologies/cypress.png',
  },
  {
    name: 'JMeter',
    image: '/assets/icons/home/skills_tecnologies/jmeter.png',
  },
  {
    name: 'Appium',
    image: '/assets/icons/home/skills_tecnologies/appium.png',
  },
  {
    name: 'JUnit',
    image: '/assets/icons/home/skills_tecnologies/junit5.png',
  },
  {
    name: 'Sonarqube',
    image: '/assets/icons/home/skills_tecnologies/sonar_qube.png',
  },
  {
    name: 'Cucumber',
    image: '/assets/icons/home/skills_tecnologies/cucumber.png',
  },
  {
    name: 'Postman',
    image: '/assets/icons/home/skills_tecnologies/postman.png',
  },

  {
    name: 'Jenkins',
    image: '/assets/icons/home/skills_tecnologies/jenkins.png',
  },
];

export default function HomeHugePackTegnologies() {
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
    <Stack
      sx={{
        textAlign: { xs: 'center', md: 'left' },
        pl: { md: 5 },
        // pt: { md: 15 },
      }}
    >
      <m.div variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
          {t('tech_stack')}
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ my: 3 }} color="#0C3F5B">
          {t('tech_stack_title')}
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          sx={{
            mb: 5,
            color: 'text.secondary',
          }}
          variant="body1"
        >
          {t('tech_stack_info')}
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
      <Card variant="outlined" sx={{ boxShadow: 'unset', borderStyle: 'none', mt:{xs:-5, md:4}, backgroundColor:'transparent' }}>
        {/* <CardHeader title="Carousel Basic 1" /> */}
        <CardContent>
          <CarouselApps data={listTecnologies} />
        </CardContent>
      </Card>
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
        // bgcolor: '#F9FAFB',
      }}
    >
      <Container
        component={MotionViewport}
        sx={{
          py: { xs: 10, md: 15 },
        }}
      >
        <Grid container direction={{ xs: 'column', md: 'row-reverse' }} spacing={5}>
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

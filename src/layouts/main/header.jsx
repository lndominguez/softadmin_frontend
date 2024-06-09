import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Badge, { badgeClasses } from '@mui/material/Badge';

import { paths } from 'src/routes/paths';

import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

import Logo from 'src/components/logo';
import Label from 'src/components/label';

import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import { HEADER } from '../config-layout';
import { navConfig } from './config-navigation';
import LoginButton from '../common/login-button';
import HeaderShadow from '../common/header-shadow';
import SettingsButton from '../common/settings-button';
import LanguagePopover from '../common/language-popover';
import { useLocales, useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();
  const { allLangs, currentLang } = useLocales();

  const mdUp = useResponsive('up', 'md');

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            ...bgBlur({
              blur:0.5,
              color: theme.palette.background.default,
              opacity:0.2
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center', minWidth:'100%' }}>
          <Badge
            sx={{
              [`& .${badgeClasses.badge}`]: {
                top: 8,
                right: -16,
              },
            }}
            // badgeContent={
            //   <Link
            //     href={paths.changelog}
            //     target="_blank"
            //     rel="noopener"
            //     underline="none"
            //     sx={{ ml: 1 }}
            //   >
            //     <Label color="info" sx={{ textTransform: 'unset', height: 22, px: 0.5 }}>
            //       v5.7.0
            //     </Label>
            //   </Link>
            // }
          >
            <Logo />
          </Badge>

          <Box sx={{ flexGrow: 1 }} />

          {mdUp && <NavDesktop data={navConfig} />}

          <Stack alignItems="center" direction={{ xs: 'row', md: 'row-reverse' }}>
            {/* <Button variant="contained" target="_blank" rel="noopener" href={paths.minimalUI}>
              Purchase Now
            </Button> */}

            {/* {mdUp && <LoginButton/>} */}

            {/* <SettingsButton
              sx={{
                ml: { xs: 1, md: 0 },
                mr: { md: 2 },
              }}
            /> */}
            <span
              
              style={{
                color: 'white',
                borderRadius: '8px',
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: 'white',
                padding: '1px 5px 1px 8px',
                fontSize: '12px',
                fontWeight: 'bold',
                display:'flex',
                justifyContent:'space-between',
                alignItems: 'center',
                width: '100px',
                height: '30px',
                background:
                  'linear-gradient(120deg, rgba(234,140,25,1) 25%, rgba(241,196,2,1) 48%, rgba(235,149,22,1) 80%, rgba(235,149,22,1) 100%)',
              }}
            >
              {currentLang.label} 
              <LanguagePopover />
            </span>

            {/* {!mdUp && <NavMobile data={navConfig} />} */}
          </Stack>
        </Container>
      </Toolbar>

      {offsetTop && <HeaderShadow />}
    </AppBar>
  );
}

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { paths } from 'src/routes/paths';

import { _mock } from 'src/_mock';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ComponentHero from 'src/sections/_examples/component-hero';

import CarouselBasic1 from 'src/sections/_examples/extra/carousel-view/carousel-basic-1';
import CarouselBasic2 from 'src/sections/_examples/extra/carousel-view/carousel-basic-2';
import CarouselBasic3 from 'src/sections/_examples/extra/carousel-view/carousel-basic-3';
import CarouselBasic4 from 'src/sections/_examples/extra/carousel-view/carousel-basic-4';
import CarouselAnimation from 'src/sections/_examples/extra/carousel-view/carousel-animation';
import CarouselThumbnail from 'src/sections/_examples/extra/carousel-view/carousel-thumbnail';
import CarouselCenterMode from 'src/sections/_examples/extra/carousel-view/carousel-center-mode';

// ----------------------------------------------------------------------

const _carouselsExample = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.postTitle(index),
  coverUrl: _mock.image.cover(index),
  description: _mock.description(index),
}));

// ----------------------------------------------------------------------

export default function HomeJobs() {
  return (
    <>
      <Container sx={{ my: 10 }}>
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
          <Card>
            <CardHeader title="Carousel Basic 3" />
            <CardContent>
              <CarouselBasic3 data={_carouselsExample.slice(8, 12)} />
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}

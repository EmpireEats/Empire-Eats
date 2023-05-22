import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import empire from './assets/5.png';

const cards = [
  {
    image:
      'https://images.unsplash.com/flagged/photo-1578928534298-9747fc52ec97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80',
    heading: '🌟 Leaderboard',
    description: 'See where you rank against millions of New Yorkers!',
    buttonText: 'See Leaderboard',
    link: '/home/leaderboard',
  },
  {
    image:
      'https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    heading: '🍔 Restaurants',
    description:
      'With Google Maps integrated, check out any nearby restaurants!',
    buttonText: 'See Restaurants',
    link: '/restaurants',
  },
  {
    image:
      'https://media.istockphoto.com/id/1482253281/photo/a-confused-adult-black-female-checking-directions-on-her-phone-while-exploring-london.jpg?b=1&s=170667a&w=0&k=20&c=DJH-trgReznFj1IIY4VXeQwe4sLzRDpmIALcz6ejlas=',
    heading: '💬 Yerrr!',
    description:
      'Create a "Yerrr" post to find your new foodie buddie or interact with someone elses!',
    buttonText: 'See Yerrr',
    link: '/yerrr/now',
  },
  {
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    heading: '📸 Feed',
    description: 'Check out other foodie reviews and post your own!',
    buttonText: 'See Feed',
    link: '/home/feed',
  },
];

const defaultTheme = createTheme({
  typography: {
    fontFamily: "'Source Sans Pro', sans-serif",
  },
  palette: {
    background: {
      default: '#b5d2dd8f',
    },
  },
});

export default function HomePage() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            pt: 8,
            pb: 6,
            mt: '100px',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${empire})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center', // Added this
              backgroundRepeat: 'no-repeat',
              zIndex: -1,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              zIndex: -1,
            },
          }}>
          <Container maxWidth='sm'>
            <Typography
              sx={{ fontWeight: 'bold' }}
              component='h1'
              variant='h3'
              align='center'
              color='text.primary'
              gutterBottom>
              {''} Welcome to Empire Eats! {''}
            </Typography>
            <Typography variant='h6' align='center' color='black' paragraph>
              the only app that will revolutionize your dining experience. Our
              interactive platform brings food enthusiasts together, enabling
              you to share your experiences, coordinate meet ups with new
              friends in the area, and even compete to become NYC's #1 Foodie!
              With Empire Eats, you're not only exploring the culinary world,
              but also building a community of food lovers. Together, we make
              dining more exciting than ever before.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction='row'
              spacing={2}
              justifyContent='center'>
              <Link to='/login'>
                <Button
                  variant='contained'
                  style={{ backgroundColor: '#2B3434', color: '#fff' }}>
                  Login
                </Button>
              </Link>
              <Link to='/signup'>
                <Button
                  variant='contained'
                  style={{ backgroundColor: '#2B3434', color: '#fff' }}>
                  Sign Up
                </Button>
              </Link>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth='md'>
          {/* End hero unit */}
          <Grid container spacing={3} justifyContent='center'>
            {cards.map((card) => (
              <Grid
                item
                key={card.heading}
                xs={12}
                sm={6}
                md={4}
                style={{ marginBottom: '15px' }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <CardMedia
                    component='div'
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={card.image}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {card.heading}
                    </Typography>
                    <Typography>{card.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={card.link}>
                      <Button size='medium' sx={{ color: 'black' }}>
                        {card.buttonText}
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}

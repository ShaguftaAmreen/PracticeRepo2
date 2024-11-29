import React from 'react';
import Container from '@mui/material/Container';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import FeaturedPost from './components/FeaturedPost';
import Grid from '@mui/material/Grid';
import { featuredPosts } from './Data/Data';
import PostCard from './components/PostCard';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import { styled } from '@mui/system';
import { sidebar } from './Data/Data';

// Use styled to replace makeStyles
const MainGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Header />
        <FeaturedPost />
        <br />
        <Grid container spacing={4}>
          {featuredPosts.map((post) => (
            <PostCard post={post} key={post.title} />
          ))}
        </Grid>

        <MainGrid container spacing={5}>
          <Main title="From the Firehose" />
          <Sidebar
            title={sidebar.title}
            description={sidebar.description}
            archives={sidebar.archives}
            social={sidebar.social}
          />
        </MainGrid>
      </Container>
    </ThemeProvider>
  );
}

export default App;

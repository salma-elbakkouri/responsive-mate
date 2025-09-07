import React from 'react';
import { PageProps } from 'gatsby';
import { Box, Typography, Button } from '@mui/material';
import { Layout } from '../components/layout/Layout';

const HomePage: React.FC<PageProps> = () => {
  return (
    <Layout title="Responsiveness Engine">
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Responsiveness Engine
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Test your website across multiple devices instantly
        </Typography>
        <Button variant="contained" size="large" sx={{ mt: 2 }}>
          Start Testing
        </Button>
      </Box>
    </Layout>
  );
};

export default HomePage;

export const Head = () => (
  <>
    <title>Responsiveness Engine - Multi-Device Testing</title>
    <meta name="description" content="Test your website responsiveness across multiple devices instantly" />
  </>
);

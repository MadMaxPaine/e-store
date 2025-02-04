import React from 'react';
import { useHistory } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/consts';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  Grid,
  Rating,
  Chip,
  useTheme,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export const DeviceItem = ({ device }) => {
  const history = useHistory();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark'; 

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          maxWidth: 250,
          margin: '1em auto',
          padding: 1,
          borderRadius: 3,
          boxShadow: isDarkMode
            ? '0 4px 12px rgba(255, 255, 255, 0.1)' 
            : '0 4px 12px rgba(0, 0, 0, 0.1)', 
          backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: isDarkMode
              ? '0 6px 18px rgba(255, 255, 255, 0.2)'
              : '0 6px 18px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={process.env.REACT_APP_API_URL + device.img}
          alt={device.name}
          sx={{
            objectFit: 'contain',
            backgroundColor: isDarkMode ? '#2c2c2c' : '#f9f9f9',
            borderRadius: 2,
            padding: 1,
          }}
        />

        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 600,
              textAlign: 'center',
              mb: 1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: isDarkMode ? '#e0e0e0' : '#000',
            }}
          >
            {device.name}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5,
            }}
          >
            <Rating
              name="device-rating"
              value={device.rating}
              readOnly
              precision={0.5}
              icon={<StarIcon fontSize="inherit" />}
              emptyIcon={<StarIcon fontSize="inherit" style={{ opacity: 0.3 }} />}
              sx={{ color: '#ffb400' }}
            />
            <Chip
              label={device.rating}
              size="small"
              sx={{
                backgroundColor: isDarkMode ? '#90caf9' : '#1976d2',
                color: isDarkMode ? '#000' : '#fff',
              }}
            />
          </Box>

          <Typography
            variant="body2"
            color={isDarkMode ? 'gray' : 'text.secondary'}
            sx={{ textAlign: 'center', mt: 1 }}
          >
            High-quality device for your needs.
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="medium"
            onClick={() => history.push(`${DEVICE_ROUTE}/${device.id}`)}
            sx={{
              background: isDarkMode
                ? 'linear-gradient(45deg, #90caf9, #42a5f5)' 
                : 'linear-gradient(45deg, #1976d2, #42a5f5)',
              color: '#fff',
              borderRadius: 2,
              padding: '6px 16px',
              textTransform: 'none',
              '&:hover': {
                background: isDarkMode
                  ? 'linear-gradient(45deg, #64b5f6, #1e88e5)'
                  : 'linear-gradient(45deg, #1565c0, #1e88e5)',
              },
            }}
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

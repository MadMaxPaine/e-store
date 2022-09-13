import React from 'react';
import { useHistory } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/consts';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StarBorderPurple500RoundedIcon from '@mui/icons-material/StarBorderPurple500Rounded';
import Box from '@mui/material/Box';
import { Container, Grid } from '@mui/material';

export const DeviceItem = ({ device }) => {
 const history = useHistory();
 return (
  <Grid
   container
   item
   direction="column"
   md={3}
  >
   <Container sx={{ "border": "0", display: "flex", }}>
    <Card sx={{
     width: 200,
     margin: "0 auto",
     padding: "0.5em",
    }}>
     <CardMedia
      component="img"
      height="200"
      padding="2"
      margin="2"
      image={process.env.REACT_APP_API_URL + device.img}
      alt={device.name}
      sx={{ objectFit: "contain", "alignItems": "center", justifyContent: "center" }}
     />
     <CardContent sx={{ maxWidth: 200, maxHeight: 200, mt: 0, mb: 0, "alignItems": "center" }}>
      <Box component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
       {device.name}
       <Box component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {device.rating}<StarBorderPurple500RoundedIcon sx={{ color: "blue" }} />
       </Box>
      </Box>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
       Some info ...
      </Typography>
     </CardContent>
     <CardActions sx={{ display: "flex", justifyContent: "right" }}>
      <Button size="medium" onClick={() => history.push(`${DEVICE_ROUTE}/${device.id}`)}>Learn More</Button>
     </CardActions>
    </Card>
   </Container>
  </Grid>
 )
};

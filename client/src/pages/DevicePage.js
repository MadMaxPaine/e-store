import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StarBorderPurple500RoundedIcon from '@mui/icons-material/StarBorderPurple500Rounded';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceAPI';
import { observer } from 'mobx-react-lite';
const DevicePage = observer(() => {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();
  useEffect(() => {
    fetchOneDevice(id)
      .then(data => setDevice(data))
  }, [id]);
  return (
    <Box>
      <Grid
        container
        sx={{ direction: "flex", justifyContent: "center", alignItems: "center", mt: 1, b: 3 }}
        spacing={1}
      >
        <Grid item md={3} >
          <Card >
            {device.img && <CardMedia
              component="img"
              height="300"
              image={process.env.REACT_APP_API_URL + device.img}
              alt={device.name}
              sx={{ objectFit: "contain" }}
            />}
            <CardContent >
              <Typography align="center" variant="h4" component="div" gutterBottom>{device.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3}>
          <Typography align="center" variant="h4" component="div" gutterBottom>
            {device.rating}<StarBorderPurple500RoundedIcon sx={{ color: "blue" }} />
          </Typography>
        </Grid>
        <Grid item md={3}>
          <Typography variant="h4" component="div" align="center" style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightblue' }} gutterBottom>
            {device.price}
            <Button>Add to basket</Button>
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="row" sx={{ direction: "flex", justifyContent: "center", alignItems: "center", mt: 1 }}>
        <Typography variant="h4" component="h2" gutterBottom>Description</Typography>
      </Grid>
      {device.info.map((info, index) =>
        <Box
          key={info.id}
          style={{ background: index % 2 === 0 ? 'lightblue' : 'transparent', padding: 10 }}
        >
          <Grid container direction="row" sx={{ direction: "flex", justifyContent: "space-between", alignItems: "center", m: 1, pr: 2, pl: 2 }}>
            <Box item md={6}>{info.title}</Box>
            <Box item md={6}>{info.description}</Box>
          </Grid>
        </Box>
      )}
    </Box>
  );
});
export default DevicePage;
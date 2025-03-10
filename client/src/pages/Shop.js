import React, { useContext, useEffect } from 'react';
import { TypeBar } from '../components/TypeBar';
import { BrandBar } from '../components/BrandBar';
import { DeviceList } from '../components/DeviceList';
import { observer } from 'mobx-react-lite';
import { ctx } from '../store/context';
import { fetchBrands, fetchTypes, fetchDevices } from '../http/deviceAPI';
import { Pages } from '../components/Pages';
import Grid from '@mui/material/Grid';


const Shop = observer(() => {
 const { device } = useContext(ctx);
 useEffect(() => {
  fetchTypes().then(data => device.setTypes(data));
  fetchBrands().then(data => device.setBrands(data));
 }, [device]);

 useEffect(() => {
  fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 8).then(data => {
   device.setDevices(data.rows);
   device.setTotalCount(data.count);
  });
 }, [device.page, device.selectedType, device.selectedBrand, device])
 return (
  <Grid
   container
   item
   sx={{ display: "flex" }}
  >
   <Grid
    container
    item
    md={2}
    p={1}
   >
    <TypeBar></TypeBar>
   </Grid>
   <Grid
    container
    direction="column"
    item
    md={10}
   >
    <Grid container >
     <Grid container direction="row" sx={{ verticalAlign: "left" }} p={1} ><BrandBar /></Grid>
     <Grid container direction="row" mt={2}><DeviceList /></Grid>
     <Grid container direction="row" mt={2} sx={{ alignItems: "center", justifyContent: "center", }} p={1}><Pages /></Grid>
    </Grid>
   </Grid>
  </Grid>
 );
});
export default Shop;
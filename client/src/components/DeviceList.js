import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { ctx } from '../store/context';
import { DeviceItem } from './DeviceItem';
import { Grid } from '@mui/material';

export const DeviceList = observer(() => {
  const { device } = useContext(ctx);

  return (
    <Grid
      container
      item
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1",
        maxWidth: "100%",
      }}
      rowSpacing={1}
      columnSpacing={1}
      aria-label="Device list"
      role="list"  // Вказуємо, що це список
    >
      {device.devices.map((device) => (
        <DeviceItem 
          key={device.id} 
          device={device} 
          aria-labelledby={`device-item-${device.id}`}  // Атрибут для кращої доступності
        />
      ))}
    </Grid>
  );
});

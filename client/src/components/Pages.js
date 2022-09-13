import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { ctx } from '../index';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export const Pages = observer(() => {
  const { device } = useContext(ctx);
  const pagesCount = Math.ceil(device.totalCount / device.limit) - 1;
  const handleChange = (event, value) => {
    device.setPage(value);
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={pagesCount}
        page={device.page}
        onChange={handleChange}
        showFirstButton
        showLastButton
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", maxWidth: "100%", }}
      />
    </Stack>
  )
});

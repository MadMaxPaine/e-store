import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Pagination } from 'react-bootstrap';
import { ctx } from '../index';

export const Pages = observer(() => {
 const { device } = useContext(ctx);
 const pagesCount = Math.ceil(device.totalCount / device.limit);
 const pages = [];
 for (let index = 0; index < pagesCount; index++) {
  pages.push(index + 1);
 }
 return (
  <Pagination className="mt-4">
   {
    pages.map(page =>
     <Pagination.Item
      activeLabel={false}
      key={page}
      active={device.page === page}
      onClick={() => device.setPage(page)}
     >
      {page}
     </Pagination.Item>)
   }
  </Pagination>
 )
});

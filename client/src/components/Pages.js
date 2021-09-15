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
  if (!pages.length) {
    return (
      <div></div>
    );
  }
  return (
    <Pagination className="d-flex mt-4 justify-content-center align-items-center" >
      <Pagination.Item
        className="m-1"
        activeLabel={false}
        disabled={pages.length <= 0 ? true : false}
        onClick={() => device.setPage(pages[0])}
      >{'«'}
      </Pagination.Item>
      <Pagination.Item
        className="m-1"
        activeLabel={false}
        disabled={pages.length <= 0 ? true : false}
        onClick={() =>
          device.page.index > 0 ?
            device.setPage(pages[device.page.index - 1])
            :
            device.setPage(pages[0])}
      >{'‹'}
      </Pagination.Item>
      {
        pages.map(page =>
          <Pagination.Item
            className="m-1"
            activeLabel={false}
            key={page}
            active={device.page === page}
            onClick={() => device.setPage(page)}
          >
            {page}
          </Pagination.Item>)
      }
      <Pagination.Item
        className="m-1"
        activeLabel={false}
        disabled={pages.length <= 0 ? true : false}
        onClick={() =>
          device.page.index < pages.length ?
            device.setPage(pages[device.page.index + 1])
            :
            device.setPage(pages[pages.length - 1])}
      >{'›'}
      </Pagination.Item>
      <Pagination.Item
        className="m-1"
        activeLabel={false}
        disabled={pages.length <= 0 ? true : false}
        onClick={() => device.setPage(pages[pages.length - 1])}
      >{'»'}
      </Pagination.Item>
    </Pagination>
  )
});

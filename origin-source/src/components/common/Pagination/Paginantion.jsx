
import React from 'react';
import {Pagination} from '@material-ui/lab';

function PaginationUI(props) {
 const {count , page,handleChange, isPagination=true}=props;
  return (
    isPagination?
          <Pagination
            page={page}
            count={count}
            onChange={handleChange}
            size="large" 
          />
        :null
  );
}
export default PaginationUI;


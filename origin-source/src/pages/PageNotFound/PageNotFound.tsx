import pageFailed from "@Assets/images/PageNotFound/404-failed.svg";
import { Div, P } from "@Common/TagAntdNotSupport/TagAntdNotSupport";
//Hocs
import withScrollToTop from "@Hocs/witchScrollToTop";
import {
  Button
} from "@material-ui/core";
import React from 'react';
import { useHistory } from "react-router-dom";
import "./styles.scss";

const PageNotFound = (props: any) => {
  const history = useHistory();

  return (
    <Div className="rc-page_not_found">
      <img src={pageFailed} alt="img"></img>
      <P className="rc-page_not_found-title">Trang này không hiển thị</P>
      <P>Có thể liên kết đã hỏng hoặc trang đã bị gỡ.
        Hãy kiểm tra xem liên kết mà bạn đang cố mở có chính xác không.</P>

      <Button variant="contained" color="primary" onClick={()=>{
        history.push("/")
      }} >Đi tới trang chủ</Button>

    </Div>
  );
};

export default withScrollToTop(PageNotFound);

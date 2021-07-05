//Lib
//img
import logo from "@Assets/icons/logo/logo.png";
//Component
import {
  Div, Img,



  P,
  Span
} from "@Common/TagAntdNotSupport/TagAntdNotSupport";
// Antd
import { Grid, Typography } from '@material-ui/core';
import React from "react";
//Const
import {
  contactInformation,


  contactList, customerSupport,
  policyList
} from "./const";
//Styled Component
import "./styles.scss";


// const { Typography } = Typography;

const Footer = () => {
  return (
    <Div className="rc_footer">
      <Div className="footer-contact">
        <Typography variant ={"h3"}>LIÊN HỆ CHÚNG TÔI</Typography>
        <Grid container spacing={2}>
          {contactList?.map((element, index) => {
            return (
              <Grid item xs={12} lg={4} key={element?.id}>
                <Div className="contact-us">
                  <Img src={element?.image} className="icon"></Img>
                  <a href={element?.path}>{element?.name}</a>
                </Div>
              </Grid>
            );
          })}
        </Grid>
      </Div>
      <Grid container justify="space-between" className="footer-start">
        <Grid item xs={12} lg={5}>
          <Typography variant={"h3"}>THÔNG TIN LIÊN HỆ</Typography>
          {contactInformation.map((element, index) => {
            return (
                <Grid item xs={12} key={index}>
                  <Typography variant={"h5"}>{element.name}</Typography>
                  {element?.info.map((elementChild, indexChild) => {
                    return (
                      <Div className="detail" key={indexChild}>
                        <P>{elementChild.address}</P>
                        <P>{elementChild.phone}</P>
                        <P>
                          Email:{" "}
                          <a href="mailto:info@vietcan.com">
                            {elementChild.email}
                          </a>
                        </P>
                      </Div>
                    );
                  })}
                </Grid>
            );
          })}
        </Grid>

        <Grid item xs={12} lg={3}>
          <Typography variant={"h3"}>HỖ TRỢ KHÁCH HÀNG</Typography>
          {customerSupport.map((element, index) => {
            return (
              <Div key={index}>
                <P>{element.time}</P>
                <P>
                  <Span className="title">Hỗ trợ dịch vụ:</Span>&nbsp;{" "}
                  {element.serviceSupport}
                </P>
                <P>
                  <Span className="title">Hỗ trợ kĩ thuật:</Span>&nbsp;{" "}
                  {element.skillSupport}
                </P>
              </Div>
            );
          })}
        </Grid>

        <Grid item xs={12} lg={3}>
          <Typography variant={"h3"}>CHÍNH SÁCH VÀ QUY ĐỊNH</Typography>
          {policyList.map((element, index) => {
            return (
              <P key={index}>
                <a href="#">{element.name}</a>
              </P>
            );
          })}
        </Grid>
      </Grid>
        <Grid  container justify="center" alignItems="center" className="footer-logo">
          <Img src={logo}></Img>
          <Span>Copyright 2020 by VietCan. All rights reserved.</Span>
        </Grid>
    </Div>
  );
};

export default Footer;

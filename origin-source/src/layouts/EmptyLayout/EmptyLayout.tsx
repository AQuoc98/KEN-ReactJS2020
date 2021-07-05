//Lib
import { Div } from "@Common/TagAntdNotSupport/TagAntdNotSupport";
import Notification from "@Reduxs/Notification/Notification";
import React, { useEffect } from "react";
//Style
import "./style.scss";

interface IProps {
  children: React.ReactNode;
}
const RECAPTCHA_TOKEN =
  process.env.REACT_APP_RECAPTCHA_TOKEN || process.env.RECAPTCHA_TOKEN;
const DefaultLayout = (props: IProps) => {
  const { children } = props;

  useEffect(() => {
    const script = document.createElement("script");
    // script.id = "googleRecaptchaScript";
    script.src =
      `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_TOKEN}`;
    document.body.appendChild(script);
    return () => {
      // const elem = document.getElementById("googleRecaptchaScript");
      //  if(elem){
      //   elem?.parentNode?.removeChild(elem)
      //  }
    }
  }, []);

  
  return (
    <div className="rc-empty_layout">
      <Div className="rc-main_content">
        {children}
      </Div>
      <Notification />

    </div>
  );
};

export default DefaultLayout;
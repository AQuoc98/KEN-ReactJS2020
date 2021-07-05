//Lib
//Components
import Header from "@Common/Header/Header";
import { Div } from "@Common/TagAntdNotSupport/TagAntdNotSupport";
// import ButtonDarkMode from "@Common/ButtonDarkMode/ButtonDarkMode"
import Notification from "@Reduxs/Notification/Notification";
import React,{useEffect} from "react";
//Style
import "./style.scss";
interface IProps {
  children: React.ReactNode;
}

const DefaultLayout = (props: IProps) => {
  const { children } = props;
  return (
    <div className="rc_default_layout">
      <Header />
      <Div className="rc_main_content">
        {children}
      </Div>
      <Notification />
    </div>
  );
};

export default DefaultLayout;
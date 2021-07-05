//Lib
import ButtonDarkMode from "@Common/ButtonDarkMode/ButtonDarkMode";
import Footer from "@Common/Footer/Footer";
//Components
import Header from "@Common/Header/Header";
import { Div } from "@Common/TagAntdNotSupport/TagAntdNotSupport";
import Notification from "@Reduxs/Notification/Notification";
import React from "react";
//Styled
import "./style.scss";


interface IProps {
  children: React.ReactNode;
}

const DefaultLayout = (props: IProps) => {
  const { children } = props;
  return (
    <Div className='sa_user_layout'>
      <Header />
      <Div className="sa_main_content">
        {children}

      </Div>
      <Notification />
      <ButtonDarkMode />
      <Footer />
    </Div>
  );
};

export default DefaultLayout;
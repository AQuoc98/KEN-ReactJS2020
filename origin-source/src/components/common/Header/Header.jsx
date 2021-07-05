//Lib
//Icon
import logo from "@Assets/icons/logo/logo.png";
//Component
import { Div, Img, P, Span } from "@Common/TagAntdNotSupport/TagAntdNotSupport";
import { Grid, Popover } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Account from "./Account/Account";
//Const
import { MENU_DATA, NAVIGATION_MENU_DATA } from "./const";
import LinkActive from "./LinkActive/LinkActive";
//style
import "./style.scss";


const Header = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const pathname = window.location.pathname;
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [keyActive, setKeyActive] = useState("TEST_MANAGEMENT");
  //Function

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };
  const handleShowMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
const handleSetKeyActive=(keyActive)=>{
  setKeyActive(keyActive);
  handleCloseMenu()
}
  //======================Redux===================================
  const { loginReducer, refreshDataReducer } = useSelector((state) => ({
    loginReducer: state.loginReducer,
    refreshDataReducer: state.refreshDataReducer,
  }));

  const isAuthenticated = loginReducer
    ?.get("payload")
    ?.get("result")
    ?.get("token");
  const openMenu = Boolean(menuAnchorEl);
  return (
    <Fragment>
      <Div className="rc-header">
        <Div className="rc-header-logo-group">
          <MenuIcon
            style={{ cursor: "pointer" }}
            fontSize={"large"}
            className="rc-header-logo-group-menu-icon"
            onClick={(event) => {
              handleShowMenu(event);
            }}
          />
          <Link className="rc-header-logo-group-icon" to="/">
            <Img src={logo} />
            <Span>NineQuiz</Span>
          </Link>
        </Div>

        <Div className="rc-header-navigator-menu">
          {NAVIGATION_MENU_DATA?.[keyActive]?.map((element, index) => {
            return (
              <LinkActive
                key={index}
                path={element?.path}
                navItemName={element?.title}
                pathActive={element?.pathActive}
              />
            );
          })}
        </Div>

        <Div className="rc-header-account-button">
          <Account />
        </Div>
      </Div>

      {/* Modal/Popover  */}
      <Popover
        open={openMenu}
        anchorEl={menuAnchorEl}
        onClose={handleCloseMenu}
        className={"rc-popover_menu_header"}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Div className="rc-popover_menu_header-main">
          {MENU_DATA?.map((element, index) => {
            return (
              <Grid
                key={index}
                container
                alignItems="center"
                className="rc-popover_menu_header-main-item"
                onClick={()=>handleSetKeyActive(element?.keyActive)}
              >
                <Div className="rc-popover_menu_header-main-item-image">
                  <Img src={element?.icon} />
                </Div>
                <P>{element?.title}</P>
              </Grid>
            );
          })}
        </Div>
      </Popover>
    </Fragment>
  );
};

export default Header;

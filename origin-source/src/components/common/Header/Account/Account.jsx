import { Div, Img, P } from "@Common/TagAntdNotSupport/TagAntdNotSupport";
// import { Button, Divider, Popover, Typography } from "antd"
import { Button, Divider, Popover, Typography } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// const { Title } = Typography;
import { logoutAction } from "@Reduxs/Auth/action";
import { fetchAccountAction } from "@Reduxs/Profile/action";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./style.scss";


const Account = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const {
    loginReducer,
    profileReducer,
  } = useSelector((state) => ({
    loginReducer: state.loginReducer,
    profileReducer: state.profileReducer,
    refreshDataReducer: state.refreshDataReducer,
  }));
  const isAuthenticated = loginReducer
    ?.get("payload")
    ?.get("result")
    ?.get("token");
  const { path, navItemName, subMenu, ...rest } = props;

  const handleLogout = () => {
    dispatch(
      logoutAction(() => {
        history.push("/");
      })
    );
  };

  useEffect(() => {
    const token = loginReducer?.get("payload")?.get("result")?.get("token");
    const uid = loginReducer?.get("payload")?.get("result")?.get("id");
    if (token) {
      dispatch(fetchAccountAction(token, uid));
     
    }
  }, [loginReducer]);


  return !isAuthenticated ? null : (
    <Div className="rc-nav-account">
      <Div className="rc-nav-account-info" onClick={handleClick}>
        <Div className="rc-nav-account-info-icon">
          {profileReducer?.get("payload")?.result?.photo ? (
            <Img
              src={`/media/images/${
                profileReducer?.get("payload")?.result?.photo
              }`}
            />
          ) : null}
        </Div>
        <P>{profileReducer?.get("payload")?.result?.firstName}</P>
      </Div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Div className="rc-nav-account-popover">
          <Div className="rc-nav-account-popover-info">
            <Div className="rc-nav-account-popover-info-avatar">
              {profileReducer?.get("payload")?.result?.photo && (
                <Img
                  src={`/media/images/${
                    profileReducer?.get("payload")?.result?.photo
                  }`}
                />
              )}
            </Div>
            <Div className="rc-nav-account-popover-info-detail">
              <Typography variant={"h3"}>
                {profileReducer?.get("payload")?.result?.firstName
                  ? profileReducer?.get("payload")?.result?.firstName +
                    "  " +
                    profileReducer?.get("payload")?.result?.lastName
                  : "--- ---"}
              </Typography>
              <P>{profileReducer?.get("payload")?.result?.email}</P>
              <Link to="/profile">
                <Button variant="contained" color="primary">
                  Xem hồ sơ
                </Button>
              </Link>
            </Div>
          </Div>

         

          <Divider />
          <Div className="rc-nav-account-popover-item" onClick={handleLogout}>
            <Typography variant={"h5"}>Đăng xuất</Typography>
            <ExitToAppIcon color="disabled" />
          </Div>
        </Div>
      </Popover>
    </Div>
  );
};

export default Account;

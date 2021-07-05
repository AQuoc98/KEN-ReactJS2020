//Component Custom
//Image-Icon
import keyIcon from "@Assets/images/RegisterLogin/key-icon.svg";
import logo from "@Assets/images/RegisterLogin/logo.svg";
import {
  Div,
  Img,
  P
} from "@Components/common/TagAntdNotSupport/TagAntdNotSupport";
//Hocs
import helpers from "@Helpers/tools";
import withScrollToTop from "@Hocs/witchScrollToTop";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
//Component Material
import {
  Button,

  Grid,
  IconButton,

  InputAdornment,
  Paper,
  TextField
} from "@material-ui/core";
//Icon Material
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
//Lib
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
//Action
import { resetPasswordAction } from "./action";
//Style
import "./styles.scss";
const RECAPTCHA_TOKEN =
  process.env.REACT_APP_RECAPTCHA_TOKEN || process.env.RECAPTCHA_TOKEN;



const ResetPassword = (props) => {
  //Redux Connect
  const dispatch = useDispatch();
  const history = useHistory();
  const queryParam = helpers.getAllUrlParams(window.location.href);

  //Const
  //State Hooks
  const [showPassword, setShowPassword] = useState(false);
  //Function
  const handleSubmitForm = (values) => {

    if (window.grecaptcha && window.grecaptcha.ready) {
      window.grecaptcha.ready((_) => {
        window.grecaptcha
          .execute(`${RECAPTCHA_TOKEN}`, { action: "resetPassword" })
          .then((token) => {
            const callback = () => {
              history.push("/login");
            };
            dispatch(resetPasswordAction(token,{...values,token: queryParam?.token},callback));
          });
      });
    }
    
  };
  const handleClickToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  //Form
  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu"),
      confirmPassword: yup
      .string()
      .required("Vui lòng nhập  mật khẩu ")      
      .oneOf([yup.ref("password")], "Mật khẩu không trùng khớp !"),

  });

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    watch,
    clearErrors,
    errors,
  } = useForm({ resolver: yupResolver(schema) });
  //Effect Hooks
  return (
    <Div className="rc-reset-password">
      <Paper className="rc-reset-password-paper">
        <Grid container direction="column" justify="center" alignItems="center">
          <Img src={logo} alt="Logo"/>
         <P>Đổi Mật Khẩu</P>
        </Grid>

        <Grid container>
          <form style={{width:"100%"}} onSubmit={handleSubmit(handleSubmitForm)}>
            <Grid container direction={"column"} spacing={1}>
            <Grid item xs={12}>
                <TextField
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label="Mật khẩu"
                  inputProps={{}}
                  inputRef={register}
                  className="form-reset-password-text-field"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Img src={keyIcon} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickToggleShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <P className="rc-error_message">{message}</P>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  label="Nhập lại mật khẩu "
                  inputProps={{}}
                  inputRef={register}
                  className="form-reset-password-text-field"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Img src={keyIcon} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickToggleShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <ErrorMessage
                  errors={errors}
                  name="confirmPassword"
                  render={({ message }) => (
                    <P className="rc-error_message">{message}</P>
                  )}
                />
              </Grid>

             
              <Grid
                item
                container
                justify="space-between"
                alignItems="center"
                xs={12}
              >
                <Link style={{ color: "#606060", fontSize: "0.8rem" }} to="/login">
                  Đăng Nhập
                </Link>
                <Button variant="contained" color="primary" type="submit">
                  Xác Nhận
                </Button>
              </Grid>
             
              
            </Grid>
          </form>
        </Grid>
      </Paper>
    </Div>
  );
};

export default withScrollToTop(ResetPassword);

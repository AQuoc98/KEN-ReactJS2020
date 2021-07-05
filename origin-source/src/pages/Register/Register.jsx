//Component Custom
//Image-Icon
import idIcon from "@Assets/images/RegisterLogin/id-icon.svg";
import keyIcon from "@Assets/images/RegisterLogin/key-icon.svg";
import logo from "@Assets/images/RegisterLogin/logo.svg";
import {
  Div,
  Img,
  P
} from "@Components/common/TagAntdNotSupport/TagAntdNotSupport";
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
//Hocs
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PhoneIphoneOutlinedIcon from '@material-ui/icons/PhoneIphoneOutlined';
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
import { registerAction } from "@Reduxs/Auth/action";
//Style
import "./styles.scss";
const RECAPTCHA_TOKEN =
  process.env.REACT_APP_RECAPTCHA_TOKEN || process.env.RECAPTCHA_TOKEN;
const RegisterLogin = (props) => {
  //Redux Connect
  const dispatch = useDispatch();
  const history = useHistory();
  //Const
  //State Hooks
  const [showPassword, setShowPassword] = useState(false);
  //Function

  const handleSubmitForm = (values) => {

    if (window.grecaptcha && window.grecaptcha.ready) {
      window.grecaptcha.ready((_) => {
        window.grecaptcha
          .execute(`${RECAPTCHA_TOKEN}`, { action: "register" })
          .then((token) => {
            const callback = () => {
              history.push("/login");
            };
            dispatch(registerAction(token,values, callback));
          });
      });
    }


  };
  const handleClickToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  //Form
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Vui lòng nhập email")
      .email("Email không hợp lệ !"),
      firstName: yup
      .string()
      .required("Vui lòng nhập tên"),
      lastName: yup
      .string()
      .required("Vui lòng nhập họ"),
     password: yup.string().required("Vui lòng nhập mật khẩu"),
     phone: yup
     .string()
     .required("Vui lòng nhập số điện thoại")
     .matches(
       /((?:\+?)84[3|5|7|8|9]|0[3|5|7|8|9])+([0-9]{8})\b/g,
       "Số điện thoại không hợp lệ"
     ),
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
    <Div className="rc-register">
      <Paper className="rc-register-paper">
        <Grid container direction="column" justify="center" alignItems="center">
          <Img src={logo} alt="Logo"/>
         <P> Đăng ký tài khoản</P>
        </Grid>

        <Grid container>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Grid container direction={"column"} spacing={1}>


            <Grid container justify="space-between" item xs={12}>
            <Grid item xs={12} sm={5}>
                <TextField
                  name="firstName"
                  label="Nhập tên"
                  inputProps={{}}
                  inputRef={register}
                  className="form-register-text-field"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Img src={idIcon} />
                      </InputAdornment>
                    ),
                  }}
                />

                <ErrorMessage
                  errors={errors}
                  name="firstName"
                  render={({ message }) => (
                    <P className="rc-error_message">{message}</P>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  name="lastName"
                  label="Nhập họ"
                  inputProps={{}}
                  inputRef={register}
                  className="form-register-text-field"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Img src={idIcon} />
                      </InputAdornment>
                    ),
                  }}
                />

                <ErrorMessage
                  errors={errors}
                  name="lastName"
                  render={({ message }) => (
                    <P className="rc-error_message">{message}</P>
                  )}
                />
              </Grid>

              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  inputProps={{}}
                  inputRef={register}
                  className="form-register-text-field"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <P className="rc-error_message">{message}</P>
                  )}
                />
              </Grid>

              
              <Grid item xs={12}>
                <TextField
                  name="phone"
                  label="Số điện thoại"
                  inputProps={{}}
                  inputRef={register}
                  className="form-register-text-field"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIphoneOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <ErrorMessage
                  errors={errors}
                  name="phone"
                  render={({ message }) => (
                    <P className="rc-error_message">{message}</P>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label="Mật khẩu"
                  inputProps={{}}
                  inputRef={register}
                  className="form-register-text-field"
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
                  Đăng Ký
                </Button>
              </Grid>
             
              
            </Grid>
          </form>
        </Grid>
      </Paper>
    </Div>
  );
};

export default withScrollToTop(RegisterLogin);

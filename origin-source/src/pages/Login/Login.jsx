//Component Custom

//Image-Icon
import keyIcon from "@Assets/images/RegisterLogin/key-icon.svg";
import logo from "@Assets/images/RegisterLogin/logo.svg";
import {
  Div,
  Img,
  P,
} from "@Components/common/TagAntdNotSupport/TagAntdNotSupport";
//Hocs
import withScrollToTop from "@Hocs/witchScrollToTop";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
//Component Material
import {
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@material-ui/core";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
//Icon Material
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
//Lib
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
//Action
import { loginAction } from "@Reduxs/Auth/action";
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
          .execute(`${RECAPTCHA_TOKEN}`, { action: "auth" })
          .then((token) => {
            const callback = () => {
              history.push("/");
            };
            dispatch(loginAction(token,values, callback));
          }).catch(err=>{
            console.log(err)

          })
      });
    }
  };
  const handleClickToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  //Form
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Vui lòng nhập email")
      .email("Email không hợp lệ !"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
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
    <Div className="rc-login">
      <Paper className="rc-login-paper">
        <Grid container direction="column" justify="center" alignItems="center">
          <Img src={logo} alt="Logo" />
          <P> NineQuiz</P>
        </Grid>

        <Grid container>
          <form
            style={{ width: "100%" }}
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <Grid container direction={"column"} spacing={1}>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  label="Email"
                  inputProps={{}}
                  inputRef={register}
                  className="form-login-register-text-field"
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
                  name="username"
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
                  className="form-login-register-text-field"
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
                <Link
                  style={{ color: "#606060", fontSize: "0.8rem" }}
                  to="/forgot-password"
                >
                  Quên mật khẩu
                </Link>
                <Button variant="contained" color="primary" type="submit">
                  Đăng Nhập
                </Button>
              </Grid>
              <Divider style={{ margin: "2rem 0" }} />
              <Grid
                item
                container
                justify="space-between"
                alignItems="center"
                xs={12}
              >
                <Link
                  style={{ color: "#606060", fontSize: "0.8rem" }}
                  to="/register"
                >
                  Đăng ký nếu chưa có tài khoản
                </Link>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Paper>
    </Div>
  );
};

export default withScrollToTop(RegisterLogin);

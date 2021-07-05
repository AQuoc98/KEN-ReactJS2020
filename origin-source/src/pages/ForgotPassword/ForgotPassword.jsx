//Component Custom
//Image-Icon
import logo from "@Assets/images/RegisterLogin/logo.svg";
import {
  Div,
  Img,
  P
} from "@Components/common/TagAntdNotSupport/TagAntdNotSupport";
//Hocs
import withScrollToTop from "@Hocs/witchScrollToTop";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
//Component Material
import {
  Button,

  Grid,

  InputAdornment,
  Paper,
  TextField
} from "@material-ui/core";
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
//Lib
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
//Action
import { forgotPasswordAction } from "./action";
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
          .execute(`${RECAPTCHA_TOKEN}`, { action: "forgotPassword" })
          .then((token) => {

            console.log(token)
            dispatch(forgotPasswordAction(token,values));

          });
      });
    }
  };

  //Form
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Vui lòng nhập email")
      .email("Email không hợp lệ !"),
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
    <Div className="rc-forgot-password">
      <Paper className="rc-forgot-password-paper">
        <Grid container direction="column" justify="center" alignItems="center">
          <Img src={logo} alt="Logo"/>
         <P>Quên Mật Khẩu</P>
        </Grid>

        <Grid container>
          <form style={{width:"100%"}} onSubmit={handleSubmit(handleSubmitForm)}>
            <Grid container direction={"column"} spacing={1}>
            <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  inputProps={{}}
                  inputRef={register}
                  className="form-forgot-password-text-field"
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

export default withScrollToTop(RegisterLogin);

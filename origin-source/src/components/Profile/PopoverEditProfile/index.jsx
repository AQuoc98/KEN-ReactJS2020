import React, { useState, useRef, useEffect } from "react";
// import ProvinceUI from "../ProvinceUI";
import {
  Popover,
  Typography,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import { useForm ,Controller} from "react-hook-form";
import MomentAdapter from "@material-ui/pickers/adapter/moment";
import moment from "moment";
import {
  DatePicker,
  MobileDatePicker,
  LocalizationProvider,
} from "@material-ui/pickers";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ProvinceUI from "@Components/common/AddressPickerMaterial"
import useStyles from "./style";
// import clsx from 'clsx';
//Ico
import changPasswordIco from "@Assets/images/Profile/change-password-ico.svg";
import officeBuildingIco from "@Assets/images/Profile/office-building-ico.svg";
import placeLocalizerIco from "@Assets/images/Profile/place-localizer-ico.svg";
import smartPhoneIco from "@Assets/images/Profile/smartphone-ico.svg";
import taxIco from "@Assets/images/Profile/tax-ico.svg";
import userIco from "@Assets/images/Profile/user-ico.svg";
import { ErrorMessage } from "@hookform/error-message";
import { conformsTo } from "lodash";

const PopoverEditProfile = (props) => {
  const {dataInfoGrid, type, anchorEl, onClosePopover, dataDefault, onSubmit } = props;
  let schema = null

  switch (type) {
    case "CHANGE_ADDRESS":
      schema = yup.object().shape({
        address: yup.string().required("Vui lòng nhập địa chỉ"),
      });
      break;
    case "CHANGE_PHONE":
      schema = yup.object().shape({
      phone: yup
          .string()
          .required("Vui lòng nhập số điện thoại")
          .matches(
            /((09|03|07|08|05)+([0-9]{8})\b)/g,
            "Số điện thoại không hợp lệ"
          ),
      });
      break;
    case "CHANGE_BIRTHDAY":
      break;
    case "CHANGE_FULL_NAME":
      schema = yup.object().shape({
        firstName: yup.string().required("Vui lòng nhập tên !"),
        lastName: yup.string().required("Vui lòng nhập họ !"),
      });
      break;
    case "CHANGE_CORPORATION_INFO":
      schema = yup.object().shape({
        tax: yup.string().required("Vui lòng nhập mã số thế  "),
        name: yup.string().required("Vui lòng nhập tên công ty "),
        address: yup.string().required("Vui lòng nhập địa chỉ"),
      });
      break;
    case "CHANGE_PASSWORD":
      schema = yup.object().shape({
        oldPassword: yup.string().required("Vui lòng nhập mật khẩu"),
        password: yup.string().required("Vui lòng nhập mật khẩu mới").min(6,"Mật khẩu từ 6-12 kí tự").max(12,"Mật khẩu từ 6-12 kí tự"),
        confirmPassword: yup.string().required("Vui lòng nhập mật khẩu").oneOf([yup.ref("password")], "Mật khẩu không khớp")
        ,
      });
      break;
    default:
      break;
  }

  const { register, handleSubmit, watch,clearErrors , errors } = useForm(schema?{
    resolver: yupResolver(schema),
  }:{});

  const dataRef = useRef({});

  const dateOfBirthDefault = dataDefault?.dateOfBirthDefault ?dataDefault?.dateOfBirthDefault: moment();
  const [dateOfBirth, setDateOfBirth] = useState(dateOfBirthDefault);

  const classes = useStyles();
  var contentEdit = null;
  var title = "";
  const handleClose = () => {
    onClosePopover();
  };
  const handleSubmitForm = () => {
    const updateData = dataRef.current;
    onSubmit(updateData);
    handleClose();
  };
  const handleChangeTextField = async (event) => {
    dataRef.current[event.target.name] = event.target.value;
   
  };
  const handleChangeDate = (date) => {
    setDateOfBirth(date);
    dataRef.current["dateOfBirth"] = date.toString()
  };
  const handleChangeAddress = (type, data) => {
    dataRef.current["address"][type] = data;
  };

  const handleChangeAddressTextField = (event) => {
    dataRef.current["address"]["address"] = event.target.value;
  };
  switch (type) {
    case "CHANGE_PASSWORD":
      title = "Đổi mật khẩu";
      contentEdit = (
        <div className={classes.content}>
          <Grid
            container
            spacing={1}
            alignItems="center"
            className={classes.contentItem}
          >
            <Grid item>
              <img src={changPasswordIco} alt="ico" />
            </Grid>
            <Grid item className={classes.inputField}>
              <TextField
                className={classes.textField}
                type="password"
                name="oldPassword"
                label="Mật khẩu cũ"
                onChange={(event) => handleChangeTextField(event)}
                inputRef={register}
              />

              <ErrorMessage
                errors={errors}
                name="oldPassword"
                render={({ message }) => (
                  <p className={classes.errorMessages}>{message}</p>
                )}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            alignItems="center"
            className={classes.contentItem}
          >
            <Grid item>
              <img src={changPasswordIco} alt="ico" />
            </Grid>
            <Grid item className={classes.inputField}>
              <TextField
                className={classes.textField}
                type="password"
                name="password"
                label="Mật khẩu mới"
                onChange={(event) => handleChangeTextField(event)}
                inputRef={register}
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => (
                  <p className={classes.errorMessages}>{message}</p>
                )}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            alignItems="center"
            className={classes.contentItem}
          >
            <Grid item>
              <img src={changPasswordIco} alt="ico" />
            </Grid>
            <Grid item className={classes.inputField}>
              <TextField
                className={classes.textField}
                type="password"
                name="confirmPassword"
                label="Nhập lại mật khẩu mới"
                onChange={(event) => handleChangeTextField(event)}
                inputRef={register}              />
              <ErrorMessage
                errors={errors}
                name="confirmPassword"
                render={({ message }) => (
                  <p className={classes.errorMessages}>{message}</p>
                )}
              />
            </Grid>
          </Grid>
        </div>
      );
      break;
  
    case "CHANGE_BIRTHDAY":
      // clearErrors ()
      title = "Sinh nhật";
      contentEdit = (
        <div className={classes.content}>
          <LocalizationProvider dateAdapter={MomentAdapter}>
            <MobileDatePicker
              // open={true}
              // variant="inline"
              maxDate={new Date()}
            //   inputFormat="dd/MM/yyyy"
              format="MM/dd/yyyy"

              id="date-picker-inline"
              value={dateOfBirth}
              onChange={(date) => handleChangeDate(date)}
              renderInput={(props) => <TextField {...props} />}
            />
          </LocalizationProvider>
        </div>
      );
      break;
    case "CHANGE_FULL_NAME":
      title = "Họ và tên";
      contentEdit = (
        <div className={classes.content}>
          <Grid
            container
            spacing={1}
            alignItems="center"
            className={classes.contentItem}
          >
            <Grid item>
              <img src={userIco} alt="ico" />
            </Grid>
            <Grid item className={classes.inputField}>
              <TextField
                name="firstName"
                className={classes.textField}
                label="Tên"
                defaultValue={dataDefault?.firstNameDefault}
                onChange={(event) => handleChangeTextField(event)}
                inputRef={register}
              />
              <ErrorMessage
                errors={errors}
                name="firstName"
                render={({ message }) => (
                  <p className={classes.errorMessages}>{message}</p>
                )}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            alignItems="center"
            className={classes.contentItem}
          >
            <Grid item>
              <img src={userIco} alt="ico" />
            </Grid>
            <Grid item className={classes.inputField}>
              <TextField
                name="lastName"
                className={classes.textField}
                label="Họ"
                defaultValue={dataDefault?.lastNameDefault}
                onChange={(event) => handleChangeTextField(event)}
                inputRef={register}
              />
              <ErrorMessage
                errors={errors}
                name="lastName"
                render={({ message }) => (
                  <p className={classes.errorMessages}>{message}</p>
                )}
              />
            </Grid>
          </Grid>
        </div>
      );
      break;

    case "CHANGE_ADDRESS":
      title = "Địa chỉ";
      contentEdit = (
        <div className={classes.content}>
          <Grid
            container
            spacing={1}
            alignItems="center"
            className={classes.contentItem}
          >
            <Grid item>
              <img src={placeLocalizerIco} alt="ico" />
            </Grid>
            <Grid item className={classes.inputField}>
              <TextField
                name="address"
                className={classes.textField}
                label="Địa chỉ"
                defaultValue={dataDefault?.addressDefault}
                onChange={(event) => handleChangeAddressTextField(event)}
                inputRef={register}
              />
               <ErrorMessage
                errors={errors}
                name="address"
                render={({ message }) => (
                  <p className={classes.errorMessages}>{message}</p>
                )}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            alignItems="center"
            className={classes.contentItem}
          >
            <ProvinceUI
              onChangeAddress={handleChangeAddress}
              provinceDefault={
                dataDefault?.provinceIDDefault
                  ? dataDefault?.provinceIDDefault
                  : "79"
              }
              districtDefault={
                dataDefault?.districtIDDefault
                  ? dataDefault?.districtIDDefault
                  : "785"
              }
            />
          </Grid>
        </div>
      );
      break;

    case "CHANGE_PHONE": {
      title = "Số điện thoại";
      contentEdit = (
        <div className={classes.content}>
          <Grid
            container
            spacing={1}
            alignItems="center"
            className={classes.contentItem}
          >
            <Grid item>
              <img src={smartPhoneIco} alt="ico" />
            </Grid>
            <Grid item className={classes.inputField}>
              <TextField
                name="phone"
                className={classes.textField}
                label="Số điện thoại"
                inputProps={{
                  maxLength: 11,
                }}
                defaultValue={dataDefault?.phoneDefault}
                onChange={(event) => {
                  handleChangeTextField(event);
                }}
                inputRef={register}
              />
              <ErrorMessage
                errors={errors}
                name="phone"
                render={({ message }) => (
                  <p className={classes.errorMessages}>{message}</p>
                )}
              />
            </Grid>
          </Grid>
        </div>
      );
      break;
    }
    default:
      break;
  }
  useEffect(() => {
    switch (type) {

      case "CHANGE_ADDRESS":
        dataRef.current["address"] = {
          address: dataDefault?.addressDefault,
          district: dataDefault?.districtIDDefault
            ? dataDefault?.districtIDDefault
            : "785",
          province: dataDefault?.provinceIDDefault
            ? dataDefault?.provinceIDDefault
            : "79",
        };
        break;
        case "CHANGE_BIRTHDAY":
          dataRef.current["dateOfBirth"] =moment().toString()
          break
      default:
        break;
    }
  }, []);
  return (
    <Popover
      open={true}
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
      <form onSubmit={handleSubmit(handleSubmitForm)} className={classes.form}>
        <Grid container className={classes.root}>
          <Typography className={classes.titlePopover}>{title}</Typography>

          <Grid item xs={12} className={classes.groupContent}>
            {contentEdit}
          </Grid>
          <Grid item xs={12} className={classes.groupButtonControl}>
            <Button className={classes.buttonCancel} onClick={handleClose}>
              Hủy
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Lưu
            </Button>
          </Grid>
        </Grid>
      </form>
    </Popover>
  );
};

export default PopoverEditProfile;

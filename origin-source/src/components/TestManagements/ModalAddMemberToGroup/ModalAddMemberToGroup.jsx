import ModalWrapper from "@Components/common/ModalWrapper/ModalWrapper";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Grid,
  Grow,
  InputAdornment,


  TextField
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EmailOutlined from "@material-ui/icons/EmailOutlined";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import "./styles.scss";
import {addMemberToGroupAction} from "@Reduxs/QuestionLibrary/action"
const { List, fromJS } = require("immutable");

const ModalAddMemberToGroup = (props) => {
  const { onClose,selectedGroup } = props;

  const dispatch = useDispatch();

  const [dataSubmit, setDataSubmit] = useState(
    List([
      {
        email: "",
      },
    ])
  );
  const schema = yup.object().shape({
    // email:yup
    // .string()
    // .required("Vui lòng nhập email")
    // .email("Email không hợp lệ !"),
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  //

  const handleSubmitForm = (values) => {
    const callback = () => {
      onClose();
    };
    const dataSubmitArray = dataSubmit
      ?.toIndexedSeq()
      ?.toArray()
      .filter((element) => {
        return element?.email !== "";
      });

    dispatch(addMemberToGroupAction(dataSubmitArray,selectedGroup?.id, callback));
  };
  const handleChangeEmail = (event, indexArg) => {
    const inputText = event?.target?.value;
    const newDataSubmit = List(dataSubmit);
    const newMapDataSubmit = newDataSubmit?.map((element, index) => {
      return index === indexArg ? { ...element, email: inputText } : element;
    });
    const isEmptyEmail = newMapDataSubmit?.find((element) => {
      return element?.email === "";
    });

    if (!isEmptyEmail) {
      const newPushDataSubmit = newMapDataSubmit?.push({
        email: "",
      });
      setDataSubmit(newPushDataSubmit);
    } else if (inputText === "") {
      const newRemoveDataSubmit = newMapDataSubmit?.filter((element, index) => {
        return !(element?.email === "" && indexArg !== index);
      });
      setDataSubmit(newRemoveDataSubmit);
    } else {
      setDataSubmit(newMapDataSubmit);
    }
  };

  return (
    <ModalWrapper
      triggerModalWrapper={onClose}
      className="rc-modal-paper-add-student"
      title={"Thêm thành viên"}

    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Grid
          container
          direction="column"
          alignItems="center"
          className="rc-modal-add-student-main-form"
        >
          {dataSubmit?.map((element, index) => {
            return (
              <Grow in={true} timeout={500} key={index}>
                <Grid
                  item
                  container
                  xs={12}
                  direction="column"
                  className="rc-modal-add-student-main-form-item"
                >
                  <Grid
                    item
                    container
                    justify="space-between"
                    alignItems="center"
                    xs={12}
                  >
                    <TextField
                      className="rc-modal-add-student-main-form-item-text_field"
                      name="email"
                      value={element?.email}
                      label="Nhập email"
                      onChange={(e) => handleChangeEmail(e, index)}
                      inputRef={register}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailOutlined color="disabled" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => (
                      <p className={"error-message"}>{message}</p>
                    )}
                  />
                </Grid>
              </Grow>
            );
          })}
          <Grid
            item
            container
            justify="flex-end"
            xs={12}
            className="rc-modal-add-student-main-form-item"
            style={{ marginTop: "3rem" }}
          >
            <Button
              style={{ marginRight: "1rem" }}
              onClick={onClose}
            >
              Đóng
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!(dataSubmit?.size - 1)}
              endIcon={<AddIcon />}
            >
              Thêm {dataSubmit?.size - 1} học viên
            </Button>
          </Grid>
        </Grid>
      </form>
    </ModalWrapper>
  );
};

export default ModalAddMemberToGroup;

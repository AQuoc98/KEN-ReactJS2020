import ModalWrapper from "@Components/common/ModalWrapper/ModalWrapper";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, InputAdornment, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { addQuestionGroupAction } from "@Reduxs/QuestionLibrary/action";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import "./styles.scss";
import {P} from "@Components/common/TagAntdNotSupport/TagAntdNotSupport"
const { List, fromJS } = require("immutable");

const ModalAddQuestionGroup = (props) => {
  const { triggerOpenModalAddQuestionGroup} = props;
  const dispatch = useDispatch();

  const handleSubmitForm = (values) => {
    const callback = () => {
      triggerOpenModalAddQuestionGroup();
    };

    dispatch(addQuestionGroupAction(values, callback));
  };
  const schema = yup.object().shape({
    title: yup.string().required("Vui lòng nhập  tên nhóm !"),
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  


  return (
    <ModalWrapper
      triggerModalWrapper={triggerOpenModalAddQuestionGroup}
      className="rc-modal-paper-add-question-group"
      title={"Thêm nhóm"}
    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
      
      <Grid container>
        <Grid
          item
          container
          xs={12}
          className="rc-modal-add-question-group-main-form-item"
        >
            <TextField
              className="rc-modal-add-question-group-main-form-item-text_field"
              name="title"
              label="Tên nhóm"
              inputRef={register}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GroupAddIcon color="disabled" />
                  </InputAdornment>
                ),
              }}
            />
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ message }) => (
              <P className={"rc-error-message"}>{message}</P>
            )}
          />
        </Grid>
        <Grid
          item
          container
          justify="flex-end"
          xs={12}
          className="rc-modal-add-question-group-main-form-item"
          style={{ marginTop: "3rem" }}
        >
          <Button
            onClick={triggerOpenModalAddQuestionGroup}
            style={{ marginRight: "1rem" }}
          >
            Đóng
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<AddIcon />}
          >
            Thêm
          </Button>
        </Grid>
      </Grid>
      </form>

    </ModalWrapper>
  );
};

export default ModalAddQuestionGroup;

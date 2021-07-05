import ModalWrapper from "@Components/common/ModalWrapper/ModalWrapper";
import {
  P,
  Span
} from "@Components/common/TagAntdNotSupport/TagAntdNotSupport";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, InputAdornment, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CategoryIcon from "@material-ui/icons/Category";
import { addQuestionCategoryAction } from "@Reduxs/QuestionLibrary/action";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import "./styles.scss";

const { List, fromJS } = require("immutable");

const ModalAddQuestionCategory = (props) => {
  const { nodeDetail, triggerOpenModalAddQuestionCategory } = props;
  const schema = yup.object().shape({
    title: yup.string().required("Vui lòng nhập  tên danh mục !"),
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const handleSubmitForm = (values) => {
    const callback = () => {
      triggerOpenModalAddQuestionCategory();
    };

    dispatch(
      addQuestionCategoryAction({ ...values, parent: nodeDetail?.id }, callback)
    );
  };
  return (
    <ModalWrapper
      triggerModalWrapper={triggerOpenModalAddQuestionCategory}
      className="rc-modal-paper-add-category"
      title={"Thêm danh mục"}
    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        {nodeDetail && (
          <Grid
            item
            container
            xs={12}
            className="rc-modal-add-group-main-form-item"
          >
            <Span>Danh mục gốc : {nodeDetail?.title}</Span>
          </Grid>
        )}
        <Grid
          item
          container
          xs={12}
          className="rc-modal-add-group-main-form-item"
        >
          <TextField
            name="title"
            style={{width:"100%"}}
            label="Tên danh mục"
            inputRef={register}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CategoryIcon color="disabled" />
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
          justify="space-between"
          xs={12}
          className="rc-modal-add-category-main-form-item"
          style={{ marginTop: "3rem" }}
        >
          <Button
            onClick={triggerOpenModalAddQuestionCategory}
            style={{ marginRight: "1rem" }}
            variant="contained"
            color="default"
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
      </form>
    </ModalWrapper>
  );
};

export default ModalAddQuestionCategory;

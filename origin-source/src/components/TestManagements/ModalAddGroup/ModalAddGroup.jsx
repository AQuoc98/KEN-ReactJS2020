import { Div, Img, P } from "@Common/TagAntdNotSupport/TagAntdNotSupport";
import ModalWrapper from "@Components/common/ModalWrapper/ModalWrapper";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, InputAdornment, TextField } from "@material-ui/core";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { postImageAction } from "@Reduxs/Media/action";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ImageUploading from "react-images-uploading";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import "./styles.scss";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
const { List, fromJS } = require("immutable");

const ModalAddGroup = (props) => {
  const { triggerOpenModalAddGroup, roles } = props;
  const [avatars, setAvatars] = useState([]);
  const [financeAccountImage, setFinanceAccountImage] = useState(null);

  const dispatch = useDispatch();

  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập  tên nhóm !"),
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  //
  const onChangeAvatar = async (imageList, addUpdateIndex) => {
    setAvatars(imageList);
    let dataForm = new FormData();
    dataForm.append("photo", imageList[0]?.file);
    const uploadResult = await dispatch(postImageAction(dataForm));
    const imageID = uploadResult?.result?.id;
    setFinanceAccountImage(imageID);
  };

  return (
    <ModalWrapper
      triggerModalWrapper={triggerOpenModalAddGroup}
      className="rc-modal-paper-add-group"
      title={"Thêm nhóm"}
    >
      <Grid container>
        <ImageUploading
          value={avatars}
          onChange={onChangeAvatar}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageUpdate,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <Div className="rc-add-group-avatar">
              {imageList.length === 0 && !financeAccountImage ? (
                <Div
                  className="rc-avatar-add-item"
                  style={isDragging ? { color: "red" } : null}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <AddIcon style={{ color: "gray", fontSize: "20px" }} />
                  <P className="rc-avatar-text">Thêm Hình Ảnh</P>
                </Div>
              ) : financeAccountImage ? (
                <Div className="rc-avatar-main-item">
                  <Img
                    src={
                      imageList[0]?.data_url ||
                      `/media/images/${financeAccountImage}`
                    }
                    height="100%"
                    width="100%"
                  />
                  <Div className="rc-avatar-control-edit">
                    <EditIcon
                      style={{ color: "white", fontSize: "20px" }}
                      onClick={() => onImageUpdate(0)}
                    />
                  </Div>
                </Div>
              ) : (
                imageList?.map((image, index) => (
                  <Div key={index} className="rc-avatar-main-item">
                    <Img src={image?.data_url} alt="" width="100%" />
                    <Div className="rc-avatar-control-edit">
                      <EditIcon
                        style={{ color: "white", fontSize: "20px" }}
                        onClick={() => onImageUpdate(index)}
                      />
                    </Div>
                  </Div>
                ))
              )}
            </Div>
          )}
        </ImageUploading>
        <Grid
          item
          container
          xs={12}
          className="rc-modal-add-group-main-form-item"
        >
          <Grid
            item
            container
            justify="space-between"
            alignItems="center"
            xs={12}
          >
            <TextField
              className="rc-modal-add-group-main-form-item-text_field"
              name="name"
              label="Tên nhóm"
              inputRef={register}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PeopleOutlineIcon color="disabled" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <ErrorMessage
            errors={errors}
            name="title"
            render={({ message }) => (
              <p className={"error-message"}>{message}</p>
            )}
          />
        </Grid>
        <Grid
          item
          container
          xs={12}
          className="rc-modal-add-group-main-form-item"
        >
          <TextField
            className="rc-modal-add-group-main-form-item-text_field"
            name="description"
            label="Mô tả ngắn gọn"
            multiline
            rows={4}
            placeholder="Mô tả ngắn gọn"
            variant="outlined"

          />
        </Grid>
        <Grid
          item
          container
          justify="flex-end"
          xs={12}
          className="rc-modal-add-group-main-form-item"
          style={{ marginTop: "3rem" }}
        >
          <Button
            onClick={triggerOpenModalAddGroup}
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
    </ModalWrapper>
  );
};

export default ModalAddGroup;

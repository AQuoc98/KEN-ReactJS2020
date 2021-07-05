
import React, { useEffect,useState } from "react";
import ImageUploading from "react-images-uploading";
import                Spinner from "@Common/Spinner/Spinner";

//Component
import { Div, Img, Span, P } from "@Common/TagAntdNotSupport/TagAntdNotSupport";
import FormContentInFo from "@Components/Profile/FormContentInFo";
// import {EditOutlined,PlusCircleOutlined  } from "@ant-design/icons"
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeProfileAction,postImageAction } from "./action";
//Styled Component
import "./styles.scss";
//Const
import { profileConfigRender } from "./const";
import moment from "moment";
// antd
// import { Grid, Grid, Tabs, Typography } from "antd";
// Img
//Hocs
import withScrollToTop from "@Hocs/witchScrollToTop"
import { Typography,Tabs,Tab, Grid} from "@material-ui/core";
// const { TabPane } = Tabs;
// const { Title } = Typography;

const Profile = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [avatars, setAvatars] = useState([]);
  const [avatarID, setAvatarID] = useState(null);

  const { accountReducer,loginReducer } = useSelector((state) => ({
    accountReducer: state.accountReducer,
    loginReducer: state.loginReducer,

  }));

  const uid = loginReducer?.get("payload")?.get("result")?.get("id");

  const dataProfile = accountReducer?.get("payload")?.result
  const dataInfoGrid = {
    email: {
      value: dataProfile?.email||"-------------",
    },
    password: {
      date:
        dataProfile?.passwordInfo?.updateAt ?
        moment(
          dataProfile?.passwordInfo?.updateAt
        ).format("hh:mm - DD/MM/YYYY"):"---",
      value: "****************",
    },
    fullName: {
      value:dataProfile?.firstName? (dataProfile?.firstName +"  " +dataProfile?.lastName):"------  -------",
      firstNameDefault:dataProfile?.firstName||"",
      lastNameDefault:dataProfile?.lastName||""
    },
    dateOfBirth: {
      value: dataProfile?.dateOfBirth?moment(dataProfile?.dateOfBirth).format("DD / MM / YYYY"):"-- / -- / ----",
      dateOfBirthDefault: dataProfile?.dateOfBirth?moment(dataProfile?.dateOfBirth):moment(),
    },
    phone: {
      value: dataProfile?.phone||"-------------",
      phoneDefault:dataProfile?.phone||""
    },
    address: {
      value:dataProfile?.address?.address?
        (dataProfile?.address?.address +
        ", " +
        dataProfile?.address?.districtDetail?.name +
        ", " +
        dataProfile?.address?.provinceDetail?.name):"--- , --- , ---",
      addressDefault:dataProfile?.address?.address||"",
      districtIDDefault:dataProfile?.address?.districtDetail?.id,
      provinceIDDefault:dataProfile?.address?.provinceDetail?.id

    },
  };


  const onSubmitProfile = (values) => {
    dispatch(changeProfileAction(values,uid));
  }
  const onChangeAvatar = async (imageList, addUpdateIndex) => {
    setAvatars(imageList);
    let dataForm = new FormData();
    dataForm.append("photo", imageList[0]?.file);
    const uploadResult = await dispatch(postImageAction(dataForm));
    console.log(uploadResult)
    const imageID=uploadResult?.result?.id;
     if(imageID){
      onSubmitProfile({photo:imageID})

     }
  };
  useEffect(() => {
    setAvatarID(dataProfile?.photo)
  }, [accountReducer])
  return (
    <>
    <Div className="rc-profile">
      <Div className="rc-profile-content">
        <Div className="profile-head">
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
                  <Div className="rc-profile-avatar">
                  {imageList.length === 0 && !avatarID ? (
                      <Div
                        className="rc-avatar-add-item"
                        style={isDragging ? { color: "red" } : null}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        <AddIcon style={{color:"gray",fontSize:"20px"}}  />
                        <P className="rc-avatar-text">Thêm avatar</P>
                      </Div>
                    ) : avatarID ? (
                      <Div className="rc-avatar-main-item">
                        <Img
                          src={
                            imageList[0]?.data_url ||
                            `/media/images/${avatarID}`
                          }
                          height="100%"
                          width="100%"
                        />
                        <Div className="rc-avatar-control-edit">
                          <EditIcon style={{color:"white",fontSize:"20px"}} onClick={() => onImageUpdate(0)}/>
                        </Div>
                      </Div>
                    ) : (
                      imageList?.map((image, index) => (
                        <Div key={index} className="rc-avatar-main-item">
                          <Img src={image?.data_url} alt="" width="100%" />
                          <Div className="rc-avatar-control-edit" >
                            <EditIcon  style={{color:"white",fontSize:"20px"}} onClick={() => onImageUpdate(index)} />
                          </Div>
                        </Div>
                      ))
                    )}
                  </Div>
                )}
          </ImageUploading>
          <Div className="profile-name">
            <Typography variant={"h3"} className="user-name">
              {dataProfile?.firstName?(dataProfile?.firstName +
                "  " +
                dataProfile?.lastName):"------- -------"}
            </Typography>
            <Typography variant={"h5"} className="user-id">
              ID : {dataProfile?.id}
            </Typography>
          </Div>
        </Div>
        <Div className="profile-content">

        <Tabs
          value={0}
          // onChange={handleTabActive}
          aria-label="disabled tabs example"
        >
          <Tab className="tab-label" label="Profile" />
        </Tabs>
      
              {profileConfigRender.map((element, index) => {
                return (
                  <Div
                    key={index}
                    className="info-account"
                    id={element.className}
                  >
                    <Grid container>
                      <Grid item xs={12} md={3}>
                        <Div className="name-profile">{element.title}</Div>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Div className="father-profile">
                          {element?.rowConfig?.map(
                            (rowConfigItem, indexItem) => {
                              return (
                                <Div className="right-profile" key={indexItem}>
                                  <Grid container>
                                    <Grid item xs={3} sm={3}>
                                      <Div className="title">
                                        <Span className="title-content">
                                          {rowConfigItem.name}
                                        </Span>
                                      </Div>
                                    </Grid>
                                    <Grid item xs={7} sm={7}>
                                      <FormContentInFo
                                        dataInfoGrid={dataInfoGrid}
                                        onSubmitProfile={onSubmitProfile}
                                        rowConfigItem={rowConfigItem}
                                      />
                                    </Grid>
                                  </Grid>
                                </Div>
                              );
                            }
                          )}
                        </Div>
                      </Grid>
                    </Grid>
                  </Div>
                );
              })}
        </Div>
      </Div>
    </Div>
    {accountReducer?.get("isLoading") && <Spinner />}

    </>
  );
};

export default withScrollToTop(Profile);

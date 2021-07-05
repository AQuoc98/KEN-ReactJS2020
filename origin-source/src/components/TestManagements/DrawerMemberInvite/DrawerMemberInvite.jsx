import {
  Div,
  Img,
  P,
  Span,
  A,
} from "@Components/common/TagAntdNotSupport/TagAntdNotSupport";
import {
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Grow,
  Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import { fetchMemberInGroupAction } from "@Reduxs/QuestionLibrary/action";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@Components/common/Pagination/Paginantion";
import helper from "@Helpers/tools";
import AddIcon from "@material-ui/icons/Add";
import ActionTypeRefreshData from "@Reduxs/RefreshData/action-type";

import ModalAddMemberToGroup from "@Components/TestManagements/ModalAddMemberToGroup/ModalAddMemberToGroup"
const _ = require("lodash");

const { List } = require("immutable");

const DrawerQuestionLibrary = (props, ref) => {
  const { onClose, selectedGroup } = props;
  const dispatch = useDispatch();
  const [titleSearchData, setTitleSearchData] = useState("");
  const [openModalAddMemberToGroup, setOpenModalAddMemberToGroup] = useState(false);
  const [members, setMembers] = useState([]);
  const queryParam = helper.getAllUrlParams(window.location.href);
  const limit = queryParam.limit ? parseInt(queryParam.limit) : 10;
  const [page, setPage] = useState(
    queryParam.page ? parseInt(queryParam.page) : 1
  );
  const { refreshDataReducer } = useSelector(
    (state) => ({
      refreshDataReducer: state.refreshDataReducer,
    })
  );

  const handleOpenModalAddMemberToGroup=()=>{
    setOpenModalAddMemberToGroup(!openModalAddMemberToGroup)
  }
  const handleCloseModalAddMemberToGroup=()=>{
    setOpenModalAddMemberToGroup(!openModalAddMemberToGroup)
  }
  const onChangePage = (event, page) => {
    setPage(page);
  };
  const handleDebounceSearch = _.debounce((title) => {
    // dispatch(
    //   fetchMemberInGroupAction({ limit: 10, page: 1, title }, selectedGroup?.id)
    // ).then((result) => {
    //   setMembers(result);
    // });
  }, 800);

  const handleSearch = (e) => {
    const title = e?.target?.value?.trim();
    setTitleSearchData(title);
    setPage(1);
    handleDebounceSearch(title);
  };
  useEffect(() => {

    console.log(selectedGroup)
    if (selectedGroup) {
      dispatch(
        fetchMemberInGroupAction(
          { limit, page, title: titleSearchData },
          selectedGroup?.id
        )
      ).then(
        (result) => {
          setMembers(result);
        }
      );
    }
  }, [selectedGroup,page]);


  
  
  useEffect(() => {
    if (
      [ActionTypeRefreshData?.ADD_MEMBER_TO_GROUP_REFRESH].includes(
        refreshDataReducer.get("type")
      )
    ) {
      dispatch(fetchMemberInGroupAction({ limit, page, title: titleSearchData }, selectedGroup?.id)).then(
        (result) => {
          setMembers(result);
        }
      );
    }
  }, [refreshDataReducer]);
  return (
    <>
      <Paper elevation={3} className="rc-paper-drawer-member-invite">
        <Grid container justify="flex-end" style={{ padding: "0.5rem 1rem" }}>
          <IconButton color="default" component="span" onClick={onClose}>
            <CloseIcon
              style={{ cursor: "pointer", color: "gray", fontSize: "2rem" }}
            />
          </IconButton>
        </Grid>
        <Div className="rc-paper-drawer-member-invite-overflow">
          <Div className="rc-paper-drawer-member-invite-overflow-main">
            <Grid container spacing={2} justify="space-between">
              <Grid container item xs={12} sm={12} md={6}>
                <Div className="rc-paper-drawer-member-invite-overflow-image">
                  <Img
                    src={`/media/images/${selectedGroup?.image}`}
                    alt="Image"
                  ></Img>
                </Div>
                <Div className="rc-paper-drawer-member-invite-overflow-detail">
                  <P
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Roboto-Bold",
                    }}
                  >
                    {selectedGroup?.title}
                  </P>
                  <P style={{ color: "gray" }}>{selectedGroup?.description}</P>
                </Div>
              </Grid>
              <Grid
                container
                alignItems="flex-start"
                item
                xs={12}
                sm={12}
                md={6}
              >
                <Grid container spacing={2} style={{marginBottom:"1rem"}}>
                  <Grid container item xs={6} sm={6}>
                    <TextField
                      type="search"
                      label="Nhập từ khóa tìm kiếm"
                      onChange={handleSearch}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon color="disabled" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid container item xs={6} sm={6} justify="flex-end">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleOpenModalAddMemberToGroup}
                      endIcon={<AddIcon />}
                    >
                      Thêm học viên
                    </Button>
                  </Grid>
                </Grid>

                <Grid container>
                  {members?.result?.map((element, index) => {
                    return (
                      <Grid key={index} item container>
                        <Grow key={index} in={true} timeout={index * 100}>
                          <Paper
                            elevation={2}
                            style={{
                              margin: "0.5rem 0",
                              width: "100%",
                              height: "fit-content",
                            }}
                          >
                            <Grid
                              container
                              alignItems="center"
                              justify="space-between"
                              className="rc-member-invite-item"
                              spacing={2}
                            >
                              <Grid
                                item
                                container
                                sm={6}
                                xs={12}
                                alignItems="center"
                                className="rc-member-invite-item-col"
                              >
                                <Div className="rc-member-invite-item-col-image">
                                  <Img
                                    src={`/media/images/${element?.userDetail?.photo}`}
                                    style={{ height: "100%" }}
                                  />
                                </Div>
                                <Span>
                                  {element?.userDetail?.firstName +
                                    " " +
                                    element?.userDetail?.lastName}
                                </Span>
                              </Grid>
                              <Grid
                                item
                                container
                                sm={6}
                                xs={12}
                                className="rc-member-invite-item-col"
                              >
                                <A
                                  className="truncate"
                                  style={{ maxWidth: "calc( 100%)" }}
                                  href={`mailto:${element?.email}`}
                                >
                                  {element?.userDetail?.email}
                                </A>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grow>
                      </Grid>
                    );
                  })}
                </Grid>

                <Grid container justify="center">
                  {members?.meta?.total ? (
                    <Pagination
                      count={Math.ceil(members?.meta?.total / limit)}
                      page={page}
                      handleChange={(event, value) => {
                        onChangePage(event, value);
                      }}
                    />
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          </Div>
        </Div>
      </Paper>
      {openModalAddMemberToGroup && <ModalAddMemberToGroup 
      onClose={handleCloseModalAddMemberToGroup}
      selectedGroup={selectedGroup}
      
      />}
    </>
  );
};

export default React.forwardRef(DrawerQuestionLibrary);

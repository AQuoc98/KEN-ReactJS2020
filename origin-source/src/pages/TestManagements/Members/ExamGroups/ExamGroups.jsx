//Component
//Icon
import Spinner from "@Common/Spinner/Spinner";
import { Div, Img, P } from "@Common/TagAntdNotSupport/TagAntdNotSupport";
import ModalAddExamGroup from "@Components/TestManagements/ModalAddExamGroup/ModalAddExamGroup";
import helper from "@Helpers/tools";
import withScrollToTop from "@Hocs/witchScrollToTop";
import { Button, Grid, TextField, Grow, Paper,
  Drawer,

} from "@material-ui/core";
import DrawerMemberInvite from "@Components/TestManagements/DrawerMemberInvite/DrawerMemberInvite";

import LinkActive from "@Components/TestManagements/LinkActive/LinkActive";
import AddIcon from "@material-ui/icons/Add";
import "moment/locale/vi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SUB_LINK_DATA } from "./const";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { fetchExamGroupsAction } from "@Reduxs/QuestionLibrary/action";
//Styled Component
import "./styles.scss";
import Pagination from "@Components/common/Pagination/Paginantion";
import ActionTypeRefreshData from "@Reduxs/RefreshData/action-type";

const _ = require("lodash");

const ExamGroups = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [titleSearchData, setTitleSearchData] = useState("");
  const [openModalAddExamGroup, setOpenModalAddExamGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  //Anchol
  const [menuRoleAnchorEl, setMenuRoleAnchorEl] = React.useState(null);
  const [openDrawerMemberInvite, setOpenDrawerMemberInvite] = useState(
    false
  );
  const queryParam = helper.getAllUrlParams(window.location.href);
  const limit = queryParam.limit ? parseInt(queryParam.limit) : 10;
  const [page, setPage] = useState(
    queryParam.page ? parseInt(queryParam.page) : 1
  );
  const openMenuRole = Boolean(menuRoleAnchorEl);

  //======================Redux===================================

  const { refreshDataReducer, questionLibraryReducer } = useSelector(
    (state) => ({
      refreshDataReducer: state.refreshDataReducer,
      questionLibraryReducer: state.questionLibraryReducer,
    })
  );

  //Function
 
  const triggerOpenModalAddExamGroup = () => {
    setOpenModalAddExamGroup(!openModalAddExamGroup);
  };
  const handleOpenDrawerMemberInvite = (selectedGroup) => {
    setSelectedGroup(selectedGroup)

    setOpenDrawerMemberInvite(!openDrawerMemberInvite);
  };
  const handleCloseDrawerMemberInvite = () => {
    setOpenDrawerMemberInvite(!openDrawerMemberInvite);
  };

  const onChangePage = (event, page) => {
    setPage(page);
    history.push(
      `/test-managements/members/exam-groups?limit=${limit}&page=${page}`
    );
  };

  const handleDebounceSearch = _.debounce((title) => {
    history.push(`/test-managements/members/exam-groups?limit=${10}&page=${1}`);
    dispatch(fetchExamGroupsAction({ limit: 10, page: 1, title }));
  }, 800);

  const handleSearch = (e) => {
    const title = e?.target?.value?.trim();
    setTitleSearchData(title);
    setPage(1);
    handleDebounceSearch(title);
  };
  //===================== Hook ==================================
  useEffect(() => {
    if (
      [ActionTypeRefreshData?.ADD_EXAM_GROUP_REFRESH].includes(
        refreshDataReducer.get("type")
      )
    ) {
      dispatch(fetchExamGroupsAction({ limit, page, title: titleSearchData }));
    }
  }, [refreshDataReducer]);

  useEffect(() => {
    dispatch(fetchExamGroupsAction({ limit, page, title: titleSearchData }));
  }, [page]);

  return (
    <>
      <Div className="rc-test-managements-question-library">
        <Grid container justify="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={triggerOpenModalAddExamGroup}
            endIcon={<AddIcon />}
          >
            Tạo nhóm thi
          </Button>
        </Grid>

        <Grid
          container
          justify="space-between"
          alignItems="flex-end"
          style={{ margin: "2rem 0" }}
        >
          <Div className="rc-test-managements-question-library-sub-nav">
            {SUB_LINK_DATA?.map((element, index) => {
              return (
                <LinkActive
                  key={index}
                  path={element?.path}
                  navItemName={element?.title}
                  pathActive={element?.pathActive}
                />
              );
            })}
          </Div>
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
        <Grid
          container
          direction="column"
          alignItems="center"
          className="rc-exam-groups"
        >
          <Grid container spacing={2}>
            {questionLibraryReducer
              ?.get("payload")
              ?.result?.map((element, index) => {
                return (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    xl={3}
                    className="rc-exam-groups-item"
                  >
                    <Grow key={index} in={true} timeout={index * 100}>
                      <Paper
                        elevation={2}
                        style={{
                          margin: "0.5rem 0",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Div className="rc-exam-groups-item-image">
                          <Img
                            src={`/media/images/${element.image}`}
                            alt="Image"
                          ></Img>
                        </Div>
                        <Div className="rc-exam-groups-item-detail">
                          <P
                            style={{
                              fontWeight: "bold",
                              fontFamily: "Roboto-Bold",
                            }}
                          >
                            {element?.title}
                          </P>
                          <P style={{ color: "gray" }}>
                            {element?.quantity} thành viên
                          </P>

                          <Button 
                          onClick={()=>handleOpenDrawerMemberInvite(element)}
                          style={{ border: "1px solid #ea3325" }}
                          >
                            Mời thành viên
                          </Button>
                        </Div>
                      </Paper>
                    </Grow>
                  </Grid>
                );
              })}
          </Grid>

          {questionLibraryReducer?.get("payload")?.meta?.total ? (
            <Pagination
              count={Math.ceil(
                questionLibraryReducer?.get("payload")?.meta?.total / limit
              )}
              page={page}
              handleChange={(event, value) => {
                onChangePage(event, value);
              }}
            />
          ) : null}
        </Grid>
      </Div>
      {questionLibraryReducer?.get("isLoading") && <Spinner />}
      {/*========================================================= Modal/Popever========================================================== */}
      {openModalAddExamGroup && (
        <ModalAddExamGroup
          triggerOpenModalAddExamGroup={triggerOpenModalAddExamGroup}
        />
      )}

      <Drawer
        anchor={"right"}
        open={openDrawerMemberInvite}
        transitionDuration={500}
        onClose={handleCloseDrawerMemberInvite}
      >
        <DrawerMemberInvite
          onClose={handleCloseDrawerMemberInvite}
          selectedGroup={selectedGroup}
        />
      </Drawer>
    </>
  );
};

export default withScrollToTop(ExamGroups);

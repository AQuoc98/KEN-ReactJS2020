//Component
//Icon
import Spinner from "@Common/Spinner/Spinner";
import { A, Div, Img, Span } from "@Common/TagAntdNotSupport/TagAntdNotSupport";
import Pagination from "@Components/common/Pagination/Paginantion";
import ModalAddUser from "@Components/Users/ModalAddUser/ModalAddUser";
import helper from "@Helpers/tools";
import withScrollToTop from "@Hocs/witchScrollToTop";
import {
  Button,
  Fab,
  Grid,
  Grow,
  IconButton,
  Modal,
  Paper,
  Popover,
  Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ActionTypeRefreshData from "@Reduxs/RefreshData/action-type";
import "moment/locale/vi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeRoleAction, deleteUserAction, fetchRolesAction, fetchUsersAction } from "./action";
import { TYPE_CONFIRM } from "./const";
//Styled Component
import "./styles.scss";

const _ = require("lodash");

const Users = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [typeConfirm, setTypeConfirm] = useState(TYPE_CONFIRM.DELETE_USER);
  const [titleConfirm, setTitleConfirm] = useState("Xác nhận xóa");

  const [selectedRole,setSelectedRole]=useState("")
 const [selectedUserID,setSelectedUserID]=useState("");
  const [roles,setRoles]=useState([])
  const [openModalAddUser, setOpenModalAddUser] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  //Anchol
  const [menuRoleAnchorEl, setMenuRoleAnchorEl] = React.useState(null);

  const queryParam = helper.getAllUrlParams(window.location.href);
  const limit = queryParam.limit ? parseInt(queryParam.limit) : 10;
  const [page, setPage] = useState(
    queryParam.page ? parseInt(queryParam.page) : 1
  );
  const openMenuRole = Boolean(menuRoleAnchorEl);

  //======================Redux===================================

  const { refreshDataReducer, usersReducer } = useSelector((state) => ({
    refreshDataReducer: state.refreshDataReducer,
    usersReducer: state.usersReducer,
  }));

  //Function
  const handleShowMenuRole = (event,userID) => {
    setMenuRoleAnchorEl(event.currentTarget);
    setSelectedUserID(userID)
  };
  const handleCloseMenuRole = () => {
    setMenuRoleAnchorEl(null);
  };
  const triggerOpenModalAddUser = () => {
    setOpenModalAddUser(!openModalAddUser);
  };
  const handleOpenModalConfirm = (typeConfirm, dataSubmitConfirm) => {
    switch (typeConfirm) {
      case TYPE_CONFIRM.DELETE_USER:
        setTitleConfirm("Xác nhận xóa");
        setSelectedUserID(dataSubmitConfirm)
        break;

      case TYPE_CONFIRM.CHANGE_ROLE:
        setTitleConfirm("Xác nhận thay đổi");
        handleCloseMenuRole();
        setSelectedRole(dataSubmitConfirm)

        break;
    }
    setTypeConfirm(typeConfirm);
    setOpenModalConfirm(!openModalConfirm);
  };
  const handleCloseModalConfirm = () => {
    setOpenModalConfirm(!openModalConfirm);
  };
  const onChangePage = (event, page) => {
    const url=localStorage.getItem("ENTERPRISE_URL");
    setPage(page);
    history.push(`/${url}/users/?limit=${limit}&page=${page}`);
  };

  const handleSubmitConfirm = () => {
    switch (typeConfirm) {
      case TYPE_CONFIRM.DELETE_USER:
        dispatch(deleteUserAction(selectedUserID,handleCloseModalConfirm));
        break;

      case TYPE_CONFIRM.CHANGE_ROLE:
        dispatch(changeRoleAction(selectedUserID,selectedRole,handleCloseModalConfirm));
        break;
    }
  };

  //===================== Hook ==================================
  useEffect(() => {
    dispatch(fetchUsersAction({limit,page}));
  }, [page]);
  useEffect(() => {
    dispatch(fetchRolesAction()).then(result=>{
      setRoles(result?.result)
    });
  }, []);
  useEffect(() => {
    if (
      [ActionTypeRefreshData?.CHANGE_ROLE_SUCCESS, ActionTypeRefreshData?.DELETE_USER_SUCCESS, ActionTypeRefreshData?.ADD_USER_SUCCESS].includes(
        refreshDataReducer.get("type")
      )
    ) {
      dispatch(fetchUsersAction({limit,page}));
    }
  }, [refreshDataReducer]);

  return (
    <>
      <Div className="rc-users">
        <Fab
          color="primary"
          aria-label="add"
          className="rc-fab-add"
          onClick={triggerOpenModalAddUser}
        >
          <AddIcon />
        </Fab>
        <Grid
          container
          direction="column"
          alignItems="center"
          className="rc-users-list"
        >
          <Grid container direction="column">
            { usersReducer?.get("payload")?.result?.map((element, index) => {
              return (
                <Grow key={index} in={true} timeout={index * 100}>
                  <Paper
                    elevation={2}
                    style={{
                      margin: "0.5rem 0",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Grid
                      key={index}
                      container
                      alignItems="center"
                      justify="space-between"
                      className="rc-users-item"
                    >
                      <Grid
                        item
                        container
                        sm={4}
                        xs={12}
                        alignItems="center"
                        className="rc-users-item-col"
                      >
                        <Div className="rc-users-item-col-image">
                          <Img src={element?.img} style={{ height: "100%" }} />
                        </Div>
                        <Span>{element?.userDetail?.firstName + " " + element?.userDetail?.lastName}</Span>
                      </Grid>
                      <Grid item container  sm={3} xs={12} className="rc-users-item-col">
                        
                        <A  className="truncate" style={{maxWidth:"calc( 100%)"}}  href={`mailto:${element?.email}`}>
                          {element?.userDetail?.email}
                        </A>
                      </Grid>
                      <Grid
                        item
                        container
                        sm={3}
                        xs={12}
                        style={{ textAlign: "end" }}
                         alignItems="center"
                        className="rc-users-item-col"
                      >
                        <Span className="truncate" style={{maxWidth:"calc( 100% - 60px )"}} > {element?.roleDetail?.title}</Span>
                        <IconButton
                          color="default"
                          component="span"
                          onClick={(event)=>handleShowMenuRole(event,element?.id)}
                        >
                          <ArrowDropDownIcon />
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        container
                        sm={2}
                        xs={12}
                        justify="flex-end"
                        style={{ textAlign: "end" }}
                      >
                        <IconButton
                        className="rc-users-item-col rc-users-item-col-control-group "
                        
                        color="primary" component="span">
                          <MoreVertIcon />
                          <Paper className="rc-users-item-col-control">
                          <Div
                            className="rc-users-item-col-control-item"
                            onClick={() =>
                              handleOpenModalConfirm(TYPE_CONFIRM?.DELETE_USER,element?.id)
                            }
                          >
                            <IconButton
                              color="default"
                              style={{ padding: "0.5rem" }}
                              component="span"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Div>
                        </Paper>
                        </IconButton>
                       
                      </Grid>
                    </Grid>
                  </Paper>
                </Grow>
              );
            })}
          </Grid>

          {usersReducer?.get("payload")?.meta?.total  ? (
            <Pagination
              count={Math.ceil(usersReducer?.get("payload")?.meta?.total /limit)}
              page={page}
              url={"orders"}
              handleChange={(event, value) => {
                onChangePage(event, value);
              }}
            />
          ) : null}
        </Grid>
      </Div>
      {usersReducer?.get("isLoading") && <Spinner />}
      {/*========================================================= Modal/Popever========================================================== */}
      {openModalAddUser && (
        <ModalAddUser roles={roles} triggerOpenModalAddUser={triggerOpenModalAddUser} />
      )}
      {openModalConfirm && (
        <Modal
          open={true}
          onClose={handleCloseModalConfirm}
          className="rc-modal-confirm"
        >
          <Paper className="rc-modal-confirm-main">
            <Typography
              variant="h5"
              color="primary"
              style={{ marginBottom: "4rem", textAlign: "center" }}
            >
              {titleConfirm}
            </Typography>
            <Grid container justify="space-between">
              <Button
                variant="contained"
                color="default"
                onClick={handleCloseModalConfirm}
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: "1rem" }}
                onClick={handleSubmitConfirm}
              >
                Xác Nhận
              </Button>
            </Grid>
          </Paper>
        </Modal>
      )}
      <Popover
        open={openMenuRole}
        anchorEl={menuRoleAnchorEl}
        onClose={handleCloseMenuRole}
        className={"rc-popover_select_role"}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Grid
          container
          justify="space-between"
          className="popover_select_role-main"
        >
          {roles?.map((element,index) => {
            return (
              <Grid
              key={index}
                container
                justify="space-between"
                className="popover_select_role-main-item"
                onClick={() =>
                  handleOpenModalConfirm(TYPE_CONFIRM?.CHANGE_ROLE, element?.name)
                }
              >
                {element?.title}
              </Grid>
            );
          })}
        </Grid>
      </Popover>
    </>
  );
};

export default withScrollToTop(Users);

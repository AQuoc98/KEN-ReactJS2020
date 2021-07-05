//Component
//Icon
import Spinner from "@Common/Spinner/Spinner";
import { Div, Span } from "@Common/TagAntdNotSupport/TagAntdNotSupport";
import LinkActive from "@Components/TestManagements/LinkActive/LinkActive";
import ModalAddQuestionCategory from "@Components/TestManagements/ModalAddQuestionCategory/ModalAddQuestionCategory";
import helper from "@Helpers/tools";
import withScrollToTop from "@Hocs/witchScrollToTop";
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import { fetchQuestionCategoriesAction,deleteQuestionCategoryAction } from "@Reduxs/QuestionLibrary/action";
import ModalWrapper from "@Components/common/ModalWrapper/ModalWrapper";

//Styled Component
import ActionTypeRefreshData from "@Reduxs/RefreshData/action-type";
import "moment/locale/vi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SortableTree from "react-sortable-tree";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
import { SUB_LINK_DATA } from "./const";
import "./styles.scss";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
const _ = require("lodash");

const Categories = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [titleModal, setTitleModal] = useState("");
  const [treeDataState, setTreeDataState] = useState(null);
  const [nodeDetail, setNodeDetail] = useState(null);
  const [
    openModalAddQuestionCategory,
    setOpenModalAddQuestionCategory,
  ] = useState(false);
  const [
    openModalDeleteQuestionCategory,
    setOpenModalDeleteQuestionCategory,
  ] = useState(false);
  const queryParam = helper.getAllUrlParams(window.location.href);
  const limit = queryParam.limit ? parseInt(queryParam.limit) : 10;
  const [page, setPage] = useState(
    queryParam.page ? parseInt(queryParam.page) : 1
  );

  //======================Redux===================================

  const { refreshDataReducer, questionLibraryReducer } = useSelector(
    (state) => ({
      refreshDataReducer: state.refreshDataReducer,
      questionLibraryReducer: state.questionLibraryReducer,
    })
  );

  //Function

  const triggerOpenModalAddQuestionCategory = (nodeDetail) => {
    setOpenModalAddQuestionCategory(!openModalAddQuestionCategory);
    setNodeDetail(nodeDetail);
  };
  const triggerOpenModalDeleteQuestionCategory = (nodeDetail) => {
    setOpenModalDeleteQuestionCategory(!openModalDeleteQuestionCategory);
    setNodeDetail(nodeDetail);
  };

  const handleDeleteQuestionCategory=()=>{

    const callback=()=>{
       triggerOpenModalDeleteQuestionCategory()
    }
    dispatch(deleteQuestionCategoryAction(nodeDetail?.id,callback))
  }

  //===================== Hook ==================================
  useEffect(() => {
    if (
      [ActionTypeRefreshData?.ADD_QUESTION_CATEGORY_REFRESH,ActionTypeRefreshData?.DELETE_QUESTION_CATEGORY_REFRESH].includes(
        refreshDataReducer.get("type")
      )
    ) {
      dispatch(fetchQuestionCategoriesAction());
    }
  }, [refreshDataReducer]);

  useEffect(() => {
    dispatch(fetchQuestionCategoriesAction());
  }, []);
  useEffect(() => {
    const treeData = questionLibraryReducer?.get("payload")?.result;
    if (treeData) {
      setTreeDataState(treeData);
    }
  }, [questionLibraryReducer]);
  return (
    <>
      <Div className="rc-test-managements-question-library">
        <Grid container justify="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={()=>triggerOpenModalAddQuestionCategory(null)}
            endIcon={<AddIcon />}
          >
            Thêm danh mục
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
          className="rc-users-list"
        >
          <Grid container direction="column">
            <Div style={{ height: 450 }}>
              <SortableTree
                treeData={treeDataState}
                onChange={(treeData) => setTreeDataState(treeData)}
                className="rc-react-sortable-tree"
                generateNodeProps={(rowInfo) => ({
                  buttons: [
                    <Tooltip title="Thêm danh mục con" placement="top">
                      {/* <IconButton aria-label="delete"> */}
                      <AddCircleOutlineIcon
                        className="rc-react-sortable-tree-control-icon"
                        color="primary"
                        onClick={() =>
                          triggerOpenModalAddQuestionCategory(rowInfo?.node)
                        }
                      />
                      {/* </IconButton> */}
                    </Tooltip>,

                    <Tooltip title="Sửa tên" placement="top">
                      {/* <IconButton aria-label="delete"> */}
                      <EditIcon
                        className="rc-react-sortable-tree-control-icon"
                        color="primary"
                      />
                      {/* </IconButton> */}
                    </Tooltip>,
                    <Tooltip title="Xóa" placement="top">
                      {/* <IconButton aria-label="delete"> */}
                      <DeleteOutlineIcon
                        className="rc-react-sortable-tree-control-icon"
                        color="primary"
                        onClick={() =>
                          triggerOpenModalDeleteQuestionCategory(
                            rowInfo?.node
                          )
                        }
                      />
                      {/* </IconButton> */}
                    </Tooltip>,
                  ],
                })}
              />
            </Div>
          </Grid>
        </Grid>
      </Div>
      {questionLibraryReducer?.get("isLoading") && <Spinner />}
      {/*========================================================= Modal/Popever========================================================== */}
      {openModalAddQuestionCategory && (
        <ModalAddQuestionCategory
          nodeDetail={nodeDetail}
          triggerOpenModalAddQuestionCategory={
            triggerOpenModalAddQuestionCategory
          }
        />
      )}
      {openModalDeleteQuestionCategory && (
        <ModalWrapper
          triggerModalWrapper={triggerOpenModalDeleteQuestionCategory}
          className="rc-modal-paper-delete-question-category"
          title={"Xác nhận xóa danh mục"}
        >
          <Grid container item style={{ marginBottom: "4rem" }}>
            <Span style={{ fontWeight: "bold", fontFamily: "Roboto-Bold" ,marginBottom:"1rem" }}>
              Chú ý :
            </Span>
            <Span>
              Nếu danh mục có chứ danh mục con thì toàn bộ danh mục con bên
              trong cũng bị xóa
            </Span>
          </Grid>

          <Grid container justify="space-between">
            <Button
              variant="contained"
              color="default"
              onClick={triggerOpenModalDeleteQuestionCategory}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: "1rem" }}
              onClick={handleDeleteQuestionCategory}
            >
              Xác Nhận
            </Button>
          </Grid>
        </ModalWrapper>
      )}
    </>
  );
};

export default withScrollToTop(Categories);

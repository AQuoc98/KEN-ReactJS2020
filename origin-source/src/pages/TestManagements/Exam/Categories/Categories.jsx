//Component
//Icon
import Spinner from "@Common/Spinner/Spinner";
import { Div, Span } from "@Common/TagAntdNotSupport/TagAntdNotSupport";
import LinkActive from "@Components/TestManagements/LinkActive/LinkActive";
import ModalAddExamCategory from "@Components/TestManagements/ModalAddExamCategory/ModalAddExamCategory";
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
import { fetchExamCategoriesAction,deleteExamCategoryAction } from "@Reduxs/Exam/action";
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
    openModalAddExamCategory,
    setOpenModalAddExamCategory,
  ] = useState(false);
  const [
    openModalDeleteExamCategory,
    setOpenModalDeleteExamCategory,
  ] = useState(false);
  const queryParam = helper.getAllUrlParams(window.location.href);
  const limit = queryParam.limit ? parseInt(queryParam.limit) : 10;
  const [page, setPage] = useState(
    queryParam.page ? parseInt(queryParam.page) : 1
  );

  //======================Redux===================================

  const { refreshDataReducer, examReducer } = useSelector(
    (state) => ({
      refreshDataReducer: state.refreshDataReducer,
      examReducer: state.examReducer,
    })
  );

  //Function
  const handleCloseModalAddExamCategory=()=>{
    setOpenModalAddExamCategory(!openModalAddExamCategory);

  }
  const handleOpenModalAddExamCategory=(nodeDetail)=>{
    setOpenModalAddExamCategory(!openModalAddExamCategory);
    setNodeDetail(nodeDetail);

  }
  const triggerOpenModalDeleteExamCategory = (nodeDetail) => {
    setOpenModalDeleteExamCategory(!openModalDeleteExamCategory);
    setNodeDetail(nodeDetail);
  };

  const handleDeleteExamCategory=()=>{

    const callback=()=>{
       triggerOpenModalDeleteExamCategory()
    }
    dispatch(deleteExamCategoryAction(nodeDetail?.id,callback))
  }

  //===================== Hook ==================================
  useEffect(() => {
    if (
      [ActionTypeRefreshData?.ADD_EXAM_CATEGORY_REFRESH,ActionTypeRefreshData?.DELETE_EXAM_CATEGORY_REFRESH].includes(
        refreshDataReducer.get("type")
      )
    ) {
      dispatch(fetchExamCategoriesAction());
    }
  }, [refreshDataReducer]);

  useEffect(() => {
    dispatch(fetchExamCategoriesAction());
  }, []);
  useEffect(() => {
    const treeData = examReducer?.get("payload")?.result;
    if (treeData) {
      setTreeDataState(treeData);
    }
  }, [examReducer]);
  return (
    <>
      <Div className="rc-test-managements-question-library">
        <Grid container justify="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={()=>handleOpenModalAddExamCategory(null)}
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
                          handleOpenModalAddExamCategory(rowInfo?.node)
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
                          triggerOpenModalDeleteExamCategory(
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
      {examReducer?.get("isLoading") && <Spinner />}
      {/*========================================================= Modal/Popever========================================================== */}
      {openModalAddExamCategory && (
        <ModalAddExamCategory
          nodeDetail={nodeDetail}
          onClose={
            handleCloseModalAddExamCategory
          }
        />
      )}
      {openModalDeleteExamCategory && (
        <ModalWrapper
          triggerModalWrapper={triggerOpenModalDeleteExamCategory}
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
              onClick={triggerOpenModalDeleteExamCategory}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: "1rem" }}
              onClick={handleDeleteExamCategory}
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

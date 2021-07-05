//Component
//Icon
import Spinner from "@Common/Spinner/Spinner";
import { Div, Span } from "@Common/TagAntdNotSupport/TagAntdNotSupport";
import Pagination from "@Components/common/Pagination/Paginantion";
import LinkActive from "@Components/TestManagements/LinkActive/LinkActive";
import ModalAddQuestion from "@Components/TestManagements/ModalAddQuestion/ModalAddQuestion";
import helper from "@Helpers/tools";
import withScrollToTop from "@Hocs/witchScrollToTop";
import { Button, Grid, Grow, Paper, TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddIcon from "@material-ui/icons/Add";
import HelpIcon from '@material-ui/icons/Help';
import SearchIcon from "@material-ui/icons/Search";
import { fetchQuestionListAction } from "@Reduxs/QuestionLibrary/action";
import ActionTypeRefreshData from "@Reduxs/RefreshData/action-type";
import "moment/locale/vi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SUB_LINK_DATA } from "./const";
//Styled Component
import "./styles.scss";
const _ = require("lodash");

const Groups = (props) => {

  console.log(props)
  const dispatch = useDispatch();
  const history = useHistory();

  const [openModalAddQuestion, setOpenModalAddQuestion] = useState(
    false
  );
  //Anchol

  const queryParam = helper.getAllUrlParams(window.location.href);
  const limit = queryParam.limit ? parseInt(queryParam.limit) : 10;
  const [page, setPage] = useState(
    queryParam.page ? parseInt(queryParam.page) : 1
  );
  const [titleSearchData, setTitleSearchData] = useState("");
  //======================Redux===================================

  const { refreshDataReducer, questionLibraryReducer } = useSelector(
    (state) => ({
      refreshDataReducer: state.refreshDataReducer,
      questionLibraryReducer: state.questionLibraryReducer,
    })
  );

  //Function

  const triggerOpenModalAddQuestion = () => {
    setOpenModalAddQuestion(!openModalAddQuestion);
  };
  const onChangePage = (event, page) => {
    setPage(page);
    history.push(`/test-managements/question-library/questions?limit=${limit}&page=${page}`);
  };

  const handleDebounceSearch = _.debounce((title) => {
    history.push(`/test-managements/question-library/questions?limit=${10}&page=${1}`);
    dispatch(fetchQuestionListAction({ limit:10, page:1,title }));
  }, 800);

  const handleSearch = (e) => {
    const title=e?.target?.value?.trim()
    setTitleSearchData(title)
    setPage(1)
    handleDebounceSearch(title);
  };
  //===================== Hook ==================================
  useEffect(() => {
    if (
      [ActionTypeRefreshData?.ADD_QUESTION_REFRESH].includes(
        refreshDataReducer.get("type")
      )
    ) {
      dispatch(fetchQuestionListAction({ limit, page ,title:titleSearchData}));
    }
  }, [refreshDataReducer]);

  useEffect(() => {
    dispatch(fetchQuestionListAction({ limit, page,title:titleSearchData }));
  }, [page]);

  return (
    <>
      <Div className="rc-test-managements-question-library">
        <Grid container justify="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={triggerOpenModalAddQuestion}
            endIcon={<AddIcon />}
          >
            Thêm câu hỏi
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
          className="rc-question-library-list"
        >
          <Grid container direction="column">
            {questionLibraryReducer
              ?.get("payload")
              ?.result?.map((element, index) => {
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
                        container
                        item
                        justify="flex-start"
                        alignItems="center"
                        style={{
                          padding: "1rem",
                        }}
                      >
                        <HelpIcon color="disabled" />
                        <Span className="rc-truncate" style={{marginLeft:"1rem",fontSize:"1rem",width:"calc( 100% - 40px)"}}>{element?.content}</Span>
                      </Grid>
                    </Paper>
                  </Grow>
                );
              })}
          </Grid>

          {questionLibraryReducer?.get("payload")?.meta?.total ? (
            <Pagination
              count={Math.ceil(
                questionLibraryReducer?.get("payload")?.meta?.total / limit
              )}
              page={page}
              url={"orders"}
              handleChange={(event, value) => {
                onChangePage(event, value);
              }}
            />
          ) : null}
        </Grid>
      </Div>
      {questionLibraryReducer?.get("isLoading") && <Spinner />}
      {/*========================================================= Modal/Popever========================================================== */}
      {openModalAddQuestion && (
        <ModalAddQuestion
          triggerOpenModalAddQuestion={triggerOpenModalAddQuestion}
        />
      )}
    </>
  );
};

export default withScrollToTop(Groups);

import calendarIcon from "@Assets/images/TestManagements/calendar-icon.svg";
import categoryIcon from "@Assets/images/TestManagements/category-icon.svg";
import clockIcon from "@Assets/images/TestManagements/clock-icon.svg";
import groupIcon from "@Assets/images/TestManagements/group-icon.svg";
import userIcon from "@Assets/images/TestManagements/user-icon.svg";
import ModalWrapper from "@Components/common/ModalWrapper/ModalWrapper";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import {
  Div,
  Img,
  Span,
} from "@Components/common/TagAntdNotSupport/TagAntdNotSupport";
import Question from "@Components/TestManagements/Question/Question";
import DrawerPreviewQuiz from "@Components/TestManagements/DrawerPreviewQuiz/DrawerPreviewQuiz";
import DrawerQuestionLibrary from "@Components/TestManagements/DrawerQuestionLibrary/DrawerQuestionLibrary";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Switch,
  TextField,
  Tooltip,
  Fade,
  Drawer,
} from "@material-ui/core";
import ClockIcon from "@material-ui/icons/AccessTime";
import AddIcon from "@material-ui/icons/Add";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Autocomplete from "@material-ui/lab/Autocomplete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@material-ui/pickers";
import MomentAdapter from "@material-ui/pickers/adapter/moment";
import "moment/locale/vi";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { groups } from "./const";
import "./styles.scss";

const { List, fromJS } = require("immutable");

const ModalAddQuiz = (props) => {
  const { triggerOpenModalAddQuiz } = props;
  const dispatch = useDispatch();

  const [openDrawerPreviewQuiz, setOpenDrawerPreviewQuiz] = useState(false);
  const [openDrawerQuestionLibrary, setOpenDrawerQuestionLibrary] = useState(
    false
  );
  const [questions, setQuestions] = useState(
    List([
      {
        type: "radio",
        require: false,
        questionName: "",
        answers: [
          {
            content: "Đáp án . ",
            booleanResult: false,
          },
        ],
      },
    ])
  );

  const triggerOpenDrawerPreviewQuiz = () => {
    setOpenDrawerPreviewQuiz(!openDrawerPreviewQuiz);
  };
  const triggerOpenDrawerQuestionLibrary = () => {
    setOpenDrawerQuestionLibrary(!openDrawerQuestionLibrary);
  };
  const handleAddQuestion = () => {
    const copyQuestions = List(questions);
    const newCopyQuestions = copyQuestions.push({
      type: "radio",
      require: true,
      questionName: "",
      answers: [
        {
          content: "Đáp án . ",
          booleanResult: false,
        },
      ],
    });
    setQuestions(newCopyQuestions);
  };
  const handleDeleteQuestion = (index) => {
    const copyQuestions = List(questions);
    const copyQuestionsRemoved = copyQuestions.remove(index);
    setQuestions(copyQuestionsRemoved);
  };
  const handleCopyQuestion = (index, value) => {
    const copyQuestions = List(questions);
    const copyQuestionsCopied = copyQuestions.insert(index, value);
    setQuestions(copyQuestionsCopied);
  };
  const handleChangeDate = (date) => {
    // setDate(date);
  };

  const handleChangeQuestion = (index, newQuestion) => {
    const copyQuestions = List(questions);
    const copyQuestionsChanged = copyQuestions.set(index, newQuestion);
    setQuestions(copyQuestionsChanged);
  };
  const handleChangeMergeQuestion = () => {};

  const handlePreview = () => {
    triggerOpenDrawerPreviewQuiz();
  };
  const handleShowLibrary = () => {
    triggerOpenDrawerQuestionLibrary();
  };

  const CONTROL_DATA = [
    {
      title: "Thêm câu hỏi",
      icon: <AddCircleIcon />,
      function: handleAddQuestion,
    },
    {
      title: "Xem trước",
      icon: <VisibilityIcon />,
      function: handlePreview,
    },
    {
      title: "Thư viện câu hỏi",
      icon: <PhotoLibraryIcon />,
      function: handleShowLibrary,
    },
  ];
  return (
    <ModalWrapper
      triggerModalWrapper={triggerOpenModalAddQuiz}
      className="rc-modal-paper-add-quiz"
      title={"Thêm bài kiểm tra"}
    >
      <Div className="rc-modal-add-quiz">
        <Div className="rc-modal-add-quiz-main">
          <Grid container item xs={12} sm={12} md={3}>
            <Grid
              item
              container
              justify="space-between"
              xs={12}
              style={{ marginBottom: "1.5rem" }}
            >
              <Img src={groupIcon} />
              <Autocomplete
                options={groups || []}
                getOptionLabel={(option) => option?.title}
                // onChange={handleChangeFunds}
                style={{ width: "calc(100% - 30px)" }}
                disableClearable={true}
                renderInput={(params) => (
                  <TextField {...params} label="Danh mục" name="category" />
                )}
              />
            </Grid>
            <Grid
              item
              container
              justify="space-between"
              xs={12}
              style={{ marginBottom: "1.5rem" }}
            >
              <Img src={categoryIcon} />
              <Autocomplete
                options={groups || []}
                getOptionLabel={(option) => option?.title}
                // onChange={handleChangeFunds}
                style={{ width: "calc(100% - 30px)" }}
                disableClearable={true}
                renderInput={(params) => (
                  <TextField {...params} label="Nhóm" name="group" />
                )}
              />
            </Grid>

            <Grid
              item
              container
              justify="space-between"
              xs={12}
              style={{ marginBottom: "1.5rem" }}
            >
              <Img src={userIcon} />
              <TextField
                style={{ width: "calc(100% - 30px)" }}
                label="Học viên"
                name="student"
              />
            </Grid>
            <Grid
              item
              container
              justify="space-between"
              xs={12}
              style={{ marginBottom: "1.5rem" }}
            >
              <Img src={clockIcon} />
              <TextField
                style={{ width: "calc(100% - 30px)" }}
                label="Thời gian làm bài"
                name="time"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Phút</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid
              item
              container
              justify="space-between"
              xs={12}
              style={{ marginBottom: "1.5rem" }}
            >
              <Img src={calendarIcon} />
              <LocalizationProvider dateAdapter={MomentAdapter}>
                <MobileDateTimePicker
                  label="Thời gian bắt đầu kiểm tra"
                  // value={date}
                  clearText="Clear"
                  clearable
                  minDate={new Date()}
                  // onChange={(date) => handleChangeDate(date)}
                  inputFormat={"hh:mm - DD/MM/YYYY"}
                  onChange={(date) => {}}
                  onAccept={(date) => handleChangeDate(date)}
                  openPickerIcon={<ClockIcon />}
                  mask="___/__/__ __:__ _M"
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      helperText=""
                      style={{ width: "calc(100% - 30px)" }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid
              item
              container
              justify="space-between"
              xs={12}
              style={{ marginBottom: "1.5rem" }}
            >
              <Img src={calendarIcon} />
              <TextField
                disabled
                style={{ width: "calc(100% - 30px)" }}
                label="Thời gian kết thúc kiểm tra "
                name="timeEnd"
              />
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              xs={12}
              style={{ marginBottom: "1.5rem" }}
            >
              <Switch onChange={handleChangeMergeQuestion} />
              <Span>Trộn câu hỏi và câu trả lời </Span>
            </Grid>
          </Grid>
          <Grid container item xs={12} sm={12} md={8} alignItems="center">
            {questions?.map((element, index) => {
              return (
                <Fade
                  in={true}
                  style={{ transitionDelay: "300ms" }}
                  key={index}
                >
                  <Question
                    isQuiz={true}
                    questionDefault={element}
                    questionIndex={index}
                    onCopyQuestion={() => {
                      handleCopyQuestion(index, element);
                    }}
                    onDeleteQuestion={() => {
                      handleDeleteQuestion(index);
                    }}
                    onChangeQuestion={handleChangeQuestion}
                  />
                </Fade>
              );
            })}
          </Grid>

          <Grid
            item
            container
            justify="flex-end"
            xs={12}
            className="rc-modal-add-quiz-main-form-item"
            style={{ marginTop: "3rem" }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<AddIcon />}
            >
              Thêm bài kiểm tra
            </Button>
          </Grid>
        </Div>
        <Div className="rc-modal-add-quiz-control">
          {CONTROL_DATA?.map((element, index) => {
            return (
              <Tooltip
                key={index}
                title={element?.title}
                placement="right-start"
              >
                <IconButton
                  color="primary"
                  component="span"
                  variant="filled"
                  onClick={element?.function}
                >
                  {element?.icon}
                </IconButton>
              </Tooltip>
            );
          })}
        </Div>
      </Div>

      {/* Modal */}

      <Drawer
        anchor={"top"}
        open={openDrawerPreviewQuiz}
        transitionDuration={500}
        onClose={triggerOpenDrawerPreviewQuiz}
      >
        <DrawerPreviewQuiz
          questions={questions}
          triggerOpenDrawerPreviewQuiz={triggerOpenDrawerPreviewQuiz}
        />
      </Drawer>

      <Drawer
        anchor={"right"}
        open={openDrawerQuestionLibrary}
        transitionDuration={500}
        onClose={triggerOpenDrawerQuestionLibrary}
      >
        <DrawerQuestionLibrary
          triggerOpenDrawerQuestionLibrary={triggerOpenDrawerQuestionLibrary}
        />
      </Drawer>
    </ModalWrapper>
  );
};

export default ModalAddQuiz;

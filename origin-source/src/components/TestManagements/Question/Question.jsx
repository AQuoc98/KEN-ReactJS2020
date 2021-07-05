import {
  Div,
  Span,
} from "@Components/common/TagAntdNotSupport/TagAntdNotSupport";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import {
  Button,
  Divider,
  Fade,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import DeleteIcon from "@material-ui/icons/Delete";
import ImageIcon from "@material-ui/icons/Image";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import ShortTextIcon from "@material-ui/icons/ShortText";
import { postImageAction } from "@Reduxs/Media/action";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import { ANSWER_TYPE } from "./const";
import "./styles.scss";

const { List, fromJS } = require("immutable");

export const SELECT_ANSWER_TYPE_DATA = [
  {
    id: "1",
    answerType: "radio",
    value: "radio",
    title: "Chọn một kết quả",
    icon: (
      <RadioButtonCheckedIcon
        color="disabled"
        style={{ marginRight: "0.5rem" }}
      />
    ),
  },
  {
    id: "2",
    answerType: "checkboxes",
    value: "checkboxes",
    title: "Chọn nhiều kết quả",
    icon: <CheckBoxIcon color="disabled" style={{ marginRight: "0.5rem" }} />,
  },
  {
    id: "3",
    answerType: "short-answer",
    value: "short-answer",
    title: "Trả lời ngắn",
    icon: <ShortTextIcon color="disabled" style={{ marginRight: "0.5rem" }} />,
  },
];
const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    display: "flex",
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "1rem",
    alignItems: "center",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#C62026",
    },
  },
}))(InputBase);

const Question = (props, ref) => {
  const dispatch = useDispatch();
  const {
    questionIndex,
    onDeleteQuestion=()=>{},
    onChangeQuestion=()=>{},
    onCopyQuestion=()=>{},
    questionDefault,
    isQuiz,
  } = props;
  const [answerTypeValue, setAnswerTypeValue] = useState(ANSWER_TYPE?.RADIO);
  const [isRequired, setIsRequired] = useState(false);
  const [content, setContent] = useState("");
  const [answers, setAnswers] = useState(List([]));
  useEffect(() => {
      setAnswerTypeValue(questionDefault?.answerType);
      setIsRequired(questionDefault?.isRequired);
      setContent(questionDefault?.content);
      setAnswers(List(questionDefault?.answers));
  }, [questionDefault]);
  const handleChangeAnswerTypeValue = (event) => {
    const answerType=event?.target?.value

    setAnswerTypeValue(answerType);

    //Handle Change Question
    if (answerType===ANSWER_TYPE?.SHORT_ANSWER) {
      const newQuestion = {
        ...questionDefault,
        answerType: answerType,
        answers:null
      };
      onChangeQuestion(questionIndex, newQuestion);
    }else if (!questionDefault?.answers) {
        const newQuestion = {
          ...questionDefault,
          answerType: answerType,
          answers:[
            {
              content: "Đáp án . ",
              booleanResult: false,
            },
          ],
        };
        onChangeQuestion(questionIndex, newQuestion);
      }
      else{
        const newQuestion = {
          ...questionDefault,
          answerType: answerType
        };
        onChangeQuestion(questionIndex, newQuestion);
      }
    
    
  };
  const handleDeleteAnswer = (index) => {
    const copyAnswers = List(answers);
    const copyAnswersRemoved = copyAnswers.remove(index);
    setAnswers(copyAnswersRemoved);
    //Handle Change Question
      const newQuestion = {
        ...questionDefault,
        answers: copyAnswersRemoved?.toIndexedSeq()?.toArray(),
      };
      onChangeQuestion(questionIndex, newQuestion);
    
  };

  const handleChangeBooleanResult = (index) => {
    const copyAnswers = List(answers);
    const copyAnswersBooleanResulted = copyAnswers.update(index, (val) => {
      return { ...val, booleanResult: !val?.booleanResult };
    });
    setAnswers(copyAnswersBooleanResulted);

    //Handle Change Question
      const newQuestion = {
        ...questionDefault,
        answers: copyAnswersBooleanResulted?.toIndexedSeq()?.toArray(),
      };
      onChangeQuestion(questionIndex, newQuestion);
  
  };

  const handleChangeRequire = () => {
    setIsRequired(!isRequired);
    //Handle Change Question
      const newQuestion = {
        ...questionDefault,
        isRequired: !isRequired,
      };
      onChangeQuestion(questionIndex, newQuestion);
    
  };
  const handleAddAnswer = () => {
    const copyAnswers = List(answers);
    const newCopyAnswers = copyAnswers.push({
      content: "Đáp án . ",
      booleanResult: false,
    });
    setAnswers(newCopyAnswers);

    //Handle Change Question
      const newQuestion = {
        ...questionDefault,
        answers: newCopyAnswers?.toIndexedSeq()?.toArray(),
      };
      onChangeQuestion(questionIndex, newQuestion);
  };
  const handleChangeFile = async (event) => {
    var file = event?.target?.files[0];
    const { target = {} } = event || {};
    target.value = "";
    const src = URL.createObjectURL(file);
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = async function (e) {
      let dataForm = new FormData();
      dataForm.append("photo", file);
      const uploadResult = await dispatch(postImageAction(dataForm));
      const imageID = uploadResult?.data?.result?.id;
      if (imageID) {
      }
    };
  };
  const handleChangeContentAnswer = (event, index) => {
    const copyAnswers = List(answers);
    const copyAnswersUpdated = copyAnswers.update(index, (val) => {
      return { ...val, content: event?.target?.value };
    });
    setAnswers(copyAnswersUpdated);

    //Handle Change Question
      const newQuestion = {
        ...questionDefault,
        answers: copyAnswersUpdated?.toIndexedSeq()?.toArray(),
      };
      onChangeQuestion(questionIndex, newQuestion);
    
  };
  const handleBlurContentAnswer = (event, index) => {
    
    if (!event?.target?.value) {
      const copyAnswers = List(answers);
      const copyAnswersUpdated = copyAnswers.update(index, (val) => {
        return { ...val, content: "Kết quả ... " };
      });
      setAnswers(copyAnswersUpdated);

      //Handle Change Question
        const newQuestion = {
          ...questionDefault,
          answers: copyAnswersUpdated?.toIndexedSeq()?.toArray(),
        };
        onChangeQuestion(questionIndex, newQuestion);
      
    }
  };
  const handleChangeQuestionName = (event) => {
    setContent(event.target.value);

    //Handle Change Question
      const newQuestion = {
        ...questionDefault,
        content: event.target.value,
      };

      onChangeQuestion(questionIndex, newQuestion);
    
  };

  const swapAnswer = (oldIndex,newIndex) => {
    const copyAnswers = List(answers);
    //Handle Change Question
      const newQuestion = {
        ...questionDefault,
        answers: copyAnswers?.toIndexedSeq()?.toArray(),
      };

      onChangeQuestion(questionIndex, newQuestion);
    
  };
  return (
    <Paper elevation={3} className="rc-paper-question">
      <Grid container justify="space-between" alignItems="flex-end">
        <Grid item xs={12} sm={12} md={7}>
          <TextField
            className="rc-question-title"
            label="Câu hỏi"
            value={content}
            placeholder="Nhập nội dung câu hỏi ?"
            onChange={handleChangeQuestionName}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Select
            value={answerTypeValue}
            onChange={handleChangeAnswerTypeValue}
            label="Loại câu hỏi"
            className="rc-question-select"
            input={<BootstrapInput />}
          >
            {SELECT_ANSWER_TYPE_DATA.map((element, index) => {
              return (
                <MenuItem
                  key={index}
                  value={element.value}
                  className="rc-question-menu-item"
                >
                  {element.icon}

                  {element.title}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
      </Grid>
      <Grid container>
        {answerTypeValue === ANSWER_TYPE?.SHORT_ANSWER ? (
          <Grid item xs={12} sm={12} md={7}>
            <TextField
              disabled
              label=""
              multiline
              rows={4}
              variant="outlined"
              defaultValue="Văn bản câu trả lời ngắn"
              style={{ width: "100%" }}
            />
          </Grid>
        ) : (
          <Fragment>
            <Grid
              container
              direction="row"
              justify="space-between"
              style={{ margin: "1rem 0" }}
            >
              <Grid
                container
                item
                md={7}
                alignItems="center"
                style={{ fontWeight: "900", fontFamily: "Roboto-Bold" }}
              >
                Câu trả lời :
              </Grid>
            </Grid>
            <ReactSortable
              animation={200}
              className="rc-sortable"
              list={answers?.toIndexedSeq()?.toArray()}
              setList={(newState) => {setAnswers(List(newState))}}
              onEnd={(e) => {
                const oldIndex = e.oldIndex;
                const newIndex = e.newIndex;
                swapAnswer(oldIndex,newIndex)
              }}
            >
              {answers.map((element, index) => {
                return (
                  <Fade
                    in={true}
                    style={{ transitionDelay: "50ms", cursor: "move" }}
                    key={index}
                  >
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid
                        item
                        container
                        md={7}
                        alignItems="center"
                        style={{ margin: "1rem 0" }}
                        justify="space-between"
                      >
                        {answerTypeValue === ANSWER_TYPE?.CHECKBOXES ? (
                          <CheckBoxOutlineBlankIcon color="disabled" />
                        ) : (
                          <RadioButtonUncheckedIcon color="disabled" />
                        )}
                        <TextField
                          disabled={element.disabled}
                          style={{ width: "calc(100% - 60px)" }}
                          size="medium"
                          onChange={(e) => handleChangeContentAnswer(e, index)}
                          onBlur={(e) => handleBlurContentAnswer(e, index)}
                          value={element?.content}
                        />
                        <label htmlFor="file-upload-edit">
                          <ImageIcon
                            color="disabled"
                            style={{ cursor: "pointer" }}
                          />
                        </label>

                        <input
                          onChange={(e) => handleChangeFile(e)}
                          id="file-upload-edit"
                          style={{ display: "none" }}
                          answerType="file"
                        />
                      </Grid>
                      <Grid
                        item
                        container
                        md={4}
                        alignItems="center"
                        style={{ margin: "1rem 0" }}
                        justify="space-between"
                      >
                        <Div>
                          <Span>Đúng</Span>
                          <Switch
                            checked={element?.booleanResult}
                            onChange={() => handleChangeBooleanResult(index)}
                          />
                        </Div>

                        {answers?.size > 1 && (
                          <Tooltip title="Xóa bỏ" placement="top">
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleDeleteAnswer(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Grid>
                    </Grid>
                  </Fade>
                );
              })}
            </ReactSortable>

            <Grid item container sm={12} direction="row" alignItems="center">
              <Button
                variant="outlined"
                color="primary"
                style={{ marginTop: "1rem" }}
                onClick={handleAddAnswer}
                endIcon={<AddIcon />}
              >
                Thêm câu trả lời
              </Button>
            </Grid>
          </Fragment>
        )}
      </Grid>

      <Divider style={{ margin: "1rem 0" }} />
      <Grid
        item
        container
        md={12}
        alignItems="center"
        style={{ margin: "1rem 0" }}
        justify="space-between"
      >
        <Grid item container xs={6} sm={6} alignItems="center">
          <Span>Bắt buộc trả lời </Span>
          <Switch checked={isRequired} onChange={handleChangeRequire} />
        </Grid>

        <Grid item container xs={6} sm={6} justify="flex-end">
          {isQuiz && (
            <Tooltip title="Xóa" placement="top">
              <IconButton
                aria-label="delete"
                onClick={() => onDeleteQuestion()}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
          {isQuiz && (
            <Tooltip title="Sao chép" placement="top">
              <IconButton onClick={() => onCopyQuestion()}>
                <FileCopyOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default React.forwardRef(Question);

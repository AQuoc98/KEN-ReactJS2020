import categoryIcon from "@Assets/images/TestManagements/category-icon.svg";
import groupIcon from "@Assets/images/TestManagements/group-icon.svg";
import DropdownTreeSelect from "@Components/common/DropdownTreeSelect/DropdownTreeSelect";
import ModalWrapper from "@Components/common/ModalWrapper/ModalWrapper";
import { Img } from "@Components/common/TagAntdNotSupport/TagAntdNotSupport";
import Question from "@Components/TestManagements/Question/Question";
import { Button, Grid, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  getQuestionCategoriesAction,
  getQuestionGroupAction,
} from "@Reduxs/QuestionLibrary/action";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import "./styles.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ANSWER_TYPE } from "./const";
import { addQuestionAction } from "@Reduxs/QuestionLibrary/action";

import { from } from "form-data";
const { List, fromJS } = require("immutable");
const ModalAddQuestion = (props) => {
  const dispatch = useDispatch();
  const { triggerOpenModalAddQuestion, roles } = props;
  const [question, setQuestion] = useState({
    answerType: ANSWER_TYPE?.RADIO,
    content: "",
    answers: [
      {
        content: "Đáp án . ",
        booleanResult: false,
      },
    ],
    isRequired: true,
  });
  const [questionGroup, setQuestionGroup] = useState("");
  const [questionCategory, setQuestionCategory] = useState("");
  const [questionCategories, setQuestionCategories] = useState([]);
  const [questionGroups, setQuestionGroups] = useState([]);
  const assignObjectPaths = (obj) => {
    if (obj?.length) {
      obj.forEach((node) => {
        if (typeof node === "object") {
          node.label = node?.title;
          assignObjectPaths(node.children);
        }
      });
    }
  };
  const handleChangeQuestion = (index, newValue) => {
    setQuestion(newValue);
  };

  const handleChangeQuestionCategory = (value) => {
    setQuestionCategory(value);
  };

  const handleChangeQuestionGroup = (event, value) => {
    setQuestionGroup(value?.id);
  };
  useEffect(() => {
    dispatch(getQuestionCategoriesAction()).then((result) => {
      let data = JSON.parse(JSON.stringify(result?.result));
      assignObjectPaths(data);
      setQuestionCategories(data);
    });
    dispatch(getQuestionGroupAction({ limit: 1000, page: 1 })).then(
      (result) => {
        setQuestionGroups(result?.result);
      }
    );
  }, []);

  const handleSubmitForm = (values) => {
    // console.log(question);
    // console.log(questionGroup);
    // console.log(questionCategory);
    const callback=()=>{
       triggerOpenModalAddQuestion()
    }
    const submitData = {
      ...question,
      category: questionCategory,
      group: questionGroup,
    };

    dispatch(addQuestionAction(submitData,callback));
  };

  const schema = yup.object().shape({});
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  console.log(questionCategories);

  const dropdownTreeSelectMemo = useMemo(() => {
    console.log(questionCategories);
    return (
      <DropdownTreeSelect
        data={questionCategories}
        onChange={handleChangeQuestionCategory}
      />
    );
  }, [questionCategories]);

  return (
    <ModalWrapper
      triggerModalWrapper={triggerOpenModalAddQuestion}
      className="rc-modal-paper-add-question"
      title={"Thêm câu hỏi"}
    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Grid container alignItems="flex-start">
          <Grid container item md={3} alignItems="flex-start">
            <Grid item container justify="space-between" xs={12}>
              <Img src={groupIcon} />
              {dropdownTreeSelectMemo}
            </Grid>

            <Grid
              item
              container
              justify="space-between"
              xs={12}
              style={{ margin: "2rem 0" }}
            >
              <Img src={categoryIcon} />
              <Autocomplete
                options={questionGroups || []}
                getOptionLabel={(option) => option?.title}
                onChange={handleChangeQuestionGroup}
                style={{ width: "calc(100% - 30px)" }}
                disableClearable={true}
                renderInput={(params) => (
                  <TextField {...params} label="Nhóm" name="source" />
                )}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            md={9}
            alignItems="center"
            style={{ padding: "0 1rem" }}
          >
            <Question
              questionDefault={question}
              onChangeQuestion={handleChangeQuestion}
            />
          </Grid>

          <Grid
            item
            container
            justify="flex-end"
            xs={12}
            className="rc-modal-add-question-main-form-item"
            style={{ marginTop: "3rem" }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<AddIcon />}
            >
              Thêm câu hỏi
            </Button>
          </Grid>
        </Grid>
      </form>
    </ModalWrapper>
  );
};

export default ModalAddQuestion;

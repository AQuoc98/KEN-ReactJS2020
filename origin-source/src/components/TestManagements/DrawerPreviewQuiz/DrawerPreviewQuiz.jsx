import {
  Div,
  P,
  Span,
} from "@Components/common/TagAntdNotSupport/TagAntdNotSupport";
import "moment/locale/vi";
import React from "react";
import { QUESTION_TYPE } from "./const";
import "./styles.scss";
import { Grid, TextField, Paper,IconButton } from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CloseIcon from "@material-ui/icons/Close";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

const ModalPreviewQuiz = (props) => {
  const { questions, triggerOpenDrawerPreviewQuiz } = props;
  return (
    <Paper elevation={3} className="rc-paper-drawer-preview-quiz">
      <Grid container justify="flex-end" style={{ padding: "0.5rem 1rem" }}>
        <IconButton
          color="default"
          component="span"
          onClick={triggerOpenDrawerPreviewQuiz}
        >
          <CloseIcon
            style={{ cursor: "pointer", color: "gray", fontSize: "2rem" }}
          />
        </IconButton>
      </Grid>

      <Div className="rc-paper-drawer-question-library-overflow">
        <Div className="rc-paper-drawer-question-library-overflow-main">
          <Grid className="rc-modal-preview-quiz-main">


          <Grid className="rc-modal-preview-quiz-main-title">
          </Grid>





            {questions.map((element, index) => {
              switch (element?.type) {
                case QUESTION_TYPE?.SHORT_ANSWER:
                  return (
                    <Grid
                      key={index}
                      container
                      className="rc-modal-preview-quiz-main-item"
                    >
                      <P className="rc-modal-preview-quiz-main-item-title">
                        Câu {index + 1} :{" "}
                        {element?.questionName || "Câu hỏi chưa có tiêu đề !"}
                      </P>
                      <TextField
                        disabled
                        label=""
                        multiline
                        rows={5}
                        variant="outlined"
                        defaultValue="Văn bản câu trả lời ngắn"
                        style={{ width: "100%" }}
                      />
                    </Grid>
                  );
                case QUESTION_TYPE?.RADIO:
                case QUESTION_TYPE?.CHECKBOX:
                  const iconAnswer =
                    element?.type === QUESTION_TYPE?.RADIO ? (
                      <RadioButtonUncheckedIcon />
                    ) : (
                      <CheckBoxOutlineBlankIcon />
                    );
                  return (
                    <Grid
                      key={index}
                      container
                      className="rc-modal-preview-quiz-main-item"
                    >
                      <P className="rc-modal-preview-quiz-main-item-title">
                        Câu {index + 1} :{" "}
                        {element?.questionName || "Câu hỏi chưa có tiêu đề !"}
                      </P>

                      {element?.answers?.map((elementAnswers, indexAnswers) => {
                        return (
                          <Grid
                            container
                            key={indexAnswers}
                            style={{ margin: "0.5rem 0" }}
                            alignItems="center"
                          >
                            {iconAnswer}
                            <Span style={{ marginLeft: "1rem" }}>
                              {elementAnswers?.content}
                            </Span>
                          </Grid>
                        );
                      })}
                    </Grid>
                  );
              }
            })}
          </Grid>
        </Div>
      </Div>
    </Paper>
  );
};

export default ModalPreviewQuiz;

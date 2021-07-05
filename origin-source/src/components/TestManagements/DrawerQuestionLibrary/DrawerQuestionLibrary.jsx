import {
  Div,
  P,
  Span,
} from "@Components/common/TagAntdNotSupport/TagAntdNotSupport";
import {
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import "./styles.scss";
import { QUESTIONS, QUESTION_TYPE } from "./const";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

const { List } = require("immutable");

const DrawerQuestionLibrary = (props, ref) => {
  const { triggerOpenDrawerQuestionLibrary } = props;
  return (
    <Paper elevation={3} className="rc-paper-drawer-question-library">
      <Grid container justify="space-between" style={{ padding: "2rem 4rem" }}>
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
        <IconButton
          color="default"
          component="span"
          onClick={triggerOpenDrawerQuestionLibrary}
        >
          <CloseIcon
            style={{ cursor: "pointer", color: "gray", fontSize: "2rem" }}
          />
        </IconButton>
      </Grid>
      <Div className="rc-paper-drawer-question-library-overflow">
        <Div className="rc-paper-drawer-question-library-overflow-main">
          <Grid container spacing={2} justify="space-between">
            {QUESTIONS?.map((element, index) => {
              switch (element?.type) {
                case QUESTION_TYPE?.SHORT_ANSWER:
                  return (
                    <Grid
                      key={index}
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      style={{ padding: "1rem" }}
                    >
                      <Div className="rc-paper-drawer-question-library-item">
                        <P className="rc-paper-drawer-question-library-item-title">
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
                      </Div>
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
                      xs={12}
                      sm={6}
                      md={6}
                      style={{ padding: "1rem", boxSizing: "border-box" }}
                    >
                      <Div className="rc-paper-drawer-question-library-item">
                        <P className="rc-paper-drawer-question-library-item-title">
                          {element?.questionName || "Câu hỏi chưa có tiêu đề !"}
                        </P>

                        {element?.answers?.map(
                          (elementAnswers, indexAnswers) => {
                            return (
                              <Grid
                                container
                                key={indexAnswers}
                                style={{ padding: "0.5rem 1rem" }}
                                alignItems="center"
                              >
                                {iconAnswer}
                                <Span style={{ marginLeft: "1rem" }}>
                                  {elementAnswers?.content}
                                </Span>
                              </Grid>
                            );
                          }
                        )}
                      </Div>
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

export default React.forwardRef(DrawerQuestionLibrary);

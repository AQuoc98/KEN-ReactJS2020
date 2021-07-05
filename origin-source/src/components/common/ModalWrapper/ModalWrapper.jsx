import {
  Div,
  P
} from "@Components/common/TagAntdNotSupport/TagAntdNotSupport";
import { IconButton, Modal, Paper } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import classNames from "classnames";
import React from "react";
import "./styles.scss";

const ModalWrapper = (props) => {
  const { triggerModalWrapper, children, className, title } = props;
  return (
    <Modal
      open={true}
      // onClose={triggerModalWrapper}
      className="rc-modal-wrapper"
    >
      <Paper className={classNames("rc-modal-wrapper-paper", className)}>
        <Div className={"rc-modal-wrapper-paper-title-control"}>
          <P>{title}</P>
          <IconButton
            color="default"
            component="span"
            onClick={triggerModalWrapper}
            className={"rc-modal-wrapper-paper-close"}
          >
            <CloseIcon
              style={{ cursor: "pointer", color: "gray", fontSize: "2rem" }}
            />
          </IconButton>
        </Div>
        <Div className="rc-modal-wrapper-paper-overflow">
          <Div className="rc-modal-wrapper-paper-overflow-main">{children}</Div>
        </Div>
      </Paper>
    </Modal>
  );
};

export default ModalWrapper;

import { Img } from "@Components/common/TagAntdNotSupport/TagAntdNotSupport";
import {
  Modal,
  Paper
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import "./styles.scss";

const ModalAddAccount = (props) => {

  const {file,triggerOpenModalViewFile}=props
  const dispatch = useDispatch()
const src={};
 let viewer=null
 switch (file?.mimeType) {
  case "application/pdf":
    viewer=<object data={`/media/images/${file?.id}`} type="application/pdf" width="100%" height="100%">
    <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
</object>
    break;
    case "text/xml":

    
      viewer=<object data={`/media/images/${file?.id}`} type="application/pdf" width="100%" height="100%">
      <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
  </object>
      break;
  default:

    viewer=<Img   src={`/media/images/${file?.id}`}/>
    break;
}
  return (
    <Modal
      open={true}
      onClose={triggerOpenModalViewFile}
      className="rc-modal-view-file"
    >
      <Paper className="rc-modal-view-file-main">

        {
          viewer
        }
      </Paper>
    </Modal>
  );
};

export default ModalAddAccount;

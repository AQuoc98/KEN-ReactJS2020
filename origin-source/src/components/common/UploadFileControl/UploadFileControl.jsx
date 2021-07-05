import {
  Div,
  Img,
  P,
} from "@Components/common/TagAntdNotSupport/TagAntdNotSupport";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { postImageAction } from "./action";
import pdfIcon from "@Assets/images/Common/pdf-icon.png";
import xmlIcon from "@Assets/images/Common/xml-icon.png";
import "./styles.scss";
var fs = require('fs');
var FormData = require('form-data');

function FilterControl(props) {
  const { files, handleChangeFiles } = props;
  const editIndexRef = useRef();

  const [filesState, setFileState] = useState([]);
  const dispatch = useDispatch();

  const handleDeleteFile = (index) => {
    const copyFiles = [...files];
    const copyFilesState = [...filesState];
    copyFiles.splice(index, 1);
    copyFilesState.splice(index, 1);
    handleChangeFiles(copyFiles);

    setFileState(copyFilesState);
  };

  const handleEditFile = (event) => {
    const index = editIndexRef?.current;
    var file = event?.target?.files?.[0];
    const src = URL.createObjectURL(file);

    const { target = {} } = event || {};
    target.value = "";

    console.log(file);

    const reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = async function (e) {
      
      let dataForm = new FormData();
      console.log(files, index);
      dataForm.append("photo", file);
      const uploadResult = await dispatch(postImageAction(dataForm));
      const imageID = uploadResult?.data?.result?.id;
      if (imageID) {
        const copyFiles = [...files];
        copyFiles[index] = imageID;
        handleChangeFiles(copyFiles);

        //Local
        let fileSrc = src;
        switch (file?.type) {
          case "application/pdf":
            fileSrc = pdfIcon;
        }

        const infoFile = {
          src: fileSrc,
        };
        const copyFilesState = [...filesState];
        copyFilesState[index] = infoFile;
        setFileState(copyFilesState);
      }
    };
  };
  const handleChangeEditIndex = (index) => {
    editIndexRef.current = index;
  };

  const handleChangeFile = async (event) => {
    var file = event?.target?.files[0];
    console.log(file);

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
        const copyFiles = [...files];
        copyFiles.push(imageID);
        handleChangeFiles(copyFiles);

        //Local
        let fileSrc = src;
        switch (file?.type) {
          case "application/pdf":
            fileSrc = pdfIcon;
            break
          case "text/xml":
              fileSrc = xmlIcon;
              break
              default:
                break;

        }

        const infoFile = {
          src: fileSrc,
          name: file?.name,
        };
        const copyFilesState = [...filesState];
        copyFilesState.push(infoFile);
        setFileState(copyFilesState);
      }
    };
  };
  return (
    <Div className="upload-file-group">
      {filesState?.map((element, index) => {
        return (
          <Div className="upload-file-preview">
            <Div className="upload-file-item">
              <Img src={element?.src} />

              <Div className="upload-file-item-edit-delete-control">
                <label
                  htmlFor="file-upload-edit"
                  className="upload-file-item-label-edit"
                >
                  <EditIcon
                    onClick={() => handleChangeEditIndex(index)}
                    style={{ color: "white" }}
                  />
                </label>

                <DeleteOutlineIcon
                  onClick={() => handleDeleteFile(index)}
                  style={{ color: "white" }}
                />
              </Div>
              <input
                onChange={(e) => {
                  handleEditFile(e);
                }}
                webkitdirectory 
                directory
                id="file-upload-edit"
                type="file"
              />
            </Div>

            <P className="upload-file-preview-file-name">{element?.name}</P>
          </Div>
        );
      })}
      <Div className="upload-file-item">
        <label htmlFor="file-upload" className="upload-file-item-label">
          <AddIcon style={{ color: "gray" }} />
        </label>
        <input
          onChange={(e) => handleChangeFile(e)}
          id="file-upload"
          type="file"
        />
      </Div>
    </Div>
  );
}

export default FilterControl;

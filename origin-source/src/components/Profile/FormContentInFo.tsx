import React, { useState, useEffect } from "react";
//Component
import { Div, Img, Span, P } from "@Common/TagAntdNotSupport/TagAntdNotSupport";
import PopoverEditProfile from "@Components/Profile/PopoverEditProfile/index"
// import AddressPicker from "@Components/common/AddressPicker/AddressPicker"
// React Hook Form
import { useForm } from "react-hook-form";
//Const
import { typesPopover } from "@Pages/Profile/const";
// antd

// Img

import "./styles.scss"
interface IProps {
    dataInfoGrid: any,
  onSubmitProfile: Function,
  rowConfigItem: {
    id: string,
    name: string,
    type: string,
    className: string,
    popoverTitle: string,
    keyValue: string
  }
}

const FormContentInFo = (props: IProps) => {
  const { dataInfoGrid, onSubmitProfile, rowConfigItem } = props;

  // Popover
  const [typePopover, setTypePopover] = useState("");

  const [editProfileAnchorEl, setEditProfileAnchorEl] = useState(null);
  const handleClosePopoverEditProfile = () => setEditProfileAnchorEl(null);
  const handleOpenPopoverEditProfile = (event:any) => {
    setEditProfileAnchorEl(event.currentTarget);
  };
  const handleChangeVisiblePopover=(event:any,type:any)=>{
    setTypePopover(type);
    handleOpenPopoverEditProfile(event);
  }
  return (<>
      <Div className="value" id={rowConfigItem.className} onClick={(event:any)=>handleChangeVisiblePopover(event,rowConfigItem.type)} >
        <Span className={rowConfigItem.className}>
          {dataInfoGrid?.[rowConfigItem?.keyValue]?.value}
        </Span>
        {dataInfoGrid?.date && (
          <P className={rowConfigItem.className}>
            Thay đổi lần gần nhất :&nbsp;
            {dataInfoGrid?.date}
          </P>
        )}
      </Div>
     { editProfileAnchorEl? <PopoverEditProfile 
     dataInfoGrid={dataInfoGrid} 
     dataDefault={dataInfoGrid?.[rowConfigItem?.keyValue]} 
     onSubmit={onSubmitProfile} type={typePopover} 
     onClosePopover={handleClosePopoverEditProfile} 
     anchorEl={editProfileAnchorEl}/>
     :null}
     </>
  );
};

export default FormContentInFo;

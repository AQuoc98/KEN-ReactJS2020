
import React, { useEffect, useState,useRef } from "react";
import useStyles from "./style";
import PropTypes from "prop-types";
import moment from "moment"
import {
  DateRangePicker,
  LocalizationProvider,  
} from "@material-ui/pickers";

import MomentAdapter from "@material-ui/pickers/adapter/moment";
import calendarGrayIco from "@Assets/images/Common/calendar-gray-ico.svg"
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
function RangePickerUI(props) {
  const {handleChangeDate}=props
  const [date, setDate] = React.useState([null, null]);
  const [isOpen,setIsOpen]=useState(false);
  const classes=useStyles();

useEffect(() => {


}, [isOpen])
const onDateChange=(date)=>{
  setDate(date);
}

 
const handleClearDate=()=>{
  handleChangeDate([null,null]);
  setDate([null,null])
}
// console.log(date)
  return (
    <div className={classes.root}>
    <LocalizationProvider dateAdapter={MomentAdapter}>
      <DateRangePicker
        startText="_ _ / _ _ / _ _ _ _"
        endText="_ _ / _ _ / _ _ _ _"
        value={date}
        open={isOpen}
        onAccept={(date)=>{
          setIsOpen(false)
          handleChangeDate(date);

        }}
        onChange={date => onDateChange(date)}
        renderInput={(startProps, endProps) => (
          <>
          {isOpen?<div className={classes.backDrop}  onClick={()=>{
            setIsOpen(false) ;
            handleChangeDate(date);
          }
          }/>:null}

          <div className={classes.dateWrapper} onClick={()=>setIsOpen(true)}  >
              <div className={classes.group}  >
                <div className={classes.dateGroup}>
                  <p className={classes.dateTitle}>Từ ngày</p>
                  <input className={classes.dateContentInput} placeholder={"_ _ / _ _ / _ _ _ _"} value={date&&date[0] ?moment(date[0]).format("DD/MM/YYYY").toString():"_ _ / _ _ / _ _ _ _"} readOnly />
                </div>
              </div>
              <span className={classes.separator}><img src={calendarGrayIco} alt="Ico" /></span>
              <div className={classes.group}  >
                <div className={classes.dateGroup}>
                  <p className={classes.dateTitle}>Đến ngày</p>
                  <input className={classes.dateContentInput} placeholder={"_ _ / _ _ / _ _ _ _"} value={date&&date[1] ?moment(date[1]).format("DD/MM/YYYY").toString():"_ _ / _ _ / _ _ _ _"} readOnly  />
                </div>
              </div>
          </div>
      </>
        )}
      />
    </LocalizationProvider>
    <div onClick={handleClearDate} className={classes.closeIcon}>{(date[0]||date[1])?<HighlightOffIcon color="disabled" />:null}</div>
    </div>
  );
}

export default RangePickerUI;
RangePickerUI.propTypes = {
  startDate: PropTypes.string,
  endStart: PropTypes.string,
  onChangeDate:PropTypes.func

};

RangePickerUI.defaultProps = {
  startDate: "_ _ /_ _ / _ _ _ _",
  endDate: "_ _ /_ _ / _ _ _ _",
  onChangeDate:() => {},
};

//Lib
import React, {useEffect,useState } from 'react';
import {useSelector,useDispatch} from "react-redux"
//Component
// import { notification } from 'antd';
//Styled Component
import "./style.scss"
//Const
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import typeNotification from "./const"
//Types

import  {notificationResetAction} from "./action"
const Notification = () => {

  //======================Redux===================================
  //=====>Redux Action
  //=====>Redux Props
  const { notificationReducer } = useSelector((state:any) => ({
    notificationReducer: state.notificationReducer,
  }));

  const [showNotification,setShowNotification]=useState(false);
   const dispatch = useDispatch();
  //===================== Hook ==================================
  useEffect(() => {

    if(notificationReducer?.get("isNotification")){
     setShowNotification(true);
    }    
  }, [notificationReducer])
  
  const  oncloseAlert=()=>{
    dispatch(notificationResetAction());

    setShowNotification(false)
  }

  return<Snackbar open={showNotification} autoHideDuration={4000}  anchorOrigin={{
    vertical: 'top',
    horizontal: 'center',
}} onClose={oncloseAlert}>
  <Alert severity={notificationReducer?.get("typeNotification")}>
        {  notificationReducer?.get("description")}
  </Alert>
</Snackbar>


};

export default Notification;
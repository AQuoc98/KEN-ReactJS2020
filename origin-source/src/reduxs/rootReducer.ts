import loginReducer from "@Reduxs/Auth/reducer";
import profileReducer from  "@Reduxs/Profile/reducer";
//Common
import notificationReducer from "@Reduxs/Notification/reducer";
import refreshDataReducer from "@Reduxs/RefreshData/reducer";
import mediaReducer from "@Reduxs/Media/reducer";
import { combineReducers } from 'redux';

//Indivisual 
import questionLibraryReducer from "@Reduxs/QuestionLibrary/reducer";
import examReducer from  "@Reduxs/Exam/reducer";



export default combineReducers({
    notificationReducer,
    refreshDataReducer,
    mediaReducer,
    loginReducer,
    profileReducer,
    questionLibraryReducer, 
    examReducer, 
})
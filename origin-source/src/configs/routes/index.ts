//Layout
import DefaultLayout from "@Layouts/DefaultLayout/DefaultLayout";
import EmptyLayout from "@Layouts/EmptyLayout/EmptyLayout";
//Pages-Common
import ForgotPassword from "@Pages/ForgotPassword/ForgotPassword";
import Login from "@Pages/Login/Login";
import PageNotFound from "@Pages/PageNotFound/PageNotFound";
import Profile from "@Pages/Profile/Profile";
import Register from "@Pages/Register/Register";
import ResetPassword from "@Pages/ResetPassword/ResetPassword";
//Pages-Divisual
//Members
import ExamGroups from "@Pages/TestManagements/Members/ExamGroups/ExamGroups";
//QuestionLibrary
import QuestionCategories from "@Pages/TestManagements/QuestionLibrary/Categories/Categories";
import QuestionGroups from "@Pages/TestManagements/QuestionLibrary/Groups/Groups";
import QuestionList from "@Pages/TestManagements/QuestionLibrary/Questions/Questions";
import QuizCategories from "@Pages/TestManagements/Exam/Categories/Categories";
//Quiz
import QuizList from "@Pages/TestManagements/Exam/ExamList/ExamList";









export default [
  {
    label: "Register",
    path: "/register",
    exact: true,
    isPrivate: false,
    authenticatedRedirect: true, //Redirect to Home when login success
    component: Register,
    layout: EmptyLayout,
  },
  {
    label: "Login",
    path: "/Login",
    exact: true,
    isPrivate: false,
    authenticatedRedirect: true, //Redirect to Home when login success
    component: Login,
    layout: EmptyLayout,
  },
  {
    label: "Forgot Password",
    path: "/forgot-password",
    exact: true,
    isPrivate: false,
    authenticatedRedirect: true, //Redirect to Home when login success
    component: ForgotPassword,
    layout: EmptyLayout,
  },
  {
    label: "Reset Password",
    path: "/reset-password",
    exact: true,
    isPrivate: false,
    authenticatedRedirect: true, //Redirect to Home when login success
    component: ResetPassword,
    layout: EmptyLayout,
  },
  {
    label: "Profile ",
    path: "/profile",
    exact: true,
    isPrivate: true,
    authenticatedRedirect: false, //Redirect to Home when login success
    component: Profile,
    layout: DefaultLayout,
  },
//Quiz
  {
    label: "Test Managements Tests ",
    path: "/test-managements/exam/exam-list",
    exact: true,
    isPrivate: true,
    authenticatedRedirect: false, //Redirect to Home when login success
    component: QuizList,
    layout: DefaultLayout,
  },
  {
    label: "Test Managements  ",
    path: "/test-managements/exam/categories",
    exact: true,
    isPrivate: true,
    authenticatedRedirect: false, //Redirect to Home when login success
    component: QuizCategories,
    layout: DefaultLayout,
  },
  //QuestionLibrary
  {
    label: "Test Managements Library ",
    path: "/test-managements/question-library/questions",
    exact: true,
    isPrivate: true,
    authenticatedRedirect: false, //Redirect to Home when login success
    component: QuestionList,
    layout: DefaultLayout,
  },
  {
    label: "Test Managements Library ",
    path: "/",
    exact: true,
    isPrivate: true,
    authenticatedRedirect: false, //Redirect to Home when login success
    component:QuestionList,
    layout: DefaultLayout,
  },
  {
    label: "Test Managements Library ",
    path: "/test-managements/question-library/categories",
    exact: true,
    isPrivate: true,
    authenticatedRedirect: false, //Redirect to Home when login success
    component: QuestionCategories,
    layout: DefaultLayout,
  },
  {
    label: "Test Managements Library ",
    path: "/test-managements/question-library/groups",
    exact: true,
    isPrivate: true,
    authenticatedRedirect: false, //Redirect to Home when login success
    component: QuestionGroups,
    layout: DefaultLayout,
  },
  //Members
  {
    label: "Test Managements Members ",
    path: "/test-managements/members/exam-groups",
    exact: true,
    isPrivate: true,
    authenticatedRedirect: false, //Redirect to Home when login success
    component: ExamGroups,
    layout: DefaultLayout,
  },
//Test



  {
    label: "Page Not Found",
    path: "/",
    exact: false,
    authenticatedRedirect: false, //Redirect to Home when login success
    isPrivate: false,
    component: PageNotFound,
    layout: EmptyLayout,
  },
];

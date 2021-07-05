import folderIcon from "@Assets/images/Common/Header/folder-icon.svg";
import testQuizIcon from "@Assets/images/Common/Header/test-quiz-icon.svg";

export const MENU_DATA = [
  {
    id: "1",
    title: "Quản lý trăc nghiệm",
    icon: folderIcon,
    keyActive: "TEST_MANAGEMENT",
    permissions: ["admin"],
  },
  {
    id: "2",
    title: "Thi trắc nghiệm",
    keyActive: "QUIZ",
    icon: testQuizIcon,
    permissions: ["admin", "members"],
  },
];

export const NAVIGATION_MENU_DATA = {
  
  "TEST_MANAGEMENT":[
  {
    id: "1",
    title: "Bài kiểm tra",
    path: "/test-managements/exam/exam-list",
    pathActive:["/test-managements/exam/exam-list","/test-managements/exam/categories"]
  },
  {
    id: "2",
    title: "Thư viện câu hỏi",
    path: "/test-managements/question-library/questions",
    pathActive:["/","/test-managements/question-library","/test-managements/question-library/questions","/test-managements/question-library/categories","/test-managements/question-library/groups"]

  },
  {
    id: "2",
    title: "Thành viên",
    keyActive: "TEST_MANAGEMENT",
    path: "/test-managements/members/exam-groups",
    pathActive:["/test-managements/members/exam-groups"]

  },
],
"QUIZ":[
  {
    id: "1",
    title: "Bài kiểm tra",
    keyActive: "QUIZ",
    path: "/exam/tests",
  },
  {
    id: "2",
    title: "Nhóm",
    keyActive: "TEST_MANAGEMENT",
    path: "/exam/group",
  }
]




}

export const KEY_AVTIVE = {
  QUIZ: "QUIZ",
  TEST_MANAGEMENT: "TEST_MANAGEMENT",
};

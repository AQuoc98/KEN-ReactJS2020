export const profileConfigRender = [
  {
    id: "1",
    title: "Tài khoản",
    rowConfig: [
      {
        id: "1.1",
        name: "Email",
        type: "EMAIL",
        className: "email",
        popoverTitle: "email",
        keyValue: "email",
      },
      {
        id: "1.2",
        name: "Password",
        type: "CHANGE_PASSWORD",
        className: "password",
        popoverTitle: "Đổi mật khẩu",
        keyValue: "password",
      },
    ],
  },
  {
    id: "2",
    title: "Thông tin liên hệ",
    rowConfig: [
      {
        id: "2.1",
        name: "Tên",
        type: "CHANGE_FULL_NAME",
        popoverTitle: "Họ và tên",
        keyValue: "fullName",
      },
      {
        id: "2.2",
        name: "Sinh nhật",
        type: "CHANGE_BIRTHDAY",
        popoverTitle: "Sinh nhật",
        keyValue: "dateOfBirth",
      },
      {
        id: "2.3",
        name: "Điện thoại",
        className: "phone",
        type: "CHANGE_PHONE",
        popoverTitle: "Số điện thoại",
        keyValue: "phone",
      },
      {
        id: "2.4",
        name: "Địa chỉ",
        className: "company",
        type: "CHANGE_ADDRESS",
        popoverTitle: "Địa chỉ",
        keyValue: "address",
      },
    ],
  }
];
export const itemsList = [
  {
    id: "1",
    name: "Mật khẩu cũ",
    placeHolder: "Mật khẩu cũ",
    a: "LockFilled",
  },
  {
    id: "2",
    name: "Mật khẩu mới",
    placeHolder: "Mật khẩu cũ",
  },
  {
    id: "3",
    name: "Nhập lại mật khẩu mới",
    placeHolder: "Mật khẩu cũ",
  },
];
export const typesPopover = {
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  CHANGE_ADDRESS: "CHANGE_ADDRESS",
  CHANGE_FULL_NAME: "CHANGE_FULL_NAME",
  CHANGE_PHONE: "CHANGE_PHONE",
  CHANGE_BIRTHDAY: "CHANGE_BIRTHDAY",
  CHANGE_COMPANY: "CHANGE_COMPANY",
};

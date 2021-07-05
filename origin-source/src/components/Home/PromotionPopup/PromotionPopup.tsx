import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import moment from "moment"
//Style
import "./styles.scss"
//Helper
import { save, get, remove } from "@Helpers/localStorage"
//Image
import promotionImages from "@Assets/images/Home/promotion-images.png"
//Component
import { Div, Img } from "@Components/common/TagAntdNotSupport/TagAntdNotSupport"
// import { Modal } from 'antd';
//Const
import { POPUP_HISTORY, EXPIRED } from "./const"
const PromotionPopup = (props: any) => {

  const popupHistory = get(POPUP_HISTORY);
  const [isModalVisible, setIsModalVisible] = useState(false);

  //Check Expired POPUP
  if (popupHistory) {
    const currentTimesUnix = moment().unix()
    const expiredPopupUnix: number = parseInt(popupHistory);
    if (currentTimesUnix > expiredPopupUnix) {
      setIsModalVisible(true);
      save(POPUP_HISTORY, moment().unix() + EXPIRED)
    }
  }
  else {
    setIsModalVisible(true);
    save(POPUP_HISTORY, moment().unix() + EXPIRED)

  }

  return (
    <Div className="rc_promotion_popup">
      {/* <Modal visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)} >
        <Div className="rc_promotion_popup-content">
          <Link to="/advertiserment">
            <Img src={promotionImages} alt="Images" />
          </Link>
        </Div>
      </Modal> */}
    </Div>
  );
};

export default (PromotionPopup);

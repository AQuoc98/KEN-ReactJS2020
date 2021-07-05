//Lib
import React from 'react';
//Component
import { Div ,Img} from "@Common/TagAntdNotSupport/TagAntdNotSupport"
//Styled Component
import "./styles.scss"
//Img
import noDataFound from "@Assets/images/Common/no-data-found-img.png"
//Const

const NoDataFound = () => {
  return (
    <Div className="src-no-data" >
      <Img src={noDataFound} alt="Img"/>
    </Div>
  );
};

export default NoDataFound;
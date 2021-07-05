import placeLocalizerIco from "@Assets/images/Profile/place-localizer-ico.svg";
import {
  Grid, TextField
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
//Ico
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import useStyles from "./style";




function ProvinceUI(props) {
  const {provinceDefault,districtDefault,onChangeAddress}=props;
  const [province,setProvince]=useState(provinceDefault);
  const [district,setDistrict]=useState(districtDefault);



  const [provinces,setProvinces]=useState([]);
  const [districts,setDistricts]=useState([]);
  const classes = useStyles();
  const firstRequestProvinceKey=useRef(0)
 const  handleChangeProvince= (event,value) => {
   if(value){
    firstRequestProvinceKey.current=1;
    setProvince(value?.id);
    onChangeAddress("province",value?.id)
   }

};

const handleChangeDistrict=(event,value)=>{
  if(value){
  setDistrict(value?.id);
  onChangeAddress("district",value?.id)
  }


}
useEffect( () => {
  async function fetchData() {
    axios.get("/core-service/provinces").then(responses => {
        const provinceList = responses?.data?.result;
        setProvinces(provinceList)
      }).catch(errors => {
        // alert("Get district fail !")
      });
  }
  fetchData();
  


}, [])
useEffect( () => {

  async function fetchData() {

    axios.get(`/core-service/provinces/${province}/districts`).then(responses => {
        const districtList = responses.data.result;
        // console.log(districtList)
        setDistricts(districtList);
    if( firstRequestProvinceKey.current){
    onChangeAddress("district",districtList[0].id);
     console.log(districtList[0].id)
     setDistrict(districtList[0].id)

    }
      }).catch(errors => {
        // alert("Get district fail !")
      });


   
  }
  fetchData();
}, [province])
console.log(provinces.find(element=>element.id===province))
  return (
    <Grid container className={classes.root}>
      <Grid
        container
        spacing={1}
        alignItems="center"
        className={classes.contentItem}
      >
        <Grid item>
          <img src={placeLocalizerIco} alt="ico" />
        </Grid>
        <Grid item className={classes.inputField}>

                  <Autocomplete
            id="combo-box-demo"
            value={provinces.length?provinces.find(element=>element.id===province):{}}
            options={provinces}
            getOptionLabel={(option) => option.name||""}
            onChange={handleChangeProvince}
            style={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Tỉnh"  />}
          />
   
        </Grid>
      </Grid>

      <Grid
        container
        spacing={1}
        alignItems="center"
        className={classes.contentItem}
      >
        <Grid item>
          <img src={placeLocalizerIco} alt="ico" />
        </Grid>
        <Grid item className={classes.inputField}>
       
        <Autocomplete
            id="combo-box-demo"
            value={districts.length?districts.find(element=>element.id===district):{}}
            options={districts}
            getOptionLabel={(option) => option.name||""}
            onChange={handleChangeDistrict}
            style={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Quận Huyện"  />}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProvinceUI;

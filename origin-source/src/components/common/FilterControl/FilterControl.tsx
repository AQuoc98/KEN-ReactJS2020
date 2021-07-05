
import React, {useRef} from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import filterIco from "@Assets/images/Common/filter_ico.svg"
import "./styles.scss"
interface IProps{
  filterData:Array<any>,
  onChange:Function,
  defaultValue?:String
}
function FilterControl(props:IProps) {
  const {filterData,defaultValue,onChange}=props;
  const handleChangeFilter=(event:any,value:any)=>{
    onChange(value)
  }
  return (
     <Autocomplete
    id="size-small-standard"
    options={filterData}
    getOptionLabel={(option) => option?.title}
    defaultValue={defaultValue}
    disableClearable={true}
    popupIcon={<img src={filterIco}></img>}
    className={"rc-autocomplete-filter"}
    onChange={(event,value)=>handleChangeFilter(event,value)}
    renderInput={(params) => (
      <TextField {...params} className={"rc-autocomplete-filter-text-field"} placeholder="Chọn"/>
    )}
  />
  );
}

export default FilterControl;
import {makeStyles} from '@material-ui/core/styles'

export default makeStyles(theme => ({
    root: {
        padding:"20px 20px",
        maxWidth: "400px",
         fontFamily:"Roboto-Light"

    },
    titlePopover:{
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "24px",
        lineHeight: "28px",
        color: "#797979",
         marginBottom:"20px"
    },
    buttonCancel:{
        color:"#797979",
        marginRight:"50px"
    },
    groupButtonControl:{
        display:"flex",
         justifyContent:"flex-end",
          marginTop:"50px"
    },
    content:{
        "& .MuiFormControl-root":{
            width:"100%"
        }
    },
    contentItem:{
        marginBottom:"20px"
    },
    inputField:{
        width:"calc(100% - 50px)"
    },
    textField:{
        width:"100%"
    },
    errorMessages:{
         color:"red",
         marginTop:"10px"
    }
   
}))
  
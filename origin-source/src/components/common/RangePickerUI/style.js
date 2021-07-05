import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  
    root:{
        position:"relative",
         display:"flex",
         alignItems:"center",
         borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
    },
    dateWrapper:{
        display:"flex",
        alignItems:"center",
        color: "#C6C4C4",
        justifyContent:"space-between",
        maxWidth:"390px",
        cursor:"text",
        position:"relative",
    
    },
    group:{
        display:"flex",
        alignItems:"center",
        color: "#C6C4C4",

    },
    dateGroup:{
        // marginRight:"20px",
    },
    separator:{
        fontSize:"30px",
        display:"inline-block",
        margin:"0 10px  0 10px"
    },
    dateTitle:{
        margin:"0.5rem"
    },
    dateContentInput:{
        border:"none",
        outline:"none",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "1rem",
        lineHeight: "14px",
        color: "#737373",
        backgroundColor: "#fafafa",
        width:"80px",
        cursor:"pointer"

    },
    backDrop:{
        width:"100vw",
        height:"100vh",
        position:"fixed",
        top:"0px",
        left:"0px",
    },
    buttonSearch:{
        position:"absolute",
        top:"380px",
        left:"230px",
        zIndex:9999
    },
    closeIcon:{
        cursor:"pointer",
        marginLeft:"10px"

    }
}))
  
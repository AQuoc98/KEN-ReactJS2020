import {makeStyles} from '@material-ui/core/styles'

export default makeStyles(theme => ({

    '@global': {
        ".MuiTextField-root":{
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
  
}))
  
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, RouteProps } from 'react-router-dom'

// import { getAuth } from '@/selectors'

interface PrivateRouteProps extends RouteProps {
  component: any,
  path:string,
  layout:any
}

 const PrivateRoute: React.FC<PrivateRouteProps> = ({ component,path,layout, ...rest }) => {


  
  const { loginReducer } = useSelector((state: any) => ({
    loginReducer: state.loginReducer,
  }));
  const  isAuthenticated  = loginReducer?.get("payload")?.get("result")?.get("token");
  return (
    <Route
    path={path}
    render={(props) =>
        isAuthenticated ?React.createElement( layout, props, React.createElement(component, {...props,...rest}))
         :
          <Redirect to="/login" />
      }
      {...rest}
    />

  )
}

export default PrivateRoute

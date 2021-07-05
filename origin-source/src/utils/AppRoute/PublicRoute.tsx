import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, RouteProps } from 'react-router-dom'

// import { getAuth } from '@/selectors'

interface PublicRouteProps extends RouteProps {
  component: any,
  path:string,
  layout:any,
  authenticatedRedirect:boolean,
}


  const PublicRoute: React.FC<PublicRouteProps> = ({ component,path,layout,authenticatedRedirect, ...rest }) => {
    const { loginReducer } = useSelector((state: any) => ({
      loginReducer: state.loginReducer,
    }));
    const  isAuthenticated  = loginReducer?.get("payload")?.get("result")?.get("token");  
    return (
      <Route
      path={path}
      render={(props) =>
     !(isAuthenticated&&authenticatedRedirect) ?React.createElement( layout, props, React.createElement(component, {...props,...rest}))
           :
            <Redirect to="/" />
        }
        {...rest}
      />

    )
  }

  export default PublicRoute;

import React, { Fragment, Component } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"
interface IRouteWithLayoutProps {
  component: any;
  layout: any;
  path:string,
  isPrivate:boolean,
  authenticatedRedirect:boolean,
  rest?: any;
}
function RouteWithLayout(props:IRouteWithLayoutProps){
  const { component,layout,path,isPrivate,authenticatedRedirect,...rest}= props;
  return (
    isPrivate?<PrivateRoute component={component} path={path} layout={layout} {...rest} />:<PublicRoute  component={component} path={path} layout={layout} authenticatedRedirect={authenticatedRedirect} {...rest} />
  );
}
export default RouteWithLayout;
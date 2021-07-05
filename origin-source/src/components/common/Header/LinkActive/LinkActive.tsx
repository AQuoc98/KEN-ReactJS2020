import classnames from "classnames";
import React from 'react';
import { Link } from 'react-router-dom';
import "./style.scss";
interface ILinkActiveProps {
    path: string,
    navItemName: string,
    rest?: any,
    pathActive?: any
}

const LinkActive = (props: ILinkActiveProps) => {
    const { path,pathActive, navItemName, ...rest } = props
    const pathname = window.location.pathname;
    let isActive = pathActive?.includes(pathname) ;
    return (
            <Link className={classnames("rc-nav-item", {
                'rc-nav-item-active': isActive,
            })} to={path} {...rest}>{navItemName}</Link>
    );

}

export default LinkActive;
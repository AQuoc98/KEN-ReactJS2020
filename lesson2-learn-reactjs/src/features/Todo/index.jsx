import React, { useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

TodoFeature.propTypes = {

};

function TodoFeature(props) {
    const match = useRouteMatch()


    return (
        <div>
            <Switch>
                <Route path={match.path} exact component={ListPage} />
                <Route path={`${match.path}/:todoId`} component={DetailPage} />
            </Switch>
        </div>
    );
}

export default TodoFeature;

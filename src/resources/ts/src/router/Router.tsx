import React from 'react';
import { memo, VFC } from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from '../components/pages/Home';
import $ from 'jquery';

import { Login } from '../components/pages/Login';
import { Page404 } from '../components/pages/Page404';
import { HeaderLayout } from '../components/templates/HeaderLayout';
import { LoginUserProvider } from '../providers/LoginUserProvider';
import { homeRoutes } from './HomeRoutes';
import { UserManagement } from '../components/pages/UserManagement';
import { Setting } from '../components/pages/Setting';
import { MyPage } from '../components/pages/MyPage';

export const Router: VFC = memo(() => {
    return (
        <Switch>
            <LoginUserProvider>
                <Route exact path="/react_user_management">
                    <Login />
                    {/* <MyPage /> */}
                    {/* <UserManagement /> */}
                    {/* <Setting /> */}
                </Route>
                <Route path="/react_user_management/home" render={({ match: { url } }) => (
                    <Switch>
                        {homeRoutes.map((route) => (
                            <Route
                                key={route.path}
                                exact={route.exact}
                                path={`${url}${route.path}`}
                            >
                                <HeaderLayout>
                                    {route.children}
                                </HeaderLayout>
                            </Route>
                        ))}
                    </Switch>
                )}/>
            </LoginUserProvider>
            <Route path="*">
                    <Page404 />
                </Route>
        </Switch>
    )
});

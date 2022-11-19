import React from 'react';
import { memo, VFC } from "react";
import { Route, Switch } from "react-router-dom";

import { Login } from '../components/pages/Login';
import { Page404 } from '../components/pages/Page404';
import { HeaderLayout } from '../components/templates/HeaderLayout';
import { LoginUserProvider } from '../providers/LoginUserProvider';
import { UserManagement } from '../components/pages/UserManagement';
import { Setting } from '../components/pages/Setting';
import { MyPage } from '../components/pages/MyPage';
import { SignUp } from '../components/pages/SignUp';

export const Router: VFC = memo(() => {
    return (
        <Switch>
            <LoginUserProvider>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route exact path="/react_user_management/my_page">
                    <HeaderLayout>
                        <MyPage />
                    </HeaderLayout>
                </Route>
                <Route exact path="/react_user_management/user_management">
                    <HeaderLayout>
                        <UserManagement />
                    </HeaderLayout>
                </Route>
                <Route exact path="/react_user_management/setting">
                    <HeaderLayout>
                        <Setting />
                    </HeaderLayout>
                </Route>
                <Route exact path="/sign-up">
                    <SignUp />
                </Route>
                {/* <Route exact path="*">
                    <Page404 />
                </Route> */}
            </LoginUserProvider>
        </Switch>
    )
});

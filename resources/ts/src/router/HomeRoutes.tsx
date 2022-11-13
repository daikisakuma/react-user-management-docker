import React from 'react';
import { Children } from "react";
import { Home } from "../components/pages/Home";
import { MyPage } from '../components/pages/MyPage';
import { Page404 } from '../components/pages/Page404';
import { Setting } from '../components/pages/Setting';
import { UserManagement } from '../components/pages/UserManagement';

export const homeRoutes = [
    {
        path: "/",
        exact: true,
        children: <Home />
    },
    {
        path: "/my_page",
        exact: false,
        children: <MyPage />
    },
    {
        path: "/user_management",
        exact: false,
        children: <UserManagement />
    },
    {
        path: "/setting",
        exact: false,
        children: <Setting />
    },
    {
        path: "*",
        exact: false,
        children: <Page404 />
    },
]

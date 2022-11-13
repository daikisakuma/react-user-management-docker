import React, { useCallback, useEffect } from 'react';
import { memo, VFC } from "react";
import { Link } from "@chakra-ui/react";
import  { useHistory } from "react-router-dom"
import { useLoginUser } from '../../../hooks/useLoginUser';


export const SideBar: VFC = memo(() => {
    const history = useHistory();
    const { loginUser } = useLoginUser();

    const onClickHome = useCallback(() => history.push("/react_user_management/home"), []);
    const onClickMyPage = useCallback(() => history.push("/react_user_management/my_page"), []);
    const onClickUserManagement = useCallback(() => history.push("/react_user_management/user_management"), []);
    const onClickSetting = useCallback(() => history.push("/react_user_management/setting"), []);

        let path = location.pathname
        const pathAry = path.split('/');
        const lastPathAry = pathAry[pathAry.length - 1]



    return (
        <nav className="sidebar">
            <h2>ユーザー管理</h2>
            <ul>
                <li><Link onClick={onClickMyPage} className={lastPathAry == "my_page" ? "selected-color" : ""}><i className="fas fa-home"></i>マイページ</Link></li>
                <li><Link  onClick={onClickUserManagement} className={lastPathAry == "user_management" ? "selected-color" : ""}><i className="fa fa-users" aria-hidden="true"></i>ユーザー一覧</Link></li>
                {loginUser?.is_admin && (
                <li><Link onClick={onClickSetting} className={lastPathAry == "setting" ? "selected-color" : ""}><i className="fa fa-cog" aria-hidden="true"></i>設定</Link></li>
                )}
            </ul>
        </nav>
    );
});

import { useCallback, useState } from "react"
import axios from "axios";
import { useHistory } from "react-router-dom";
import $ from 'jquery';

import { User } from "../types/api/user";
import { useMessage } from "./useMessage";
import { useLoginUser } from "./useLoginUser";

export const useAuth = () => {
    const history = useHistory();
    const { showMessage } = useMessage();
    const { setLoginUser } = useLoginUser();
    const [loading, setLoading] = useState(false);

    const login = useCallback((email: string, password: string) => {
        setLoading(true);
        axios.post<User>($("#react-user-management").data("api-get-user"), {
            email   : email,
            password: password,
        }).then((res) => {
            if (res.data) {
                const isAdmin = res.data.id === 1000 ? true : false;
                setLoginUser({ ...res.data, isAdmin });
                showMessage({ title: "ログインしました", status: "success" });
                history.push("/react_user_management/my_page")
            } else {
                showMessage({ title: "ユーザーが見つかりません", status: "error" });
                setLoading(false);
            }
        })
        .catch(() => {
            showMessage({ title: "ログインできません", status: "error" })
            setLoading(false);
        });
    }, [history, showMessage]);
    return { login, loading, setLoginUser }
}

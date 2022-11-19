import axios from "axios";
import { useCallback, useState } from "react"
import { useMessage } from "./useMessage";

type Registeruser = {
    name    : string;
    email   : string;
    password: string;
}

export const useRegisterUser = () => {
    const { showMessage } = useMessage();

    const [ loading, setLoading ] = useState(false);

    const registerUser = useCallback((url, request) => {
        setLoading(true);
        axios.post<Registeruser>(url, request)
        .then((res) => showMessage({ title: "ユーザー登録が成功しました", status: "success" })
        )
        .catch(() => {
            showMessage({ title: "ユーザー登録に失敗しました", status: "error" })
        })
        .finally(() => {
            setLoading(false);
        })
    }, [])
    return { registerUser, loading }
}

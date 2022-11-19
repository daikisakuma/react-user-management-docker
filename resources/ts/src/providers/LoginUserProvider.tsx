import React, { useEffect, useMemo } from 'react';
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { useHistory } from 'react-router-dom';
import { User } from "../types/api/user";

type LoginUser = User & { isAdmin: boolean };

export type LoginUserContextType = {
    loginUser: LoginUser | null;
    setLoginUser: Dispatch<SetStateAction<LoginUser | null>>;
}

export const LoginUserContext = createContext<LoginUserContextType>({} as LoginUserContextType);

export const LoginUserProvider = (props: {children: ReactNode}) => {
    const {children} = props;
    const [loginUser, setLoginUser] = useState<LoginUser | null>(null);
    const history = useHistory();

    const lastPathAry = useMemo(() => {
        let path = location.pathname
        const pathAry = path.split('/');
        return pathAry[pathAry.length - 1]
    }, [location])


    useEffect(() => {
        if (loginUser && Object?.keys(loginUser)?.length > 0) {
            localStorage.setItem('keyLoginUser', JSON.stringify(loginUser))
        }
    }, [loginUser])

    useEffect(() => {
        const appState = localStorage.getItem('keyLoginUser')
        const initialState = appState ? JSON.parse(appState) : []
        setLoginUser(initialState)
    }, [])

    useEffect(() => {
        const appState = localStorage.getItem('keyLoginUser')
        if (lastPathAry == "sign-up") return
        if(!loginUser && !appState) {
            history.push("/")
        }
    }, [loginUser, lastPathAry])

    return (
        <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
            {children}
        </LoginUserContext.Provider>
    )
}

import React, { useEffect } from 'react';
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
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

    useEffect(() => {
        loginUser && localStorage.setItem('keyLoginUser', JSON.stringify(loginUser))
    }, [loginUser])

    useEffect(() => {
        const appState = localStorage.getItem('keyLoginUser')
        const initialState = appState ? JSON.parse(appState) : []
        setLoginUser(initialState)
    }, [])

console.log('loginUser', loginUser)
    return (
        <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
            {children}
        </LoginUserContext.Provider>
    )
}

import React, { ReactNode } from 'react';
import { memo, VFC } from "react";
import { Header } from '../organisms/layout/Header';
import { SideBar } from '../organisms/layout/SideBar';

type Props = {
    children: ReactNode;
}

export const HeaderLayout: VFC<Props> = memo((props) => {
    const { children } = props;
    return (
        <>
            <SideBar />
            {children}
        </>
    );
});

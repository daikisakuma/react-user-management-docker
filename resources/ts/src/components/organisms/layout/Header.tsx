import React, { useCallback } from 'react';
import { memo, VFC } from "react";
import { Box, Flex, Heading, Link, useDisclosure } from "@chakra-ui/react";
import  { useHistory } from "react-router-dom"

import { MenuIconButton } from '../../atoms/button/MenuIconButton';
import { MenuDrawer } from '../../molecules/MenuDrawer';
import { useLoginUser } from '../../../hooks/useLoginUser';


export const Header: VFC = memo(() => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const history                     = useHistory();
    const { loginUser }               = useLoginUser();

    const onClickHome = useCallback(() => history.push("/react_user_management/home"), []);
    const onClickMyPage = useCallback(() => history.push("/react_user_management/home/my_page"), []);
    const onClickUserManagement = useCallback(() => history.push("/react_user_management/home/user_management"), []);
    const onClickSetting = useCallback(() => history.push("/react_user_management/home/setting"), []);

    return (
        <>
            <Flex
                as="nav"
                bg="teal.500"
                color="gray.50"
                align="center"
                justify="space-between"
                padding={{ base: 3, md: 5 }}
            >
                <Flex
                    align="center"
                    as="a" mr={8}
                    _hover={{ cursor: "pointer" }}
                    onClick={onClickHome}
                >
                    <Heading as="h1" fontSize={{ base:"md", md: "lg" }}>
                        ユーザー管理アプリ
                    </Heading>
                </Flex>
                <Flex align="center" fontSize="sm" flexGrow={2} display={{ base: "none", md: "flex" }}>
                    <Box pr={4}>
                        <Link onClick={onClickMyPage}>マイページ</Link>
                    </Box>
                    <Box pr={4}>
                        <Link onClick={onClickUserManagement}>ユーザー一覧</Link>
                    </Box>
                    {loginUser.isAdmin && (
                        <Box pr={4}>
                            <Link onClick={onClickSetting}>設定</Link>
                        </Box>
                    )}
                </Flex>
                <MenuIconButton onOpen={onOpen}/>
            </Flex>
            <MenuDrawer
                onClose={onClose}
                isOpen={isOpen}
                onClickHome={onClickHome}
                onClickUserManagement={onClickUserManagement}
                onClickSetting={onClickSetting}
            />
        </>
    );
});

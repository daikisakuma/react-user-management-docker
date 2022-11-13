import React, { ChangeEvent, useState } from 'react';
import { memo, VFC } from "react";
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { PrimaryButton } from '../atoms/button/PrimaryButton';
import { useAuth } from '../../hooks/useAuth';

export const Login: VFC = memo(() => {
    const { login, loading } = useAuth();
    const [email, setEmail] = useState('');

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

    const onClickLogin = () => login(email);

    return (
        <>
            <Flex align="center" justify="center" height="90vh">
                <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
                    <Heading as="h1" size="lg" textAlign="center">
                        ユーザー管理アプリa
                    </Heading>
                    <Divider my={4}/>
                    <Stack spacing={6} py={4} px={10}>
                        <Input placeholder="メールアドレス" value={email} onChange={onChangeEmail}/>
                        <PrimaryButton
                            disabled={email === ""}
                            loading={loading}
                            onClick={onClickLogin}
                        >
                            ログイン
                        </PrimaryButton>
                    </Stack>
                </Box>
            </Flex>

            {/* <Link to="/react_user_management/home">Home</Link>
            <br />
            <Link to="/react_user_management/home/user_management">ユーザー管理ページ</Link>
            <br />
            <Link to="/react_user_management/home/setting">設定ページ</Link> */}
        </>
    );
});

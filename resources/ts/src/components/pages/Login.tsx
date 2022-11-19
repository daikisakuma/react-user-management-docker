import React, { ChangeEvent, useCallback, useState } from 'react';
import { memo, VFC } from "react";
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { PrimaryButton } from '../atoms/button/PrimaryButton';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import styled from "styled-components";

export const Login: VFC = memo(() => {
    const { login, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const onClickLogin = () => login(email, password);

    const pressEnter = useCallback((e) => {
        if (e.key == 'Enter') {
            login(email, password)
        }
    }, [login, email, password])

    return (
        <>
            <Flex align="center" justify="center" height="90vh">
                <Box bg="white" w="lg" p={4} borderRadius="md" shadow="md">
                    <Heading as="h1" size="lg" textAlign="center">
                        ユーザー管理アプリ
                    </Heading>
                    <Divider my={4}/>
                    <Stack spacing={6} py={4} px={10}>
                        <Input
                            placeholder="メールアドレス"
                            value={email}
                            onChange={onChangeEmail}
                            onKeyPress={pressEnter}
                        />
                        <Input
                            placeholder="パスワード"
                            value={password}
                            type="password"
                            onChange={onChangePassword}
                            onKeyPress={pressEnter}
                        />
                        <PrimaryButton
                            disabled={email === ""}
                            loading={loading}
                            onClick={onClickLogin}
                        >
                            ログイン
                        </PrimaryButton>
                    </Stack>
                    <LinkWithStyled to='/sign-up'>新規登録はこちら</LinkWithStyled>
                </Box>
            </Flex>
        </>
    );
});

const LinkWithStyled = styled(Link)`
    display: flex;
    justify-content: right;
    color: #0000EE;
    margin-top: 10px;
`

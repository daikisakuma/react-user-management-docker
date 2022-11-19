import React, { ChangeEvent, useCallback, useState } from 'react';
import { memo, VFC } from "react";
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { PrimaryButton } from '../atoms/button/PrimaryButton';
import { useRegisterUser } from '../../hooks/useRegisterUser';
import $ from 'jquery';

export const SignUp: VFC = memo(() => {
    const { registerUser, loading } = useRegisterUser();

    const [name, setName]             = useState('');
    const [email, setEmail]           = useState('');
    const [password, setPassword]     = useState('');
    const [emailError, setEmailError] = useState(null);

    let url: string = $("#react-user-management").data("api-register-user")
    let request: {} = {
        name,
        email,
        password
    }

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        if (!isValidEmail(e.target.value)) {
            setEmailError('※正しい形式で入力してください');
        } else {
        setEmailError(null);
        }
        setEmail(e.target.value)
    };

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const onClickRegisterUser = useCallback(() => {
        registerUser(url, request)
    }, [url, request]);

    const pressEnter = useCallback((e) => {
        if (e.key == 'Enter') {
            registerUser(url, request)
        }
    }, [registerUser, url, request])

    const isValidEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    return (
        <>
            <Flex align="center" justify="center" height="90vh">
                <Box bg="white" w="lg" p={4} borderRadius="md" shadow="md">
                    <Heading as="h1" size="lg" textAlign="center">
                        新規登録
                    </Heading>
                    <Divider my={4}/>
                    <Stack spacing={6} py={4} px={10}>
                        <Input
                            placeholder="名前"
                            value={name}
                            type="password"
                            onChange={onChangeName}
                            onKeyPress={pressEnter}
                        />
                        <Input
                            placeholder="メールアドレス"
                            value={email}
                            onChange={onChangeEmail}
                            onKeyPress={pressEnter}
                            style={emailError && {border: 'red 1px solid'}}
                        />
                        {emailError && <div style={{color: 'red', marginTop: '5px'}}>{emailError}</div>}
                        <Input
                            placeholder="パスワード"
                            value={password}
                            onChange={onChangePassword}
                            onKeyPress={pressEnter}
                        />
                        <PrimaryButton
                            disabled={!name || !email || !password || emailError}
                            loading={loading}
                            onClick={onClickRegisterUser}
                        >
                            登録
                        </PrimaryButton>
                    </Stack>
                </Box>
            </Flex>
        </>
    );
});


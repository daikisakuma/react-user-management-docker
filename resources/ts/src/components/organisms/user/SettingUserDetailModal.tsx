import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { memo, VFC } from "react";
import { FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalCloseButton, ModalFooter, ModalHeader, ModalOverlay, Stack, Select } from "@chakra-ui/react";
import $ from 'jquery';

import { User } from '../../../types/api/user';
import { PrimaryButton } from '../../atoms/button/PrimaryButton';
import { useUpdate } from '../../../hooks/useUpdate';


type Props = {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
    getUsers: () => void;
};

export const SettingUserDetailModal: VFC<Props> = memo((props) => {
    const { user, isOpen, onClose, getUsers } = props;

    const [name, setName]   = useState("");
    const [email, setEmail] = useState("");
    const { updateUser }    = useUpdate();

    const [isShowState, setIsShowState]   = useState(null)
    const [isAdminState, setIsAdminState] = useState(null)

    const onChangeName    = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const onChangeEmail   = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const onChangeIsShow  = (e: { target: { value: any; }; }) => setIsShowState(e.target.value);
    const onChangeIsAdmin = (e: { target: { value: any; }; }) => setIsShowState(e.target.value);
    const onClickUpdate   = () => updateUser("#form-user-update", '', onClose, getUsers, "settingUserDetail");

    useEffect(() => {
        setName(user?.name ?? '');
        setEmail(user?.email ?? '');
        setIsShowState(user?.is_show)
        setIsAdminState(user?.is_admin)
    }, [user])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            autoFocus={false}
        >
        <ModalOverlay>
            <ModalContent
                pb={2}
                w="500px"
                min-height="500px"
            >
                <ModalHeader>
                    ユーザー詳細
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody mx={4}>
                    <form id="form-user-update" action={$("#react-user-management").data("api-update-user")} method='post'>
                        <input type="hidden" name="id" value={user?.id} />
                        <Stack spacing={4}>
                            <FormControl>
                                <FormLabel>
                                    名前
                                </FormLabel>
                                <Input value={name} name="name" onChange={onChangeName}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>
                                    メールアドレス
                                </FormLabel>
                                <Input value={email} name="email" onChange={onChangeEmail}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>
                                    一覧表示
                                </FormLabel>
                                <Select name="is_show" value={isShowState ?? ''} onChange={onChangeIsShow}>
                                    <option value=''>表示しない</option>
                                    <option value='1'>表示する</option>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>
                                    管理者権限
                                </FormLabel>
                                <Select name="is_admin" value={isAdminState ?? ''} onChange={onChangeIsAdmin}>
                                    <option value=''>権限なし</option>
                                    <option value='1'>権限あり</option>
                                </Select>
                            </FormControl>
                        </Stack>
                    </form>


                </ModalBody>
                    <ModalFooter>
                        <PrimaryButton  onClick={onClickUpdate}>更新</PrimaryButton>
                    </ModalFooter>
            </ModalContent>
        </ModalOverlay>
    </Modal>
    )
});

import React, { useCallback, useEffect } from 'react';
import { memo, VFC } from "react";
import { useDisclosure } from "@chakra-ui/react";

import { useAllUsers } from '../../hooks/useAllUsers';
import { PrimaryButton } from '../atoms/button/PrimaryButton';
import { SettingUserDetailModal } from '../organisms/user/SettingUserDetailModal';
import { useSelectUser } from '../../hooks/useSelectUser';

export const Setting: VFC = memo(() => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { getUsers, users } = useAllUsers();
    const { onSelectUser, selectedUser } = useSelectUser();
    useEffect(() => getUsers(), [])

    // // 選択したユーザー情報を特定しモーダルを表示する
    const onClickUser = useCallback( (id: number) => {
        onSelectUser({ id, users, onOpen })
    }, [users, onSelectUser, onOpen]);


    return (
        <div className="setting">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col"></th>
                        <th scope="col">名前</th>
                        <th scope="col">メールアドレス</th>
                        <th scope="col">一覧表示</th>
                        <th scope="col">管理権限</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <th scope="row">{user.id}</th>
                            <td><div className="name-circle">{user.name.slice(0, 1)}</div></td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.is_show ? "表示する" : "表示しない"}</td>
                            <td>{user.is_admin ? "権限あり" : "権限なし"}</td>
                            <td style={{ textAlign: 'right' }}><PrimaryButton onClick={() => onClickUser(user.id)}>編集</PrimaryButton></td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <SettingUserDetailModal
                user={selectedUser}
                isOpen={isOpen}
                onClose={onClose}
                getUsers={getUsers}
            />
        </div>

    );
});

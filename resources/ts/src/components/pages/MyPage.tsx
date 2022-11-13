import React, { useCallback, useEffect, useState } from 'react';
import { memo, VFC } from "react";
import { Center, useDisclosure, Spinner } from "@chakra-ui/react";
import { UserCard } from '../organisms/user/UserCard';
import { useAllUsers } from "../../hooks/useAllUsers"
import { UserDetailModal } from '../organisms/user/UserDetailModal';
import { useSelectUser } from '../../hooks/useSelectUser';
import { useLoginUser } from '../../hooks/useLoginUser';
import $ from 'jquery';


export const MyPage: VFC = memo(() => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { getUsers, users, loading } = useAllUsers();
    const { onSelectUser, selectedUser } = useSelectUser();
    const { loginUser } = useLoginUser();


    let assetUrl = $("#react-user-management").data("asset");
    useEffect(() => getUsers(), [])
    const targetUser = users.find((v) => v.id === loginUser?.id);

    // // 選択したユーザー情報を特定しモーダルを表示する
    const onClickUser = useCallback( (id: number) => {
        onSelectUser({ id, users, onOpen })
    }, [users, onSelectUser, onOpen]);


    return (
        <div className='profile-page'>
            {loading ? (
                <Center h="100vh">
                    <Spinner color="#fff"/>
                </Center>
            ) : (
                <ul  className="grid is-center with-empty-cells">
                    <Center mt="100px">
                    <li key={targetUser?.id} className="cell">
                        <UserCard
                            id={targetUser?.id}
                            fullName={targetUser?.name}
                            profileImage={targetUser?.profile_image}
                            birthPlace={targetUser?.birth_place}
                            animal={targetUser?.animal}
                            hobby={targetUser?.hobby}
                            specialSkill={targetUser?.special_skill}
                            favoriteEntertainer={targetUser?.favorite_entertainer}
                            onClick={onClickUser}
                        />
                    </li>
                    </Center>
                </ul>
            )}
            <UserDetailModal
                user={selectedUser}
                isOpen={isOpen}
                onClose={onClose}
                getUsers={getUsers}
            />
            MyPage
        </div>
    );
});

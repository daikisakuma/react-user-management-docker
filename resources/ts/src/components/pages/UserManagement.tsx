import React, { useCallback, useEffect, useState } from 'react';
import { memo, VFC } from "react";
import { Center, useDisclosure, Spinner } from "@chakra-ui/react";
import { UserCard } from '../organisms/user/UserCard';
import { useAllUsers } from "../../hooks/useAllUsers"
import { UserDetailModal } from '../organisms/user/UserDetailModal';
import { useSelectUser } from '../../hooks/useSelectUser';
import $ from 'jquery';


export const UserManagement: VFC = memo(() => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { getUsers, users, loading } = useAllUsers();
    const { onSelectUser, selectedUser } = useSelectUser();

    useEffect(() => getUsers(), [])

    // // 選択したユーザー情報を特定しモーダルを表示する
    const onClickUser = useCallback( (id: number) => {
        onSelectUser({ id, users, onOpen })
    }, [users, onSelectUser, onOpen]);


    // ユーザーカードの最終列に擬似要素を追加（ラップしながらセンター寄せするため）
    $(document).ready(function(){
        var emptyCells, i;
        $('.grid.with-empty-cells').each(function() {
          emptyCells = [];
          for (i = 0; i < $(this).find('.cell').length; i++) {
            emptyCells.push($('<li>', {
              class: 'cell is-empty'
            }));
          }
          $(this).append(emptyCells);
        });
      });



    return (
        <div className='profile-page'>
            {loading ? (
                <Center h="80vh">
                    <Spinner color="#fff"/>
                </Center>
            ) : (
                <ul  className="grid is-center with-empty-cells">
                    {users.map((user) => (
                        <React.Fragment key={user.id}>
                        {user.is_show && (
                            <li className="cell">
                                <UserCard
                                    id={user.id}
                                    fullName={user.name}
                                    profileImage={user.profile_image}
                                    birthPlace={user.birth_place}
                                    animal={user.animal}
                                    hobby={user.hobby}
                                    specialSkill={user.special_skill}
                                    favoriteEntertainer={user.favorite_entertainer}
                                    onClick={onClickUser}
                                />
                            </li>
                        )}
                        </React.Fragment>
                    ))}
                </ul>
            )}
            <UserDetailModal
                user={selectedUser}
                isOpen={isOpen}
                onClose={onClose}
                getUsers={getUsers}
            />
        </div>
    );
});

import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { memo, VFC } from "react";
import { FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalCloseButton, ModalFooter, ModalHeader, ModalOverlay, Stack, } from "@chakra-ui/react";
import $ from 'jquery';

import { User } from '../../../types/api/user';
import { PrimaryButton } from '../../atoms/button/PrimaryButton';
import { useUpdate } from '../../../hooks/useUpdate';
import { useLoginUser } from '../../../hooks/useLoginUser';


type Props = {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
    getUsers: () => void;
};

export const UserDetailModal: VFC<Props> = memo((props) => {
    const { user, isOpen, onClose, getUsers, } = props;
    const [name, setName] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [birthPlace, setBirthPlace] = useState("");
    const [animal, setAnimal] = useState("");
    const [hobby, setHobby] = useState("");
    const [specialSkill, setSpecialSkill] = useState("");
    const [favoriteEntertainer, setFavoriteEntertainer] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const { updateUser } = useUpdate();
    const { loginUser } = useLoginUser();

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const onChangeBirthPlace = (e: ChangeEvent<HTMLInputElement>) => setBirthPlace(e.target.value);
    const onChangeAnimal = (e: ChangeEvent<HTMLInputElement>) => setAnimal(e.target.value);
    const onChangeHobby = (e: ChangeEvent<HTMLInputElement>) => setHobby(e.target.value);
    const onChangeSpecialSkill = (e: ChangeEvent<HTMLInputElement>) => setSpecialSkill(e.target.value);
    const onChangeFavoriteEntertainer = (e: ChangeEvent<HTMLInputElement>) => setFavoriteEntertainer(e.target.value);
    const onClickUpdate = () => updateUser("#form-user-update", previewImage ? profileImage : 'イメージなし', onClose, getUsers, "userDetail");

    let assetUrl = $("#react-user-management").data("asset");
    useEffect(() => {
        setName(user?. name ?? '');
        setProfileImage(user ? `${assetUrl}storage/image/${user.profile_image}` : '');
        setBirthPlace(user?. birth_place ?? '');
        setAnimal(user?. animal ?? '');
        setHobby(user?. hobby ?? '');
        setSpecialSkill(user?. special_skill ?? '');
        setFavoriteEntertainer(user?. favorite_entertainer ?? '');
        setPreviewImage('');


        // 画像クリックで画像アップロード画面表示
        $(function(){
            $("#file_01").change(function(){
                $("#mask_file_01").val($("#file_01").val());
            });
            $("#mask_file_01").click(function(){
                $("#file_01").click();
            });
        });
    }, [user])

    // 画像アップロードでプレビュー表示
    function processImage(event){
        const imageFile = event.target.files[0];

        const processImageUrl = URL.createObjectURL(imageFile);
        setPreviewImage(processImageUrl)

        setProfileImage(imageFile)
    }

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
                        <Stack spacing={4}>
                            <FormControl>
                                <input type="hidden" name="id" value={user?.id} />
                                <div className="edit-image-wrapper">
                                    <input style={{ display: "none" }} type="file" accept="image/*" onChange={processImage} id="file_01" name="profile_image" className="file"/>
                                    <label className="file_mask">
                                        <span><img className='file_mask_img' src={previewImage ? previewImage :profileImage} alt={name} /></span>
                                        <input style={{ display: "none" }} type="text" id="mask_file_01" />
                                    </label>
                                </div>
                            </FormControl>
                            {(loginUser?.is_admin || loginUser?.id == user?.id) && (
                                <>
                                    <FormControl>
                                        <FormLabel>
                                            名前
                                        </FormLabel>
                                        <Input value={name} name="name" onChange={onChangeName} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>
                                            好きな芸能人
                                        </FormLabel>
                                        <Input value={favoriteEntertainer} name="favorite_entertainer" onChange={onChangeFavoriteEntertainer} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>
                                            出身地
                                        </FormLabel>
                                        <Input value={birthPlace} name="birth_place" onChange={onChangeBirthPlace} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>
                                            自分を動物に例えると？
                                        </FormLabel>
                                        <Input value={animal} name="animal" onChange={onChangeAnimal} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>
                                            特技
                                        </FormLabel>
                                        <Input value={specialSkill} name="special_skill" onChange={onChangeSpecialSkill} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>
                                            趣味
                                        </FormLabel>
                                        <Input value={hobby} name="hobby" onChange={onChangeHobby} />
                                    </FormControl>
                                </>
                            )}

                        </Stack>
                    </form>


                    {/* <form id="form-user-update" action={$("#react-user-management").data("api-update-user")} method='post' encType="multipart/form-data">
                        <div className="edit-image-wrapper">
                            <input type="hidden" name="_token" value={ $('meta[name="csrf-token"]').attr('content') } />
                            <input  type="file" accept="image/*" onChange={processImage} id="file_01" name="file" className="file"/>
                            <label className="file_mask">
                                <span><img className='file_mask_img' src={profileImage || assetImageUrl + '/sanma.jpg'} alt="" /></span>
                                <input  type="text" id="mask_file_01" />
                            </label>
                        </div>
                        <input type="submit" value="押せ"/>
                    </form> */}


                </ModalBody>
                {(loginUser?.is_admin || loginUser?.id == user?.id) && (
                    <ModalFooter>
                        <PrimaryButton onClick={onClickUpdate}>更新</PrimaryButton>
                    </ModalFooter>
                )}
            </ModalContent>
        </ModalOverlay>
    </Modal>
    )
});

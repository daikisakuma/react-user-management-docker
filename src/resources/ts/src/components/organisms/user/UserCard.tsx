import React, { ReactNode } from 'react';
import { memo, VFC } from "react";
import { Box, Stack } from "@chakra-ui/react";
import $ from 'jquery';

type Props = {
    id: number
    fullName: string;
    profileImage: string;
    birthPlace: string;
    animal: string;
    hobby: string;
    specialSkill: string;
    favoriteEntertainer: string;
    onClick: (id: number) => void;
};

export const UserCard: VFC<Props> = memo((props) => {
    const { id, fullName, profileImage, birthPlace , animal , hobby, specialSkill, favoriteEntertainer, onClick } = props;

    let assetUrl = $("#react-user-management").data("asset");
    return (
        <Box
            className="user-card"
            borderRadius="10px"
            shadow="md"
            p={4}
            _hover={{ cursor: "pointer", opacity: 0.8 }}
            onClick={() =>onClick(id)}
        >
        <Stack>
            <div className="user-main">
                <div className="user-main-left">
                    <div className="img-wapper">
                        <img className='front-profile-image' src={`${assetUrl}storage/image/${profileImage}`} alt={fullName ?? ""} />
                    </div>
                </div>
                <div className="user-main-right">
                    <div className="name-wrapper">
                        <div className="user-title">名前</div>
                        <div className="user-detail">{fullName ?? ""}</div>
                    </div>
                    <div className="favorite_entertainer-wrapper">
                        <div className="user-title">好きな芸能人</div>
                        <div className="user-detail">{favoriteEntertainer ?? ""}</div>
                    </div>
                </div>
            </div>
            <div className="user-middle">
                <div className="user-middle-left">
                    <div className="birth_place-wrapper">
                        <div className="user-title">出身地</div>
                        <div className="user-detail">{birthPlace ?? ""}</div>
                    </div>
                </div>
                <div className="user-middle-right">
                    <div className="animal-wrapper">
                        <div className="user-title">自分を動物に例えると？</div>
                        <div className="user-detail">{animal ?? ""}</div>
                    </div>
                </div>
            </div>
            <div className="special_skill-wrapper">
                <div className="user-title">特技</div>
                <div className="user-detail">{specialSkill ?? ""}</div>
            </div>
            <div className="hobby-wrapper">
                <div className="user-title">趣味</div>
                <div className="user-detail">{hobby ?? ""}</div>
            </div>
        </Stack>
    </Box>
    )
});

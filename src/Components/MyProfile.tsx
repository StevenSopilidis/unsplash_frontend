/** @jsxImportSource @emotion/react **/
import React from "react"
import { css } from "@emotion/react"
import { User } from "../Types/User";

type Props = 
{
    currentUser: User
};

export const MyProfile = ({ currentUser } : Props) => 
{

    React.useEffect(() => {
        console.log(currentUser);        
    }, []);

    return (
        <div css={css`
        width: 620px;
        height: 520px;
        border-radius: 12px;
        border: 1px solid black;
        position: fixed;
        margin: 5% auto;
        left: 0;
        right: 0;
        padding-left: 32px;
        display: flex;
        flex-direction: column;
        z-index: 10000;
        background-color: #FFFFFF;
        `}>
            <h4>Username: {currentUser.Username}</h4>
            <h4>Email: {currentUser.Email}</h4>
            <h4>Country: {currentUser.Country}</h4>
            <h4>City: {currentUser.City}</h4>
            <h4>Tier: {currentUser.UserTier} </h4>
        </div>
    )
}
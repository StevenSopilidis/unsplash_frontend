/** @jsxImportSource @emotion/react **/
import React from "react"
import { css } from "@emotion/react"
import { User } from "../Types/User";
import axios from "axios";
import { START_URL } from "../Env";

type Props = 
{
    currentUser: User
};

export const MyProfile = ({ currentUser } : Props) => 
{
    const handleChangeSubscription = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        try {
            const { data } = await axios.post(`${START_URL}/api/create-checkout-session`, {
                subscriptionTier: e.target.value  
            }, { withCredentials: true});
            const checkout_url = data.checkout_url;
            window.location.replace(checkout_url);
        } catch (error) {
            
        }
    }

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
            <div css={css`
                diplay: flex;
                align_items: center;
                flex-direction: row;
            `}>
                <h4>Change tier to: </h4>
                <select onChange={handleChangeSubscription} name="tiers">
                    <option value="DefaultTier">DefaultTier</option>
                    <option value="LowTier">LowTier</option>
                    <option value="MediumTier">MediumTier</option>
                    <option value="HighTier">HighTier</option>
                </select>
            </div>
        </div>
    )
}
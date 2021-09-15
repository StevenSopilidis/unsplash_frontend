/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Black1, PrimaryGreen } from "../Styles/Colors";
import { FormInput, FormLabel, GreenFormButton } from "../Styles/Elements";
import axios, { AxiosError } from "axios";
import { START_URL } from "../Env";
import { ErrorResponse } from "../Responses/ErrorResponse";
import { ToastContainer } from "react-toastify";

export const AddPhoto = () => 
{
    const [Errors, setErrors] = React.useState<ErrorResponse>();

    const [Email,setEmail] = React.useState<string>("");
    const [Password,setPassword] = React.useState<string>("");
    
    //when the user passes succesffully credentials
    //so the width to actuall upload the photo
    const [seeUploader, setSeeUploader] = React.useState<boolean>(false);

    const handleLoginFormSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${START_URL}/api/auth/signin`, {
                Email,
                Password
            });
            //continue with the image upload
        } catch (err) {
            if(axios.isAxiosError(err))
            {
                const data : ErrorResponse = err.response?.data;
                setErrors(data);
            };
        }
    }

    return (
        <div css={css`
            width: 620px;
            height: 360px;
            border-radius: 12px;
            border: 1px solid black;
            position: fixed;
            margin: 5% auto;
            left: 0;
            right: 0;
            padding-left: 32px;
            display: flex;
            flex-direction: column;
        `}>
            <h2 css={css`
                color: ${Black1};
                font-family: Nato Sans;
                font-size: 24px;
                font-weight: 500;
            `}>Add a new photo</h2>
            <form 
            onSubmit={handleLoginFormSubmit}
            css={css`
                display: flex;
                flex-direction: column;
            `}>
                <div
                css={css`
                display: flex;
                flex-direction: column;
                `}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormInput 
                    onChange={(e) => setEmail(e.target.value)}
                    type="text" 
                    name="email" 
                    placeholder="Yout accounts email"/>
                </div>
                <div
                css={css`
                display: flex;
                flex-direction: column;
                margin-top: 20px;
                `}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormInput 
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password" 
                placeholder="Yout accounts password"/>
                <GreenFormButton 
                type="submit"
                css={css`margin-top: 20px`}>Confirm</GreenFormButton>
                </div>
                <p>Dont have an account?
                    <a
                    href="#"
                    css={css`
                        text-decoration: none;
                        color: ${PrimaryGreen};
                    `} 
                    > Sign Up</a>
                </p>

                {/* handle the errors */}
                <ul>
                    { Errors?.error.map(err => <li>{ err.message }</li>) }
                </ul>
            </form>
        </div>
    )
};
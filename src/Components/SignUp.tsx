/**@jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { ErrorResponse } from "../Responses/ErrorResponse";
import { START_URL } from "../Env";
import axios from "axios";
import { Black1, PrimaryGreen } from "../Styles/Colors";
import { FormInput, FormLabel, GreenFormButton } from "../Styles/Elements";

type Props = 
{
    setSeeSignUp :React.Dispatch<React.SetStateAction<boolean>>
};

export const SignUp = ({ setSeeSignUp } : Props) => {
    const [Errors, setErrors] = React.useState<ErrorResponse>();

    const [Email,setEmail] = React.useState<string>("");
    const [Password,setPassword] = React.useState<string>("");
    const [Username,setUsername] = React.useState<string>("");
    const [Country,setCountry] = React.useState<string>("");
    const [City,setCity] = React.useState<string>("");

    const handleLoginFormSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`${START_URL}/api/auth/signup`, {
                Email,
                Password,
                Username,
                Country,
                City
            }, { withCredentials: true});
            //continue with the image upload
            setSeeSignUp(false);
        } catch (err) {
            if(axios.isAxiosError(err))
            {
                const data : ErrorResponse = err.response?.data;
                setErrors(data);
            };
        }
    }

    return (
        <div>
            <h2 css={css`
                color: ${Black1};
                font-family: Nato Sans;
                font-size: 24px;
                font-weight: 500;
            `}>SignUp</h2>
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
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormInput 
                    onChange={(e) => setUsername(e.target.value)}
                    type="text" 
                    name="username" 
                    placeholder="Yout accounts username"/>
                </div>
                <div
                css={css`
                display: flex;
                flex-direction: column;
                margin-top: 6px;
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
                margin-top: 6px;
                `}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormInput 
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password" 
                placeholder="Yout accounts password"/>
                </div>
                <div
                css={css`
                display: flex;
                flex-direction: column;
                margin-top: 6px;
                `}>
                <FormLabel htmlFor="country">Country</FormLabel>
                <FormInput 
                onChange={(e) => setCountry(e.target.value)}
                type="text"
                name="country" 
                placeholder="Country in which you live"/>
                </div>
                <div
                css={css`
                display: flex;
                flex-direction: column;
                margin-top: 6px;
                `}>
                <FormLabel htmlFor="country">City</FormLabel>
                <FormInput 
                onChange={(e) => setCity(e.target.value)}
                type="text"
                name="country" 
                placeholder="City in which you live"/>
                </div>
                <GreenFormButton 
                type="submit"
                css={css`margin-top: 20px`}>Confirm</GreenFormButton>
                <p>Already have an account?
                    <a
                    onClick={(e) => setSeeSignUp(false)}
                    href="#"
                    css={css`
                        text-decoration: none;
                        color: ${PrimaryGreen};
                    `} 
                    > Sign in</a>
                </p>

                {/* handle the errors */}
                <ul>
                    { Errors?.error.map(err => <li>{ err.message }</li>) }
                </ul>
            </form>
        </div>
    )
}
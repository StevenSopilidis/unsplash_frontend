/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { ErrorResponse } from "../Responses/ErrorResponse";
import { LoginBeforeUpload } from "./LoginBeforeUpload";
import { UploadAfterAuth } from "./UploadAfterAuth";
import { SignUp } from "./SignUp";

export const AddPhoto = () => 
{
    const [Errors, setErrors] = React.useState<ErrorResponse>();

    const [Email,setEmail] = React.useState<string>("");
    const [Password,setPassword] = React.useState<string>("");
    
    //when the user passes succesffully credentials
    //so the width to actuall upload the photo
    const [seeUploader, setSeeUploader] = React.useState<boolean>(false);
    //wether the user see the SignUp widget
    const [seeSignUp, setSeeSignUp] = React.useState<boolean>(false);

    return (
        <div css={css`
            width: 620px;
            height: ${seeSignUp? "520px": "360px"};
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
            {!seeUploader && !seeSignUp && <LoginBeforeUpload setSeeSignUp={setSeeSignUp} setSeeUploader={setSeeUploader}/> }            
            {seeUploader && <UploadAfterAuth /> }            
            {seeSignUp && <SignUp setSeeSignUp={setSeeSignUp}/> }
        </div>
    )
};
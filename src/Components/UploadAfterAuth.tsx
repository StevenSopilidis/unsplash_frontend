/** @jsxImportSource @emotion/react */
import React, { createRef, FormEvent } from "react";
import { css } from "@emotion/react";
import { Black1 } from "../Styles/Colors";
import { FormInput, FormLabel, GreenFormButton } from "../Styles/Elements";
import { ErrorResponse } from "../Responses/ErrorResponse";
import axios from "axios";
import { START_URL } from "../Env";

export function UploadAfterAuth() {
    const inputRef = createRef<HTMLInputElement>();
    const [successMessage, setSuccessMessage] = React.useState<string>("");
    const [Errors, setErrors] = React.useState<ErrorResponse>();

    const [Label, setLabel] = React.useState<string>("");

    const handleFormSubmision = async (e : FormEvent) => {
        e.preventDefault();
        
        try {
            const formData = new FormData();
            //get the actual file
            const image = inputRef.current?.files?.item(0);
            if(image)
            {
                formData.append("image", image);
                formData.append("label", Label);
                const res = await axios.post(START_URL + "/api/images/upload", formData, {
                    withCredentials: true,
                    headers: {
                        "Content-type": "multipart/form-data"
                    }
                });
                setSuccessMessage(res.data.message);
            }
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
            `}>Upload your Photo</h2>
            <form
            onSubmit={handleFormSubmision} 
            css={css`
                display: flex;
                flex-direction: column;
            `}>
                <div
                css={css`
                display: flex;
                flex-direction: column;
                `}>
                    <FormLabel>Enter the label for your image</FormLabel>
                    <FormInput 
                    onChange={e => setLabel(e.target.value)}
                    type="Text" 
                    placeholder="e.g What a beautifull day"/>
                </div>
                <div
                css={css`
                display: flex;
                flex-direction: column;
                margin-top: 20px;
                `}>
                    <FormLabel>Your image/images</FormLabel>
                    <input
                    ref={inputRef}
                    type="file"
                    name="image"
                    css={css`
                        margin-top: 10px;
                    `}
                    />
                </div>
                {successMessage.length > 0 && 
                <p css={css`
                    color: green;
                    font-size: 15px;
                    font-family: Noto Sans;
                `}>{successMessage}</p>
                }
                <GreenFormButton 
                type="submit"
                >Upload</GreenFormButton>
                {/* handle the errors */}
                <ul>
                    { Errors?.error.map(err => <li>{ err.message }</li>) }
                </ul>
            </form>
        </div>)
}
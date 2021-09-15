/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Black1, PrimaryGreen, White1 } from "../Styles/Colors";

const SearchFormSubmit = (e : React.FormEvent) => 
{
    e.preventDefault();
};

export const Header = () => {
    const [searchValue, setSearchValue] = React.useState<string>("");

    return (
    <div css={css`
        width: 100%;
        height: 65px;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    `}>
        <div css={css`
            display: flex;
            align-items: center;
        `}>
            <div css={css`margin-left: 50px; margin-top: 10px;`}>
                <h2 css={css`
                    color: ${Black1};
                    font-size: 25px;
                    font-family: Noto Sans;
                    font-weigth: 800;
                `}>My Unsplash</h2>
                <p css={css`
                    color: ${Black1};
                    font-weight: 500;
                    font-famly: Noto Sans;
                    font-size: 15px;
                `}>Steven Sopilids</p>
            </div>
            <form onSubmit={SearchFormSubmit}>
                <input 
                css={css`
                    width: 200px;
                    height: 40px;
                    border-radius: 12px;
                    border: 1px solid ${Black1};
                    margin-left: 40px;
                    margin-top: 10px;
                `}
                type="text" 
                placeholder="Search By Name"
                name="search"
                onChange={(e) => setSearchValue(e.target.value)}
                />
            </form>
        </div>
        <button css={css`
            background-color: ${PrimaryGreen};
            color: ${White1};
            font-family: Noto Sans;
            border: none;
            width: 110px;
            height: 40px;
            box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            margin-right: 90px;
        `}>Add a photo</button>
    </div>
    );
};
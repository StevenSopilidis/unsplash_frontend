import styled from "@emotion/styled";
import { Black2, PrimaryGreen, White1 } from "./Colors";

export const FormLabel = styled.label`
    font-size: 16px;
    font-weight: 500;
    font-family: Nato Sans;
    color: ${Black2};
`; 

export const FormInput = styled.input`
    width: 552.33px;
    height: 40px;
    border: 1px solid #4F4F4F;
    box-sizing: border-box;
    border-radius: 12px;
    margin-top: 5px;
`

export const GreenFormButton = styled.button`
    background-color: ${PrimaryGreen};
    color: ${White1};
    font-family: Noto Sans;
    border: none;
    width: 110px;
    height: 40px;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    margin-right: 90px;
    cursor: pointer;
`;

export const BlackFormButton = styled.button`
    background-color: ${Black2};
    color: ${White1};
    font-family: Noto Sans;
    border: none;
    width: 110px;
    height: 40px;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    margin-right: 90px;
    cursor: pointer;
`
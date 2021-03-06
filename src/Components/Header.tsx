/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Black1 } from "../Styles/Colors";
import { BlackFormButton, GreenFormButton } from "../Styles/Elements";
import { Photo } from "../Types/Photo";
import axios from "axios";
import { START_URL } from "../Env";
import { User } from "../Types/User";

type Props =
{
    seeAddPhotoContainer: boolean, 
    setSeeAddPhotoContainer: React.Dispatch<React.SetStateAction<boolean>>,
    currentUser: User | null,
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>,
    seeMyProfile: boolean, 
    setSeeMyProfile: React.Dispatch<React.SetStateAction<boolean>>,
    setImages: React.Dispatch<React.SetStateAction<Photo[]>>,
    fetchOriginalImages: () => Promise<void>
};

export const Header = 
({seeAddPhotoContainer,setCurrentUser,currentUser, setSeeAddPhotoContainer, setImages, fetchOriginalImages, seeMyProfile, setSeeMyProfile}: Props) => {
    const [searchValue, setSearchValue] = React.useState<string>("");

    const SearchFormSubmit = async (e : React.FormEvent) => 
    {
        e.preventDefault();
        try {
            if(searchValue.length > 0)
            {
                const res = await axios.get(START_URL + `/api/images/user/${searchValue}`)   
                setImages(res.data);
            }else {
                await fetchOriginalImages();
            }
            
        } catch (error) {
            
        }
    };

    //function for getting the current user
    //or returns null if there is no valid auth cookie
    const getUser = async (): Promise<User | null> => {
        try {
            const res = await axios.get(START_URL + "/api/auth/currentuser", {
                 withCredentials: true
            });
            const user: User = res.data;
            setCurrentUser(user);
            return user
        } catch (error) {
            return null;
        }
    }
    
    React.useEffect(() => {
        getUser();
        console.log(currentUser);
    }, []);

    return (
    <div css={css`
        width: 100%;
        height: 70px;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 1000;
    `}>
        <div css={css`
            display: flex;
            align-items: center;
        `}>
            <div css={css`margin-left: 40px`}>
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
                `}>@Steven Sopilids</p>
            
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

        <div>
            <GreenFormButton 
            onClick={e => {
                setSeeAddPhotoContainer(!seeAddPhotoContainer)
                setSeeMyProfile(false);
            }}
            >Add a photo</GreenFormButton>
            
            {currentUser !== null &&
            <BlackFormButton onClick={e => {
                setSeeMyProfile(!seeMyProfile);
                setSeeAddPhotoContainer(false);
            }}>View Profile</BlackFormButton>
            }
            
            {currentUser === null &&
            <BlackFormButton onClick={e => {
                setSeeAddPhotoContainer(true);
            }}>Sign In</BlackFormButton>
            }
        </div>
    </div>
    );
};

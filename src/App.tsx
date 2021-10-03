/** @jsxImportSource @emotion/react */
import React from 'react';
import { Header } from './Components/Header';
import { css } from "@emotion/react";
import { AddPhoto } from './Components/AddPhoto';
import { Photo } from './Types/Photo';
import axios from 'axios';
import { START_URL } from './Env';
import { White1 } from './Styles/Colors';
import { isLabeledStatement } from 'typescript';

function App() {
  const [seeAddPhotoContainer, setSeeAddPhotoContainer] = React.useState<boolean>(false);
  //for the pagination (will use scroll pagination (e.g instagram))
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const pageSize = 9;

  const [images,setImages] = React.useState<Photo[]>([]);

  const image_height = 290;

  //timer for controlling the scrolling
  //so there wont be too many requests
  let timer : NodeJS.Timeout | null = null;

  const fetchImages = async () : Promise<void> => {
    const res = await axios.get(START_URL + `/api/images?currentPage=${currentPage}&pageSize=${pageSize}`);
    const data: Photo[] = [...res.data];
    images.forEach(image => data.push(image));
    setImages(data);
  }

  React.useEffect(() => {
    fetchImages();
  },[])

  const [scrollPosition, setScrollPosition] = React.useState<number>(0);

  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      if((window.innerHeight + window.scrollY) >= document.body.scrollHeight)
      {
        if(timer != null)
        {
          clearTimeout(timer); 
        }
        timer = setTimeout(() => {
          setCurrentPage(currentPage + 1);
          fetchImages();
        }, 500);
      }
    });
  }, []);

  return (
    <div className="App">
      <Header fetchOriginalImages={fetchImages} setImages={setImages} seeAddPhotoContainer={seeAddPhotoContainer} setSeeAddPhotoContainer={setSeeAddPhotoContainer}/>
      {/* div where the main content will be placed */}
      <div css={css`
        margin-top: 100px;
        width: 100%;
      `}>
        {seeAddPhotoContainer &&
        <AddPhoto />
        }

        <div css={css`
          width: 100%;
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
        `}>
          {images.map(image => {
            return (
              <div
              css={css`
              width: 390px;
              height: ${image_height}px;
              border-radius: 16px;
              margin-top: 20px;
              cursor: pointer;
              z-index: 10;
              position: relative;
              `}
              key={image._id}>
                <img
                src={image.Url}
                css={css`
                width: 100%;
                height: 100%;
                border-radius: 16px;
                `}>
                </img>

                <div css={css`
                position: absolute;
                top: 0px;
                width: 100%;
                height: 100%;
                z-index: 10;
                :hover{
                  background-color: rgba(51, 51, 51, 0.9);
                  h3 {
                    display: block;
                  }
                  p {
                    display: block;
                  }
                }
                display: flex;
                flex-direction: column;
                `}>
                  <h3 css={css`
                    display: none;
                    color: ${White1};
                    margin-left: 7px;
                    font-family: Noto Sans;
                    font-size: 17px;
                `}>From: @{image.User.Username}</h3>

                  <p css={css`
                    display: none;
                    color: ${White1};
                    font-family: Noto Sans;
                    font-size: 14px;
                    margin-left: 7px;
                  `}>
                    Users Label: {image.Label && image.Label.length > 20? image.Label.substring(0,20) + "...." : image.Label}         
                  </p>
                </div>

              </div>
            )
            // return <img 
            // src={image.Url}
            // css={css`
            //   width: 390px;
            //   height: 290px;
            //   border-radius: 16px;
            //   margin-top: 20px;
            // `}
            // key={image._id}>


            // </img>
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

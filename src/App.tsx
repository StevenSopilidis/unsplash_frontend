/** @jsxImportSource @emotion/react */
import React from 'react';
import { Header } from './Components/Header';
import { css } from "@emotion/react";
import { AddPhoto } from './Components/AddPhoto';
import { Photo } from './Types/Photo';
import axios from 'axios';
import { START_URL } from './Env';

function App() {
  const [seeAddPhotoContainer, setSeeAddPhotoContainer] = React.useState<boolean>(false);
  //for the pagination (will use scroll pagination (e.g instagram))
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(12);

  const [images,setImages] = React.useState<Photo[]>([]);

  React.useEffect(() => {
    (async () => {
      const res = await axios.get(START_URL + `/api/images?currentPage=${currentPage}&pageSize=${pageSize}`);
      const data: Photo[] = [...res.data];
      images.forEach(image => data.push(image));
      setImages(data);
    })();
  },[])

  return (
    <div className="App">
      <Header seeAddPhotoContainer={seeAddPhotoContainer} setSeeAddPhotoContainer={setSeeAddPhotoContainer}/>
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
            return <img 
            src={image.Url}
            css={css`
              width: 390px;
              height: 290px;
              border-radius: 16px;
              margin-top: 20px;
            `}
            key={image._id}>


            </img>
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

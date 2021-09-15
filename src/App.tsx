/** @jsxImportSource @emotion/react */
import React from 'react';
import { Header } from './Components/Header';
import { css } from "@emotion/react";
import { AddPhoto } from './Components/AddPhoto';

function App() {
  const [seeAddPhotoContainer, setSeeAddPhotoContainer] = React.useState<boolean>(false);
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
      </div>
    </div>
  );
}

export default App;

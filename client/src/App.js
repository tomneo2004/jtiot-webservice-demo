import React from 'react';
import {useSelector } from 'react-redux';

import APIItem from './components/api-item/apiItem.component';

import RequestToken from './components/api-components/requestToken.component';

import './App.css';

function App() {
  const appId = useSelector(state=>state.appId.appId);
  const token = useSelector(state=>state.appId.token);

  return (
    <div>
      {
        (token && appId)?
        <div>
          <span>
          {`AppId: ${appId}`}
          </span>
          <br />
          <span>
          {`Token: ${token}`}
          </span>
        </div>
        :
        null
      }
      <APIItem title='RequestTokenMethod'>
        <RequestToken />
      </APIItem>
    </div>
  );
}

export default App;

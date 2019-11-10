import React from 'react';
import {useSelector } from 'react-redux';
import { withTranslation } from 'react-i18next';

import APIItem from './components/api-item/apiItem.component';

import GetHelloWorld from './components/api-components/getHelloWorld.component';
import RequestToken from './components/api-components/requestToken.component';
import VerifyToken from './components/api-components/veriftyToken.component';
import GetAlarm from './components/api-components/getAlarm.component';
import GetBCGArray from './components/api-components/getBCGArray.component';
import GetBedRecord from './components/api-components/getBedRecord.component';
import GetBreathArray from './components/api-components/getBreathArray.component';
import GetProductList from './components/api-components/getProductList.component';
import GetSleepRecord from './components/api-components/getSleepRecord.component';

import './App.css';

function App({t}) {
  const appId = useSelector(state=>state.appId.appId);
  const token = useSelector(state=>state.appId.token);

  return (
    <div>
      {
        (token && appId)?
        <div>
          <span>{t('Your appId and token', 'Your appId and token:')}</span>
          <br />
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
      <APIItem title='HelloWorld'>
        <GetHelloWorld />
      </APIItem>
      <APIItem title='RequestTokenMethod'>
        <RequestToken />
      </APIItem>
      <APIItem title='VerifyTokenMethod'>
        <VerifyToken />
      </APIItem>
      <APIItem title='GetAlarm'>
        <GetAlarm />
      </APIItem>
      <APIItem title='GetBCGArray'>
        <GetBCGArray />
      </APIItem>
      <APIItem title='GetBedRecord'>
        <GetBedRecord />
      </APIItem>
      <APIItem title='GetBreathArray'>
        <GetBreathArray />
      </APIItem>
      <APIItem title='GetProductList'>
        <GetProductList />
      </APIItem>
      <APIItem title='GetSleepRecord'>
        <GetSleepRecord />
      </APIItem>
    </div>
  );
}

export default withTranslation()(App);

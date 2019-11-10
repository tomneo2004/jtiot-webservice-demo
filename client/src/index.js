import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store/store';
import {Provider} from 'react-redux';
import {I18nextProvider} from 'react-i18next';
import i18next from './i18n';

import * as serviceWorker from './serviceWorker';



ReactDOM.render(
        <Provider store={store}>
            <I18nextProvider i18n={i18next}>
                <App />
            </I18nextProvider>
        </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

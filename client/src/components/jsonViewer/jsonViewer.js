import React from 'react';
import ReactJsonViewer from 'react-json-view'
import { withTranslation } from 'react-i18next';

import classes from './jsonViewer.module.scss'

const JsonViewer = ({t, title, src, theme='monokai'})=>{

    return (
        <div className={classes.jsonView}>
        {
            src?
            <div>
                <div>{title?title:t('json-response-data')}</div>
                <ReactJsonViewer src={src} theme={theme} name={false} />
            </div>
            :
            null
        }
        </div>
    );
}

export default withTranslation()(JsonViewer);
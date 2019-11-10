import React, {useState} from 'react';
import { withTranslation } from 'react-i18next';
import JsonViewer from '../jsonViewer/jsonViewer';
import axios from 'axios';

import classes from './common.module.scss';

const getHelloWorld = async ()=>{

    let res = await axios.get('/helloworld');

    return res.data;
}

const GetHelloWorld = ({t})=>{

    const [rawData, setRawData] = useState(null);

    return(
        <div className={classes.overlay}>
            <div>
            {t('desc', 'desc')}
            </div>
            <div>
            {t('example-input', 'example')}
            </div>
            <div>
                <button onClick={
                    ()=>{
                        getHelloWorld()
                        .then((data)=>setRawData(data))
                        .catch((err)=>console.log(err))
                    }
                }>{t('submit', 'submit')}</button>
            </div>
            {
                rawData? <JsonViewer src={rawData} />:null
            }
        </div>
    );
}

export default withTranslation()(GetHelloWorld);
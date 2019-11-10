import React, {useState} from 'react';
import { withTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import JsonViewer from '../jsonViewer/jsonViewer';
import axios from 'axios';

const getProductList = async (appId, token, filter)=>{

    let res = await axios.post('/getProductList', {
        appid:appId,
        token:token,
        filter:filter
    })

    return res.data;
}

const GetProductList = ({t})=>{

    const currnet_id = useSelector(state=>state.appId.appId);
    const currnet_token = useSelector(state=>state.appId.token);
    const [filter, setFilter] = useState('');
    const [appId, setAppId] = useState(currnet_id);
    const [token, setToken] = useState(currnet_token);
    const [rawData, setRawData] = useState(null);

    return(
        <div>
            <div>
            {t('desc', 'desc')}
            </div>
            <div>
            {t('example-input', 'example')}
            </div>
            <div>
                <div>
                    <label>{'filter:'}</label>
                    <input type='text' value={filter} onChange={
                        (e)=>setFilter(e.target.value)
                    } />
                </div>
                <div>
                    <label>{'appId:'}</label>
                    <input type='text' value={appId} onChange={
                        (e)=>setAppId(e.target.value)
                    } />
                </div>
                <div>
                    <label>{'token:'}</label>
                    <input type='text' value={token} onChange={
                        (e)=>setToken(e.target.value)
                    }/>
                </div>
                <button onClick={
                    ()=>{
                        getProductList(appId, token, filter)
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

export default withTranslation()(GetProductList);
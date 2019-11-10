import React, {useState} from 'react';

import classes from './apiItem.module.scss';


const APIItem = ({title, children})=>{

    const [expand, setExpand] = useState(false);

    return(
        <div className={classes.item}>
            <h3 className={classes.title} onClick={ ()=>setExpand(!expand) }>{title}</h3>
            { expand?children:null }
        </div>
    );
}

export default APIItem;
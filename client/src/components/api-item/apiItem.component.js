import React, {useState} from 'react';


const APIItem = ({title, children})=>{

    const [expand, setExpand] = useState(false);

    return(
        <div>
            <h3 onClick={ ()=>setExpand(!expand) }>{title}</h3>
            { expand?children:null }
        </div>
    );
}

export default APIItem;
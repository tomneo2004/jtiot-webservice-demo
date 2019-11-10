import React from 'react';
import ReactJsonViewer from 'react-json-view'

const JsonViewer = ({title, src})=>{

    return (
        <div>
        {
            src?
            <div>
                <div>{title?title:'RawData:'}</div>
                <ReactJsonViewer src={src} />
            </div>
            :
            null
        }
        </div>
    );
}

export default JsonViewer;
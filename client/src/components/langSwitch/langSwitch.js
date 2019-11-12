import React from 'react';

import i18next from 'i18next';
import {getLangFromCode} from '../../i18n';

const LangSwitcher = ()=>{

    return (
        <div>
            <select defaultValue={i18next.language} onChange={(e)=>{
            i18next.changeLanguage(e.target.value)
            }}>
            {
                i18next.languages.map((langCode, i)=>{
                return <option key={langCode} value={langCode}>{getLangFromCode(langCode)}</option>
                })
            }
            </select>
      </div>
    );
}

export default LangSwitcher;
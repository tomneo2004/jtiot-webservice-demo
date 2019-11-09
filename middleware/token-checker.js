
const tokenModel = require('../model/appid-token');

/**
 * 501 --- Token\APPID有誤，請檢查
    502 --- Token超時
    503 --- 驗證成功
    504 --- 該設備不屬於該APPID
 */

let checker = (req, res, next)=>{
    const appid = req.body.appid;
    const token = req.body.token;

    if(!appid || !token){
        return res.fail({error:{message:'appid and token is required'}});
    }

    const existToken = tokenModel[appid];
    //token does not exist
    if(!existToken){
        return res.success({data: {responseCode:501}});
    }

    //token exist and compare them
    if(token === existToken){
        return next();
    }
    
    res.success({data: {responseCode:504}});
}

module.exports = checker;
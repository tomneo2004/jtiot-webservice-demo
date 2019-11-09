const express = require('express');
const bodyParser = require('body-parser');
const { JSend } = require('jsend-express');
const tokenGenerator = require('uuid-token-generator');
const tokenChecker = require('./middleware/token-checker');

var tokenModel = require('./model/appid-token');
var alarmModel = require('./model/alarm');

const app = express();

const jSend = new JSend({ name: 'api-demo', version: '1.0.0', release: '01' });
const tokgen = new tokenGenerator(128, tokenGenerator.BASE36);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(jSend.middleware.bind(jSend))

const port = process.env.port||3001;

/**
 * 
 * ResponseCode 含义
 * 200 成功
301 设备不存在
302 Webservice内部异常
303 MD5加密错误
401 没有数据
 *
 *
 * Type 含义
 * 200 生命体征异常
 * 201 网关不发数据
 * 202 床板离线
 * 203 床板接触不良
 * 204 夜间离床过久
 * 205 称重传感器异常
 * 206 呼吸暂停异常
 * 207 心率传感器异常
 * 209 晚睡
 */
app.post('/getAlarm', tokenChecker, (req, res)=>{
    const devicename = req.body.devicename;
    const startTime = req.body.startTime;//not consider at moment
    const endTime = req.body.endTime;//not consider at moment

    const date = new Date();

    let ret = {
        ResponseCode:200,
        RecordNum:0,
        Records:[],
        CreateTime: `${ date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} }`
    };

    let deviceNameList = devicename.length < 1?[]:devicename.split(",");

    if(deviceNameList.length < 1){
        ret = {...ret, RecordNum:alarmModel.length, Records:alarmModel};
        return res.success({data: ret});
    }

    let result = alarmModel.filter((data)=>{
        return deviceNameList.includes(data.DeviceName)? true:false;
    })

    if(result.length < 1){
        ret = {...ret, ResponseCode:401};
        return res.success({data: ret});
    }

    ret = {...ret, RecordNum:result.length, Records:result};
    res.success({data: ret});

})

app.get('/helloworld', (req, res)=>{
    
    res.success({data:'hello world'});
})

app.post('/requestTokenMethod', (req, res)=>{
    const appid = req.body.appid;

    //requested appid does not exist
    if(!appid){
        return res.fail({error: {message:'appid is required'}});
    }

    //requested appid exist
    let retToken = tokenModel[appid];

    if(!retToken){
        tokenModel[appid] = tokgen.generate();
        retToken = tokenModel[appid];  
    }

    res.success({data:{token:retToken}});
})

/**
 * 501 --- Token\APPID有誤，請檢查
    502 --- Token超時
    503 --- 驗證成功
    504 --- 該設備不屬於該APPID
 */
app.post('/verifyTokenMethod', (req, res)=>{
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
        return res.success({data: {responseCode:503}});
    }
    
    res.success({data: {responseCode:504}});
})

app.listen(port, ()=>{
    console.log('Server started!!!');
});
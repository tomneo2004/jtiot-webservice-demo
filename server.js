const express = require('express');
const bodyParser = require('body-parser');
const { JSend } = require('jsend-express');
const tokenGenerator = require('uuid-token-generator');

var tokenModel = require('./model/appid-token');

const app = express();

const jSend = new JSend({ name: 'api-demo', version: '1.0.0', release: '01' });
const tokgen = new tokenGenerator(128, tokenGenerator.BASE36);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(jSend.middleware.bind(jSend))

const port = process.env.port||3001;

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
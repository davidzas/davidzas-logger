const express = require('express');
const app = express();
const moment = require('moment-timezone');
const bodyParser = require('body-parser');
const fs = require('fs');
const limit = '50mb'
const ORIGIN = '*';
const APIKEY = '50899802-2d8f-47dd-aa57-d71a203c1ab6';

// Config
var logs;
if (fs.existsSync('./logs.json')) {
    let data = fs.readFileSync('./logs.json');
    try {
        logs = JSON.parse(data);
    } catch (error) {
        logs = {};
    }
} else {
    logs = {};
}

app.use(bodyParser.json({ limit: limit }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', ORIGIN);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
    res.setHeader('Access-Control-Max-Age', '1000');
    next();
});
///

app.use((req, res, next) => {
    if (req.query.key !== APIKEY) {
        res.status(403).send('Forbidden');
    } else {
        next();
    }
});

app.post('/metric/:key', (req, res) => {
    if (isNaN(req.body.value)) {
        res.send('value must be a number');
    } else {
        addValue(req.params.key, req.body.value);
        res.send('ok');
    }


});

app.get('/metric/:key/sum', (req, res) => {
    res.send(sumKey(req.params.key) + '');
});

app.listen(8080, () => {
    console.log('Example app listening on port 3000!');
});


addValue = (key, value) => {
    let obj = logs[key];
    let add = { value: Math.round(value), date: new Date().getTime() };
    if (obj) {
        obj.logs.push(add);
    } else {
        logs[key] = { logs: [add] };
    }
    fs.writeFile('./logs.json', JSON.stringify(logs), (err) => { });
}

sumKey = (key) => {
    let obj = logs[key];
    if (obj) {
        let now = new Date().getTime();
        let sum = 0;
        obj.logs.forEach(log => {
            let diff = now - log.date;
            if (diff < (60*60*1000)) {
                sum += (log.value * 1);
            }
        });
        return sum;
    } else {
        return 0;
    }
}
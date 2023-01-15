'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { renderChart } = require('./lib/render');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', (req, res) => {
    res.send('Hello World from Docker');
});

app.post('/chart', jsonParser, (req, res, next) => {
    try {
        /* const demoObj = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar',
                    animationDelay: (idx) => {
                        return idx * 100;
                    },
                },
            ],
        };
        const opts = JSON.stringify(demoObj); */
        let opts = req.body.options;
        let svgStr = renderChart(400, 300, JSON.parse(opts));
        res.writeHead(200, {
            'Content-Type': 'application/xml',
        });
        res.write(svgStr);
        res.end();
    } catch (err) {
        next(err);
    }
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});

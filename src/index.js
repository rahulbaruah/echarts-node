'use strict';

const express = require('express');
const { renderChart } = require('./lib/render');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World from Docker');
});

app.get('/chart', (req, res, next) => {
    try {
        let svgStr = renderChart();
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

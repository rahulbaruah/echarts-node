var echarts = require('echarts');

function renderChart(width, height, opts) {
    // The chart is initialized and configured in the same manner as before
    const chart = echarts.init(null, null, {
        renderer: 'svg', // must use SVG rendering mode
        ssr: true, // enable SSR
        width: width, // need to specify height and width
        height: height,
    });

    chart.setOption(opts);

    return chart.renderToSVGString();
}

module.exports = {
    renderChart,
};

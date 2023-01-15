var echarts = require('echarts');

function renderChart() {
    // The chart is initialized and configured in the same manner as before
    const chart = echarts.init(null, null, {
        renderer: 'svg', // must use SVG rendering mode
        ssr: true, // enable SSR
        width: 400, // need to specify height and width
        height: 300,
    });

    chart.setOption({
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
    });

    return chart.renderToSVGString();
}

module.exports = {
    renderChart,
};

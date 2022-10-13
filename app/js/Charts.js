function CreateLineChart(dataMap){
    let ctxLineOption = document.getElementById('line-chart');
    ctxLineOption.height = 240;

    let ctxLine = ctxLineOption.getContext('2d');

    let chartData = [];
    let labelsLine = [];
    for(const [key,value] of dataMap){
        chartData.push(value);
        labelsLine.push(key);
    }
    let lineChart = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: labelsLine,
            datasets: [{
                borderColor: [
                    "#586fda"
                ],
                data: chartData,
                lineTension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    min: 15,
                    max: 35,
                }
            }
        }
    })

    let balance = chartData.reduce((a, b) => a + b, 0);
    document.getElementById('balance').innerHTML = balance;
}

function CreateDoughnutChart(dataMap){
    let ctx = document.getElementById("doughnut-chart").getContext('2d');

    let colorsBackground = [
        "rgb(180, 160, 137)",
        "rgb(254, 60, 114)",
        "rgb(52, 52, 52)",
        "rgb(147, 95, 168)",
        "rgb(72, 133, 239)",
        "rgb(238, 192, 9)",
        "rgb(4, 206, 45)"
    ];
    let values = [];
    for (let key of dataMap.keys()) {
        values.push(key);
    }

    function CreateUl() {
        let labelsDoughnut = [];
        let i = 0;
        for (const [key, value] of dataMap) {
            let circle = `<div class ="circle" style="background-color: ${colorsBackground[i++]} "></div>`;
            let content = `<b>${key}%</b> <font color = "#bebebe" size="3px">${value}</font>`;
            labelsDoughnut.push(`<li>${circle}   ${content}</li>`);

        }
        return labelsDoughnut;
    }

    document.getElementById('labelsDg').innerHTML = CreateUl().join("");

    let douguthChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: values,
                backgroundColor: colorsBackground,
                borderWidth: 0
            }]
        },
        options: {
            tooltips: {
                enabled: false,
            },
            legend: {
                display: false  // <- the important part
            },
            cutout: 95
        },
        plugins: [{
            id: 'text',
            beforeDraw: function (chart, a, b) {
                let width = chart.width,
                    height = chart.height,
                    ctx = chart.ctx;

                ctx.restore();
                let fontSize = (height / 114).toFixed(2);
                ctx.font = fontSize + "em sans-serif";
                ctx.textBaseline = "middle";

                let text = "- " + values.reduce((a, b) => parseInt(a) + parseInt(b), 0) + " USD",
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2;

                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        }]
    });
}
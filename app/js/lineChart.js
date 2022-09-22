let ctxLineOption = document.getElementById('line-chart');
ctxLineOption.height = 240;

let ctxLine = ctxLineOption.getContext('2d');
let chartData = [17, 26, 23, 32, 29, 31, 25];
let labelsLine = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
            /*title: {
                display: true,
                text: 'Balance summary',
                align: 'start',
                font: {
                    size: 16,
                    weight: '900'
                },
                color: '#313131',
                padding: {
                    top: 20,
                    bottom: 10
                }
            },*/
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
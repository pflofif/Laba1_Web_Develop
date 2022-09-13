let ctx = document.getElementById('my-chart').getContext('2d');

let chartData = [17, 26, 23, 32, 29,31,25 ];
let labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets : [{
            borderColor: [
                "#586fda"
            ],
            data: chartData,
            lineTension : 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Balance summary',
                align: 'start',
                font:{
                    size: 16
                }
            },
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                min: 15,
                max: 35,
            }
        }
    }
})
let balance = chartData.reduce((a,b) => a+b,0);
document.getElementById('balance').innerHTML = balance;
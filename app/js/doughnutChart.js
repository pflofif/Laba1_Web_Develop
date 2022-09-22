let ctx = document.getElementById("doughnut-chart").getContext('2d');

let dataMap = new Map([
    [25, "Vehicles and transport"],
    [23, "Groceries and food"],
    [18, "Clothes and shoes"],
    [16, "Cafe and restaurants"],
    [15, "Mobile and internet"],
    [10, "House and services"],
    [9, "Other expenses"]
]);
let colorsBackground = [
    "rgb(180, 160, 137)",
    "rgb(254, 60, 114)",
    "rgb(52, 52, 52)",
    "rgb(147, 95, 168)",
    "rgb(72, 133, 239)",
    "rgb(238, 192, 9)",
    "rgb(4, 206, 45)"
];
let data = [];
for (let key of dataMap.keys()) {
    data.push(key);
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
        //  labels: labelsDoughnut,
        datasets: [{
            data: data,
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

            // let text = "- " + data.reduce((a, b) => a + b, 0) + " USD",
            let text = "- " + data.reduce((a, b) => a + b, 0) + " USD",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;

            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    }]
});



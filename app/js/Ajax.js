$.ajax({
    method: 'GET',
    url: 'http://localhost:3000/posts',
    success: function (data) {
        CreateLineChart(new Map(Object.entries(data[0])));
        CreateDoughnutChart(new Map(Object.entries(data[1])));
    }
});





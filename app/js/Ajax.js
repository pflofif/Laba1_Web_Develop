$.ajax({
    method: 'GET',
    url: 'http://localhost:3000/Lines',
    success: function (data) {
        CreateLineChart(new Map(Object.entries(data[0])));
        CreateDoughnutChart(new Map(Object.entries(data[1])));
    },
    error: function (err){
        console.log(err);
    }
});





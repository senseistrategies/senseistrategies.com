var barChartData = {
    labels: ["Protein", "Carbs", "Fat"],
    datasets: [
        {
            label: "Food 1",
            data: [
                22,
                7,
                18
            ],
            backgroundColor: "rgba(255,0,0,.4)",
            hoverBackgroundColor: "rgba(255,0,0,.8)"
        },
        {
            label: "Food 2",
            data: [
                2,
                16,
                13
            ],
            backgroundColor: "rgba(0,255,0,.4)",
            hoverBackgroundColor: "rgba(0,255,0,.8)"
        },
        {
            label: "Remaining",
            data: [
                153,
                30,
                122
            ],
            backgroundColor: "rgba(30,30,30,.4)",
            hoverBackgroundColor: "rgba(30,30,30,.8)"
        }
    ]
};
var ctx = document.getElementById("widget-canvas").getContext("2d");
var myChart = new Chart(ctx, {
    type: "bar",
    data: barChartData,
    options: {
        scales: {
            xAxes: [{
                stacked: true,
                barPercentage: .5,
                ticks: {
                    fontColor: "rgba(255,255,255,1)"
                }
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    fontColor: "rgba(255,255,255,1)"
                }
            }]
        },
        legend: {
            display: false
        },
        tooltips: {
            position: "custom"
        },
        hover: {
            mode: "dataset"
        }
    }
});
Chart.Tooltip.positioners.custom = function(elements, eventPosition) {
    return eventPosition;
};
console.log(myChart);
var barChartData = {
    labels: ["Protein", "Carbs", "Fat"],
    datasets: [
        {
            label: "Remaining",
            data: [
                50,
                50,
                50
            ],
            targets: [
                50,
                50,
                50
            ],
            backgroundColor: "rgba(30,30,30,.4)",
            hoverBackgroundColor: "rgba(30,30,30,.8)"
        }
    ]
};
var context = document.getElementById("widget-canvas").getContext("2d");
var composerChart = new Chart(context, {
    type: "bar",
    data: barChartData,
    options: {
        scales: {
            xAxes: [{
                stacked: true,
                barPercentage: .5,
                suggestedMax: 400,
                ticks: {
                    fontColor: "rgba(255,255,255,1)"
                }
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    maxTicksLimit: 6,
                    fontColor: "rgba(255,255,255,1)"
                }
            }]
        },
        legend: {
            display: false
        },
        tooltips: {
            position: "nearest"
        },
        hover: {
            mode: "dataset"
        }
    }
});
Chart.Tooltip.positioners.custom = function(elements, eventPosition) {
    return eventPosition;
};
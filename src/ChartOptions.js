//Options for charts

const chartOptions = {
  legend: {
    display: false,
    labels: {
      boxWidth: 0
    }
  },
  tooltips: { 
    intersect: false,
    position: 'nearest',
    mode: 'index',
    backgroundColor: 'white',
    borderColor: 'rgb(0 200 5)',
    bodyFontColor: 'black',
    titleFontColor: 'black',
    cornerRadius: 4,
    titleFontStyle: 'normal',
    bodyFontStyle: 'bold',
    callbacks: {
      // Include a dollar sign in the tooltip label
      label: function(tooltipItem, data) {
          let label = "$" + tooltipItem.yLabel;
          return label;
      }
    }
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        ticks: {
          autoSkip: true,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return '$' + value;
          }
        },
        gridLines: {
          display: true,
          drawOnChartArea: false
        }
      }
    ],
    xAxes: [
      {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 4,
          maxRotation: 0
        },
        gridLines: {
          display: true,
          drawOnChartArea: false
        }
      }
    ]
  }
}

export default chartOptions;
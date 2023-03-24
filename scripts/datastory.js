const senti = document.getElementById('histogram').getContext('2d');

const chart = new Chart(senti, {
  type: 'bar',
  data: {
    labels: [0, 1, 2, 3, 4],
    datasets: [{
      label: 'Sentiment of Bojack Horseman',
      data: [19, 28, 20, 16],
      backgroundColor: 'green',
    }]
  },
  options: {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
        scaleLabel: {
          display: true,
          labelString: 'test',
        },
        barPercentage: 1.3,
        ticks: {
          max: 3,
          color: 'green',
        }
      }, {
        display: true,
        ticks: {
          autoSkip: false,
          max: 4,
        }
      }],
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

// more charts to come 
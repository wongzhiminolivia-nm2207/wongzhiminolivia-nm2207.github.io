document.getElementById('storyboardButton').addEventListener('click', function() {
  window.open('https://miro.com/app/board/uXjVMdFH5Tc=/?share_link_id=350856146963');
})

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
        barPercentage: 1.3,
        ticks: {
          max: 3,
        }
      }, {
        display: true,
        ticks: {
          autoSkip: false,
          max: 4,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
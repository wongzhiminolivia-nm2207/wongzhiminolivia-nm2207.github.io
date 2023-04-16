
// PIE //

const pie = document.getElementById('pie').getContext('2d');

const pieChart = new Chart(pie, {
  type: 'pie',
  data: {
    labels: [
      'BoJack Horseman',
      'Todd',
      'Princess Carolyn',
      'Diane',
      'Mr. Peanutbutter',
      'Other characters'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [5091, 1625, 1792, 2098, 1586, 8724],
      backgroundColor: [
        '#c16643',
        '#e70125',
        '#fa84e6',
        '#546e1f',
        '#f9df22',
        '#2f5eb2',
      ],
      hoverOffset: 4
    }]
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      position: "bottom",
      labels: {
        fontColor: "#fff9f4",
        fontSize: 12,
      }
    }
  }
});

// BAR FOR SENTIMENTS BY EP //

const senti = document.getElementById('senti-bar').getContext('2d');

const labels = ['S1E1', 'S1E2', 'S1E3', 'S1E4', 'S1E5', 'S1E6', 'S1E7', 'S1E8', 'S1E9',
  'S1E10', 'S1E11', 'S1E12', 'S2E1', 'S2E2', 'S2E3', 'S2E4', 'S2E5', 'S2E6', 'S2E7', 'S2E8',
  'S2E9', 'S2E10', 'S2E11', 'S2E12', 'S3E1', 'S3E2', 'S3E3', 'S3E4', 'S3E5', 'S3E6', 'S3E7',
  'S3E8', 'S3E9', 'S3E10', 'S3E11', 'S4E1', 'S4E2', 'S4E3', 'S4E11', 'S4E12', 'S5E1', 'S5E2', 'S5E3', 'S5E4', 'S5E5', 'S5E6', 'S5E7',
  'S5E8', 'S5E9', 'S5E10', 'S5E11', 'S5E12', 'S6E1', 'S6E2', 'S6E3', 'S6E4', 'S6E5', 'S6E6', 'S6E7',
  'S6E8', 'S6E9', 'S6E10', 'S6E11', 'S6E12', 'S6E13', 'S6E14', 'S6E15', 'S6E16']
const datapoints = ['0.0612', '0.103', '0.075', '0.096', '0.082', '0.096', '0.095', '0.091', '0.139', '0.108',
  '0.122', '0.147', '0.105', '0.057', '0.067', '0.128', '0.13', '0.086', '0.065', '0.1', '0.073', '0.086',
  '0.1', '0.109', '0.112', '0.119', '0.046', '-0.034', '0.177', '0.075', '0.048', '0.12', '0.084', '0.099',
  '0.034', '0.145', '0.067', '0.135', '0.122', '0.081', '0.101', '0.139', '0.082', '0.07', '0.11', '0.074',
  '0.073', '0.129', '0.103', '0.085', '-0.001', '0.06', '0.025', '0.131', '0.079', '0.035', '0.112', '0.104',
  '0.096', '0.106', '0.092', '0.043', '0.1', '0.053', '0.086', '0.05', '0.108', '0.08']
const sentichart = new Chart(senti, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Sentiment',
      data: datapoints,
      backgroundColor: '#BE833C',
    }]
  },
  options: {
    maintainAspectRatio: false,
    //animation: false,
    legend: {
      position: "bottom",
    },
    scales: {
      xAxes: [{
        display: false,
        scaleLabel: {
          display: true,
          labelString: 'test',
        },
        //barPercentage: 1.3,
        ticks: {
          max: 3,
          color: '#DC4423',
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
})

//

// RANGE SLIDER TO UPDATE SENTI CHART //

// partially followed https://www.youtube.com/watch?v=mIMauE-DodA with amendments
const slider = document.getElementById('slider');

slider.oninput = function () {
  //console.log(slider.value);
  // get every label at each point of range
  //console.log(sentichart.data.labels)
  const sliderValue = labels.slice(0, slider.value);
  //console.log(sliderValue)
  sentichart.data.labels = sliderValue;
  sentichart.update();
}

//


// BAR MODAL FOR SENTI CHART //

// code sources for bar modal event: 
////https://www.youtube.com/watch?v=x1WZZWYUmTA,
////https://stackoverflow.com/questions/54275079/how-can-i-launch-a-modal-after-clicking-each-bar-in-bar-chart-in-chartjs-and-als,
////chatgpt (initial prompt: 'how to launch a modal after clicking a specific bar in Bar chart in Chartjs' + follow up prompts to fix errors)
const barModal = document.getElementById('barModal');

function modalClose() {
  barModal.classList.toggle('hide')
}

/*function modalOpen(click) {
  // feed click as argument to get information in console about location of click
  //console.log(click)
  // rather than triggering function when any part of the canvas is clicked,
  // pinpoint the bar that should be clicked
  const points = sentichart.getElementsAtEventForMode(click, 'nearest', {
    intersect: true}, true);
  //console.log(points)
  // if statement prevents errors
  // clicking on whitespace would produce no arrays, which might throw errors
  if(points[0]) {
    console.log(points[0])
    //const dataset = points[0].datasetIndex
    //const datapoint = points[0].index;
    // extract the value of the datapoint from chart
    //console.log(sentichart.data.labels[datapoint]);
    //barModal.classList.toggle('hide')

    /*const labels = document.querySelectorAll('.label');
    console.log(labels);
    labels.forEach(label => {
      label.innerText = sentichart.data.labels[datapoint];
    }) */
//barModal.classList.toggle('hide');
//}
//}


sentichart.canvas.addEventListener('click', function (evt) {
  const activeBars = sentichart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
  if (activeBars.length > 0) {
    // get index of the clicked bar
    //const clickedLabel = sentichart.data.labels[activeBars[0].index];
    const clickedIndex = activeBars[0]._index;
    console.log(clickedIndex);
    if (clickedIndex === 27) {
      modalClose();
    }
  }
});

//



// BAR FOR RATINGS BY EP//
const rating = document.getElementById('rating-bar').getContext('2d');

const ratingLabels = ['S1E1', 'S1E2', 'S1E3', 'S1E4', 'S1E5', 'S1E6', 'S1E7', 'S1E8', 'S1E9',
  'S1E10', 'S1E11', 'S1E12', 'S2E1', 'S2E2', 'S2E3', 'S2E4', 'S2E5', 'S2E6', 'S2E7', 'S2E8',
  'S2E9', 'S2E10', 'S2E11', 'S2E12', 'S3E1', 'S3E2', 'S3E3', 'S3E4', 'S3E5', 'S3E6', 'S3E7',
  'S3E8', 'S3E9', 'S3E10', 'S3E11', 'S4E1', 'S4E2', 'S4E3', 'S4E11', 'S4E12', 'S5E1', 'S5E2', 'S5E3', 'S5E4', 'S5E5', 'S5E6', 'S5E7',
  'S5E8', 'S5E9', 'S5E10', 'S5E11', 'S5E12', 'S6E1', 'S6E2', 'S6E3', 'S6E4', 'S6E5', 'S6E6', 'S6E7',
  'S6E8', 'S6E9', 'S6E10', 'S6E11', 'S6E12', 'S6E13', 'S6E14', 'S6E15', 'S6E16']
const ratingData = [7.1, 7.6, 7.3, 7.4, 7.4, 7.8, 7.9, 8.5, 7.8, 7.6, 9.1, 8.3, 7.1, 8, 7.8, 7.9, 7.8, 7.6, 8.2, 8.8,
  8.2, 8.4, 9.3, 8.5, 7.8, 8, 7.4, 9.6, 8.1, 8.1, 8.3, 7.8, 8.5, 8.7, 9.6, 7.6, 9.3, 8.4, 9.8, 8.9, 8, 9, 8, 8.1, 8.4, 9.8, 8.8, 8.5, 8.2, 8.9, 9.6, 9, 9, 8.5, 8, 9, 8,
  8.1, 9.3, 8.5, 8.3, 8.9, 8.6, 9.2, 8.6, 8.9, 9.9, 9.5]

const ratingchart = new Chart(rating, {
  type: 'bar',
  data: {
    labels: ratingLabels,
    datasets: [{
      label: 'Rating',
      data: ratingData,
      backgroundColor: '#8F5918',
      barPercentage: 0.0005,
    }]
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      position: "bottom",
    },
    scales: {
      xAxes: [{
        display: false,
        scaleLabel: {
          display: true,
          labelString: 'test',
        },
        //barPercentage: 1.1,
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

//

// RANGE SLIDER TO UPDATE RATINGS CHART //
const ratingSlider = document.getElementById('rating-slider');

ratingSlider.oninput = function () {
  //console.log(slider.value);
  // get every label at each point of range
  //console.log(sentichart.data.labels)
  const sliderValue = labels.slice(0, ratingSlider.value);
  //console.log(sliderValue)
  ratingchart.data.labels = sliderValue;
  ratingchart.update();
}

//



// SECOND BAR FOR RATINGS BY EP//
const rating2 = document.getElementById('rating-bar2').getContext('2d');

const ratingLabels2 = ['S1E1', 'S1E2', 'S1E3', 'S1E4', 'S1E5', 'S1E6', 'S1E7', 'S1E8', 'S1E9',
  'S1E10', 'S1E11', 'S1E12', 'S2E1', 'S2E2', 'S2E3', 'S2E4', 'S2E5', 'S2E6', 'S2E7', 'S2E8',
  'S2E9', 'S2E10', 'S2E11', 'S2E12', 'S3E1', 'S3E2', 'S3E3', 'S3E4', 'S3E5', 'S3E6', 'S3E7',
  'S3E8', 'S3E9', 'S3E10', 'S3E11', 'S4E1', 'S4E2', 'S4E3', 'S4E11', 'S4E12', 'S5E1', 'S5E2', 'S5E3', 'S5E4', 'S5E5', 'S5E6', 'S5E7',
  'S5E8', 'S5E9', 'S5E10', 'S5E11', 'S5E12', 'S6E1', 'S6E2', 'S6E3', 'S6E4', 'S6E5', 'S6E6', 'S6E7',
  'S6E8', 'S6E9', 'S6E10', 'S6E11', 'S6E12', 'S6E13', 'S6E14', 'S6E15', 'S6E16']
const ratingData2 = [1.42, 1.52, 1.46, 1.48, 1.48, 1.56, 1.58, 1.7, 1.56, 1.52, 1.82, 1.66, 1.42, 1.6, 1.56, 1.58, 1.56, 1.52, 1.64,
  1.76, 1.64, 1.68, 1.86, 1.7, 1.56, 1.6, 1.48, 1.92, 1.62, 1.62, 1.66, 1.56, 1.7, 1.74, 1.92, 1.52, 1.86, 1.68, 1.96, 1.78, 1.6,
  1.8, 1.6, 1.62, 1.68, 1.96, 1.76, 1.7, 1.64, 1.78, 1.92, 1.8, 1.8, 1.7, 1.6, 1.8, 1.6, 1.62, 1.86, 1.7, 1.66, 1.78, 1.72, 1.84,
  1.72, 1.78, 1.98, 1.9]
const sentiData2 = [1.0612, 1.103, 1.075, 1.096, 1.082, 1.096, 1.095, 1.091, 1.139, 1.108, 1.122, 1.147, 1.105, 1.057, 1.067, 1.128,
  1.13, 1.086, 1.065, 1.1, 1.073, 1.086, 1.1, 1.109, 1.112, 1.119, 1.046, 0.966, 1.177, 1.075, 1.048, 1.12, 1.084, 1.099, 1.034, 1.145,
  1.067, 1.135, 1.122, 1.081, 1.101, 1.139, 1.082, 1.07, 1.11, 1.074, 1.073, 1.129, 1.103, 1.085, 0.999, 1.06, 1.025, 1.131, 1.079,
  1.035, 1.112, 1.104, 1.096, 1.106, 1.092, 1.043, 1.1, 1.053, 1.086, 1.05, 1.108, 1.08]
const ratingchart2Data = {
  labels: ratingLabels2,
  datasets: [{
    label: 'Rating',
    data: ratingData2,
    color: '#9ecae6',
    backgroundColor: '#9ecae6',
    borderColor: '#9ecae6',
    fill: false,
    tension: 0.4,
    hoverBorderColor: 'green',
    hoverBorderWidth: 5,
  },
  {
    label: 'Sentiment',
    data: sentiData2,
    backgroundColor: '#366385',
    borderColor: '#366385',
    fill: false,
    tension: 0.4,
    hoverBorderColor: 'green'
  }]
}
const ratingchart2Options = {
  maintainAspectRatio: false,
  legend: {
    position: "bottom",
  },
  scales: {
    xAxes: [{
      display: false,
      scaleLabel: {
        display: false,
        labelString: 'test',
      },
      //barPercentage: 1.1,
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
  },
  hover: {
    mode: 'index',
    intersect: true,
  },
  elements: {
    point: {
      hitRadius: 10
    }
  }
}
let ratingchart2 = new Chart(rating2, {
  type: 'line',
  data: ratingchart2Data,
  options: ratingchart2Options,
});

//

// RANGE SLIDER TO UPDATE RATINGS CHART //
const ratingSlider2 = document.getElementById('rating-slider2');

ratingSlider2.oninput = function () {
  //console.log(slider.value);
  // get every label at each point of range
  //console.log(sentichart.data.labels)
  const sliderValue = labels.slice(0, ratingSlider2.value);
  //console.log(sliderValue)
  ratingchart2.data.labels = sliderValue;
  ratingchart2.update();
}

//

// UPDATE CHART TYPE //

function updateChartType() {
  ratingchart2.destroy();
  ratingchart2 = new Chart(rating2, {
    type: document.getElementById('chartType').value,
    data: ratingchart2Data,
    options: ratingchart2Options,
  });
}
function updateChartType2() {
  ratingchart2.destroy();
  ratingchart2 = new Chart(rating2, {
    type: document.getElementById('chartType2').value,
    data: ratingchart2Data,
    options: ratingchart2Options,
  });
}

document.getElementById('chartType').addEventListener('click', updateChartType);
document.getElementById('chartType2').addEventListener('click', updateChartType2);

//


// BAR COMPARING MR PEANUTBUTTER AND BOJACK //
const compareBar = document.getElementById('compareBar').getContext('2d');

const compareLabels = ['S1E1', 'S1E2', 'S1E3', 'S1E4', 'S1E5', 'S1E6', 'S1E9', 'S1E10', 'S1E12', 'S2E1', 'S2E2', 'S2E3', 'S2E4',
  'S2E5', 'S2E6', 'S2E7', 'S2E8', 'S2E9', 'S2E10', 'S2E12', 'S3E1', 'S3E2', 'S3E3', 'S3E5', 'S3E6', 'S3E7', 'S3E8', 'S3E10', 'S4E3',
  'S4E12', 'S5E1', 'S5E2', 'S5E3', 'S5E4', 'S5E5', 'S5E7', 'S5E8', 'S5E9', 'S5E10', 'S5E11', 'S5E12', 'S6E1', 'S6E2', 'S6E4', 'S6E5',
  'S6E6', 'S6E7', 'S6E9', 'S6E10', 'S6E11', 'S6E12', 'S6E13', 'S6E14', 'S6E16']
const bojackCompareData = [0.0317, 0.0392, 0.0843, 0.102, 0.162, 0.0332, 0.11, 0.106, 0.144, 0.114, 0.011, -0.00262, 0.134, 0.175, 0.0957, 0.107, 0.081, -0.00198, 0.0406, 0.0333, 0.103, 0.101, 0.0224, 0.144, 0.127, 0.0697, 0.0353, 0.0717, 0.123, 0.0157, -0.0315, 0.101, 0.0311, 0.127, -0.0216, 0.109, 0.0357, 0.0745, 0.0629, 0.00557, 0.0941, 0.0175, 0.194, 0.0422, 0.115, 0.162, 0.0822, 0.0831, 0.142, 0.0479, 0.0464, 0.0287, 0.0243, 0.0265]
const butterCompareData = [0.166, 0.32, 0.467, 0.142, 0.445, 0.174, 0.218, 0.144, 0.193, 0.0316, 0.13, 0.345, 0.162, 0.0516, 0.295, 0.229, 0.117, -0.0716, 0.188, 0.232, 0.218, 0.233, 0.118, 0.245, 0.107, 0.0209, 0.0817, 0.186, 0.409, 0.156, 0.335, 0.263, 0.24, -0.0113, 0.233, -0.0154, 0.194, 0.118, 0.0757, 0.139, 0.0818, 0.102, 0.124, 0.0174, 0.193, -0.136, 0.0737, 0.27, 0.143, 0.152, 0.163, 0.108, 0.188, 0.16]
const compareData = {
  labels: compareLabels,
  datasets: [{
    label: 'BoJack',
    data: bojackCompareData,
    backgroundColor: '#c16643',
    borderColor: '#c16643',
  },
  {
    label: 'Mr. Peanutbutter',
    data: butterCompareData,
    backgroundColor: '#d1bd2e',
    borderColor: '#d1bd2e',
  }]
}
const compareOptions = {
  maintainAspectRatio: false,
  legend: {
    position: "bottom",
  },
  scales: {
    xAxes: [{
      display: false,
      scaleLabel: {
        display: false,
        labelString: 'test',
      },
      //barPercentage: 1.1,
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
  },
}
let compareChart = new Chart(compareBar, {
  type: 'scatter',
  data: compareData,
  options: compareOptions,
});

// RANGE SLIDER FOR COMPARE CHART //
const compareSlider = document.getElementById('rating-slider-compare');

compareSlider.oninput = function () {
  //console.log(slider.value);
  // get every label at each point of range
  //console.log(sentichart.data.labels)
  const sliderValue = labels.slice(0, compareSlider.value);
  //console.log(sliderValue)
  compareChart.data.labels = sliderValue;
  compareChart.update();
}

// UPDATE CHART TYPE //

function updateCompareChartType() {
  compareChart.destroy();
  compareChart = new Chart(compareBar, {
    type: document.getElementById('compareChartType').value,
    data: compareData,
    options: compareOptions,
  });
}
function updateCompareChartType2() {
  compareChart.destroy();
  compareChart = new Chart(compareBar, {
    type: document.getElementById('compareChartType2').value,
    data: {
      labels: compareLabels,
      datasets: [{
        label: 'BoJack',
        data: bojackCompareData,
        backgroundColor: '#c16643',
        borderColor: '#c16643',
        fill: false,
      },
      {
        label: 'Mr. Peanutbutter',
        data: butterCompareData,
        backgroundColor: '#d1bd2e',
        borderColor: '#d1bd2e',
        fill: false,
      }]
    },
    options: compareOptions,
  });
}
function updateCompareChartType3() {
  compareChart.destroy();
  compareChart = new Chart(compareBar, {
    type: document.getElementById('compareChartType3').value,
    data: compareData,
    options: compareOptions,
  });
}

document.getElementById('compareChartType').addEventListener('click', updateCompareChartType);
document.getElementById('compareChartType2').addEventListener('click', updateCompareChartType2);
document.getElementById('compareChartType3').addEventListener('click', updateCompareChartType3);



// SCATTER PLOT //

/*fetch('https://2207-resources.s3.ap-southeast-1.amazonaws.com/bojackhorsemansentiments.csv')
  .then(response => response.json())
  .then(data => {
    const specificValue = 'S1E1'; // Specify the specific value you want to filter by
    const filteredData = data.filter(row => row[0] === specificValue);
    //console.log('Filtered data:', filteredData);
    // Process the filtered data

    const specificColumnData = filteredData.map(row => row[5]); // Specify the column index you want to extract data from
    console.log('Specific column data:', specificColumnData);
    // Process the specific column data
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  }); */
// tried this out and got Error fetching data: SyntaxError: Unexpected token ',', ",FALSE,Nam"... is not valid JSON





/* DUMP /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// testing fetch
const data = fetch(
  "https://2207-resources.s3.ap-southeast-1.amazonaws.com/bojackhorsemansentiments.csv"
)
  .then(function (response) {
    return response.text();
  })
  .then(function (data) {
    const table = [];
    const rows = data.split("\r\n");
  })
rows.forEach((r, index) => {
  const item = rows.split(",");
  table.push(item);
});
console.log(table);


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
        //barPercentage: 1.3,
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

// map
d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/gapminder_with_codes.csv", function (err, rows) {

  // Helper function to filter data by year
  function getDataByYear(year) {
    return rows.filter(row => row.year === year.toString())
  }

  // Define the years for which we want to create frames
  const years = d3.range(1952, 2007, 5);


  // Create frames for each year using the filtered data
  const frames = [];

  for (let i = 0; i < years.length; i++) {
    const year = years[i];
    const data = getDataByYear(year);

    const frame = {
      name: year.toString(),
      data: [
        {
          z: data.map((row) => row.lifeExp),
          locations: data.map((row) => row.iso_alpha),
          text: data.map((row) => row.country),
        }
      ]
    };

    frames.push(frame);
  }


  // Define the initial data for the choropleth map
  const data = [{
    type: "choropleth",
    locationmode: "world",
    locations: frames[0].data[0].locations,
    z: frames[0].data[0].z,
    text: frames[0].data[0].text,
    zauto: false,
    zmin: 30,
    zmax: 90,
  }];

  // Define the layout for the plot, including the geo settings, updatemenus, and sliders
  const layout = {
    plot_bgcolor: "black",
    paper_bgcolor: "#e0cfb1",
    title: 'World Life Expectancy<br>1952 - 2007',
    geo: {
      scope: 'world',
      showland: true,
      landcolor: 'rgb(217, 217, 217)',
      countrycolor: 'rgb(255, 255, 255)',
      showlakes: true,
      lakecolor: 'rgb(255, 255, 255)',
      subunitcolor: 'rgb(255, 255, 255)'
    },
    updatemenus: [{
      x: 0.1,
      y: 0.5,
      showactive: false,
      direction: "left",
      type: "buttons",
      buttons: [{
        method: "animate",
        args: [null, {
          fromcurrent: true,
          transition: {
            duration: 200,
          },
          frame: {
            duration: 500
          }
        }],
        label: "Play"
      },
      {
        method: "animate",
        args: [
          [null],
          {
            mode: "immediate",
            transition: {
              duration: 0
            },
            frame: {
              duration: 0
            }
          }
        ],
        label: "Pause"
      }]
    }],
    sliders: [{
      steps: years.map(year => ({
        label: year.toString(),
        method: "animate",
        args: [[year.toString()], { mode: "immediate" }]
      })),
      currentvalue: { prefix: "Year:", font: { size: 20, color: "#666" } },
    }]
  };

  // Create the plot with the initial data and layout, then add the frames
  Plotly.newPlot('myDiv', data, layout).then(function () {
    Plotly.addFrames('myDiv', frames);
  });
});

// box plot and line plot
d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/gapminder_with_codes.csv", function (err, data) {
  // d3.csv() returns the data as an object ^
  // this object is an array of objects loaded from your csv file where each object represents one row of your csv file.
  if (err) {
    console.error(err);
    return;
  }

  /// #1: BOXPLOT ///
  // Filter data for Singapore, China, and the USA
  // e.g. keep only the row that correspond to SG data
  const singaporeData = data.filter(row => row.country === "Singapore");
  const chinaData = data.filter(row => row.country === "China");
  const usaData = data.filter(row => row.country === "United States");

  // Extract lifeExp values (specific column) for each country 
  // parse float since these are numbers that we want js to understand 
  const singaporeLifeExp = singaporeData.map(row => parseFloat(row.lifeExp));
  const chinaLifeExp = chinaData.map(row => parseFloat(row.lifeExp));
  const usaLifeExp = usaData.map(row => parseFloat(row.lifeExp));

  // Create a trace for each country
  const singaporeTrace = {
    y: singaporeLifeExp,
    name: "Singapore",
    type: "box",
    marker: { color: "#3D9970" }
  };

  const chinaTrace = {
    y: chinaLifeExp,
    name: "China",
    type: "box",
    marker: { color: "#FF4136" }
  };

  const usaTrace = {
    y: usaLifeExp,
    name: "USA",
    type: "box",
    marker: { color: "#FF851B" }
  };

  // Combine traces into a single data array
  const plotData = [singaporeTrace, chinaTrace, usaTrace];

  // Define the layout for the box plot with axis labels, chart title, and subtitle
  const layout = {
    // width: 500,
    paper_bgcolor: '#e0cfb1',
    plot_bgcolor: '#e0cfb1',
    title: {
      text: "Life Expectancy Comparison: Singapore, China, and USA",
      font: { size: 24 }
    },
    xaxis: {
      title: "Country"
    },
    yaxis: {
      title: "Life Expectancy"
    },
    showlegend: true,
    annotations: [
      {
        text: 'Subtitle',
        xref: 'paper',
        yref: 'paper',
        x: 0.5,
        y: 1.0,
        showarrow: false,
        font: {
          size: 16
        }
      }
    ]
  };

  // Create the box plot in the 'myDiv' element
  Plotly.newPlot("boxplot", plotData, layout);


  /// #2: LINE ///
  // plot the trend of life expectancy in these three countries from 1952-2007
  // change the “type” of the “traces” to change the boxplot into a line plot

  // Create a trace for each country
  const singaporeTrace2 = {
    y: singaporeLifeExp,
    name: "Singapore",
    type: "lines+markers",
    marker: { color: "#3D9970" }
  };

  const chinaTrace2 = {
    y: chinaLifeExp,
    name: "China",
    type: "lines+markers",
    marker: { color: "#FF4136" }
  };

  const usaTrace2 = {
    y: usaLifeExp,
    name: "USA",
    type: "lines+markers",
    marker: { color: "#FF851B" }
  };

  // Combine traces into a single data array
  const plotData2 = [singaporeTrace2, chinaTrace2, usaTrace2];

  // Define the layout for the line plot with axis labels, chart title, and subtitle
  const layout2 = {
    // width: 500,
    paper_bgcolor: '#e0cfb1',
    plot_bgcolor: '#e0cfb1',
    title: {
      text: "Life Expectancy Trend: Singapore, China, and USA",
      font: { size: 24 }
    },
    xaxis: {
      title: "Year",
    },
    yaxis: {
      title: "Life Expectancy"
    },
    showlegend: true,
    annotations: [
      {
        text: 'From 1952 to 2007',
        xref: 'paper',
        yref: 'paper',
        x: 0.5,
        y: 1.0,
        showarrow: false,
        font: {
          size: 16
        }
      }
    ]
  };

  // Create the box plot in the 'myDiv' element
  Plotly.newPlot("lineplot", plotData2, layout2);

});



// word cloud with d3

// List of words
var myWords = ["Hello", "Everybody", "How", "Are", "You", "Today", "It", "Is", "A", "Lovely", "Day", "I", "Love", "Coding", "In", "My", "Van", "Mate"]

// set the dimensions and margins of the graph
var margin = { top: 10, right: 10, bottom: 10, left: 10 },
  width = 450 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
var layout = d3.layout.cloud()
  .size([width, height])
  .words(myWords.map(function (d) { return { text: d }; }))
  .padding(10)
  .fontSize(60)
  .on("end", draw);
layout.start();

// This function takes the output of 'layout' above and draw the words
// Better not to touch it. To change parameters, play with the 'layout' variable above
function draw(words) {
  svg
    .append("g")
    .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
    .data(words)
    .enter().append("text")
    .style("font-size", function (d) { return d.size + "px"; })
    .attr("text-anchor", "middle")
    .attr("transform", function (d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function (d) { return d.text; });
}

*/

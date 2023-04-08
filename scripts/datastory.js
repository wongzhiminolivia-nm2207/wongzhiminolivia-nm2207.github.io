


// PIE

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


/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// testing fetch
const data = fetch(
  "..\data\bojackhorsemansentiments.csv"
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

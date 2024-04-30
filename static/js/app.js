function init() {
    // Get the reference to the dropdown select element
    dropdownMenu = d3.select("#selDataset");
    // Use the list of sample names to populate the select options
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
      sampleNames = data.names;
      sampleNames.forEach((sample) => {
        dropdownMenu
          .append("option")
          .text(sample)
          .property("value", sample);
      });
      // Use the first sample from the list to build the initial plots
      Sample = sampleNames[0];
     plotCharts(Sample);
      DisplaySeldata(Sample);
    });
  };
  // Initialize the dashboard
  init();
  function optionChanged(newSample) {
   // Fetch new data each time a new sample is selected
   DisplaySeldata(newSample);
   plotCharts(newSample);
    
  };
  // Demographics Panel 
  function DisplaySeldata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    seldata = data.metadata;
    // Filter the data for the object with the desired sample number
    resultArray = seldata.filter(s => s.id == sample);
    result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    selectedData = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    selectedData.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      selectedData.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
  }
  // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
  //Building a function to achive above passing individual sample.
  function plotCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    //Create a variable that holds the samples array. 
    sampleArray = data.samples;
       
    //Create a variable that filters the samples passed to function.
    chart = sampleArray.filter(j => j.id == sample);
    
    // Create a variable that holds the sample in the array.
    ArraySample = chart[0];
      
    //Create variables that hold the otu_ids, otu_labels, and sample_values.
    Ids = ArraySample.otu_ids;
    Labels = ArraySample.otu_labels;
    sampleValues = ArraySample.sample_values;
    
    
    yticks = Ids.slice(0,10).map(x => "OTU " + x).reverse();
      //Create the trace for the bar chart. 
    trace = {
      type: "bar",
      text: Labels.slice(0,10).reverse(),
      x: sampleValues.slice(0,10).reverse(),
      y: yticks,
      hovertext: Labels,
      orientation: 'h'
    };
    barData = [trace];
    // Create the layout for the bar chart. 
    barLayout = {
      title: "<b>Top 10 Bacteria Cultures Found</b>",
         };
    //Use Plotly to plot the data with the layout. 
    Plotly.newPlot('bar',barData, barLayout);
    
    // Create the trace for the bubble chart. uses sample alues for marker size 
    trace2 = {
      x: Ids,
      y: sampleValues,
      mode: 'markers',
      hovertext: Labels,
      marker: {
        color: Ids,
        size: sampleValues,
        colorscale: "Picnic"
      }
    };
   bubbleData = [trace2];
   title = sample + "'s Bacteria Culture"
    // Create the layout for the bubble chart.
      bubbleLayout = {
      title: title,
      xaxis:{title: "OTU ID"}
    
    };
    //  Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble',bubbleData, bubbleLayout);
    //  Create the trace for the gauge chart.
    metadata = data.metadata;
    resultArray = metadata.filter(O => O.id == sample);
    result = resultArray[0];
    wFreq = result.wfreq;
    console.log(wFreq);
    var trace3 = {
      type: "indicator",
      mode: "gauge+number+delta",
      value: wFreq,
      title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week" },
      gauge: {
        axis: { range: [0, 10] },
        steps: [
          { range: [0, 2], color: "lightgray" },
          { range: [2, 4], color: "goldenrod" },
          { range: [4, 6], color: "palegreen" },
          { range: [6, 8], color: "lightseagreen" },
          { range: [8, 10], color: "darkslateblue" },
        ]
      }
    };
   gaugeData = [trace3];
    // Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 460, 
      height: 400, 
      margin: { t: 0, b: 0 } };
      
    // Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge',gaugeData, gaugeLayout);
   
    
  });
  };

  // Github page available at 
  
//Use the D3 library to read in samples.json from 
//the URL https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json

const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";
dropdownMenu = d3.select("#selDataset");

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
    // dropdownMenu = d3.select("#selDataset");
    sampleNames = data.names;

    sampleNames.forEach((sample) => {
      dropdownMenu
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    sample = sampleNames[0];
    DisplaySeldata(sample)
});
function DisplaySeldata(sample){
d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {   


seldata = data.metadata;
  // Filter the data for the object with the desired sample number
  resultArray = seldata.filter(s => s.id == sample);
  result = resultArray[0];
  // Use d3 to select the panel with id of `#sample-metadata`
  selectedData = d3.select("#sample-metadata");

  // Use `.html("") to clear any existing metadata
  selectedData.html("");

  Object.entries(result).forEach(([key, value]) => {
    selectedData.append("h6").text(`${key.toUpperCase()}: ${value}`);
  });
  console.log(result);

});
}
function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    DisplaySeldata(newSample);}

  




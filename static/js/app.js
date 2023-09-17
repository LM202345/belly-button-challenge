// Get the samples endpoint
let data_source = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
let data_samples = [];
let data_metadata = []
// Fetch the JSON data
d3.json(data_source).then(function (data) {
    //Obtain all samples and metadata
    data_samples = data.samples;
    data_metadata = data.metadata;
    // Fill dropdown selDataset - Test Subject ID No.:
    let data_names = data.names;
    data_names.forEach(function (id, index) {
        d3.select("#selDataset").append("option").attr("value", id).text(`${id}`);
    });
    updatePlotly();
});
// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);
// This function is called when a dropdown menu item is selected
function updatePlotly() {
    // Use D3 to select the dropdown menu
    let dropdown = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let selectedValue = dropdown.property("value");
    //Get sample index of selectedValue
    let index = data_samples.findIndex(x => x.id === selectedValue);
    //Get sample to fill dataset
    let sample = data_samples[index];
    let sampleData = sample.otu_ids.map((otu_id, index) => ({
        otu_id,
        sample_value: sample.sample_values[index],
        otu_label: sample.otu_labels[index]
    }));
    // Sort and slice to obtain top 10
    sampleData.sort((a, b) => b.sample_value - a.sample_value);
    let top10OtuIds = sampleData.slice(0, 10).map(item => "OTU " + item.otu_id).reverse();;
    let top10SampleValues = sampleData.slice(0, 10).map(item => item.sample_value).reverse();;
    let top10OtuLabels = sampleData.slice(0, 10).map(item => item.otu_label).reverse();;
    //Dataset to plot bar
    let dataset_bar = [{
        type: 'bar',
        x: top10SampleValues,
        y: top10OtuIds,
        text: top10OtuLabels,
        orientation: 'h'
    }];
    Plotly.newPlot("bar", dataset_bar);
    //obtain data for bubble
    let OtuIds = sampleData.map(item => item.otu_id);
    let SampleValues = sampleData.map(item => item.sample_value);
    let OtuLabels = sampleData.map(item => item.otu_label);
    //Dataset to plot bubble
    var trace1 = {
        x: OtuIds,
        y: SampleValues,
        mode: 'markers',
        text: OtuLabels,
        marker: {
            color: OtuIds,
            size: SampleValues
        }
    };
    var dataset_bubble = [trace1];
    var layout = {
        title: {
            text: 'OTU ID',
            y: 0.05,
            yanchor: 'bottom'
        },
        showlegend: false,
        // height: 600,
        // width: 600
    };
    Plotly.newPlot('bubble', dataset_bubble, layout);
    //Obtain sample metadata
    let metadata = data_metadata[index];
    let demografic = document.getElementById("sample-metadata");
    let htmlString = "";
    for (key in metadata) {
        if (metadata.hasOwnProperty(key)) {
            htmlString = htmlString + `${key}: ${metadata[key]}<br>`;
        }
    }
    demografic.innerHTML = htmlString;
    updateGauge();
}

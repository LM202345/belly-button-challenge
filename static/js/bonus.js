function updateGauge() {    
    let dropdown = d3.select("#selDataset");
    let selectedValue = dropdown.property("value");
    let index = data_samples.findIndex(x => x.id === selectedValue);
    //Get sample to fill dataset
    let indicatorValue = data_metadata[index].wfreq * 20;


    var traceGauge = {
        type: 'pie',
        showlegend: false,
        hole: 0.4,
        rotation: 90,
        values: [9, 9, 9, 9, 9, 9, 9, 9, 9, 81],
        text: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9'],
        direction: 'clockwise',
        textinfo: 'text',
        textposition: 'inside',
        hoverinfo: 'none',
        marker: {
            colors: [
                'rgba(113,162,97, 0.2)',
                'rgba(113,162,97, 0.3)',
                'rgba(113,162,97, 0.4)',
                'rgba(113,162,97, 0.5)',
                'rgba(113,162,97, 0.6)',
                'rgba(113,162,97, 0.7)',
                'rgba(113,162,97, 0.8)',
                'rgba(113,162,97, 0.9)',
                'rgba(113,162,97, 1)',
                'white'
            ],
        }
    };
    
    let degrees = indicatorValue;
    let radians = degrees * Math.PI / 180;
    let length = 0.25; // Longitud del "needle"
    let x = 0.5 - length * Math.cos(radians);
    let y = 0.5 + length * Math.sin(radians);
    
    var needle = {
        type: 'line',
        x0: 0.5,
        y0: 0.5,
        x1: x,
        y1: y,
        line: {
            color: 'red',
            width: 3
        }
    };
    
    var gaugeLayout = {
        shapes: [needle],
        title: 'Belly Button Washing Frequency',
        annotations: [
            {
                text: 'Scrubs per Week',
                x: 0.5,
                y: 1.1,
                showarrow: false,
                font: {
                    size: 14,
                    color: 'gray'
                }
            }
        ],
        xaxis: { visible: false, range: [0, 1] },
        yaxis: { visible: false, range: [0, 1] }
    };
    
    var dataGauge = [traceGauge];
    Plotly.newPlot('gauge', dataGauge, gaugeLayout);
}

function makeplot() {
    Plotly.d3.csv("https://raw.githubusercontent.com/msimbao/TanabeTsuganoGraphicCalculator/master/TanabeTsugano/graphData/TSd5cammag.csv", function(data){ processData(data) } );
};


    
function processData(allRows) {

    var x = [], y = [], standard_deviation = [], data = [];

    allRows.keys();
    for (var i=0; i<allRows.length; i++) {
        row = allRows[i];
        x.push( row['delta/B'] );
    }


console.log(Object.keys(allRows[0]).length - 1)
    for (var j=0; j<(Object.keys(allRows[0]).length - 1); j++){

        y = []

        for (var i=0; i<allRows.length; i++) {
            row = allRows[i];
            delete row['delta/B']
            
            var items = Object.keys(row)
            y.push( row[items[j]] );
        }

        traces = [{
            x: x, 
            y: y
        }];
        

        var result = {
            x: x,
            y: y,
            type: 'scatter',
            mode: 'lines',
    }
        
        data.push(result)
    }

    console.log(data)

makePlotly(data, standard_deviation)
}

function makePlotly( data, y, standard_deviation ){
    var plotDiv = document.getElementById("plot");
  
    Plotly.newPlot('myDiv', data,
      {title: 'Plotting CSV data from AJAX call'});
  };
    makeplot();




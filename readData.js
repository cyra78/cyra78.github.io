var width=640;
var height=480;
var cellScale=500;
var cellsPerRow=100;
var cellRadius=15;
var plotData = [];
function load() {
    var jsonData = JSON.parse(data);
    width=parseInt(jsonData.width);
    width=parseInt(jsonData.width);
    height=parseInt(jsonData.height);
    cellScale=parseInt(jsonData.cellScale);
    cellsPerRow=parseInt(jsonData.cellsPerRow);
    cellRadius=parseInt(jsonData.cellRadius);
    var graphData=jsonData.data;
    for (var i = 0; i < graphData.length; i++)
    {
        var plotItem = {};
        plotItem.name = graphData[i].name;
        plotItem.value = parseInt(graphData[i].value);
        plotItem.color = graphData[i].color;
        plotData[i] = plotItem;
    }
	plot();
}


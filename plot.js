//default
var width=640;
var height=480;
var cellScale=500;
var cellsPerRow=100;
var cellRadius=15;
var plotData = [];
var cellPadding=1;
var xIncrement=cellRadius*2+cellPadding;
var yIncrement=cellRadius*2+cellPadding;
//end of defaults

var xmlhttp = new XMLHttpRequest();
var url = "data.json";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var jsonData = JSON.parse(this.responseText);
        load(jsonData);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function plot()
{
    r = Raphael("chart", width, height);
    r.rect(0,0,width,height).attr({fill: "#a8a8a8","stroke-width":0})
    var zeroLoc=cellRadius+cellPadding;
    var x=zeroLoc;
    var y=zeroLoc;
    var j=0;
    var itemsCount=plotData.length;
    for (var i = 0; i < itemsCount; i++)
    {
        var count=plotData[i].value;
        while(count>0)
        {
            r.circle(x,y,cellRadius).attr({fill: plotData[i].color, "stroke-width":0});
            count -=cellScale;
            x+=xIncrement;
            j++;
            if(j>cellsPerRow)
            {
                x=zeroLoc;
                y+=yIncrement;
                j=0;
            }
        }
    }
    
    //plot legand
    x=zeroLoc;
    y=zeroLoc;
    var fontSz=16;
    var xPadding=5;
    var yPadding=10;
    var rWidth=75;
    var rHeight=fontSz+yPadding/2;
    var rectRounding=7;
    var labels = r.set();
    
    //recalculate height based on overflow of items
    var legandRowCount=1;
    if(itemsCount*rWidth > width)
    {
        legandRowCount=(itemsCount*rWidth)/width;
    }
    height=legandRowCount*(rHeight+yPadding);
    
    r = Raphael("legend", width, height);
    r.rect(0,0,width,height).attr({fill: "#fff","stroke-width":0})
    for (i = 0; i < plotData.length; i++)
    {
        r.rect(x,y,rWidth,rHeight).attr({fill:plotData[i].color,r:rectRounding,"stroke-width":0});
        labels.push(r.text(x+xPadding,y+yPadding,plotData[i].name));
        x+=rWidth;
        if(x+rWidth>width)
        {
            x=zeroLoc;
            y+=rHeight;
        }
    }labels.attr({font: "16px Fontin-Sans, Arial", fill: "#fff", "text-anchor": "start"});
}

function load(jsonData1) {
    var jsonData=jsonData1[0];
    width=parseInt(jsonData.width);
    height=parseInt(jsonData.height);
    cellScale=parseInt(jsonData.cellScale);
    cellsPerRow=parseInt(jsonData.cellsPerRow);
    cellRadius=parseInt(jsonData.cellRadius);
    xIncrement=cellRadius*2+cellPadding;
    yIncrement=cellRadius*2+cellPadding;
    
    if(xIncrement*cellsPerRow>width)
        width=xIncrement*cellsPerRow;
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



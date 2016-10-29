function plot()
{
    r = Raphael("chart", width, height);
	var zeroLoc=cellRadius;
    var x=zeroLoc;
    var y=zeroLoc;
    var j=0;
    for (var i = 0; i < plotData.length; i++)
    {
        var count=plotData[i].value;
        while(count>0)
        {
            r.circle(x,y,cellRadius).attr({"fill": plotData[i].color});
            count /=cellScale;
            x+=cellRadius+cellRadius;
            j++;
            if(j>cellsPerRow)
            {
                x=zeroLoc;
                y+=cellRadius+cellRadius;
                j=0;
            }
        }
    }
}

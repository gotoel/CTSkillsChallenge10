var zipCodes = new Array();
pullLisData();

function pullLisData()
{
	$.ajax({
    url: "https://data.ct.gov/resource/fxib-2xng.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "Iv2KGLQsYwa3uRsBwl9HQbzHa"
    }
	}).done(function(data) {
	  compressLisData( data );
	});
}

function compressLisData(data)
{
	for (var business in data) {
	  if (data.hasOwnProperty(business)) {
		var val = data[business];
		if(!containsLisObject(val.zip))
		{
			var zipCode = 
			{
				name: val.zip,
			    sbe: parseInt(1)
			};
			//console.log(zipCode.name);
			zipCodes.push(zipCode);
		}
		else
		{
			console.log("added to zip");
			zipCodes[getLisZipIndex(val.zip)].sbe = parseInt(zipCodes[getLisZipIndex(val.zip)].sbe) + parseInt(1);
		}
		
		//console.log(val.zip_code);
	  }
	}
	
	printLisTestGraph1();
}

function containsLisObject(obj) {
    var i;
    for (i = 0; i < zipCodes.length; i++) {
		//console.log(list[i].name);
        if (zipCodes[i].name === obj) {
            return true;
        }
    }

    return false;
}

function getLisZipIndex(zip)
{
	for (var i = 0; i < zipCodes.length; i++) {
		if(zipCodes[i].name === zip)
		{
			return i;
		}
	}
}

function printLisTestGraph1()
{
	console.log("Printing license graph");
	var chartdata = new Array();

            var height = 500,
            width = 720,
			barWidth = 40,
            barOffset = 50;
			
	for(var i = parseInt(document.getElementById("a").innerHTML); i < parseInt(document.getElementById("b").innerHTML); i++)
	{
		chartdata.push(zipCodes[i].sbe / 100000);
	}

  
        d3.select('#bar-chart-license').append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('background', '#dff0d8')
            .selectAll('rect').data(chartdata)
            .enter().append('rect')
            .style({'fill': '#3c763d', 'stroke': '#d6e9c6', 'stroke-width': '5'})
            .attr('width', barWidth)
            .attr('height', function (data) {
            return data;
    })
    .attr('x', function (data, i) {
        return i * (barWidth + barOffset);
    })
    .attr('y', function (data) {
        return height - data;
    });
}


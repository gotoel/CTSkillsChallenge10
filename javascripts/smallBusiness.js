var zipCodes = new Array();
pullSmallData();

function pullSmallData()
{
	$.ajax({
    url: "https://data.ct.gov/resource/a8k4-9euq.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "Iv2KGLQsYwa3uRsBwl9HQbzHa"
    }
	}).done(function(data) {
	  compressSmallData( data );
	});
}

function compressSmallData(data)
{
	for (var business in data) {
	  if (data.hasOwnProperty(business)) {
		var val = data[business];
		if(!containsSmallObject(val.zip_code))
		{
			var zipCode = 
			{
				name: val.zip_code,
			    sbe: parseInt(val.total_assistance)
			};
			//console.log(zipCode.name);
			zipCodes.push(zipCode);
		}
		else
		{
			console.log("added to zip");
			zipCodes[getSmallZipIndex(val.zip_code)].sbe = parseInt(zipCodes[getSmallZipIndex(val.zip_code)].sbe) + parseInt(val.total_assistance);
		}
		
		//console.log(val.zip_code);
	  }
	}
	
	printSmallTestGraph1();
}

function containsSmallObject(obj) {
    var i;
    for (i = 0; i < zipCodes.length; i++) {
		//console.log(list[i].name);
        if (zipCodes[i].name === obj) {
            return true;
        }
    }

    return false;
}

function getSmallZipIndex(zip)
{
	for (var i = 0; i < zipCodes.length; i++) {
		if(zipCodes[i].name === zip)
		{
			return i;
		}
	}
}

function printSmallTestGraph1()
{
	console.log("Printing small graph");
	var chartdata = new Array();

            var height = 500,
            width = 720,
			barWidth = 40,
            barOffset = 50;
			
	for(var i = parseInt(document.getElementById("a").innerHTML); i < parseInt(document.getElementById("b").innerHTML); i++)
	{
		chartdata.push(zipCodes[i].sbe / 1000000);
	}

  
        d3.select('#bar-chart').append('svg')
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


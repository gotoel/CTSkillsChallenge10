var zipCodes = new Array();
pullData();

function pullData()
{
	$.ajax({
    url: "https://data.ct.gov/resource/a8k4-9euq.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "Iv2KGLQsYwa3uRsBwl9HQbzHa"
    }
	}).done(function(data) {
	  compressData( data );
	});
}

function compressData(data)
{
	for (var business in data) {
	  if (data.hasOwnProperty(business)) {
		var val = data[business];
		if(!containsObject(val.zip_code))
		{
			var zipCode = 
			{
				name: val.zip_code,
			    sbe: Integer.parseInt(val.total_assistance)
			};
			//console.log(zipCode.name);
			zipCodes.push(zipCode);
		}
		else
		{
			console.log("added to zip");
			zipCodes[getZipIndex(val.zip_code)].sbe = zipCodes[getZipIndex(val.zip_code)].sbe + val.total_assistance;
		}
		
		//console.log(val.zip_code);
	  }
	}
	
	printTestGraph1();
}

function containsObject(obj) {
    var i;
    for (i = 0; i < zipCodes.length; i++) {
		//console.log(list[i].name);
        if (zipCodes[i].name === obj) {
            return true;
        }
    }

    return false;
}

function getZipIndex(zip)
{
	for (var i = 0; i < zipCodes.length; i++) {
		if(zipCodes[i].name === zip)
		{
			return i;
		}
	}
}

function printTestGraph1()
{
	console.log("Printing test graph");
	var chartdata = new Array();

	 console.log("test:" + zipCodes[1].sbe);
		chartdata.push(zipCodes[1].sbe);

            var height = 200,
            width = 720,
 
            barWidth = 40,
            barOffset = 20;
  
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


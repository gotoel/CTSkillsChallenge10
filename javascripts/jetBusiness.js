var zipCodes = new Array();
pullJetData();

function pullJetData()
{
	$.ajax({
    url: "https://data.ct.gov/resource/rx3f-mten.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "Iv2KGLQsYwa3uRsBwl9HQbzHa"
    }
	}).done(function(data) {
	  compressJetData( data );
	});
}

function compressJetData(data)
{
	for (var business in data) {
	  if (data.hasOwnProperty(business)) {
		var val = data[business];
		if(!containsJetObject(val.project_zip_code))
		{
			var zipCode = 
			{
				name: val.project_zip_code,
			    sbe: parseInt(val.total_tax_credits_issued)
			};
			//console.log(zipCode.name);
			zipCodes.push(zipCode);
		}
		else
		{
			console.log("added to zip");
			zipCodes[getJetZipIndex(val.project_zip_code)].sbe = parseInt(zipCodes[getJetZipIndex(val.project_zip_code)].sbe) + parseInt(val.total_tax_credits_issued);
		}
		
		//console.log(val.zip_code);
	  }
	}
	
	printJetTestGraph1();
}

function containsJetObject(obj) {
    var i;
    for (i = 0; i < zipCodes.length; i++) {
		//console.log(list[i].name);
        if (zipCodes[i].name === obj) {
            return true;
        }
    }

    return false;
}

function getJetZipIndex(zip)
{
	for (var i = 0; i < zipCodes.length; i++) {
		if(zipCodes[i].name === zip)
		{
			return i;
		}
	}
}

function printJetTestGraph1()
{
	console.log("Printing test graph");
	var chartdata = new Array();

            var height = 500,
            width = 720,
			barWidth = 40,
            barOffset = 50;
			
	for(var i = parseInt(document.getElementById("a").innerHTML); i < parseInt(document.getElementById("b").innerHTML); i++)
	{
		chartdata.push(zipCodes[i].sbe / 1000000);
	}

  
        d3.select('#bar-chart-jet').append('svg')
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


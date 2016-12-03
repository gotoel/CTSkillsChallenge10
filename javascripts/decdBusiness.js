var zipCodes = new Array();
pulldecdData();

function pulldecdData()
{
	$.ajax({
    url: "https://data.ct.gov/resource/3xja-ddjg.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "Iv2KGLQsYwa3uRsBwl9HQbzHa"
    }
	}).done(function(data) {
	  compressdecdData( data );
	});
}

function compressdecdData(data)
{
	for (var business in data) {
	  if (data.hasOwnProperty(business)) {
		var val = data[business];
		if(!containsdecdObject(val.applicant_zip_code))
		{
			var zipCode = 
			{
				name: val.applicant_zip_code,
			    sbe: parseInt(val.total_tax_credits_issued)
			};
			//console.log(zipCode.name);
			zipCodes.push(zipCode);
		}
		else
		{
			console.log("added to zip");
			zipCodes[getdecdZipIndex(val.applicant_zip_code)].sbe = parseInt(zipCodes[getdecdZipIndex(val.applicant_zip_code)].sbe) + parseInt(val.total_tax_credits_issued);
		}
		
		//console.log(val.zip_code);
	  }
	}
	
	printdecdTestGraph1();
}

function containsdecdObject(obj) {
    var i;
    for (i = 0; i < zipCodes.length; i++) {
		//console.log(list[i].name);
        if (zipCodes[i].name === obj) {
            return true;
        }
    }

    return false;
}

function getdecdZipIndex(zip)
{
	for (var i = 0; i < zipCodes.length; i++) {
		if(zipCodes[i].name === zip)
		{
			return i;
		}
	}
}

function printdecdTestGraph1()
{
	console.log("Printing decd graph");
	var chartdata = new Array();

            var height = 500,
            width = 720,
			barWidth = 40,
            barOffset = 50;
			
	for(var i = 0; i < 6; i++)
	{
		chartdata.push(zipCodes[i].sbe / 1000000);
	}

  
        d3.select('#bar-chart-decd').append('svg')
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


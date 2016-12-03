console.log('This would be the main JS file.');
test();





function printData(data)
{
	for (var business in data) {
	  if (data.hasOwnProperty(business)) {
		var val = data[business];
		//document.getElementById("data").innerHTML += "Company: " + //data[business].company + " <br>";
		//console.log(val);
	  }
	}
	//document.getElementById("data").innerHTML = data;
}

function test()
{
	$.ajax({
    url: "https://data.ct.gov/resource/a8k4-9euq.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "Iv2KGLQsYwa3uRsBwl9HQbzHa"
    }
	}).done(function(data) {
	  printData( data );
	});
}


function printTestGraph1()
{
	console.log("Printing test graph");
	var chartdata = [4000, 60, 80, 100, 70, 120, 100, 60, 70, 150, 120, 140];

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

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(function() {
  var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Node',     100],
    ['Others',    10],
  ]);

  var options = {
    title: 'node or die'
  };

  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);
});

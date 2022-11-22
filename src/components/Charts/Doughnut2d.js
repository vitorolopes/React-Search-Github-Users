// Include react
import React from "react";
// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";
// Include the fusioncharts library
import FusionCharts from "fusioncharts";
// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";
// Include the theme as fusion                              //!  6b
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";
// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartComponent = ({data}) =>{
  const chartConfigs = {
    type: "doughnut2D", // The chart type //!  1
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption:"Stars Per Language", //!  2
        //Set the theme for your chart
        theme: "candy",   //!  6a
        decimals: 0,
        doughnutRadius: "35%", //!  4
        showPercentValues: 0 //!  5
      },
      // Chart Data
      data
    }
  };

  return (<ReactFC {...chartConfigs} />);
}

export default ChartComponent;
//* COPIED FROM
// https://www.fusioncharts.com/dev/getting-started/react/your-first-chart-using-react
// Render the chart#

//? STEP 1 - Include Dependencies
// Include react
import React from "react";
  //! Commented HERE import ReactDOM from "react-dom";
// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";
// Include the fusioncharts library
import FusionCharts from "fusioncharts";
// Include the chart type
// import Column2D from "fusioncharts/fusioncharts.charts";
//! HERE We are going to change the name here ...
import Chart from "fusioncharts/fusioncharts.charts";
// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
// Adding the chart and theme as dependency to the core fusioncharts
// ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);
//!                         ... and HERE 
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

//? STEP 2 - Chart Data
// const chartData = [
//   {
//     label: "HTML",
//     value: "13"
//   },
//   {
//     label: "CS",
//     value: "23"
//   },
//   {
//     label: "JS",
//     value: "80"
//   }
// ];


//? STEP 3 - Creating the JSON object to store the chart configurations

// const chartConfigs = {
//   type: "column2d", // The chart type
//   width: "400", // Width of the chart
//   height: "400", // Height of the chart
//   dataFormat: "json", // Data type
//   dataSource: {
//     // Chart Configuration
//     chart: {
//       //Set the chart caption
//       caption: "Countries With Most Oil Reserves [2017-18]",
//       //Set the chart subcaption
//       subCaption: "In MMbbl = One Million barrels",
//       //Set the x-axis name
//       xAxisName: "Country",
//       //Set the y-axis name
//       yAxisName: "Reserves (MMbbl)",
//       numberSuffix: "K",
//       //Set the theme for your chart
//       theme: "fusion"
//     },
//     // Chart Data
//     data: chartData
//   }
// };


//! HERE
const ChartComponent = ({data}) =>{
  const chartConfigs = {
    type: "column2d", // The chart type
    width: "400", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Countries With Most Oil Reserves [2017-18]",
        //Set the chart subcaption
        subCaption: "In MMbbl = One Million barrels",
        //Set the x-axis name
        xAxisName: "Country",
        //Set the y-axis name
        yAxisName: "Reserves (MMbbl)",
        numberSuffix: "K",
        //Set the theme for your chart
        theme: "fusion"
      },
      // Chart Data
      //! data: chartData
      data
    }
  };

  return (<ReactFC {...chartConfigs} />);
}

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component
// class App extends React.Component {
//   render() {
//     return (<ReactFC {...chartConfigs} />);
//   }
// }

// export default App;
//! HERE
export default ChartComponent;

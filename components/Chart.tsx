import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Component } from "react";

am4core.useTheme(am4themes_animated);

interface Props {
  data: any;
  states: string[];
}

class Chart extends Component<Props, {}> {
  chart: am4charts.XYChart;

  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.paddingRight = 40;

    // let data = [];
    // let visits = 10;
    // for (let i = 1; i < 366; i++) {
    //   visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    //   data.push({
    //     date: new Date(2018, 0, i),
    //     name: "name" + i,
    //     value: visits,
    //     value2: visits + 10,
    //   });
    // }

    chart.data = this.props.data;
    // chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DurationAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    this.props.states.forEach((v) => {
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueX = "day";
      series.dataFields.valueY = v;

      series.tooltipText = v + ": {valueY.value}";
    });

    // series = chart.series.push(new am4charts.LineSeries());
    // series.dataFields.dateX = "date";
    // series.dataFields.valueY = "value2";

    // series.tooltipText = "{valueY.value}";

    chart.cursor = new am4charts.XYCursor();

    // let scrollbarX = new am4charts.XYChartScrollbar();
    // scrollbarX.series.push(series);
    // chart.scrollbarX = scrollbarX;

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div
        id="chartdiv"
        style={{
          margin: "10px 10px 10px 0px",
          padding: "10px",
          width: "calc(65vw - 30px)",
          height: "calc(100vh - 89px)",
          backgroundColor: "white",
          borderRadius: "5px",
          border: "0.5px solid #fdfdfd",
        }}
      ></div>
    );
  }
}

export default Chart;

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

    // chart.paddingRight = 40;

    chart.data = this.props.data;
    // chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    // valueAxis.renderer.minWidth = 35;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.maxTooltipDistance = -1;

    this.props.states.forEach((v) => {
      let series = chart.series.push(new am4charts.LineSeries());
      var bullet = series.bullets.push(new am4charts.Bullet());
      let circle = bullet.createChild(am4core.Circle);
      circle.width = 3;
      circle.height = 3;
      series.dataFields.dateX = "day";
      series.dataFields.valueY = v;

      series.tooltipText = v + ": {valueY.value}";
    });

    var buttonContainer = chart.plotContainer.createChild(am4core.Container);
    buttonContainer.shouldClone = false;
    buttonContainer.align = "left";
    buttonContainer.valign = "top";
    buttonContainer.zIndex = Number.MAX_SAFE_INTEGER;
    buttonContainer.marginTop = 20;
    buttonContainer.marginLeft = 20;
    buttonContainer.layout = "horizontal";

    var zoomInButton = buttonContainer.createChild(am4core.Button);
    zoomInButton.label.text = "+";
    zoomInButton.events.on("hit", function (ev) {
      var diff = dateAxis.maxZoomed - dateAxis.minZoomed;
      var delta = diff * 0.2;
      dateAxis.zoomToDates(
        new Date(dateAxis.minZoomed + delta),
        new Date(dateAxis.maxZoomed - delta)
      );
    });

    var zoomOutButton = buttonContainer.createChild(am4core.Button);
    zoomOutButton.label.text = "-";
    zoomOutButton.events.on("hit", function (ev) {
      var diff = dateAxis.maxZoomed - dateAxis.minZoomed;
      var delta = diff * 0.2;
      dateAxis.zoomToDates(
        new Date(dateAxis.minZoomed - delta),
        new Date(dateAxis.maxZoomed + delta)
      );
    });

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

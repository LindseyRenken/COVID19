import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Component } from "react";

// am4core.useTheme(am4themes_animated);

interface Props {
  positive: number;
  negative: number;
  pending: number;
  id: string;
}

class SparkLineChart extends Component<Props, {}> {
  chart: am4charts.PieChart;

  componentDidMount() {
    // Create chart instance
    var chart = am4core.create("chartdiv_" + this.props.id, am4charts.PieChart);

    console.log(typeof this.props.positive);

    // Add data
    chart.data = [
      {
        category: "Positive",
        value: this.props.positive,
      },
      {
        category: "Negative",
        value: this.props.negative,
      },
      {
        category: "Pending",
        value: this.props.pending,
      },
    ];

    // Remove padding
    chart.padding(0, 0, 0, 0);

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "category";
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;
    pieSeries.slices.template.states.getKey(
      "active"
    ).properties.shiftRadius = 0;

    // Set up slices
    pieSeries.slices.template.tooltipText = "";
    pieSeries.slices.template.alwaysShowTooltip = false;

    // chart.chartContainer.minHeight = 40;
    // chart.chartContainer.minWidth = 40;

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
        id={"chartdiv_" + this.props.id}
        style={{ height: "75px", width: "75px" }}
      ></div>
    );
  }
}

export default SparkLineChart;

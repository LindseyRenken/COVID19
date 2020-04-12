// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Component } from "react";
import { Chart, Util } from "@antv/g2";

// am4core.useTheme(am4themes_animated);

interface Props {
  positive: number;
  negative: number;
  pending: number;
  id: string;
}

class SparkLineChart extends Component<Props, {}> {
  componentDidMount() {
    const chart = new Chart({
      container: "chartdiv_" + this.props.id,
      autoFit: true,
      height: 50,
    });
    // Add data
    const data = [
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
    chart.data(data);

    chart.coordinate("theta", {
      radius: 0.75,
    });
    chart.tooltip(false);

    chart
      .interval()
      .adjust("stack")
      .position("value")
      .color("category", ["#86BBD8", "#F26419", "#758E4F"])
      .label(false);

    chart.legend(false);

    chart.render();
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

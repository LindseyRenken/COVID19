import { Component } from "react";
import { Chart } from "@antv/g2";
import { InView } from "react-intersection-observer";

interface Props {
  data: { day: number; value: number }[];
  id: string;
}

interface State {
  chartSet: boolean;
  chart: Chart;
}

class LineChart extends Component<Props, State> {
  state: State = {
    chartSet: false,
    chart: null,
  };

  setActive(inView: boolean) {
    console.log(inView);
    if (!inView) return;
    if (this.state.chartSet) return;
    else {
      // this.state.chart?.clear();
      console.log(this.state.chart);

      let chart = new Chart({
        container: "linechartdiv_" + this.props.id,
        autoFit: true,
        height: 50,
      });

      chart.data(this.props.data);

      chart.tooltip(false);

      chart.legend(false);
      chart.axis(false);

      chart.line().position("dateChecked*positiveIncrease").color("#86BBD8");
      chart.line().position("dateChecked*negativeIncrease").color("#F26419");
      chart
        .line()
        .position("dateChecked*totalTestResultsIncrease")
        .color("#00000");

      chart.scale({
        positiveIncrease: {
          min: 0,
          max: 35000,
        },
        negativeIncrease: {
          min: 0,
          max: 35000,
        },
        totalTestResultsIncrease: {
          min: 0,
          max: 35000,
        },
      });
      // chart.point().position("date*positive");

      console.log("render");
      chart.render();

      this.setState({ chartSet: true, chart: chart });
    }
  }

  render() {
    return (
      <InView as="div" onChange={(inView, entry) => this.setActive(inView)}>
        <div
          id={"linechartdiv_" + this.props.id}
          style={{ height: "50px", width: "100px" }}
        ></div>
      </InView>
    );
  }
}

export default LineChart;

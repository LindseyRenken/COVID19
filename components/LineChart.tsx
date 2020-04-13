import { Component } from "react";
import { Chart } from "@antv/g2";
import { InView } from "react-intersection-observer";

interface Props {
  data: { day: number; value: number }[];
  id: string;
}

interface State {
  chartSet: boolean;
}

class LineChart extends Component<Props, State> {
  state: State = {
    chartSet: false,
  };

  setActive(inView: boolean) {
    if (!inView) return;
    if (this.state.chartSet) return;
    else {
      console.log(this.props.data);
      const chart = new Chart({
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

      chart.render();

      this.setState({ chartSet: true });
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

import { Component } from "react";
import { Chart } from "@antv/g2";
import { InView } from "react-intersection-observer";

interface Props {
  positive: number;
  negative: number;
  pending: number;
  id: string;
}

interface State {
  chartSet: boolean;
}

class SparkPieChart extends Component<Props, State> {
  state: State = {
    chartSet: false,
  };

  setActive(inView: boolean) {
    if (!inView) return;
    if (this.state.chartSet) return;
    else {
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

      this.setState({ chartSet: true });
    }
  }

  render() {
    return (
      <InView as="div" onChange={(inView, entry) => this.setActive(inView)}>
        <div
          id={"chartdiv_" + this.props.id}
          style={{ height: "75px", width: "75px" }}
        ></div>
      </InView>
    );
  }
}

export default SparkPieChart;

import { Component } from "react";
import { Chart } from "@antv/g2";
import { InView } from "react-intersection-observer";
import smooth from "array-smooth";

interface Props {
  data: { day: number; value: number }[];
  id: string;
  yaxis: string;
  lineColor: string;
}

interface State {
  chartSet: boolean;
  chart: Chart;
}

class SingleLineChart extends Component<Props, State> {
  state: State = {
    chartSet: false,
    chart: null,
  };

  setActive(inView: boolean) {
    if (!inView) return;
    if (this.state.chartSet) return;
    else {
      let data = this.props.data;
      let yaxis = this.props.yaxis;
      let chart = new Chart({
        container: this.props.yaxis + "_linechartdiv_" + this.props.id,
        autoFit: true,
        height: 40,
      });

      const arrSmoothed = smooth(
        data.map((x) => x[yaxis]),
        3
      );
      for (let i = 0; i < arrSmoothed.length; i++) {
        data[i][yaxis + "Smoothed"] = arrSmoothed[i];
      }
      yaxis = yaxis + "Smoothed";

      chart.data(data);

      chart.tooltip(false);
      chart.legend(false);
      chart.axis(false);

      chart
        .line()
        .position("dateChecked*" + yaxis)
        .color(this.props.lineColor);

      console.log("render");
      chart.render();

      this.setState({ chartSet: true, chart: chart });
    }
  }

  render() {
    return (
      <InView as="div" onChange={(inView, entry) => this.setActive(inView)}>
        <div
          id={this.props.yaxis + "_linechartdiv_" + this.props.id}
          style={{ height: "40px", width: "100px" }}
        ></div>
      </InView>
    );
  }
}

export default SingleLineChart;

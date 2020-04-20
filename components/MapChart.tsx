import DataSet from "@antv/data-set";
import { Chart } from "@antv/g2";

import { Component } from "react";

interface Props {
  data: any[];
}

class MapChart extends Component<Props> {
  componentDidMount() {
    const data = this.props.data;
    fetch("./usa.geo.json")
      .then((res) => res.json())
      .then((GeoJSON) => {
        const userData = [];
        const geoDv = new DataSet.View()
          .source(GeoJSON, {
            type: "GeoJSON",
          })
          .transform({
            type: "map",
            callback(row) {
              const r = data.filter((x) => x.state == row.properties.code);
              if (r.length > 0) {
                userData.push({
                  longitude: row.centroidX,
                  latitude: row.centroidY,
                  name: row.name,
                  value: Math.log(r[0]["positive"]),
                });
              }
              return row;
            },
          });

        const chart = new Chart({
          container: "mapchartdiv",
          autoFit: true,
          height: 500,
          width: 600,
          padding: 0,
        });
        chart.scale({
          latitude: { sync: true },
          longitude: { sync: true },
        });
        chart.legend(false);
        chart.axis(false);
        chart.tooltip(false);

        const geoView = chart.createView();
        geoView.data(geoDv.rows);
        geoView
          .polygon()
          .position("longitude*latitude")
          .color("#999999")
          .label("name", {
            offset: 0,
          });

        console.log(geoView);

        // 33658a-86bbd8-758e4f-f6ae2d-f26419

        const userView = chart.createView();
        userView.data(userData);
        userView
          .heatmap()
          .position("longitude*latitude")
          .color("value", "#33658a-#86bbd8-#758e4f-#f6ae2d-#f26419")
          .size(500 / 20)
          .style({
            blur: 500 / 15,
          });

        chart.render();
      });
  }

  render() {
    return (
      <div
        id={"mapchartdiv"}
        style={{
          height: "280px",
          width: "520px",
          margin: "15px",
          padding: "0px",
        }}
      />
    );
  }
}

export default MapChart;

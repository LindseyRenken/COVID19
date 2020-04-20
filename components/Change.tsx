import {
  DataTableHead,
  DataTableRow,
  DataTableBody,
  DataTableHeadCell,
  DataTableCell,
} from "@rmwc/data-table";
import styled from "styled-components";
import { RenderCell, StyledCell, RenderArrows, RenderStateCell } from "./Table";
import LineChart from "./LineChart";
import SingleLineChart from "./SingleLineChart";
import TableHeader from "./TableHeader";

interface Props {
  data: any;
  sortDir: any;
  setSortDir: (sortDir: any) => void;
  data_prev: any;
}

const Change = ({ data, data_prev, sortDir, setSortDir }: Props) => {
  // console.log(data_prev);
  return (
    <>
      {
        <TableHeader
          titles={[
            "Tests",
            "Positive",
            "Negative",
            "Deaths",
            "Hospitalizations",
          ]}
        />
      }
      <DataTableBody>
        {data.map((v, i) => (
          <DataTableRow key={i} style={{ height: "50px" }}>
            {RenderStateCell(v.state)}
            <DataTableCell>
              <StyledCell>
                {RenderArrows(
                  v.totalTestResultsIncrease,
                  data_prev.filter((x) => x.state == v.state),
                  "totalTestResultsIncrease"
                )}
                <SingleLineChart
                  data={v.allPoints}
                  id={i}
                  yaxis={"totalTestResultsIncrease"}
                  lineColor={"#33658a"}
                />
              </StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {RenderArrows(
                  v.positiveIncrease,
                  data_prev.filter((x) => x.state == v.state),
                  "positiveIncrease"
                )}
                <SingleLineChart
                  data={v.allPoints}
                  id={i}
                  yaxis={"positiveIncrease"}
                  lineColor={"#f6ae2d"}
                />
              </StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {RenderArrows(
                  v.negativeIncrease,
                  data_prev.filter((x) => x.state == v.state),
                  "negativeIncrease"
                )}
                <SingleLineChart
                  data={v.allPoints}
                  id={i}
                  yaxis={"negativeIncrease"}
                  lineColor={"#86BBD8"}
                />
              </StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {RenderArrows(
                  v.deathIncrease,
                  data_prev.filter((x) => x.state == v.state),
                  "deathIncrease"
                )}
                <SingleLineChart
                  data={v.allPoints}
                  id={i}
                  yaxis={"deathIncrease"}
                  lineColor={"#F26419"}
                />
              </StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {RenderArrows(
                  v.hospitalizedIncrease,
                  data_prev.filter((x) => x.state == v.state),
                  "hospitalizedIncrease"
                )}
                <SingleLineChart
                  data={v.allPoints}
                  id={i}
                  yaxis={"hospitalizedIncrease"}
                  lineColor={"#000000"}
                />
              </StyledCell>
            </DataTableCell>
          </DataTableRow>
        ))}
      </DataTableBody>
    </>
  );
};

export default Change;

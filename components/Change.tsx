import {
  DataTableHead,
  DataTableRow,
  DataTableBody,
  DataTableHeadCell,
  DataTableCell,
} from "@rmwc/data-table";
import styled from "styled-components";
import { RenderCell, StyledCell } from "./Table";
import LineChart from "./LineChart";
import SingleLineChart from "./SingleLineChart";

interface Props {
  data: any;
  sortDir: any;
  setSortDir: (sortDir: any) => void;
}

const Change = ({ data, sortDir, setSortDir }: Props) => {
  return (
    <>
      <DataTableHead>
        <DataTableRow>
          <DataTableHeadCell
            style={{ fontWeight: "bold", width: "100px" }}
            alignMiddle={true}
            // sort={sortDir}
            // onSortChange={(sortDir) => {
            //   setSortDir(sortDir);
            //   console.log(sortDir);
            // }}
          >
            State
          </DataTableHeadCell>
          <DataTableHeadCell
            style={{ fontWeight: "bold" }}
            alignMiddle={true}
            key={"header_1"}
          >
            Tests
          </DataTableHeadCell>
          <DataTableHeadCell
            style={{ fontWeight: "bold" }}
            alignMiddle={true}
            key={"header_3"}
          >
            Positive
          </DataTableHeadCell>
          <DataTableHeadCell
            style={{ fontWeight: "bold" }}
            alignMiddle={true}
            key={"header_2"}
          >
            Negative
          </DataTableHeadCell>
          <DataTableHeadCell
            style={{ fontWeight: "bold" }}
            alignMiddle={true}
            key={"header_5"}
          >
            Deaths
          </DataTableHeadCell>
          {/* <DataTableHeadCell
            style={{ fontWeight: "bold" }}
            alignMiddle={true}
            key={"header_6"}
          ></DataTableHeadCell> */}
        </DataTableRow>
      </DataTableHead>
      <DataTableBody>
        {data.map((v, i) => (
          <DataTableRow key={i} style={{ height: "75px" }}>
            <DataTableCell
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100px",
                height: "75px",
              }}
            >
              {/* <img
                style={{
                  margin: "0px 10px",
                  height: "20px",
                }}
                src={"/" + v.state + ".svg"}
              /> */}
              {v.state}
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {RenderCell(v.totalTestResultsIncrease, v.totalTestResults)}
                <SingleLineChart
                  data={v.allPoints}
                  id={i}
                  yaxis={"totalTestResultsIncrease"}
                  lineColor={"#000000"}
                />
              </StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {RenderCell(v.positiveIncrease, v.positive)}
                <SingleLineChart
                  data={v.allPoints}
                  id={i}
                  yaxis={"positiveIncrease"}
                  lineColor={"#86BBD8"}
                />
              </StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {RenderCell(v.negativeIncrease, v.negative)}
                <SingleLineChart
                  data={v.allPoints}
                  id={i}
                  yaxis={"negativeIncrease"}
                  lineColor={"#F26419"}
                />
              </StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {RenderCell(v.deathIncrease, v.death)}
                <SingleLineChart
                  data={v.allPoints}
                  id={i}
                  yaxis={"deathIncrease"}
                  lineColor={"#f6ae2d"}
                />
              </StyledCell>
            </DataTableCell>
            {/* <DataTableCell>
              <LineChart data={v.allPoints.reverse()} id={i} />
            </DataTableCell> */}
          </DataTableRow>
        ))}
      </DataTableBody>
    </>
  );
};

export default Change;

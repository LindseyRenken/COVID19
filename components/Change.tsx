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
            style={{ fontWeight: "bold", width: "150px" }}
            alignMiddle={true}
            sort={sortDir}
            onSortChange={(sortDir) => {
              setSortDir(sortDir);
              console.log(sortDir);
            }}
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
          <DataTableHeadCell
            style={{ fontWeight: "bold" }}
            alignMiddle={true}
            key={"header_6"}
          ></DataTableHeadCell>
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
                width: "150px",
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
              </StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {RenderCell(v.positiveIncrease, v.positive)}
              </StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {RenderCell(v.negativeIncrease, v.negative)}
              </StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>{RenderCell(v.deathIncrease, v.death)}</StyledCell>
            </DataTableCell>
            <DataTableCell>
              <LineChart data={v.allPoints.reverse()} id={i} />
            </DataTableCell>
          </DataTableRow>
        ))}
      </DataTableBody>
    </>
  );
};

export default Change;

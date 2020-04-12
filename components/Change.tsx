import {
  DataTableHead,
  DataTableRow,
  DataTableBody,
  DataTableHeadCell,
  DataTableCell,
} from "@rmwc/data-table";
import styled from "styled-components";
import { StyledCell } from "./Table";

interface Props {
  data: any;
}

const Change = ({ data }: Props) => {
  return (
    <>
      <DataTableHead>
        <DataTableRow>
          <DataTableHeadCell
            style={{ fontWeight: "bold", width: "150px" }}
            alignMiddle={true}
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
            key={"header_4"}
          >
            Recovered
          </DataTableHeadCell>
          <DataTableHeadCell
            style={{ fontWeight: "bold" }}
            alignMiddle={true}
            key={"header_5"}
          >
            Deaths
          </DataTableHeadCell>
        </DataTableRow>
      </DataTableHead>
      <DataTableBody>
        {data.map((v, i) => (
          <DataTableRow key={i}>
            <DataTableCell
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "150px",
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
                {v.totalTestResultsIncrease?.toLocaleString("en")}
                <div>
                  ({(100 * (v.totalTestResultsIncrease / v.total)).toFixed(2)}%)
                </div>
              </StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {v.positiveIncrease?.toLocaleString("en")}{" "}
                <div>
                  ({(100 * (v.positiveIncrease / v.positive)).toFixed(2)}%)
                </div>
              </StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {v.negativeIncrease?.toLocaleString("en")}
                <div>
                  ({(100 * (v.negativeIncrease / v.negative)).toFixed(2)}%)
                </div>
              </StyledCell>
            </DataTableCell>
            <DataTableCell>{v.recovered?.toLocaleString("en")}</DataTableCell>
            <DataTableCell>
              <StyledCell>
                {v.deathIncrease?.toLocaleString("en")}{" "}
                <div>({(100 * (v.deathIncrease / v.death)).toFixed(2)}%)</div>
              </StyledCell>
            </DataTableCell>
          </DataTableRow>
        ))}
      </DataTableBody>
    </>
  );
};

export default Change;

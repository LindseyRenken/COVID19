import {
  DataTableHead,
  DataTableRow,
  DataTableBody,
  DataTableHeadCell,
  DataTableCell,
} from "@rmwc/data-table";
import { StyledCell } from "./Table";
import SparkLineChart from "./SparkLineChart";

interface Props {
  data: any;
}

const Testing = ({ data }: Props) => {
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
            Total
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
            Pending
          </DataTableHeadCell>
          <DataTableHeadCell
            style={{ fontWeight: "bold" }}
            alignMiddle={true}
            key={"header_5"}
          ></DataTableHeadCell>
        </DataTableRow>
      </DataTableHead>
      <DataTableBody>
        {data.map((v, i) => (
          <DataTableRow key={i} style={{ height: "100px" }}>
            <DataTableCell
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "150px",
                height: "100px",
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
            <DataTableCell>{v.total?.toLocaleString("en")}</DataTableCell>
            <DataTableCell>
              <StyledCell>
                {v.positive?.toLocaleString("en")}{" "}
                <div>({(100 * (v.positive / v.total)).toFixed(2)}%)</div>
              </StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {v.negative?.toLocaleString("en")}{" "}
                <div>({(100 * (v.negative / v.total)).toFixed(2)}%)</div>
              </StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {v.pending?.toLocaleString("en")}{" "}
                <div>({(100 * (v.pending / v.total)).toFixed(2)}%)</div>
              </StyledCell>
            </DataTableCell>

            <DataTableCell>
              <SparkLineChart
                positive={v.positive}
                negative={v.negative}
                pending={v.pending}
                id={i}
              />
            </DataTableCell>
          </DataTableRow>
        ))}
      </DataTableBody>
    </>
  );
};

export default Testing;

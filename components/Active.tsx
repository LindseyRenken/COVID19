import {
  DataTableHead,
  DataTableRow,
  DataTableBody,
  DataTableHeadCell,
  DataTableCell,
} from "@rmwc/data-table";

import { StyledCell } from "./Table";

interface Props {
  data: any;
}

const Active = ({ data }: Props) => {
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
            Recovering
          </DataTableHeadCell>
          <DataTableHeadCell
            style={{ fontWeight: "bold" }}
            alignMiddle={true}
            key={"header_2"}
          >
            Hospitalized
          </DataTableHeadCell>
          <DataTableHeadCell
            style={{ fontWeight: "bold" }}
            alignMiddle={true}
            key={"header_3"}
          >
            In ICU
          </DataTableHeadCell>
          <DataTableHeadCell
            style={{ fontWeight: "bold" }}
            alignMiddle={true}
            key={"header_4"}
          >
            On Ventilator
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
              {(v.positive - v.recovered)?.toLocaleString("en")}
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {v.hospitalizedCurrently?.toLocaleString("en")}
                <div>
                  (
                  {(
                    100 *
                    (v.hospitalizedCurrently / (v.positive - v.recovered))
                  ).toFixed(2)}
                  %)
                </div>
              </StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {v.inIcuCurrently?.toLocaleString("en")}
                <div>
                  (
                  {(
                    100 *
                    (v.inIcuCurrently / (v.positive - v.recovered))
                  ).toFixed(2)}
                  %)
                </div>
              </StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {v.onVentilatorCurrently?.toLocaleString("en")}
                <div>
                  (
                  {(
                    100 *
                    (v.onVentilatorCurrently / (v.positive - v.recovered))
                  ).toFixed(2)}
                  %)
                </div>
              </StyledCell>
            </DataTableCell>
          </DataTableRow>
        ))}
      </DataTableBody>
    </>
  );
};

export default Active;

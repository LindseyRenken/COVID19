import {
  DataTableHead,
  DataTableRow,
  DataTableBody,
  DataTableHeadCell,
  DataTableCell,
} from "@rmwc/data-table";

import { RenderCell, StyledCell } from "./Table";

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
            Infected (approx)
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
              {!(v.positive || v.recovered) && "-"}
              {(v.positive || v.recovered) &&
                (v.positive - v.recovered)?.toLocaleString("en")}
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {RenderCell(v.hospitalizedCurrently, v.positive - v.recovered)}
              </StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {RenderCell(v.inIcuCurrently, v.positive - v.recovered)}
              </StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {RenderCell(v.onVentilatorCurrently, v.positive - v.recovered)}
              </StyledCell>
            </DataTableCell>
          </DataTableRow>
        ))}
      </DataTableBody>
    </>
  );
};

export default Active;

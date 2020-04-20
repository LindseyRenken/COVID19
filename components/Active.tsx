import {
  DataTableHead,
  DataTableRow,
  DataTableBody,
  DataTableHeadCell,
  DataTableCell,
} from "@rmwc/data-table";

import { RenderCell, StyledCell, RenderStateCell } from "./Table";
import TableHeader from "./TableHeader";

interface Props {
  data: any;
}

const Active = ({ data }: Props) => {
  return (
    <>
      {
        <TableHeader
          titles={[
            "Infected (approx)",
            "Hospitalized",
            "In ICU",
            "On Ventilator",
          ]}
        />
      }
      <DataTableBody>
        {data.map((v, i) => (
          <DataTableRow key={i} style={{ height: "50px" }}>
            {RenderStateCell(v.state)}
            <DataTableCell>
              <div style={{ fontSize: "16px" }}>
                {!(v.positive || v.recovered) && "-"}
                {(v.positive || v.recovered) &&
                  (v.positive - v.recovered)?.toLocaleString("en")}
              </div>
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

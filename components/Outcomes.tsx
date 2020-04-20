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

const Outcomes = ({ data }: Props) => {
  return (
    <>
      {
        <TableHeader
          titles={[
            "Recovered",
            "Deaths",
            "Hospitalizations",
            "Admitted to ICU",
            "Ventilated",
          ]}
        />
      }
      <DataTableBody>
        {data.map((v, i) => (
          <DataTableRow key={i} style={{ height: "50px" }}>
            {RenderStateCell(v.state)}
            <DataTableCell>
              <StyledCell>{RenderCell(v.recovered, v.positive)}</StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>{RenderCell(v.death, v.positive)}</StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {RenderCell(v.hospitalizedCumulative, v.positive)}
              </StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {RenderCell(v.inIcuCumulative, v.positive)}
              </StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {RenderCell(v.onVentilatorCumulative, v.positive)}
              </StyledCell>
            </DataTableCell>
          </DataTableRow>
        ))}
      </DataTableBody>
    </>
  );
};

export default Outcomes;

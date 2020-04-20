import {
  DataTableHead,
  DataTableRow,
  DataTableBody,
  DataTableHeadCell,
  DataTableCell,
} from "@rmwc/data-table";
import { RenderCell, StyledCell, RenderStateCell } from "./Table";
import SparkLineChart from "./PieChart";
import TableHeader from "./TableHeader";

interface Props {
  data: any;
}

const Testing = ({ data }: Props) => {
  return (
    <>
      {
        <TableHeader
          titles={["Tests", "Positive", "Negative", "Pending", ""]}
        />
      }
      <DataTableBody>
        {data.map((v, i) => (
          <DataTableRow key={i} style={{ height: "50px" }}>
            {RenderStateCell(v.state)}
            <DataTableCell>
              <div style={{ fontSize: "16px" }}>
                {v.total?.toLocaleString("en")}
              </div>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>{RenderCell(v.positive, v.total)}</StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>{RenderCell(v.negative, v.total)}</StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>{RenderCell(v.pending, v.total)}</StyledCell>
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

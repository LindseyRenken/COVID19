import styled from "styled-components";
import {
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableRow,
  DataTableBody,
  DataTableHeadCell,
  DataTableCell,
} from "@rmwc/data-table";
import React from "react";

const Container = styled.div`
  height: calc(100vh - 69px);
  width: calc(30vw - 20px);
  overflow: auto;
  margin: 10px;
`;

interface Props {
  data: any;
}

const Sidebar = ({ data }: Props) => {
  const sampleColumns = ["Positive", "Increase", "Deceased", "Death Rate"];
  const sampleRows = Array(50).fill(undefined);

  return (
    <Container>
      <DataTable
        style={{ height: "100%", width: "100%" }}
        stickyRows={1}
        stickyColumns={1}
      >
        <DataTableContent>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeadCell>Region</DataTableHeadCell>
              {sampleColumns.map((v, i) => (
                <DataTableHeadCell key={i}>{v}</DataTableHeadCell>
              ))}
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {data.map((v, i) => (
              <DataTableRow key={i}>
                <DataTableCell>{v.state}</DataTableCell>
                <DataTableCell>{v.positive}</DataTableCell>
                <DataTableCell>{v.positiveIncrease}</DataTableCell>
                <DataTableCell>{v.death}</DataTableCell>
                <DataTableCell>R{i} C4</DataTableCell>
              </DataTableRow>
            ))}
          </DataTableBody>
        </DataTableContent>
      </DataTable>
    </Container>
  );
};

export default Sidebar;

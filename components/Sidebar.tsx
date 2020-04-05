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

const Sidebar = () => {
  const sampleColumns = Array(7).fill(undefined);
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
              <DataTableHeadCell>Label</DataTableHeadCell>
              {sampleColumns.map((v, i) => (
                <DataTableHeadCell key={i}>Header</DataTableHeadCell>
              ))}
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {sampleRows.map((v, i) => (
              <DataTableRow key={i}>
                <DataTableCell>Label</DataTableCell>
                <DataTableCell>R{i} C1</DataTableCell>
                <DataTableCell>R{i} C2</DataTableCell>
                <DataTableCell>R{i} C3</DataTableCell>
                <DataTableCell>R{i} C4</DataTableCell>
                <DataTableCell>R{i} C5</DataTableCell>
                <DataTableCell>R{i} C6</DataTableCell>
                <DataTableCell>R{i} C7</DataTableCell>
              </DataTableRow>
            ))}
          </DataTableBody>
        </DataTableContent>
      </DataTable>
    </Container>
  );
};

export default Sidebar;

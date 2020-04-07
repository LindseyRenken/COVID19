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
  width: calc(35vw - 20px);
  overflow: auto;
  margin: 10px;
`;

interface Props {
  data: any;
}

const Sidebar = ({ data }: Props) => {
  const sampleColumns = ["Positive", "24h Increase", "Deaths", "Death Rate"];

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
              <DataTableHeadCell>State</DataTableHeadCell>
              {sampleColumns.map((v, i) => (
                <DataTableHeadCell key={i}>{v}</DataTableHeadCell>
              ))}
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {data.map((v, i) => (
              <DataTableRow key={i}>
                <DataTableCell>{v.state}</DataTableCell>
                <DataTableCell>{v.positive.toLocaleString("en")}</DataTableCell>
                <DataTableCell>
                  {v.positiveIncrease.toLocaleString("en")} (
                  {(100 * (v.positiveIncrease / v.positive)).toFixed(2)}%)
                </DataTableCell>
                <DataTableCell>{v.death.toLocaleString("en")}</DataTableCell>
                <DataTableCell>
                  {(100 * (v.death / v.positive)).toFixed(2)}%
                </DataTableCell>
              </DataTableRow>
            ))}
          </DataTableBody>
        </DataTableContent>
      </DataTable>
    </Container>
  );
};

export default Sidebar;

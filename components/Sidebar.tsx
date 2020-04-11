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
  // width: calc(35vw - 20px);

  width: calc(100vw - 20px);
  overflow: auto;
  margin: 10px;
  text-align: center;
  // align-items: center;
  // justify-content: center;
`;

interface Props {
  data: any;
}

const Sidebar = ({ data }: Props) => {
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
              <DataTableHeadCell alignMiddle={true}>State</DataTableHeadCell>
              <DataTableHeadCell alignMiddle={true} key={"header_1"}>
                Total
              </DataTableHeadCell>
              <DataTableHeadCell alignMiddle={true} key={"header_2"}>
                Negative
              </DataTableHeadCell>
              <DataTableHeadCell alignMiddle={true} key={"header_3"}>
                Positive
              </DataTableHeadCell>
              <DataTableHeadCell alignMiddle={true} key={"header_4"}>
                Pending
              </DataTableHeadCell>
              <DataTableHeadCell alignMiddle={true} key={"header_4"}>
                24h Positive Increase
              </DataTableHeadCell>
              <DataTableHeadCell alignMiddle={true} key={"header_4"}>
                Deaths
              </DataTableHeadCell>
              <DataTableHeadCell alignMiddle={true} key={"header_4"}>
                Hospitalizations
              </DataTableHeadCell>
              <DataTableHeadCell alignMiddle={true} key={"header_4"}>
                In ICU
              </DataTableHeadCell>
              <DataTableHeadCell alignMiddle={true} key={"header_4"}>
                Recovered
              </DataTableHeadCell>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {data.map((v, i) => (
              <DataTableRow key={i}>
                <DataTableCell>{v.state}</DataTableCell>
                <DataTableCell>{v.total?.toLocaleString("en")}</DataTableCell>
                <DataTableCell>
                  {v.negative?.toLocaleString("en")} (
                  {(100 * (v.negative / v.total)).toFixed(2)}%)
                </DataTableCell>
                <DataTableCell>
                  {v.positive?.toLocaleString("en")} (
                  {(100 * (v.positive / v.total)).toFixed(2)}%)
                </DataTableCell>
                <DataTableCell>
                  {v.pending?.toLocaleString("en")} (
                  {(100 * (v.pending / v.total)).toFixed(2)}%)
                </DataTableCell>
                <DataTableCell>
                  {v.positiveIncrease?.toLocaleString("en")} (
                  {(100 * (v.positiveIncrease / v.positive)).toFixed(2)}%)
                </DataTableCell>
                <DataTableCell>
                  {v.death?.toLocaleString("en")} (
                  {(100 * (v.death / v.positive)).toFixed(2)}%)
                </DataTableCell>
                <DataTableCell>
                  {v.hospitalizedCumulative?.toLocaleString("en")} (
                  {(100 * (v.hospitalizedCumulative / v.positive)).toFixed(2)}%)
                </DataTableCell>
                <DataTableCell>
                  {v.inIcuCurrently?.toLocaleString("en")} (
                  {(100 * (v.inIcuCurrently / v.positive)).toFixed(2)}%)
                </DataTableCell>
                <DataTableCell>
                  {v.recovered?.toLocaleString("en")} (
                  {(100 * (v.recovered / v.positive)).toFixed(2)}%)
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

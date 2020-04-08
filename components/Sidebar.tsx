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

import { Checkbox } from "@rmwc/checkbox";

import React from "react";

const Container = styled.div`
  height: calc(100vh - 69px);
  width: calc(35vw - 20px);
  overflow: auto;
  margin: 10px;
  text-align: center;
`;

interface Props {
  data: any;
}

const Sidebar = ({ data }: Props) => {
  const sampleColumns = [
    "Positive",
    "24h Increase",
    "Deaths",
    "Hospitalized",
    "In ICU",
    "Recovered",
    "Negative",
    "Tested",
  ];

  const [checked, setChecked] = React.useState({});

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
              <DataTableHeadCell>
                <Checkbox
                  checked={checked[0]}
                  onChange={(evt) => {
                    checked[0] = evt.currentTarget.checked;
                    setChecked({ ...checked });
                  }}
                />
              </DataTableHeadCell>
              <DataTableHeadCell>State</DataTableHeadCell>
              {sampleColumns.map((v, i) => (
                <DataTableHeadCell key={i}>{v}</DataTableHeadCell>
              ))}
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {data.map((v, i) => (
              <DataTableRow key={i}>
                <DataTableCell>
                  <Checkbox
                    checked={checked[i + 1]}
                    onChange={(evt) => {
                      checked[i + 1] = evt.currentTarget.checked;
                      setChecked({ ...checked });
                    }}
                  />
                </DataTableCell>

                <DataTableCell>{v.state}</DataTableCell>
                <DataTableCell>{v.positive.toLocaleString("en")}</DataTableCell>
                <DataTableCell>
                  {v.positiveIncrease.toLocaleString("en")} (
                  {(100 * (v.positiveIncrease / v.positive)).toFixed(2)}%)
                </DataTableCell>
                <DataTableCell>
                  {v.death.toLocaleString("en")} (
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
                <DataTableCell>
                  {v.negative?.toLocaleString("en")}
                </DataTableCell>
                <DataTableCell>{v.total?.toLocaleString("en")}</DataTableCell>
              </DataTableRow>
            ))}
          </DataTableBody>
        </DataTableContent>
      </DataTable>
    </Container>
  );
};

export default Sidebar;

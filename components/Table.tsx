import styled from "styled-components";
import { DataTable, DataTableContent } from "@rmwc/data-table";

import Testing from "./Testing";

import { TabBar, Tab } from "@rmwc/tabs";

import React from "react";
import Active from "./Active";
import Outcomes from "./Outcomes";
import Change from "./Change";

const Container = styled.div`
  // height: calc(100vh - 69px);
  // width: calc(35vw - 20px);

  width: calc(100vw - 20px);
  overflow: auto;
  margin: 10px;
  text-align: center;
  // align-items: center;
  // justify-content: center;
`;

export const StyledCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    margin-left: 10px;
    color: grey;
    font-size: 12px;
  }
`;

interface Props {
  data: any;
  all_data: any;
}

const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 10px;
  height: 48px;
`;

export function RenderCell(top, bottom) {
  if (top) {
    return (
      <>
        {top?.toLocaleString("en")}
        <div>({(100 * (top / bottom)).toFixed(2)}%)</div>
      </>
    );
  } else {
    return "-";
  }
}

const Sidebar = ({ data, all_data }: Props) => {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <Container>
      <Summary>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            style={{ height: "30px", marginRight: "20px" }}
            src={"/us.svg"}
          />
          <h3>United States</h3>
        </div>
        <TabBar
          activeTabIndex={activeTab}
          onActivate={(evt) => setActiveTab(evt.detail.index)}
          style={{ width: "550px" }}
        >
          <Tab>24h Change</Tab>
          <Tab>Testing</Tab>
          <Tab>Active</Tab>
          <Tab>Outcomes</Tab>
        </TabBar>
      </Summary>

      <DataTable
        style={{ height: "calc(100vh - 138px)", width: "100%" }}
        stickyRows={1}
        stickyColumns={1}
      >
        <DataTableContent>
          {activeTab == 0 && <Change data={data} all_data={all_data} />}
          {activeTab == 1 && <Testing data={data} />}
          {activeTab == 2 && <Active data={data} />}
          {activeTab == 3 && <Outcomes data={data} />}
        </DataTableContent>
      </DataTable>
    </Container>
  );
};

export default Sidebar;

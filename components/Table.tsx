import styled from "styled-components";
import { DataTable, DataTableContent } from "@rmwc/data-table";

import Link from "next/link";
import Testing from "./Testing";

import { TabBar, Tab } from "@rmwc/tabs";

import React from "react";
import Active from "./Active";
import Outcomes from "./Outcomes";
import Change from "./Change";
import { useRouter } from "next/dist/client/router";

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

const Table = ({ data }: Props) => {
  const router = useRouter();
  let { tab } = router.query;

  const [sortDir, setSortDir] = React.useState(null);

  let sortedData = data;
  switch (sortDir) {
    case 1:
      sortedData = data.sort((a, b) => (a.state > b.state ? 1 : -1));
      break;
    case -1:
      sortedData = data.sort((a, b) => (a.state > b.state ? -1 : 1));
      break;
  }

  let currentTab = null;
  let activeTab = 0;
  switch (tab) {
    case "change":
      currentTab = (
        <Change data={sortedData} sortDir={sortDir} setSortDir={setSortDir} />
      );
      activeTab = 0;
      break;

    case "testing":
      currentTab = <Testing data={sortedData} />;
      activeTab = 1;
      break;

    case "active":
      currentTab = <Active data={sortedData} />;
      activeTab = 2;
      break;

    case "outcomes":
      currentTab = <Outcomes data={sortedData} />;
      activeTab = 3;
      break;
    default:
      currentTab = (
        <Change data={sortedData} sortDir={sortDir} setSortDir={setSortDir} />
      );
      activeTab = 0;
      break;
  }

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
        <TabBar activeTabIndex={activeTab} style={{ width: "550px" }}>
          <Link passHref href="/?tab=change" as={`/?tab=change`}>
            <Tab>24h Change</Tab>
          </Link>
          <Link passHref href="/?tab=testing" as={`/?tab=testing`}>
            <Tab>Testing</Tab>
          </Link>
          <Link passHref href="/?tab=active" as={`/?tab=active`}>
            <Tab>Active</Tab>
          </Link>
          <Link passHref href="/?tab=outcomes" as={`/?tab=outcomes`}>
            <Tab>Outcomes</Tab>
          </Link>
        </TabBar>
      </Summary>

      <DataTable
        style={{ height: "calc(100vh - 138px)", width: "100%" }}
        stickyRows={1}
        stickyColumns={1}
      >
        <DataTableContent>{currentTab}</DataTableContent>
      </DataTable>
    </Container>
  );
};

export default Table;

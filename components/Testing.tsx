import {
  DataTableHead,
  DataTableRow,
  DataTableBody,
  DataTableHeadCell,
  DataTableCell,
} from "@rmwc/data-table";

interface Props {
  data: any;
}

const Testing = ({ data }: Props) => {
  return (
    <>
      <DataTableHead>
        <DataTableRow>
          <DataTableHeadCell style={{ width: "150px" }} alignMiddle={true}>
            State
          </DataTableHeadCell>
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
          {/* <DataTableHeadCell alignMiddle={true} key={"header_5"}>
            24h Positive Increase
          </DataTableHeadCell>
          <DataTableHeadCell alignMiddle={true} key={"header_6"}>
            Deaths
          </DataTableHeadCell>
          <DataTableHeadCell alignMiddle={true} key={"header_7"}>
            Hospitalizations
          </DataTableHeadCell>
          <DataTableHeadCell alignMiddle={true} key={"header_8"}>
            In ICU
          </DataTableHeadCell>
          <DataTableHeadCell alignMiddle={true} key={"header_9"}>
            Recovered
          </DataTableHeadCell> */}
        </DataTableRow>
      </DataTableHead>
      <DataTableBody>
        {data.map((v, i) => (
          <DataTableRow key={i}>
            <DataTableCell style={{ width: "150px" }}>{v.state}</DataTableCell>
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
            {/* <DataTableCell>
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
            </DataTableCell> */}
          </DataTableRow>
        ))}
      </DataTableBody>
    </>
  );
};

export default Testing;

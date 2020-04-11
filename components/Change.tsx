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

const Change = ({ data }: Props) => {
  return (
    <>
      <DataTableHead>
        <DataTableRow>
          <DataTableHeadCell style={{ width: "150px" }} alignMiddle={true}>
            State
          </DataTableHeadCell>
          <DataTableHeadCell alignMiddle={true} key={"header_1"}>
            Tests
          </DataTableHeadCell>
          <DataTableHeadCell alignMiddle={true} key={"header_2"}>
            Negative
          </DataTableHeadCell>
          <DataTableHeadCell alignMiddle={true} key={"header_3"}>
            Positive
          </DataTableHeadCell>
          <DataTableHeadCell alignMiddle={true} key={"header_4"}>
            Recovered
          </DataTableHeadCell>
          <DataTableHeadCell alignMiddle={true} key={"header_5"}>
            Deaths
          </DataTableHeadCell>
        </DataTableRow>
      </DataTableHead>
      <DataTableBody>
        {data.map((v, i) => (
          <DataTableRow key={i}>
            <DataTableCell style={{ width: "150px" }}>{v.state}</DataTableCell>
            <DataTableCell>
              {v.totalTestResultsIncrease?.toLocaleString("en")}
            </DataTableCell>
            <DataTableCell>
              {v.negativeIncrease?.toLocaleString("en")} (
              {(100 * (v.negativeIncrease / v.negative)).toFixed(2)}%)
            </DataTableCell>
            <DataTableCell>
              {v.positiveIncrease?.toLocaleString("en")} (
              {(100 * (v.positiveIncrease / v.positive)).toFixed(2)}%)
            </DataTableCell>
            <DataTableCell>{v.recovered?.toLocaleString("en")}</DataTableCell>
            <DataTableCell>
              {v.deathIncrease?.toLocaleString("en")} (
              {(100 * (v.deathIncrease / v.death)).toFixed(2)}%)
            </DataTableCell>
          </DataTableRow>
        ))}
      </DataTableBody>
    </>
  );
};

export default Change;

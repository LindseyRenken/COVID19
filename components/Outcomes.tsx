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

const Outcomes = ({ data }: Props) => {
  return (
    <>
      <DataTableHead>
        <DataTableRow>
          <DataTableHeadCell style={{ width: "150px" }} alignMiddle={true}>
            State
          </DataTableHeadCell>
          <DataTableHeadCell alignMiddle={true} key={"header_9"}>
            Recovered
          </DataTableHeadCell>
          <DataTableHeadCell alignMiddle={true} key={"header_6"}>
            Deaths
          </DataTableHeadCell>
          <DataTableHeadCell alignMiddle={true} key={"header_7"}>
            Hospitalizations
          </DataTableHeadCell>
          <DataTableHeadCell alignMiddle={true} key={"header_8"}>
            Admitted to ICU
          </DataTableHeadCell>
        </DataTableRow>
      </DataTableHead>
      <DataTableBody>
        {data.map((v, i) => (
          <DataTableRow key={i}>
            <DataTableCell style={{ width: "150px" }}>{v.state}</DataTableCell>
            <DataTableCell>
              {v.recovered?.toLocaleString("en")} (
              {(100 * (v.recovered / v.positive)).toFixed(2)}%)
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
              {v.inIcuCumulative?.toLocaleString("en")} (
              {(100 * (v.inIcuCumulative / v.positive)).toFixed(2)}%)
            </DataTableCell>
          </DataTableRow>
        ))}
      </DataTableBody>
    </>
  );
};

export default Outcomes;

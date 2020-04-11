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

const Active = ({ data }: Props) => {
  return (
    <>
      <DataTableHead>
        <DataTableRow>
          <DataTableHeadCell style={{ width: "150px" }} alignMiddle={true}>
            State
          </DataTableHeadCell>
          <DataTableHeadCell alignMiddle={true} key={"header_8"}>
            Recovering
          </DataTableHeadCell>
          <DataTableHeadCell alignMiddle={true} key={"header_10"}>
            Hospitalized
          </DataTableHeadCell>
          <DataTableHeadCell alignMiddle={true} key={"header_9"}>
            In ICU
          </DataTableHeadCell>
          <DataTableHeadCell alignMiddle={true} key={"header_11"}>
            On Ventilator
          </DataTableHeadCell>
        </DataTableRow>
      </DataTableHead>
      <DataTableBody>
        {data.map((v, i) => (
          <DataTableRow key={i}>
            <DataTableCell style={{ width: "150px" }}>{v.state}</DataTableCell>
            <DataTableCell>
              {(v.positive - v.recovered)?.toLocaleString("en")}
            </DataTableCell>
            <DataTableCell>
              {v.hospitalizedCurrently?.toLocaleString("en")} (
              {(
                100 *
                (v.hospitalizedCurrently / (v.positive - v.recovered))
              ).toFixed(2)}
              %)
            </DataTableCell>
            <DataTableCell>
              {v.inIcuCurrently?.toLocaleString("en")} (
              {(100 * (v.inIcuCurrently / (v.positive - v.recovered))).toFixed(
                2
              )}
              %)
            </DataTableCell>
            <DataTableCell>
              {v.onVentilatorCurrently?.toLocaleString("en")} (
              {(
                100 *
                (v.onVentilatorCurrently / (v.positive - v.recovered))
              ).toFixed(2)}
              %)
            </DataTableCell>
          </DataTableRow>
        ))}
      </DataTableBody>
    </>
  );
};

export default Active;

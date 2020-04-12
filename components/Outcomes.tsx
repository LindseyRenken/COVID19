import {
  DataTableHead,
  DataTableRow,
  DataTableBody,
  DataTableHeadCell,
  DataTableCell,
} from "@rmwc/data-table";
import { StyledCell } from "./Table";

interface Props {
  data: any;
}

const Outcomes = ({ data }: Props) => {
  return (
    <>
      <DataTableHead>
        <DataTableRow>
          <DataTableHeadCell
            style={{ fontWeight: "bold", width: "150px" }}
            alignMiddle={true}
          >
            State
          </DataTableHeadCell>
          <DataTableHeadCell
            style={{ fontWeight: "bold" }}
            alignMiddle={true}
            key={"header_1"}
          >
            Recovered
          </DataTableHeadCell>
          <DataTableHeadCell
            style={{ fontWeight: "bold" }}
            alignMiddle={true}
            key={"header_2"}
          >
            Deaths
          </DataTableHeadCell>
          <DataTableHeadCell
            style={{ fontWeight: "bold" }}
            alignMiddle={true}
            key={"header_3"}
          >
            Hospitalizations
          </DataTableHeadCell>
          <DataTableHeadCell
            style={{ fontWeight: "bold" }}
            alignMiddle={true}
            key={"header_4"}
          >
            Admitted to ICU
          </DataTableHeadCell>
        </DataTableRow>
      </DataTableHead>
      <DataTableBody>
        {data.map((v, i) => (
          <DataTableRow key={i}>
            <DataTableCell
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "150px",
              }}
            >
              {/* <img
                style={{
                  margin: "0px 10px",
                  height: "20px",
                }}
                src={"/" + v.state + ".svg"}
              /> */}
              {v.state}
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {v.recovered?.toLocaleString("en")}
                <div>({(100 * (v.recovered / v.positive)).toFixed(2)}%)</div>
              </StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {v.death?.toLocaleString("en")}
                <div>({(100 * (v.death / v.positive)).toFixed(2)}%)</div>
              </StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {v.hospitalizedCumulative?.toLocaleString("en")}
                <div>
                  ({(100 * (v.hospitalizedCumulative / v.positive)).toFixed(2)}
                  %)
                </div>
              </StyledCell>
            </DataTableCell>
            <DataTableCell>
              <StyledCell>
                {v.inIcuCumulative?.toLocaleString("en")}
                <div>
                  ({(100 * (v.inIcuCumulative / v.positive)).toFixed(2)}%)
                </div>
              </StyledCell>
            </DataTableCell>
          </DataTableRow>
        ))}
      </DataTableBody>
    </>
  );
};

export default Outcomes;

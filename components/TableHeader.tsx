import {
  DataTableHead,
  DataTableRow,
  DataTableHeadCell,
} from "@rmwc/data-table";

interface Props {
  titles: string[];
}

const TableHeader = ({ titles }: Props) => {
  return (
    <DataTableHead>
      <DataTableRow>
        <DataTableHeadCell
          style={{
            fontWeight: "bold",
            width: "100px",
            height: "35px",
            backgroundColor: "#999999",
            fontSize: "12px",
            color: "white",
          }}
          alignMiddle={true}
          // sort={sortDir}
          // onSortChange={(sortDir) => {
          //   setSortDir(sortDir);
          //   console.log(sortDir);
          // }}
        >
          State
        </DataTableHeadCell>
        {titles.map((v, i) => (
          <DataTableHeadCell
            style={{
              fontWeight: "bold",
              height: "35px",
              backgroundColor: "#999999",
              fontSize: "12px",
              color: "white",
            }}
            alignMiddle={true}
            key={"header_" + i}
          >
            {v}
          </DataTableHeadCell>
        ))}
      </DataTableRow>
    </DataTableHead>
  );
};

export default TableHeader;

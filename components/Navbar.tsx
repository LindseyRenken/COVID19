import TopAppBar, {
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarFixedAdjust,
} from "@material/react-top-app-bar";
import Link from "next/link";
import styled from "styled-components";
import { DateTime } from "luxon";

const MenuItem = styled.div`
  text-decoration: none;
  cursor: pointer;
  margin-right: 20px;
`;

interface Props {
  date: string;
}

const Navbar = ({ date }: Props) => (
  <>
    <TopAppBar dense>
      <TopAppBarRow>
        <TopAppBarSection>
          <img
            style={{ marginLeft: "10px", height: "30px", width: "30px" }}
            src="/covid-logo2.svg"
          />
          <TopAppBarTitle>The Covid Curve</TopAppBarTitle>
        </TopAppBarSection>
        <TopAppBarSection align="end">
          <TopAppBarTitle>
            <MenuItem>
              Last Updated:{" "}
              {DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_FULL)}
            </MenuItem>
          </TopAppBarTitle>
          {/* <TopAppBarIcon>
            <Link href="/testing">
              <MenuItem>Testing</MenuItem>
            </Link>
          </TopAppBarIcon> */}
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
    <TopAppBarFixedAdjust dense />

    {/* <div style={{ height: '100rem', padding: '1rem' }}>Scroll Me</div> */}
  </>
);

export default Navbar;

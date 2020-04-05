import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarFixedAdjust,
} from "@rmwc/top-app-bar";

const Navbar = () => (
  <>
    <TopAppBar dense>
      <TopAppBarRow>
        <TopAppBarSection>
          <TopAppBarTitle>The Covid Curve</TopAppBarTitle>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
    <TopAppBarFixedAdjust dense />

    {/* <div style={{ height: '100rem', padding: '1rem' }}>Scroll Me</div> */}
  </>
);

export default Navbar;

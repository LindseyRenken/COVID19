import Navbar from "../components/Navbar";
import styled from "styled-components";
import Chart from "../components/Chart";
import Sidebar from "../components/Sidebar";

const Container = styled.div`
  margin: 0;
  padding: 0;
`;

const Main = styled.div`
  display: felx;
  justify-content: center;
`;

export default function Index() {
  return (
    <Container>
      <Navbar />
      <Main>
        <Sidebar />
        <Chart />
      </Main>
    </Container>
  );
}

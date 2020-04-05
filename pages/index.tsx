import Navbar from "../components/Navbar";
import styled from "styled-components";
import Chart from "../components/Chart";
import Sidebar from "../components/Sidebar";
import fetch from "isomorphic-unfetch";

const Container = styled.div`
  margin: 0;
  padding: 0;
`;

const Main = styled.div`
  display: felx;
  justify-content: center;
`;

const Page = function Index(props) {
  console.log("props:", props);
  return (
    <Container>
      <Navbar />
      <Main>
        <Sidebar data={props.data} />
        <Chart />
      </Main>
    </Container>
  );
};

Page.getInitialProps = async () => {
  const url = "https://covidtracking.com/api/v1/states/daily.json";
  const data = await fetch(url).then((res) => res.json());
  return {
    data,
  };
};

export default Page;

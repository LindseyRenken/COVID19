import Navbar from "../components/Navbar";
import styled from "styled-components";
import Chart from "../components/MultiLineChart";
import Table from "../components/Table";
import fetch from "isomorphic-unfetch";
// import smooth from "array-smooth";

const Container = styled.div`
  margin: 0;
  padding: 0;
  height: 100vh;
`;

const Main = styled.div`
  // display: felx;
  // justify-content: center;
`;

const Page = function Index(props) {
  // console.log(props.data);
  const data = props.data;
  let table_data = data
    .slice(0, 56)
    .sort((a, b) => (a.positive > b.positive ? -1 : 1));
  table_data.forEach((t) => {
    t.allPoints = data.filter((d) => d.state == t.state).reverse();
  });

  const latestDate = table_data[0].dateChecked;

  // const states = data.slice(0, 56).map((v) => v.state);
  // let combined = [];
  // states.forEach((s) => {
  //   combined.push({
  //     state: s,
  //     points: data
  //       .filter((d) => d.state == s && d.positive > 200)
  //       .map((d) => d.positive)
  //       .reverse(),
  //   });
  // });
  // const lengths: number[] = combined.map((v) => v.points.length ?? 0);
  // const max_length = Math.max(...lengths);
  // let res = [];
  // for (let i = 0; i < max_length; i++) {
  //   res.push({ day: i });
  // }
  // combined.forEach((v) => {
  //   v.points.forEach((el, i) => {
  //     res[i][v.state] = el;
  //   });
  // });

  return (
    <Container>
      <Navbar date={latestDate} />
      <Main>
        <Table data={table_data} />
        {/* <Chart data={res} states={states} /> */}
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

import Navbar from "../components/Navbar";
import styled from "styled-components";

const Container = styled.div`
  margin: 0;
  padding: 0;
  background-color: white;
`;

export default function Index() {
  return (
    <Container>
      <Navbar />
      {/* <p>Hello Next.js</p> */}
    </Container>
  );
}

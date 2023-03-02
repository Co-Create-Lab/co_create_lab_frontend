import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function ContainerOutsideExample() {
  return (
    <Container>
      <Navbar expand="lg" variant="light" bg="info" className="flex-lg-column">
        <Container>
          <Navbar.Brand href="#">Navbar</Navbar.Brand>
        </Container>
      </Navbar>
    </Container>
  );
}

export default ContainerOutsideExample;

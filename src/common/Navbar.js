import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav  from 'react-bootstrap/Nav';
import NavLogo from '../../src/assets/NavLogo.svg'
function BrandExample() {
  return (
    <>
      <Navbar sticky="top" bg="dark" data-bs-theme="dark">
        <Container>
          
          <Navbar.Brand className="text-cyan-500 flex items-center justify-center  italic font-serif" href="/"><img src={NavLogo} className='cursor-pointer' href="/" alt='logo'></img>Attender</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/student">Student</Nav.Link>
            <Nav.Link href="/faculty">Faculty</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default BrandExample;
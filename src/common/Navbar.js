import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav  from 'react-bootstrap/Nav';
import NavLogo from '../../src/assets/NavLogo.svg';

function NavHeader() {
  return (
    <>
      <Navbar sticky="top" bg="dark" data-bs-theme="dark">
        <Container>
          
          <Navbar.Brand className="text-cyan-500 flex items-center justify-center  italic font-serif" href="/"><img src={NavLogo} className='cursor-pointer' href="/" alt='logo'></img>Attender</Navbar.Brand>

          <Nav className="me-auto text-[#06b6d4] italic font-serif gap-[50vw] text-lg">
            <Nav className='gap-2'>
            <Link style={{boxShadow: "0px 5px 14px"}} className='border-1 border-blue-700 px-2 rounded-md ease-in duration-1 hover: duration-100 hover:ease-out hover:scale-90 hover:text-green-500' to="/">Home</Link>

            <Link style={{boxShadow: "0px 5px 14px"}} className='border-1 border-blue-700 px-2 rounded-md ease-in duration-1 hover: duration-100 hover:ease-out hover:scale-90 hover:text-green-500' to="/student">Student</Link>
            <Link style={{boxShadow: "0px 5px 14px"}} className='border-1 border-blue-700 px-2 rounded-md ease-in duration-1 hover: duration-100 hover:ease-out hover:scale-90 hover:text-green-500' to="/faculty">Faculty</Link>
            
            </Nav>
         
          <Nav className='gap-4'>
          <Link style={{boxShadow: "0px 5px 14px"}} className='border-1 border-blue-700 px-2 rounded-md ease-in duration-1 hover: duration-100 hover:ease-out hover:scale-90 hover:text-green-500' to="/signIn">Sign In</Link>
          <Link style={{boxShadow: "0px 5px 14px"}} className='border-1 border-blue-700 px-2 rounded-md ease-in duration-1 hover: duration-100 hover:ease-out hover:scale-90 hover:text-green-500' to="/signUp">Sign Up</Link>
          </Nav>
          
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavHeader;
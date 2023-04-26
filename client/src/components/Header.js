import { Navbar, Container } from 'react-bootstrap';

const Header = ({title, className}) => {
    return (
        <div className={className}>
            <Navbar bg="light" >
                <Container className="justify-content-center">
                <Navbar.Brand>{title}</Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header

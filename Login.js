import React, { useContext } from 'react'
import { Button, Card, CardBody, CardFooter, CardSubtitle, CardText, CardTitle, Col, Container, Navbar, Row } from 'react-bootstrap';
import { ShopContext } from './Context/ShopContext';
import { Input } from 'reactstrap';
import { Link } from 'react-router-dom';


export const Login = () => {
  const { login, password, setPassword, username, setUsername } = useContext(ShopContext);
  return (
    
    <div>
    <Navbar className='login-nav' style={{backgroundColor:'lightblue',height:'60px'}}>
    <img  style={{width:'200px',marginLeft:"100px"}} src="https://galaxe.com/wp-content/uploads/2020/04/GalaxE-Solutions-Color.png"/>
    </Navbar>
    <Row>
    <Col md={8} ><img src="https://wallpapercave.com/wp/wp5593679.jpg" style={{height:"500px",width:"820px"}}></img>
    </Col>
    <Col md={4} style={{ backgroundImage: "url('https://cdn.wallpapersafari.com/58/77/xB37fF.jpg')" }}>
    <img src="" style={{padding:'3rem',width:"50px",height:"5px"}}/>
    
    <Card style={{marginRight:"30px",boxShadow:'6px 6px lightgrey',borderRadius:"16px"}}>
    <CardBody>
    <CardTitle style={{fontSize:"25px"}}>Login</CardTitle>
    <hr/>
    <CardSubtitle style={{marginTop:"5px",fontSize:"18px"}}>Username :</CardSubtitle>
    <CardText style={{marginTop:"5px"}}><Input type="text" value={username} placeholder="Enter Username" onChange={(e)=>setUsername(e.target.value)}></Input></CardText>
    <CardSubtitle style={{marginTop:"5px",fontSize:"18px"}}>Password :</CardSubtitle>
    <CardText style={{marginTop:"5px"}}><Input type="password" value={password} placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} ></Input></CardText>
    <CardFooter><button className="btn btn-outline-warning" onClick={login}>Login</button>
    <br></br>
    <Link to="/register" style={{marginTop:"5px",color:"brown"}}>Create new Account</Link></CardFooter>

    </CardBody>
    </Card>
    </Col></Row>
    
    
    </div>
  )
}

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';


export const Home = () => {
const [user,setuser]=useState([]);
const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)
  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true)
  const [selectedUserId, setSelectedUserId] = useState(null);
const [id,setid]=useState("")

useEffect(() => {
    allusers();
    
  }, []);
    const allusers=async()=>{
        try {
            const response = await axios.get(`http://localhost:8080/user/alluser`);
            setuser(response.data);
            
            console.log(response.data)
          } catch (error) {
            console.error('Error getting user:', error);
            toast.error("users not fetched")
            
          }
    }
    console.log(user);

    const handleDeleteUser = async () => {
        try {
          await axios.delete(`http://localhost:8080/user/delete/${id}`);
          console.log('User deleted successfully');
        allusers();
          toast.success("user deleted successfully")
          handleClose1();
        } catch (error) {
          console.error('Error deleting user:', error);
          toast.error("user not deleted")
        }
      };
    
      const handleUpdateUser = async () => {
        try {
          const response = await axios.put(`http://localhost:8080/user/update/${selectedUserId}`, {
            username: Username,
            password: Password,
            email: Email
          });
          console.log('User updated:', response.data);
          toast.success("user updated successfully")
          allusers()
          handleClose();
        } catch (error) {
          console.error('Error updating user:', error);
          toast.error("user not updated")
        }
      };
  return (
    <div className="container">
      <h2 className="text-center my-3">List of Users</h2>
      
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">User ID</th>
            <th scope="col">Email</th>
            <th scope="col">Username</th>
            <th scope="col">Password</th>
          </tr>
        </thead>
        <tbody>
          {user.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.email}</td>
              <td>{item.username}</td>
              <td>{item.password}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={()=>{
                    handleShow1();
                  setid(item.id);}
                  }
                
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => {
                    handleShow();
                    setUsername(item.username);
                    setPassword(item.password);
                    setEmail(item.email);
                    setSelectedUserId(item.id);
                  }}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={show1} onHide={handleClose1}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose1}>
          No
        </Button>
        <Button variant="primary" onClick={handleDeleteUser}>
        Yes
        </Button>
      </Modal.Footer>
    </Modal>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor='email' style={{fontSize:"25px"}}>Email :</label>

          <input type="text" value={Email} id="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} style={{width:"400px",height:"45px",borderRadius:"7px"}}/>
          <br />
          <label htmlFor='username' style={{fontSize:"25px"}}>Username :</label>

          <input type="text" value={Username} id="username" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} style={{width:"400px",height:"45px",borderRadius:"7px"}}/>
          <br />
          <label htmlFor='password' style={{fontSize:"25px"}}>Password :</label>

          <input type="password" id="password" value={Password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} style={{width:"400px",height:"45px",borderRadius:"7px"}}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={ handleUpdateUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    
    </div>
  )
        }

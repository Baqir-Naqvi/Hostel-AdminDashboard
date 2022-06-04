import { useState, React, useEffect, useMemo } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

function UserModal({ data, handler }) {
  const [show, setShow] = useState(true);
  const form = useMemo(()=> new FormData(),[])

  useEffect(() => {
    async function populateform(){
      
    form.append("name", data.name);
    form.append("email", data.email);
    form.append("password", data.password);
    form.append("role", data.role);
    }
    populateform();
  }, [data,form]);
  const handleClose = () => setShow(false);
  const commitchange = (e) => {
    form.set(e.target.name, e.target.value);
  };
  async function UpdateUser() {
    await axios
      .put("https://hostelbackend.herokuapp.com/users/" + data._id, form, {
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.REACT_APP_ACCESS,
        },
      })
      .then((res) => {
        handler();
      });
    window.location.reload();
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton onClick={handler}>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormGroup>
            <Label for="name">UserName</Label>
            <Input
              name="username"
              type="text"
              defaultValue={data.name}
              onChange={commitchange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              name="email"
              type="text"
              defaultValue={data.email}
              onChange={commitchange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="role">Role</Label>
            <Input name="role" 
            type="select" 
            defaultValue={data.role}
            onChange={commitchange}>
              <option label="Select"></option>
              <option>user</option>
              <option>admin</option>
            </Input>
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handler}>
          Close
        </Button>
        <Button variant="primary" onClick={UpdateUser}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserModal;

import { useState, React,useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormGroup, Label, Input, FormText } from "reactstrap";
import axios from "axios";
const ACCESS = "" + process.env.REACT_APP_ACCESS;

const locate = "https://hostelbackend.herokuapp.com/roomimages/";



function Modals({ data, handler }) {
  const form=new FormData();
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  
  useEffect(() => {
    form.append("roomno",data.roomno);
    form.append("roomtype",data.roomtype);
    form.append("floorno",data.floorno);
    form.append("roomprice",data.roomprice);
    form.append("roomdescription",data.roomdescription);
    form.append("roomcapacity",data.roomcapacity);
  }, [data]);

 

 
  const commitchange = (e) => {
    form.set(e.target.name,e.target.value);
   
    }

  async function UpdateRoom() {
      await axios
      .put("https://hostelbackend.herokuapp.com/roomslist?id="+data._id+"&image="+data.image , form, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
          Authorization: ACCESS,
        },
      })
      .then((res) => {
        handler();
        window.location.reload();
      });  
  }

  return (
    
    <Modal show={show} onHide={handleClose}>
    
      <Modal.Header closeButton onClick={handler}>
        <Modal.Title>Room Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormGroup>
            <Label for="roomno">Room No</Label>
            <Input
              name="roomno"
              type="text"
              defaultValue={data.roomno}
              onChange={commitchange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="roomno">Room Capacity</Label>
            <Input
              name="roomcapacity"
              type="text"
              defaultValue={data.roomcapacity}
              onChange={commitchange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="floorno">Floor No</Label>
            <Input
              name="floorno"
              type="select"
              defaultValue={data.floorno}
              onChange={commitchange}
            >
              <option label="Floor Level"></option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="roomtype">Room Type</Label>
            <Input
              name="roomtype"
              type="select"
              defaultValue={data.roomtype}
              onChange={commitchange}
            >
              <option label="Select"></option>
              <option>Delux</option>
              <option>Non-Delux</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="roomdescription">Room Description</Label>
            <Input
              name="roomdescription"
              type="text"
              defaultValue={data.roomdescription}
              onChange={commitchange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="roomprice">Room Price</Label>
            <Input
              name="roomprice"
              type="text"
              defaultValue={data.roomprice}
              onChange={commitchange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleFile" >File</Label>
            <Input
              id="exampleFile"
              name="file"
              type="file"
              onChange={(e) =>{
                form.set("file",e.target.files[0]);
      
              }
              }
              
              
            />
            {data.image ? (
              <p>
                Room Image
                <img
                  src={locate + data.image}
                  style={{ width: "100%" }}
                  alt="roomimage"
                />
              </p>
            ) : (
              <FormText>No Image</FormText>
            )}
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handler}>
          Close
        </Button>
        <Button 
        variant="primary" 
      
         onClick={UpdateRoom}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    
  );
  
}

export default Modals;

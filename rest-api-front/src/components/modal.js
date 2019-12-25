import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from "reactstrap";
class AddContact extends Component {
  state = {
    name: "",
    phone: "",
    email: ""
  };
  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    this.props.isEdit
      ? this.setState({
          name: this.props.contact.name,
          phone: this.props.contact.phone,
          email: this.props.contact.email,
          _id: this.props.contact._id
        })
      : this.setState({
          name: "",
          phone: "",
          email: ""
        });
  }
  render() {
    const { handleAdd, modal, toggle } = this.props;
    return (
      <Modal
        isOpen={modal}
        modalTransition={{ timeout: 700 }}
        backdropTransition={{ timeout: 1300 }}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Add contact</ModalHeader>
        <ModalBody>
          <span className="span">Name:</span>
          <Input
            type="text"
            name="name"
            defaultValue={this.state.name}
            onChange={this.changeHandler}
          />
          <span className="span">Phone:</span>
          <Input
            type="text"
            name="phone"
            defaultValue={this.state.phone}
            onChange={this.changeHandler}
          />
          <span className="span">Email:</span>
          <Input
            type="text"
            name="email"
            defaultValue={this.state.email}
            onChange={this.changeHandler}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              handleAdd(this.state);
              toggle();
            }}
          >
            Save change
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
export default AddContact;

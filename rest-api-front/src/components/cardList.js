import React, { Component } from "react";
import { Button } from "react-bootstrap";
import AddContact from "./modal";
import "./contactlist.css";

class CardList extends Component {
  state = {
    modal: false
  };
  toggle = () => this.setState({ modal: !this.state.modal });
  render() {
    const { contact, handleAdd } = this.props;
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <p className="card-text">Name: {contact.name}</p>
            <p className="card-text">☎{contact.phone}</p>
            <p className="card-text">📧{contact.email}</p>
            <Button
              variant="danger"
              className="button"
              onClick={() => this.props.deleteContact(contact._id)}
            >
              Delete
            </Button>

            <button
              class="btn btn-warning"
              color="success"
              onClick={this.toggle}
            >
              Edite Contact
            </button>
            {this.state.modal ? (
              <AddContact
                modal={this.state.modal}
                toggle={this.toggle}
                isEdit={true}
                contact={contact}
                handleAdd={handleAdd}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
export default CardList;

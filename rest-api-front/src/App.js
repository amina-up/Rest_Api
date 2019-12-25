import React, { Component } from "react";
import "./App.css";
import ContactList from "./components/contactList";

class App extends Component {
  state = {
    name: "",
    mail: "",
    phone: ""
  };

  render() {
    return (
      <div>
        <div className="app">
          <h1 className="contactList">Contact list</h1>
          <ContactList />
        </div>
      </div>
    );
  }
}
export default App;

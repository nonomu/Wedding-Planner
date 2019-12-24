import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class AddTable extends Component {
  constructor() {
    super();
    this.state = {
      tableName: "",
      numSeats: 0
    };
  }

  handleInputs = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addTable = () => {
    //wil invoke the addtable function from store with the state values.
  };

  render() {
    return (
      <div className="box_bg">
        <div className="user_box">
          <h1>ADD Table</h1>
          <h4>Short Explanation</h4>
          <div>
            <TextField
              name="tableName"
              id="standard_basic"
              label="Table Name"
              onChange={this.handleInputs}
            />
          </div>
          <div>
            <TextField
              name="numSeats"
              id="standard-number"
              label="Table Seats"
              type="number"
              onChange={this.handleInputs}
            />
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={this.addTable}>
              Add Table
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddTable;

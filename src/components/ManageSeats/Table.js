import React, { Component } from "react";

class Table extends Component {
    getTableInvitees = () => {
        // this.props.t.id
    }
  render() {
    return (
      <table className="table">
        <tr>
          <th>
            {this.props.t.table_name} - {this.props.t.num_seats}
          </th>
          {/* Here it should take the invitees of this table id and show them in diffrent component */}
        </tr>
      </table>
    );
  }
}

export default Table;

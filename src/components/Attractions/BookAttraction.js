import React, { Component } from 'react';

class BookAttraction extends Component {


    render() {
        return (
            <div>
                <input type="number" className="price"/>
                <button className="submit-price">Submit</button>
            </div>
        );
    }
}

export default BookAttraction;
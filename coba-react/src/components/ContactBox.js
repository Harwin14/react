import { Component } from "react";
import axios from 'axios'
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";

// const request = axios.create({
//     baseURL: 'http://localhost:3001/',
//     // timeout: 1000,
//     headers: { 'X-Custom-Header': 'foobar' }
// });

export default class ContactBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contacts: []
        }
    }
    componentDidMount(){
        axios.get(`http://localhost:3001/`)
        .then(res => {
          const contacts = res.data;
          this.setState({ contacts });
        })
    }
   
    // addContact = (name, phone) => {
    //     this.setState((state) => {
    //         return {
    //             users: [
    //                 {
    //                     name,
    //                     phone
    //                 },
    //                 ...state.users
    //             ]
    //         };
    //     });
    // }



render() {
    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h1 className="text-center">Phone Book Apps</h1>
                </div>
                <div className="card-body">
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-primary mx-2">Add</button>
                    </div>
                    <br></br>
                    <div className="card">
                        <div className="card-header">
                            Search Form
                        </div>
                        <ContactForm add={this.addUsers} />
                    </div>
                    <ContactList data={this.state.users} />
                </div>

            </div>
        </div>
    )
}
}
import { Component } from "react";
import PhoneForm from "./PhoneForm";
import PhoneList from "./PhoneList";
export default class PhoneBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [ ]
        }
    }
   componentDidMount(){
    fetch('http://localhost:3000/api')
    .then((response) => response.json())
    .then((data) =>{
        this.setState({users: data})
    })
  
   }
52.31
    addUsers = (name, phone) => {
        this.setState((state) => {
            return {
                users: [
                    {
                        name,
                        phone
                    },
                    ...state.users
                ]
            };
        });
    }

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
                            <PhoneForm add={this.addUsers} />
                        </div>
                        <PhoneList data={this.state.users}/>
                    </div>

                </div>
            </div>
        )
    }
}
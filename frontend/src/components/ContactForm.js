import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faPlus , faCircleCheck, faAddressCard} from '@fortawesome/free-solid-svg-icons'

export default class ContactForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isAdd: false,
            name: '',
            phone: ''
        }
    }
   
 

    //untuk handle inputan dari form
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    //this.props isinya data add
    handleSubmit = (event) => {
        event.preventDefault()
        //this.props.add dari contactbox
        this.props.add(this.state.name, this.state.phone)
        this.setState({ name: '', phone: '' })

    }
    handleSubmitSearch = (event) => {
        event.preventDefault()
        this.props.onSearch(this.state.name, this.state.phone);
        this.setState({ name: '', phone: '' })
    }

    render() {
        if (this.state.isAdd) {
            return (
                <div>
                    <div className="card mt-3">
                        <div className="card-header font"><FontAwesomeIcon icon={faAddressCard} size="2x"/> Add Form
                        </div>
                        <form className="g-3 my-2 px-4" onSubmit={this.handleSubmit}>
                            <div className="d-flex">
                                <div className="d-flex align-items-center me-2">
                                    <div className="me-1 fw-bold">
                                        <label htmlFor="name">Name</label>
                                    </div>
                                    <div className="ms-1">
                                        <input type="string" className="form-control" name="name" onChange={this.handleInputChange} value={this.state.name} placeholder="name" 
                                        onInvalid={F => F.target.setCustomValidity('Enter Contact name here..')} onInput={F => F.target.setCustomValidity('')} required></input>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center ms-2">
                                    <div className="me-1 fw-bold">
                                        <label htmlFor="phone">Phone</label>
                                    </div>
                                    <div className="ms-1">
                                        <input type="string" className="form-control" name="phone" onChange={this.handleInputChange} value={this.state.phone} placeholder="phone"
                                        onInvalid={F => F.target.setCustomValidity('Please enter phone number here..')} onInput={F => F.target.setCustomValidity('')} required></input>
                                    </div>
                                </div>

                                <div className="my-2 ms-2">
                                    <button type="submit" className="btn btn-s"><FontAwesomeIcon icon={faCircleCheck} /> Save</button>
                                    <button className="btn btn-w mx-2" onClick={() => this.setState({ isAdd: false })}><FontAwesomeIcon icon={faBan} /> Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="card mt-3">
                        <div className="card-header font">
                            Search Form
                        </div>
                        <form className="g-3 my-2 px-4"onSubmit={this.handleSubmitSearch} >
                            <div className="d-flex">
                                <div className="d-flex align-items-center me-2">
                                    <div className="me-1 fw-bold">
                                        <label htmlFor="name">Name</label>
                                    </div>
                                    <div className="ms-1">
                                        <input type="string" className="form-control"  name="name"  onChange={this.handleInputChange}  placeholder="name"></input>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center ms-2">
                                    <div className="me-1 fw-bold">
                                        <label htmlFor="phone">Phone</label>
                                    </div>
                                    <div className="ms-1">
                                        <input type="string" className="form-control" name="phone"  onChange={this.handleInputChange}  placeholder="name"></input>
                                    </div>
                                </div>
                                <button  type="submit" id="submit"></button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="col-md-2">
                        <button className="btn btn-p " onClick={() => this.setState({ isAdd: true })}><FontAwesomeIcon icon={faPlus} /> Add</button>
                    </div>
                    <div className="card mt-3">
                        <div className="card-header font">
                           <p>Search Form</p> 
                        </div>
                        <form className="g-3 my-2 px-4"onSubmit={this.handleSubmitSearch} >
                            <div className="d-flex">
                                <div className="d-flex align-items-center me-2">
                                    <div className="me-1 fw-bold">
                                        <label htmlFor="name">Name</label>
                                    </div>
                                    <div className="ms-1">
                                        <input type="string" className="form-control" name="name"  onChange={this.handleInputChange} placeholder="name"></input>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center ms-2">
                                    <div className="me-1 fw-bold">
                                        <label htmlFor="phone">Phone</label>
                                    </div>
                                    <div className="ms-1">
                                        <input type="string" className="form-control" name="phone"  onChange={this.handleInputChange} placeholder="name"></input>
                                    </div>
                                </div>
                                <button  type="submit" id="submit"></button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }
}


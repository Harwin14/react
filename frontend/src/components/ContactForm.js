import React,{ Component } from "react";
export default class ContactForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
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

    render() {
        return (
            <form className="row g-3" onSubmit={this.handleSubmit}>
                <div className="col-auto name">
                    <label htmlFor="name" className="form-label">Name</label>
                </div>
                <div className="col-auto input-name">
                    <input type="string" className="form-control" id="name" name="name" onChange={this.handleInputChange} value={this.state.name} placeholder="name"></input>
                </div>

                <div className="col-auto phone ">
                    <label htmlFor="phone" className="form-label">Phone</label>
                </div>
                <div className="col-auto input-phone">
                    <input type="text" className="form-control " id="phone" name="phone" onChange={this.handleInputChange} value={this.state.phone} placeholder="phone"></input>
                </div>
            
                <div className="mx-2 my-2">
                    <button type="submit" className="btn btn-p">Save</button>
                </div>
            </form>
        )
    }
}
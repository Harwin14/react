import { Component } from "react";
export default class ContactForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone: ''
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.add(this.state.name, this.state.phone)
        this.setState({ name: '', phone: '' })

    }

    render() {
        return (
            <form className="row g-3" onSubmit={this.handleSubmit}>
                <div className="col-auto mx-3 py-3">
                    <label htmlFor="name" className="form-label">Name</label>
                </div>

                <div className="col-auto py-3">
                    <input type="string" className="form-control" id="name" name="name" onChange={this.handleInputChange} value={this.state.name}></input>
                </div>
                <div className="col-auto mx-3 py-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                </div>
                <div className="col-auto py-3">
                    <input type="number" className="form-control " id="phone" name="phone" onChange={this.handleInputChange} value={this.state.phone}></input>
                </div>
                <div className="col-md-2">
                </div>
                <div className="mx-2 my-2">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        )
    }
}
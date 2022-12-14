
import React, { Component } from "react"
//ContactItem berupa tag yg memiliki atribut no, name, phone
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'

export default class ContactItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: false,
            name: props.name,
            phone: props.phone
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
    handleUpdate = () => {
        this.props.update(this.state.name, this.state.phone)
        this.setState({ isEdit: false })
    }
    render() {
        if (this.state.isEdit) {
            return (
                <tr>
                    <td>{this.props.no}</td>
                    <td>
                        <input id="name" name="name" type="string" className="form-control" value={this.state.name} onChange={this.handleInputChange}/>
                    </td>
                       
                    <td>
                        <input name="phone" id="name" type="text" className="form-control" value={this.state.phone} onChange={this.handleInputChange} />
                    </td>
                    <td>
                        <button className="btn btn-p " type="button"
                                onClick={this.handleUpdate}><FontAwesomeIcon icon={faPencil} /> Save
                        </button>
                        <button className="btn btn-warning" type="button" 
                                onClick={() => this.setState({ isEdit: false })}><FontAwesomeIcon icon={faTrashCan} /> Cancel
                        </button>
                    </td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td>{this.props.no}</td>
                    <td>{this.props.name}</td>
                    <td>{this.props.phone}</td>
                    <td>
                        <button className="btn btn-s " type="button" onClick={() => this.setState({ isEdit: true })}><FontAwesomeIcon icon={faPencil} /> edit
                        </button>
                        <button className="btn btn-d" type="button" onClick={this.props.remove}><FontAwesomeIcon icon={faTrashCan} /> delete
                        </button>
                    </td>
                </tr>
            )
        }
    }
}
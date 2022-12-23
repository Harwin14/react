
import React, { Component } from "react"
//ContactItem berupa tag yg memiliki atribut no, name, phone
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdBadge, faPhoneSquare } from '@fortawesome/free-solid-svg-icons'

export default class ContactItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: false,
            name: props.contact.name,
            phone: props.contact.phone
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
                <div className="card daun m-3 mt-5 transition ease-in-out  shadow py-3 cardlist">
                    <div className='card-body h-500 w-500' >
                        <div className="card">
                            <input type='text' name='name' value={this.state.name} onChange={this.handleInputChange}
                                className='px-2 py-1 border border-blue-400/75 rounded-lg w-full form-control cardlist' required />
                        </div>
                        <div className=''>
                            <input type='tel' pattern='[08][0-9]{11}' name='phone' id='phone' value={this.state.phone} onChange={this.handleInputChange}
                                className='px-2 py-1 border border-blue-400/75 rounded-lg w-full form-control cardlist' required />
                        </div>
                        <div className='d-flex justify-content-around align-items-stretch py-2'>
                            <button onClick={this.handleUpdate}
                                className='button-87'> Update</button>

                            <button type='button' onClick={() => this.setState({ isEdit: false })}
                                className='button-85'> Cancel</button>
                        </div>

                    </div>

                </div>
            )
        } else {
            return (
                <div>
                    <div className="card daun m-3 mt-5 transition ease-in-out  shadow py-3 cardlist">
                        <div className='card-body h-500 w-500' >
                            <div className="">
                                <div className=''><FontAwesomeIcon icon={faIdBadge} /> <span> Name : {this.state.name}</span>
                                </div>

                                <div className=''>
                                    <FontAwesomeIcon icon={faPhoneSquare} /><span> Phone : {this.state.phone}</span>
                                </div>
                                <div className='d-flex justify-content-around align-items-stretch py-2'>
                                    <button onClick={() => this.setState({ isEdit: true })} className='button-29'>
                                        Edit
                                    </button>
                                    <button onClick={this.props.contact.sent ? this.props.remove : this.props.resend} className='button-49'>
                                        {this.props.contact.sent ? 'Delete' : 'Resend'}
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            )
        }
    }
}
        // render() {
        // if (this.state.isEdit) {
        //     return (
        //         <tr className="r">
        //             <td>{this.props.no}</td>
        //             <td>
        //                 <input name="name" type="text" className="form-control" value={this.state.name} onChange={this.handleInputChange} />
        //             </td>
        //             <td>
        //                 <input name="phone" type="text" className="form-control" value={this.state.phone} onChange={this.handleInputChange} />
        //             </td>
        //             <td>
        //                 <button className="btn btn-p" type="button"
        //                     onClick={this.handleUpdate}><FontAwesomeIcon icon={faPencil} /> Save
        //                 </button>
        //                 <button className="btn btn-w" type="button"
        //                     onClick={() => this.setState({ isEdit: false })}><FontAwesomeIcon icon={faTrashCan} /> Cancel
        //                 </button>
        //             </td>
        //         </tr>
        //     )
        // } else {
        //     return (
        //         <tr className="r">
        //             <td>{this.props.no}</td>
        //             <td>{this.props.contact.name}</td>
        //             <td>{this.props.contact.phone}</td>
        //             {this.props.contact.sent ?
        //                 <td>
        //                     <button
        //                         className="btn btn-s"
        //                         type="button"z
        //                         onClick={() => this.setState({ isEdit: true })}>
        //                         <FontAwesomeIcon icon={faPencil} /> edit
        //                     </button>
        //                     <button
        //                         className={this.props.contact.sent ? "btn btn-d" : "btn btn-w"} type="button"
        //                         onClick={this.props.contact.sent ? this.props.remove : this.props.resend}>
        //                         <FontAwesomeIcon icon={faTrashCan} />
        //                         {this.props.contact.sent ? " DELETE" : " RESEND"}
        //                     </button>
        //                 </td>
        //                 :
        //                 <td>
        //                     <button
        //                         className={this.props.contact.sent ? "btn btn-d" : "btn btn-w"} type="button"
        //                         onClick={this.props.contact.sent ? this.props.remove : this.props.resend}>
        //                         <FontAwesomeIcon icon={faTrashCan} />
        //                         {this.props.contact.sent ? " DELETE" : " RESEND"}
        //                     </button>
        //                 </td>
        //             }
        //         </tr>
        //     )
        // }
        // }

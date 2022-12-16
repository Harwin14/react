import React, { Component } from "react";
import axios from 'axios'
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faContactBook } from '@fortawesome/free-solid-svg-icons'


//import klo data mau dimasukin
//export untuk export data


export default class ContactBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contacts: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/users`)
            .then(response => {
                const contacts = response.data.data;
                this.setState({ contacts });
            }).catch((err) => {
                console.log(err)
            })
    }  

    addContact = async (name, phone) => {
        try {
            const id = Date.now()
            this.setState((state) => {
                return {
                    contacts: [
                        ...state.contacts,
                        {
                            id,
                            name,
                            phone
                        }

                    ]
                };
            });
            const { data } = await axios.post(`http://localhost:3000/users`, { name, phone })
            if (data) {
                this.setState((state) => ({
                    contacts: state.contacts.map(user => {
                        if (user.id === id) {
                            return { ...data.data }
                        }
                        return user
                    })
                }))
            }
        } catch (err) {
            console.log(err)
        }
    }

    updateContact = async (id, name, phone) => {
        try {
            const { data } = await axios.put(`http://localhost:3000/users/${id}`, { name, phone })
            if (data) {
                this.setState((state) => ({
                    contacts: state.contacts.map(user => {
                        if (user.id === id) {
                            return { ...data.data }
                        }
                        return user
                    })
                }))
            }
        } catch (err) {
            console.log(err)
        }
    }
    // removeContact = (id) => {
    //     axios.delete(`http://localhost:3000/users/${id}`)
    //     this.setState((state) => ({
    //         contacts: state.contacts.filter((props) => props.id !== id)
    //     }))
    // }
    removeContact = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/users/${id}`)
            this.setState((state) => ({
                contacts: state.contacts.filter((props) => props.id !== id)
            }))
        } catch (err) {
            console.log(err)
        }
    }


    render() {
        return (
            <div className="container shadow">
                <div className="card">
                    <div className="card-header">
                        <h1 className="text-center font"><FontAwesomeIcon icon={faContactBook} /> Phone Book Apps</h1>
                    </div>
                    <div className="card-body">
                        <ContactForm add={this.addContact} />
                    </div>
                </div>
                <ContactList
                    data={this.state.contacts}
                    update={this.updateContact}
                    remove={this.removeContact}
                />
            </div>
        )
    }
}
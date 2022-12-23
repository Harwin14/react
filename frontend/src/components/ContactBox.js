import React, { Component } from "react";
import axios from 'axios'
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faContactBook } from '@fortawesome/free-solid-svg-icons'


//import klo data mau dimasukin
//export untuk export data
const request = axios.create({
    baseURL: 'http://localhost:3001/',
    headers: { 'X-Custom-Header': 'foobar' }
});

export default class ContactBox extends Component {
    constructor(props) {
        super(props)
        this.params = {
            page: 1,
            name: '',
            phone: ''
        }
        this.state = {
            contacts: []
        }
    }
    async componentDidMount() {
        this.loadContact()
    }

    loadContact = async () => {
        try {
            const { data } = await request.get('users', { params: this.params })
            this.setState(state => ({
                contacts: [...(this.params.page === 1 ? [] : state.contacts), ...data.data.users.map(item => {
                    item.sent = true
                    return item
                })]
            }))
            this.params.pages = data.data.pages
        } catch (error) {
            console.log(error)
        }
    }

    loadMore = () => {
        if (this.params.page <= this.params.pages) {
            this.params = ({
                ...this.params,
                page: this.params.page + 1
            })
            this.loadContact()
        }
    }

    searchContact = async (name, phone) => {
        try {
            this.params = { ...this.params, name, phone, page: 1 }
            this.loadContact()
        } catch (error) {
            console.log(error)
        }
    }

    addContact = async (name, phone) => {
        const id = Date.now()
        this.setState((state) => {
            return {
                contacts: [
                    ...state.contacts,
                    {
                        id,
                        name,
                        phone,
                        sent: true
                    }
                ]
            };
        });
        try {
            const { data } = await request.post(`users`, { name, phone })
            if (data.success) {
                this.setState((state) => ({
                    contacts: state.contacts.map(item => {
                        if (item.id === id) {
                            return { ...data.data, sent: true }
                        }
                        return item
                    })
                }))
            } else {
                console.log(data.data)
            }
        } catch (error) {
            console.log(error)
            this.setState((state) => ({
                contacts: state.contacts.map(item => {
                    if (item.id === id) {
                        return { ...item, sent: false }

                    }
                    return item
                })
            }))
        }
    }



    removeContact = async (id) => {
        try {
            const { data } = await request.delete(`users/${id}`)
            if (data.success) {
                this.setState((state) => ({
                    contacts: state.contacts.filter((props) => props.id !== id)
                }))
            } else {
                alert('Contact not found')
            }
        } catch (err) {
            console.log(err)
        }
    }

    updateContact = async (id, name, phone) => {
        try {
            const { data } = await request.put(`users/${id}`, { name, phone })
            if (data.success) {
                this.setState((state) => ({
                    contacts: state.contacts.map(item => {
                        if (item.id === id) {
                            return { ...data.data, sent: true }
                        }
                        return item
                    })
                }))
            } else {
                console.log(data.data)
            }
        } catch (err) {
            alert('Failed to update contact')
            console.log(err)
        }
    }

    resendContact = async (id, name, phone) => {
        try {
            const { data } = await request.post(`users`, { name, phone })
            if (data.success) {
                this.setState((state) => ({
                    contacts: state.contacts.map(item => {
                        if (item.id === id) {
                            return { ...data.data, sent: true }
                        }
                        return item
                    })
                }))
            }
        } catch (error) {
            console.log(error)
        }

    }

    render() {
        return (
            <div>
                <div className="container shadow">
                    <div className="card">
                        <div className="card-header">
                            <h1 className="text-center font"><FontAwesomeIcon icon={faContactBook} /> Phone Book Apps</h1>
                        </div>
                        <div className="card-body">
                            <ContactForm add={this.addContact} onSearch={this.searchContact} />
                        </div>
                    </div>

                </div>
                <div>

                    <div className="container shadow"> 
                    
                        <div className="card-body shadow px-6" >
                            <ContactList
                                data={this.state.contacts}
                                update={this.updateContact}
                                remove={this.removeContact}
                                resend={this.resendContact}
                                loadMore={this.loadMore}
                            />
                            </div>
                     
                    </div>
                </div>
            </div>
        )
    }
}

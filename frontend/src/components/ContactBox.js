// import React, { Component } from "react";
// import axios from 'axios'
// import ContactForm from "./ContactForm";
// import ContactList from "./ContactList";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faContactBook } from '@fortawesome/free-solid-svg-icons'


// //import klo data mau dimasukin
// //export untuk export data
// const request = axios.create({
//     baseURL: 'http://localhost:3000/',
//     headers: { 'X-Custom-Header': 'foobar' }
// });

// export default class ContactBox extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             contacts: []
//         }
//     }

//     async componentDidMount() {
//         try {
//             const { data } = await request.get('users')
//             if (data) {
//                 this.setState({
//                     contacts: data.data.map(user => {
//                         user.sent = true
//                         return user
//                     })
//                 })
//             }
//         } catch (err) {
//                 console.log(err)
//         }
//     }



//     addContact = async (name, phone) => {
//         try {
//             const id = Date.now()
//             this.setState((state) => {
//                 return {
//                     contacts: [
//                         ...state.contacts,
//                         {
//                             id,
//                             name,
//                             phone,
//                             sent: true
//                         }

//                     ]
//                 };
//             });
//             const { data } = await request.post(`users`, { name, phone })
//             if (data) {
//                 this.setState((state) => ({
//                     contacts: state.contacts.map(user => {
//                         if (user.id === id) {
//                             return { ...data.data }
//                         }
//                         return user
//                     })
//                 }))
//             }
//         } catch (err) {
//             console.log(err)
//         }
//     }

//     removeContact = async (id) => {
//         try {
//            const {data } = await request.delete(`users/${id}`)
//             if (data){
//                 this.setState((state) => ({
//                     contacts: state.contacts.filter((props) => props.id !== id)
//                 }))
//             } 
//          }catch (err) {
//             console.log(err)
//         }
//     }

//     updateContact = async (id, name, phone) => {
//         try {
//             const { data } = await request.put(`users/${id}`, { name, phone })
//             if (data) {
//                 this.setState((state) => ({
//                     contacts: state.contacts.map(user => {
//                         if (user.id === id) {
//                             return { ...data.data, sent: true }
//                         }
//                         return user
//                     })
//                 }))
//             }
//         } catch (err) {
//             console.log(err)
//         }
//     }
// resendContact = async (id, name, phone) => {
//    try {
//             const { data } = await request.put(`users/${id}`, { name, phone })
//             if (data) {
//                 this.setState((state) => ({
//                     contacts: state.contacts.map(user => {
//                         if (user.id === id) {
//                             return { ...data.data, sent: true }
//                         }
//                         return user
//                     })
//                 }))
//             }
//         } catch (err) {
//             console.log(err)
//         }
//     }

//     render() {
//         return (
//             <div className="container shadow">
//                 <div className="card">
//                     <div className="card-header">
//                         <h1 className="text-center font"><FontAwesomeIcon icon={faContactBook} /> Phone Book Apps</h1>
//                     </div>
//                     <div className="card-body">
//                         <ContactForm add={this.addContact} />
//                     </div>
//                 <ContactList
//                     data={this.state.contacts}
//                     remove={this.removeContact}
//                     update={this.updateContact}
//                     resend={this.resendContact}
//                     />
//                     </div>
//             </div>
//         )
//     }
// }

import React, { Component } from "react";
import axios from 'axios'
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faContactBook } from '@fortawesome/free-solid-svg-icons'


//import klo data mau dimasukin
//export untuk export data
const request = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: { 'X-Custom-Header': 'foobar' }
});

export default class ContactBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contacts: []
        }
    }

    async componentDidMount() {
        try {
            const { data } = await request.get('users')
            if (data) {
                this.setState({
                    contacts: data.data.map(user => {
                        user.sent = true
                        return user
                    })
                })
            }
        } catch (err) {
            console.log(err)
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
            if (data) {
                this.setState((state) => ({
                    contacts: state.contacts.map(user => {
                        if (user.id === id) {
                            return { ...data.data, sent: true }
                        }
                        return user
                    })
                }))
            }
        } catch (err) {
            console.log(err)
            this.setState((state) => ({
                contacts: state.contacts.map(user => {
                    if (user.id === id) {
                        return { ...user, sent: false }

                    }
                    return user
                })
            }))
        }
    }

    removeContact = async (id) => {
        try {
            const { data } = await request.delete(`users/${id}`)
            if (data) {
                this.setState((state) => ({
                    contacts: state.contacts.filter((props) => props.id !== id)
                }))
            }
        } catch (err) {
            console.log(err)
        }
    }

    updateContact = async (id, name, phone) => {
        try {
            const { data } = await request.put(`users/${id}`, { name, phone })
            if (data) {
                this.setState((state) => ({
                    contacts: state.contacts.map(user => {
                        if (user.id === id) {
                            return { ...data.data, sent: true }
                        }
                        return user
                    })
                }))
            }
        } catch (err) {
            alert('Failed to update contact')
            console.log(err)
        }
    }
    resendContact = async (name, phone) => {
        try {
            const { data } = await request.get(`users`, { name, phone })
            console.log(data)
            if (data) {
                this.setState({
                    contacts: data.data.map(user => {
                        user.sent = true
                        return user
                    })
                })
            }
        } catch (err) {
            alert('Failed to resend data')
            console.log(err)
        }
    }



    // performSearch = (name = {}) => {
    //     axios.get(`http://localhost:3000/users/?name=${name}`)
    //         .then(response => response.json())
    //         .then(responseData => {
    //             this.setState({
    //                 contacts: responseData.contacts,
    //                 loading: false
    //             });
    //         })
    //         .catch(error => {
    //             console.log('Error fetching and parsing data', error);
    //         });

    // }
  
    searchContact = async (query = {}) => {
        try {
            console.log(query)
            const { data } = await request.get(`users`,{ params:  { name: query } })
            console.log(data)
            if (data) {
                this.setState({
                    contacts: data.data.map(user => {
                        user.sent = true
                        return user
                    })
                })
            }
        } catch (err) {
            alert('Failed to resend data')
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

                        <ContactForm add={this.addContact} onSearch={this.searchContact} />

                    </div>
                </div>{

                    (this.state.loading) ? <p>Loading</p> :
                        <ContactList
                            data={this.state.contacts}
                            update={this.updateContact}
                            remove={this.removeContact}
                            resend={this.resendContact}
                        />
                }
            </div>
        )
    }
}
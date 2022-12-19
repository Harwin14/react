import React from "react";
import ContactItem from "./ContactItem"

export default function ContactList(props) {
    return (
        <table className="table table-striped">
            <thead >
                <tr className="r">
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th className="act">Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((user, index) => 
                        <ContactItem
                        key={user.id}
                        no={index + 1}
                        contact={user}
                        remove={() => props.remove(user.id)}
                        update={(name, phone) => props.update(user.id, name, phone)}
                        resend={() => props.resend(user.id, user.name, user.phone)} 
                        />
                )}
            </tbody>
        </table>
    )
}
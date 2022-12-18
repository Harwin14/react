import React from "react";
import ContactItem from "./ContactItem"

export default function ContactList(props) {
    return (
        <table className="table">
            <thead >
                <tr className="r">
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th className="act">Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((user, index) => (
                    <ContactItem
                        no={index + 1}
                        key={user.id}
                        name={user.name}
                        phone={user.phone}
                        update={(name, phone) => props.update(user.id, name, phone)}
                        remove={() => props.remove(user.id)} />
                ))}
            </tbody>
        </table>
    )
}
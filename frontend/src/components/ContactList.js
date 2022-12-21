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
                {props.data.map((item, index) => 
                        <ContactItem
                        key={item.id}
                        no={index + 1}
                        contact={item}
                        remove={() => props.remove(item.id)}
                        update={(name, phone) => props.update(item.id, name, phone)}
                        resend={() => props.resend(item.id, item.name, item.phone)} 
                        />
                )}
            </tbody>
        </table>
    )
}
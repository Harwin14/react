import ContactItem from "./ContactItem"

export default function ContactList(props) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((user, index) => (
                  <ContactItem 
                  no={index +1} 
                  name={user.name} 
                  phone={user.phone} />
                ))}

            </tbody>
        </table>
    )
}
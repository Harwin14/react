import Phoneitem from "./PhoneItem"

export default function PhoneList(props) {
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
                  <Phoneitem 
                  no={index +1} 
                  name={user.name} 
                  phone={user.phone} />
                ))}

            </tbody>
        </table>
    )
}
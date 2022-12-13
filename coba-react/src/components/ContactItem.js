export default function ContactItem(props) {
    return (
        <tr>
            <td>{props.no}</td>
            <td>{props.name}</td>
            <td>{props.phone}</td>
        </tr>
    )
}   
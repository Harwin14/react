export default function Phoneitem(props) {
    return (
        <tr>
            <td>{props.no}</td>
            <td>{props.name}</td>
            <td>{props.phone}</td>
        </tr>
    )
}
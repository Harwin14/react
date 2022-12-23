import React from "react";
import ContactItem from "./ContactItem"

export default function ContactList(props) {

    const scrolling = (event) => {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            props.loadMore()
        }
    }

    return (
        <div onScroll={scrolling} style={{ overflowY: "scroll", height: 500 }} className=" card-header mt-5 mx-auto d-flex justify-content-between d-flex flex-wrap">
            {
                props.data.map((user, index) => (
                    <ContactItem
                        key={user.id}
                        no={index + 1}
                        contact={user}
                        remove={() => props.remove(user.id)}
                        update={(name, phone) => props.update(user.id, name, phone)}
                        resend={() => props.resend(user.id, user.name, user.phone)}
                    />
                ))
            }
        </div>
    )
}
//     return (
//         <div onScroll={scrolling} style={{ overflowY: "scroll", height: 200 }}>
//             <table className="table-responsive table-striped" >
//                 <thead >
//                     <tr className="r">
//                         <th>#</th>
//                         <th>Name</th>
//                         <th>Phone</th>
//                         <th className="act">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody >
//                     {props.data.map((user, index) =>
//                         <ContactItem
//                             key={user.id}
//                             no={index + 1}
//                             contact={user}
//                             remove={() => props.remove(user.id)}
//                             update={(name, phone) => props.update(user.id, name, phone)}
//                             resend={() => props.resend(user.id, user.name, user.phone)}
//                         />
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     )
 //}
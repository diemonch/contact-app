import React from 'react';
import { Link } from 'react-router-dom';
import CardContact from './ContactCard';


const ContactList = (props)=>{
    console.log(props);
    const deleteContactHandler = (id) =>{
        props.getContactId(id);
    };
    const renderContactList = props.contacts.map((contact) => {

        return(
          <CardContact contact={contact}
           clickHandler={deleteContactHandler}
            key={contact.id}>
         </CardContact>
        );

    });

        return(
            <div className="main">
                    <line></line>
                    <h2> Contact list is here</h2> 
                    <Link to='/add'><button className='ui button blue right'>Add Contact</button></Link>
            <div className='ui celled list'>{renderContactList}</div>
            
                     
            </div>
        );

};
export default ContactList;
import React, {useRef} from 'react';
import { Link } from 'react-router-dom';
import CardContact from './ContactCard';


const ContactList = (props)=>{
    console.log(props);
    const inputEl = useRef("");
    const deleteContactHandler = (id) =>{
        props.getContactId(id);
    };

    const getSearchTerm =()=>{
        // console.log(inputEl);
        props.searchKeyword(inputEl.current.value);
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
                    <line>&npsp</line>
                    <h2> Contact list is here
                    <Link to='/add'><button className='ui button blue right'>Add Contact</button></Link></h2>
                    <div className='ui search'>
                        <div className='ui icon input'>
                            <input ref={inputEl} type = 'text' placeholder='Search Contacts'  className='prompt' 
                            value={props.term} onChange={getSearchTerm}
                            />
                            <i className='search icon'></i>
                        </div>
                    </div>
                    <div className='ui celled list'>{renderContactList.length >0 ? renderContactList:"No Such Contacts"}</div>
            
                     
            </div>
        );

};
export default ContactList;
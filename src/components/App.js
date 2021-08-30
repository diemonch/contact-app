import React ,{ useState, useEffect} from 'react';
import './App.css';
import { uuid } from 'uuidv4';
import { BrowserRouter as Router, Switch , Route } from 'react-router-dom';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetails';
import EditContact from './EditContact';
import api from '../api/contacts';
import { async } from 'q';
import { set } from 'harmony-reflect';


function App() {
      const LOCAL_STORAGE_KEY='contacts';
      const [contacts, setContacts] = useState([]);
      

      const addContactHandler= async (contact)=> {
        const request = {
          id:uuid(),
          ...contact
        }
        const response = await api.post("/contacts",request);
        setContacts([...contacts,response.data]);
        console.log(response.data);
      };
      
      const updateContactHandler= async (contact)=> {
      
        const response = await api.put(`/contacts/${contact.id}`,contact);
        console.log(response.data);
        const {id,name,email} = response.data;
        setContacts(
          contacts.map((contact) => {
            return  contact.id === id ? {...response.data} : contact ;
          })
        );
      };

      const retrieveContacts = async ()=> {
          const response= await api.get("/contacts");
          return response.data;
      }

      const removeContactHandler= async (id)=> {
        await api.delete(`/contacts/${id}`);
        const newContctList = contacts.filter((contact)=>{
          return contact.id !== id;

        });
        setContacts(newContctList);
        //console.log(contact);
      };
      
      useEffect (()=> {
        //localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
        // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        // console.log(retriveContacts);
        // if(retriveContacts){
        //   setContacts(retriveContacts);
        // }
        const getAllContacts = async () => {
          const allContacts = await retrieveContacts();
          if (allContacts) setContacts(allContacts);
          console.log(allContacts);
        }

        getAllContacts();

      },[])

      useEffect (()=> {
        localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));

      },[contacts])
  
  return (
    <div className="ui container">
    
    <Router>
     <Header />
     <Switch>
     <Route 
      path="/"
      exact 
      render = {(props) => (
      <ContactList {...props} contacts={contacts} getContactId={removeContactHandler} />
   
      ) } />
  
      <Route 
      path="/add"
      exact 
      render = {(props) => (
      <AddContact {...props}  addContactHandler={addContactHandler} />
   
      ) } />

      <Route 
      path="/contact/:id"
      component={ContactDetail}
      />
       <Route 
      path="/edit"
      exact 
      render = {(props) => (
      <EditContact {...props}  updateContactHandler={updateContactHandler} />
   
      ) } />

     </Switch>
     </Router>
     {/* <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
          
    </div>
  );
}

export default App;

import React ,{ useState, useEffect} from 'react';
import './App.css';
import { uuid } from 'uuidv4';
import { BrowserRouter as Router, Switch , Route } from 'react-router-dom';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetails';


function App() {
      const LOCAL_STORAGE_KEY='contacts';
      const [contacts, setContacts] = useState([]);
      

      const addContactHandler= (contact)=> {
        setContacts([...contacts,{id:uuid(),...contact}]);
        console.log(contact);
      };
      
      const removeContactHandler= (id)=> {
        const newContctList = contacts.filter((contact)=>{
          return contact.id !== id;

        });
        setContacts(newContctList);
        //console.log(contact);
      };
      
      useEffect (()=> {
        //localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
        const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        console.log(retriveContacts);
        if(retriveContacts){
          setContacts(retriveContacts);
        }
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
     </Switch>
     </Router>
     {/* <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
          
    </div>
  );
}

export default App;

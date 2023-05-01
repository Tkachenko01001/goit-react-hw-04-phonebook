import { nanoid } from 'nanoid'
import { useState, useEffect } from "react";
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/Contacts-list/contactLists';
import { Div } from 'components/styled/style.styled';

const App = () => {
  
  const [contacts, setContacts] = useState(() => JSON.parse(window.localStorage.getItem('contacts')) ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = e.target.elements;
    const id = nanoid();
    const newContact = { id, name: name.value, number: number.value };
  
    if (checkDuplicateContact(newContact)) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
  
    setContacts((prevState) => [...prevState, newContact]);

    e.target.reset();
  };

  const checkDuplicateContact = (newContact) => {
    return contacts.some(contact => contact.name.toLowerCase() === newContact.name.toLowerCase());
  };

  const deleteContact = (id) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  };


  const filteredContacts = contacts.filter(contact => 
  contact.name.toLowerCase().includes(filter.toLowerCase()))
    
    return (
      <Div>
        <h1>Phonebook</h1>
        <ContactForm handleSubmit={handleSubmit} />
        <h2>Contacts</h2>
        <Filter filter={filter} handleFilterChange={(e)=> setFilter(e.target.value)} />
        <ContactList filteredContacts={filteredContacts} handleDeleteContact={deleteContact} />
      </Div>
    )
  }

export default App;
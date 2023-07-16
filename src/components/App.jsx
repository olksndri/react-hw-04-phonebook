import css from '../styles/app.module.css';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { nanoid } from 'nanoid';
import { save, load } from 'js/storage';
import { useState } from 'react';

export const App = () => { 
  const [filter, setFilter] = useState(''); 
  const [contacts, setContacts] = useState((load("contacts") !== null) ? load("contacts") : []); 
  const [name, setName] = useState(''); 
  const [number, setNumber] = useState(''); 

  const onSubmit = (evt) => { 
    evt.preventDefault()
    if (contacts.filter(el => el.name === name).length > 0) {
      window.alert(`${name} is already in contacts`); 
    } else {
      setContacts([...contacts, { name, number, id: nanoid() }]); 
      save("contacts", [...contacts, { name, number, id: nanoid() }]);
      setName('');
      setNumber('');
      setFilter(''); 
    }
  }

  const onDelete = (evt) => { 
    let deleteIndex;
    contacts.forEach((el, i) => {
      if (evt.target.previousElementSibling.textContent.includes(el.name)) {
          deleteIndex = i;
      }
    })
    let updatedContacts = contacts.filter((el, i) => i !== deleteIndex);
    save("contacts", updatedContacts);
    setContacts(updatedContacts);
  }

  return (
      <>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm
          onSubmit={onSubmit}
          onInput={{name, setName, number, setNumber}}
          textId={nanoid()}
          numberId={nanoid()}
        >
        </ContactForm>
        <div className={css['contacts-wrapper']}>
          <h2 className={css.title}>Contacts</h2>
          <Filter
            onInput={{filter, setFilter}}
            filterId={nanoid()}
          >
          </Filter>
          <ContactList
            onDelete={onDelete}
            contacts={contacts}
            filter={filter}
          >
          </ContactList>
        </div>
      </>
  )
}

 
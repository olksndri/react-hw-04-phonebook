import css from '../styles/app.module.css';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { nanoid } from 'nanoid';
import { save, load } from 'js/storage';
import { useState, useEffect } from 'react';
// import React, { Component } from 'react';

// export class App extends Component {
//   state = {
//     filter: '',
//   }

//   constructor(props) {
//     super(props);

//     this.state.contacts = (typeof load("contacts") === "object" &&
//       load("contacts") !== null) ?
//       load("contacts") : [];
//   }

//   onSubmit = (evt) => {
//     evt.preventDefault();
    // if (this.state.contacts.filter(el => el.name === this.state.name).length > 0) {
    //     window.alert(`${this.state.name} is already in contacts`)
    // } else {
    //    this.setState((state) => {
    //     save("contacts", [...state.contacts, { name: state.name, number: state.number, id: nanoid(), }]);
        
    //     return {
    //       contacts: [...state.contacts, { name: state.name, number: state.number, id: nanoid(), }],
    //       name: '',
    //       number: '',
    //       filter: ''
    //     }
    //     })
    // }
//   }

//   onInput = (evt) => {
//     if (evt.target.getAttribute("name") === "name") {
//       this.setState({ name: evt.target.value });
//     } else if ((evt.target.getAttribute("name") === "number")) {
//       this.setState({ number: evt.target.value });
//     } else {
//       this.setState({ filter: evt.target.value });
//     }
//   }
  
//   onDelete = (evt) => {
    // let deleteIndex;
    // this.state.contacts.forEach((el, i) => {
    //   if (evt.target.previousElementSibling.textContent.includes(el.name)) {
    //       deleteIndex = i;
    //   }
    // })
    // this.setState((state) => {
    //   let counter = state.contacts.filter((el, i) => i !== deleteIndex);
    //   save("contacts", counter);
    //   return { contacts: counter };
    // })
//   }

//   render() {
//     const { contacts, name, number, filter } = this.state;

//   }
// };

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

 
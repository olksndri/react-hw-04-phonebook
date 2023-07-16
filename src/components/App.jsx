import css from '../styles/app.module.css';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { nanoid } from 'nanoid';
import { save, load } from 'js/storage';
import React, { Component } from 'react';

export class App extends Component {
  state = {
    filter: '',
  }

  constructor(props) { 
    super(props); 

    this.state.contacts = (typeof load("contacts") === "object" &&
      load("contacts") !== null) ?
      load("contacts") : [];
  }

  onSubmit = (evt) => {
    evt.preventDefault(); 
    if (this.state.contacts.filter(el => el.name === this.state.name).length > 0) { 
        window.alert(`${this.state.name} is already in contacts`)
    } else { 
       this.setState((state) => {
        save("contacts", [...state.contacts, { name: state.name, number: state.number, id: nanoid(), }]);
        
        return {
          contacts: [...state.contacts, { name: state.name, number: state.number, id: nanoid(), }],
          name: '', 
          number: '',
          filter: ''
        }
        })
    }
  }

  onInput = (evt) => { 
    if (evt.target.getAttribute("name") === "name") {
      this.setState({ name: evt.target.value }); 
    } else if ((evt.target.getAttribute("name") === "number")) {
      this.setState({ number: evt.target.value }); 
    } else {
      this.setState({ filter: evt.target.value }); 
    }
  }
  
  onDelete = (evt) => {
    let deleteIndex; 
    this.state.contacts.forEach((el, i) => { 
      if (evt.target.previousElementSibling.textContent.includes(el.name)) {
          deleteIndex = i; 
      }
    })
    this.setState((state) => { 
      let counter = state.contacts.filter((el, i) => i !== deleteIndex); 
      save("contacts", counter);
      return { contacts: counter }; 
    })
  }

  render() {
    const { contacts, name, number, filter } = this.state; 

    return ( 
      <>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm
          onSubmit={this.onSubmit}
          onInput={this.onInput}
          textId={nanoid()}
          numberId={nanoid()}
          name={name}
          number={number}
        >
        </ContactForm>
        <div className={css['contacts-wrapper']}>
        <h2 className={css.title}>Contacts</h2>
        <Filter
          onInput={this.onInput}
          filterId={nanoid()}
          filter={filter}
        >
        </Filter>
        <ContactList
          onDelete={this.onDelete}
          contacts={contacts}
          filter={filter}
        >
        </ContactList>
        </div>
      </> 
    )
  }
};

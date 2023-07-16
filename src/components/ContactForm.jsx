import css from '../styles/app.module.css';
import PropTypes from 'prop-types';

export const ContactForm = ({onSubmit, onInput, textId, numberId, name ='', number=''}) => { 
    return ( 
        <form onSubmit={onSubmit} className={css.form}>
        <label htmlFor={textId}>Name</label>
        <input
        type="text"
        name="name"
        onInput={onInput}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        id={textId}
        value={name}
        required
        />
        <label htmlFor={numberId}>Number</label>
        <input
        type="tel"
        name="number"
        onInput={onInput}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        id={numberId}
        value={number}
        required
        />  
        <button type="submit">Add contact</button>
        </form>
    )
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onInput: PropTypes.func.isRequired,
    textId: PropTypes.string,
    numberId: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string
}
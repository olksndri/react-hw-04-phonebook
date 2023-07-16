import css from '../styles/app.module.css';
import PropTypes from 'prop-types';

export const ContactList = ({ contacts, filter, onDelete }) => { 
    return (
        <>
            <ul className={css['contacts-list']}>
                {(filter === '') ?
                contacts.map(el => {
                        return (
                            <li key={el.id} className={css['contacts-list-item']}>
                            <span>{el.name}: {el.number}</span>
                            <button type="button" onClick={onDelete} key={el.id}>Delete</button>
                            </li>) 
                }) : 
                contacts.map(el => {
                    if (el.name.toLowerCase().includes(filter.toLowerCase())) {
                        return (
                            <li key={el.id} className={css['contacts-list-item']}>
                            <span>{el.name}: {el.number}</span>
                            <button type="button" onClick={onDelete} key={el.id}>Delete</button>
                            </li>)
                    } return <></>; 
                })}
            </ul>
        </>
    )
}

ContactList.propTypes = { 
    contacts: PropTypes.array.isRequired,
    filter: PropTypes.string,
    onDelete: PropTypes.func.isRequired
}
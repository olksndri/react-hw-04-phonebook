import PropTypes from 'prop-types';

export const Filter = ({ onInput, filterId }) => { 
    const { filter, setFilter } = onInput; 

    return ( 
        <>
            <label htmlFor={filterId}>Search contacts by name</label>
            <input type="text" id={filterId} onInput={(evt) => setFilter(evt.target.value)} value={filter}/>
        </>
    )
}

Filter.propTypes = { 
    onInput: PropTypes.object.isRequired,
    filterId: PropTypes.string, 
}
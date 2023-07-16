import PropTypes from 'prop-types';

export const Filter = ({ onInput, filterId, filter }) => { 
    return ( 
        <>
            <label htmlFor={filterId}>Search contacts by name</label>
            <input type="text" id={filterId} onInput={onInput} value={filter}/>
        </>
    )
}

Filter.propTypes = { 
    onInput: PropTypes.func.isRequired,
    filterId: PropTypes.string, 
    filter: PropTypes.string
}
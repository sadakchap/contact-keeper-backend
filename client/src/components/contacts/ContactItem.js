import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../contexts/contact/contactContext';

const ContactItem = ({ contact }) => {
    const { deleteContact, setCurrent, clearCurrent } = useContext(ContactContext)
    const { name, email, phone, type, _id } = contact;

    const onEdit = () => {
        setCurrent(contact);
    }
    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    }
    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name}{' '} 
                <span style={{ float: 'right'}} className={`badge ` + (type!=='personal'?'badge-success':'badge-primary')}>
                    {type}
                </span>
            </h3>
            <ul>
                {email && (<li>
                    <i className="fas fa-envelope-open"></i> {email}
                </li>)}
                {phone && (<li>
                    <i className="fas fa-phone"></i> {phone}
                </li>)}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={onEdit}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>
        </div>
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
}

export default ContactItem

import React from 'react'
import PropTypes from 'prop-types'

const ContactItem = ({ contact }) => {

    const { name, email, phone, type, id } = contact;
    
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
                <button className="btn btn-dark btn-sm">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
            </p>
        </div>
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
}

export default ContactItem
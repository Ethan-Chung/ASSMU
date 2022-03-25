import React, { Component } from 'react';

// this handles the interface of our input component
const Input = ({ name, label, error, ...rest }) => {
	// ...rest gets the other properties from the props object
	return (
		<div className='form-group'>
			<label htmlFor={name}>{label}</label>
			<input {...rest} id={name} name={name} className='form-control' />
			{/* if error is truthy then the expression will be returned */}
			{error && <div className='alert alert-danger'>{error}</div>}
		</div>
	);
};

export default Input;

import React from 'react';

const ErrorsSelector = ({ errors, setErrors }) => {
    return (
        <div className="d-flex align-items-center">
            <label>Errors per record:</label>
            <input
                className="form-range"
                type="range"
                min="0"
                max="10"
                step="0.25"
                value={errors}
                onChange={(e) => setErrors(e.target.value)}
            />
            <span className="ms-2">{errors}</span>
        </div>
    )
};

export default ErrorsSelector;

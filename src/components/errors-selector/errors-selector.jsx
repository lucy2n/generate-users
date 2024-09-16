import React from 'react';

const ErrorsSelector = ({ errors, setErrors }) => {

    const handleRangeChange = (e) => {
        const value = parseFloat(e.target.value);
        setErrors(value);
    };

    const handleInputChange = (e) => {
        let value = parseFloat(e.target.value);
        if (isNaN(value) || value < 0) {
            value = 0;
        } else if (value > 1000) {
            value = 1000;
        }
        setErrors(value);
    };

    return (
        <div className="d-flex align-items-center">
            <label>Errors:</label>
            <input
                className="form-range ms-2"
                type="range"
                min="0"
                max="10"
                step="0.25"
                value={errors}
                onChange={handleRangeChange}
            />
            <input
                type="number"
                className="form-control ms-2"
                value={errors}
                min="0"
                max="1000"
                step="0.01"
                onChange={handleInputChange}
            />
        </div>
    );
};

export default ErrorsSelector;

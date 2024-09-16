import React, { useState } from 'react';

const ErrorsSelector = ({ errors, setErrors }) => {
    const [inputValue, setInputValue] = useState(errors.toString());

    const handleRangeChange = (e) => {
        const value = parseFloat(e.target.value);
        setErrors(value);
        setInputValue(value.toString());
    };

    const handleInputChange = (e) => {
        let value = e.target.value;

        if (value === '') {
            setInputValue('');
            return;
        }

        if (!isNaN(value)) {
            let numericValue = parseFloat(value);

            if (numericValue < 0) {
                numericValue = 0;
            } else if (numericValue > 1000) {
                numericValue = 1000;
            }

            setErrors(numericValue);
            setInputValue(value);
        }
    };

    const handleBlur = () => {
        if (inputValue === '' || isNaN(parseFloat(inputValue))) {
            setErrors(0);
            setInputValue('0');
        } else {
            setInputValue(parseFloat(errors).toString());
        }
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
                type="text"
                className="form-control ms-2"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
            />
        </div>
    );
};

export default ErrorsSelector;
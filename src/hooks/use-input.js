import { useState } from 'react';

const useInput = (validateValue) => {
	const [enteredValue, setEnteredValue] = useState('');
	const [isTouched, setIsTouched] = useState(false);

	const enteredValueIsValid = validateValue(enteredValue);
	const hasError = !enteredValueIsValid && isTouched;

	const valueChangeHandler = (event) => {
		setEnteredValue(event.target.value);
	};

	const valueBlurHandler = (event) => {
		setIsTouched(true);
	};

	const reset = () => {
		setEnteredValue('');
		setIsTouched(false);
	};

	return {
		value: enteredValue,
		isValid: enteredValueIsValid,
		hasError,
		valueChangeHandler,
		valueBlurHandler,
		reset,
	};
};

export default useInput;

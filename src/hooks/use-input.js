import { useReducer, useState } from 'react';

//useReducer
const initialInputState = {
	value: '',
	isTouched: false,
};
const inputStateReducer = (state, action) => {
	if (action.type === 'INPUT') {
		return { value: action.value };
	}
	if (action.type === 'BLUR') {
		return { value: state.value, isTouched: true };
	}
	if (action.type === 'RESET') return initialInputState;
	return { value: '', isTouched: false };
};

const useInput = (validateValue) => {
	const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

	const enteredValueIsValid = validateValue(inputState.value);
	const hasError = !enteredValueIsValid && inputState.isTouched;

	const valueChangeHandler = (event) => {
		dispatch({ type: 'INPUT', value: event.target.value });
	};

	const valueBlurHandler = (event) => {
		dispatch({ type: 'BLUR' });
	};

	const reset = () => {
		dispatch({ type: 'RESET' });
	};

	return {
		value: inputState.value,
		isValid: enteredValueIsValid,
		hasError,
		valueChangeHandler,
		valueBlurHandler,
		reset,
	};
};

//useState
// const useInput = (validateValue) => {
// 	const [enteredValue, setEnteredValue] = useState('');
// 	const [isTouched, setIsTouched] = useState(false);

// 	const enteredValueIsValid = validateValue(enteredValue);
// 	const hasError = !enteredValueIsValid && isTouched;

// 	const valueChangeHandler = (event) => {
// 		setEnteredValue(event.target.value);
// 	};

// 	const valueBlurHandler = (event) => {
// 		setIsTouched(true);
// 	};

// 	const reset = () => {
// 		setEnteredValue('');
// 		setIsTouched(false);
// 	};

// 	return {
// 		value: enteredValue,
// 		isValid: enteredValueIsValid,
// 		hasError,
// 		valueChangeHandler,
// 		valueBlurHandler,
// 		reset,
// 	};
// };

export default useInput;

// import { useState } from 'react';
import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
	//입력된 값을 받아오는 방법 2가지 : useRef or useState
	//입력된 값으로 하고자 하는 일에 따라 어떤 것을 사용할 지 결정됨
	//A) 값이 폼이 제출되었을 때 한번만 필요하다면? ===> ref!
	//B) 즉각적인 유효성 검증을 위해 키 입력마다 입력 값이 필요하다면? ===> state!
	//C) 입력된 값을 초기화 하고 싶다면? ===> state!
	//   (ref로도 초기화 가능하지만, DOM을 직접 조작하므로 바람직한 방법은 아님)
	// const nameInputRef = useRef();
	// const enteredValue = nameInputRef.current.value;
	// nameInputRef.current.value = ''; //작동은 하지만 바람직한 방법은 아님... DOM을 직접 조작하므로... DON'T MANIPULATE THE DOM!!!
	// <input> tag에 ref 연결 : ref={nameInputRef}

	// const [enteredName, setEnteredName] = useState('');
	// const [enteredNameTouched, setEnteredNameTouched] = useState(false);

	// const [enteredEmail, setEnteredEmail] = useState('');
	// const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

	//enteredName 상태가 변경될때마다 컴포넌트 리랜더링 -> 항상 최신의 enteredName, enteredNameTouched 상태를 반영하게 됨
	//===> enteredNameIsValid는 useState로 관리하지 않아도 됨
	// const enteredNameIsValid = enteredName.trim() !== '';
	// const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

	// const enteredEmailIsValid = enteredEmail.trim() !== '' && emailRegex.test(enteredEmail);
	// const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

	// 중복코드를 줄이기 위해 useState 대신 custom hook 사용
	const {
		value: enteredName,
		isValid: enteredNameIsValid,
		hasError: nameInputHasError,
		valueChangeHandler: nameInputChangeHandler,
		valueBlurHandler: nameInputBlurHandler,
		reset: resetNameInput,
	} = useInput((value) => value.trim() != '');

	const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	const {
		value: enteredEmail,
		isValid: enteredEmailIsValid,
		hasError: emailInputHasError,
		valueChangeHandler: emailInputChangeHandler,
		valueBlurHandler: emailInputBlurHandler,
		reset: resetEmailInput,
	} = useInput((value) => value.trim() !== '' && emailRegex.test(value));

	//===> 같은 이유로 항상 최신의 enteredNameIsValid 값을 갖게되므로 formIsValid useState로 관리하지 않아도 됨
	let formIsValid = false;

	if (enteredNameIsValid && enteredEmailIsValid) {
		formIsValid = true;
	}

	// const nameInputChangeHandler = (event) => {
	// 	setEnteredName(event.target.value);
	// };
	// ㅡ;
	// const nameInputBlurHandler = (event) => {
	// 	setEnteredNameTouched(true);
	// };

	// const emailInputChangeHandler = (event) => {
	// 	setEnteredEmail(event.target.value);
	// };

	// const emailInputBlurHandler = (event) => {
	// 	setEnteredEmailTouched(true);
	// };

	const formSubmissionHandler = (event) => {
		event.preventDefault();

		// setEnteredNameTouched(true);
		// setEnteredEmailTouched(true);

		if (!enteredNameIsValid || !enteredEmailIsValid) {
			return;
		}

		resetNameInput();
		resetEmailInput();

		// setEnteredName('');
		// setEnteredNameTouched(false);
		// setEnteredEmail('');
		// setEnteredEmailTouched(false);
	};

	// const nameInputClasses = !nameInputIsInvalid ? 'form-control' : 'form-control invalid';
	const nameInputClasses = !nameInputHasError ? 'form-control' : 'form-control invalid';
	const emailInputClasses = !emailInputHasError ? 'form-control' : 'form-control invalid';

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className={nameInputClasses}>
				<label htmlFor='name'>Your Name</label>
				<input type='text' id='name' onChange={nameInputChangeHandler} onBlur={nameInputBlurHandler} value={enteredName} />
				{nameInputHasError && <p className='error-text'>Name must not be empty.</p>}
			</div>
			<div className={emailInputClasses}>
				<label htmlFor='email'>Your E-Mail</label>
				<input type='email' id='email' onChange={emailInputChangeHandler} onBlur={emailInputBlurHandler} value={enteredEmail} />
				{emailInputHasError && <p className='error-text'>You have entered an invalid email address.</p>}
			</div>
			<div className='form-actions'>
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;

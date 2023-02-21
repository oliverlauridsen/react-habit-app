import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../utils/firebase";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

interface SignInFormProps {
	className: string;
}

export const SignInForm: React.FC<SignInFormProps> = ({ className }) => {
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const navigate = useNavigate();
	const today = new Date().getDate();

	//TODO: REFACTOR AWAY FROM :any
	const signInUserWithEmailAndPassword = (
		auth: any,
		email: any,
		password: any,
		e: any
	) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				navigate(`/habits/${today}`);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage);
			});
	};
	return (
		<form className={className}>
			<input
				onChange={(event) => setUserEmail(event.target.value)}
				type='text'
				placeholder='Email'
			/>
			<input
				onChange={(event) => setUserPassword(event.target.value)}
				type='password'
				placeholder='Password'
			/>
			<button
				placeholder='Password'
				onClick={(event) =>
					signInUserWithEmailAndPassword(auth, userEmail, userPassword, event)
				}>
				Sign in with email
			</button>
		</form>
	);
};

export const StyledSignInForm = styled(SignInForm)`
	width: 100%;
	padding-bottom: 75px;

	input {
		border: none;
		border-radius: 5px;
		margin-bottom: 20px;
		padding: 1em;
		font-size: 1em;
		font-weight: 600;
		width: 100%;
	}

	button {
		background: #3b2a37;
		border: none;
		border-radius: 5px;
		color: white;
		margin: 0 0 20px;
		padding: 1em;
		width: 100%;
		font-size: 1em;
		font-weight: 600;
	}
`;

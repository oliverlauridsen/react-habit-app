import styled from 'styled-components';

const StyledForm = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 20px;
	font-size: 16px;
	text-align: left;

	input {
		padding: 10px;
		border: none;
		border-radius: 5px;
		margin-bottom: 20px;
		padding: 1em;
		font-size: 1em;
		/* width: 100%; */
		font-weight: 600;
	}

	input[type~='submit'] {
		background-color: #3b2a37;
		border: none;
		border-radius: 5px;
		color: white;
		padding: 1em;
		font-size: 1em;
		width: 100%;
		font-weight: 600;
	}
`;

export default StyledForm;

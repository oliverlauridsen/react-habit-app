import styled from 'styled-components';

const StyledForm = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 20px;
	font-size: 16px;

	input {
		padding: 10px;
		border: none;
		border-radius: 30px;
		margin-bottom: 10px;
		font-size: 16px;
	}

	input[type~='submit'] {
		background-color: #ffcb5b;
	}
`;

export default StyledForm;

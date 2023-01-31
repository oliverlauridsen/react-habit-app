// Only add global components within these folders
import styled, { css } from 'styled-components';

interface StyledButtonProps {
	primary?: Boolean;
}

const Button = styled.button<StyledButtonProps>`
	background: #ec603c;
	border: none;
	border-radius: 5px;
	color: white;
	margin-top: 20px;
	padding: 1em;
	width: 100%;
	font-size: 1em;
	font-weight: 600;

	${(props) =>
		props.primary &&
		css`
			background: #3b2a37;
			color: white;
			width: 100%;
		`};
`;

export default Button;

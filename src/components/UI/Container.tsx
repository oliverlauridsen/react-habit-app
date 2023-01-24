import styled, { css } from 'styled-components';

interface StyledContainerProps {
	contentWrapper?: Boolean;
	children: JSX.Element | JSX.Element[];
}

const Container = styled.div<StyledContainerProps>`
	text-align: center;
	background: #fdf4e7;
	min-height: 100vh;
	margin: 0;

	${(props) =>
		props.contentWrapper &&
		css`
			width: 80%;
			margin: 0 auto;
		`};
`;

export default Container;

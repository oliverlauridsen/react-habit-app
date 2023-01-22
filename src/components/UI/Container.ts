import styled, { css } from 'styled-components';

interface StyledContainerProps {
	contentWrapper?: Boolean;
}

const Container = styled.div<StyledContainerProps>`
	text-align: center;
	background: #fdf4e7;
	height: 100vh;
	margin: 0;

	${(props) =>
		props.contentWrapper &&
		css`
			width: 80%;
			margin: 0 auto;
		`};
`;

export default Container;

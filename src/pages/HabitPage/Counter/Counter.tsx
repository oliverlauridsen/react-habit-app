import Countdown from 'react-countdown';
import styled from 'styled-components';

export const StyledCounter = styled(Countdown)`
	background-color: #ffcb5b;
	border-radius: 5px;
	text-align: center;
	display: flex;
	align-items: center;
	height: 100%;
	justify-content: center;
	font-weight: 900;

	span {
		width: 100%;
	}
`;

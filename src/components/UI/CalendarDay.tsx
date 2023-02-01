import React from 'react';
import styled, { css } from 'styled-components';

interface CalendarDayProps {
	className?: string;
	key: number;
	children?: JSX.Element[] | JSX.Element;
	primary?: Boolean;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
	className,
	children,
	primary,
}) => {
	return <div className={className}>{children}</div>;
};

export const StyledCalendarDay = styled(CalendarDay)`
	background-color: #ec603c;
	border-radius: 5px;
	color: white;
	padding: 15px 0;
	display: flex;
	flex-direction: column;

	p {
		margin: 0;
	}

	${(props) =>
		props.primary &&
		css`
			background-color: white;
			color: #3b2a37;
			width: 100%;
		`};
`;

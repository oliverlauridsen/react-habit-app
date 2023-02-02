import React, { useState } from 'react';
import styled, { css } from 'styled-components';

interface CalendarDayProps {
	className?: string;
	key: number;
	children?: JSX.Element[] | JSX.Element;
	primary?: Boolean;
	onClick?: React.MouseEventHandler<HTMLElement> | undefined;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
	className,
	children,
	onClick,
}) => {
	const [isActive, setIsActive] = useState(false);

	return (
		<div onClick={onClick} className={className}>
			{children}
		</div>
	);
};

export const StyledCalendarDay = styled(CalendarDay)`
	background-color: #ec603c;
	border-radius: 5px;
	color: white;
	width: 50px;
	height: 50px;
	padding: 10px;
	margin-bottom: 15px;

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

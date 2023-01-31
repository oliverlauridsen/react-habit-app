import React from 'react';
import styled from 'styled-components';
interface CalendarDayProps {
	className?: string;
	key: string;
	children?: string[] | string;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
	className,
	children,
}) => {
	return <div className={className}>{children}</div>;
};

export const StyledCalendarDay = styled(CalendarDay)`
	background-color: #ec603c;
	border-radius: 5px;
	color: white;
	padding: 15px 0;

	p {
		margin: 0;
	}
`;

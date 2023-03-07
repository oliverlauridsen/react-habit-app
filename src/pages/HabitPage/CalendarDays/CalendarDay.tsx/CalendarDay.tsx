import React from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";

interface Props {
	className?: string;
	key: number;
	onClick?: React.MouseEventHandler<HTMLElement>;
	dayNumber: number;
	children?: JSX.Element[];
	primary?: Boolean;
	setCurrentPrimary: Function;
	currentPrimary: number;
	progressPercentage: number;
	isCompleted?: Boolean;
}

export const CalendarDay: React.FC<Props> = ({
	className,
	dayNumber,
	currentPrimary,
	setCurrentPrimary,
	progressPercentage,
}) => {
	const navigate = useNavigate();

	const getDays = (year: number, month: number) => {
		return new Date(year, month, 0).getDate();
	};
	const currentYear = new Date().getFullYear();
	const currentMonthNumber = new Date().getMonth() + 1;
	const daysOfCurrentMonth = getDays(currentYear, currentMonthNumber);
	const daysToShow = [];

	for (let i = 1; i <= daysOfCurrentMonth; i++) {
		daysToShow.push(i);
	}

	function getDayName(dateStr: string, locale: string) {
		let date = new Date(dateStr);
		return date.toLocaleDateString(locale, { weekday: "short" });
	}

	const setNewPrimaryAndRoute = () => {
		setCurrentPrimary(dayNumber);
		navigate(`${dayNumber}`);
	};

	return (
		<StyledCalendarDay
			progressPercentage={progressPercentage}
			key={dayNumber}
			onClick={() => setNewPrimaryAndRoute()}
			className={className}
			dayNumber={dayNumber}
			primary={dayNumber === currentPrimary}
			currentPrimary={currentPrimary}
			setCurrentPrimary={() => console.log("test")}
			isCompleted={progressPercentage === 100}>
			<p>
				{`${getDayName(
					`0${currentMonthNumber}/0${dayNumber}/${currentYear}`,
					"en-dk"
				)}`}
			</p>
			<p>{dayNumber}</p>
		</StyledCalendarDay>
	);
};

export const StyledCalendarDay = styled.div<Props>`
	background-color: white;
	border-radius: 5px;
	color: #3b2a37;
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
			background-color: #ec603c;
			color: white;
			width: 50px;
			height: 50px;
			padding: 10px;
		`};

	${(props) =>
		props.isCompleted &&
		css`
			background-color: #ec603c;
			color: red;
			width: 50px;
			height: 50px;
			padding: 10px;
		`};
`;

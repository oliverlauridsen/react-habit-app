import styled from 'styled-components';
import { CalendarDay } from './CalendarDay.tsx/CalendarDay';

interface Props {
	setCurrentPrimary: Function;
	currentPrimary: number;
}

const StyledCalendarDays = styled.div<Props>`
	width: 95vw;
	margin: 20px 0 0 20px;
	display: flex;
	flex-direction: row;
	overflow-x: scroll;
	padding-left: 0;
	gap: 10px;

	div:last-child {
		margin-right: 20px;
	}
`;

const CalendarDays: React.FC<Props> = ({
	currentPrimary,
	setCurrentPrimary,
}) => {
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

	// Get the amount of days for the given month and loop out the CalendarDay component
	const daysOfTheWeek = daysToShow.map((dayNumber) => {
		return (
			<CalendarDay
				setCurrentPrimary={setCurrentPrimary}
				currentPrimary={currentPrimary}
				key={dayNumber}
				dayNumber={dayNumber}
			/>
		);
	});

	return (
		<div>
			<StyledCalendarDays
				setCurrentPrimary={setCurrentPrimary}
				currentPrimary={currentPrimary}
			>
				{daysOfTheWeek}
			</StyledCalendarDays>
		</div>
	);
};

export default CalendarDays;

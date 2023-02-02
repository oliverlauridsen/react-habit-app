import styled from 'styled-components';
import { StyledCalendarDay } from './CalendarDay.tsx/CalendarDay';

interface Props {}

const StyledCalendarDays = styled.div<Props>`
	width: 100vw;
	margin: 20px 20px 0 20px;
	display: flex;
	flex-direction: row;
	overflow-x: scroll;
	padding-left: 0;
	gap: 10px;
`;

const CalendarDays = () => {
	const getDays = (year: number, month: number) => {
		return new Date(year, month, 0).getDate();
	};

	let currentMonthNumber = new Date().getMonth() + 1;
	let daysOfCurrentMonth = getDays(2023, currentMonthNumber);
	const daysToShow = [];

	for (let i = 1; i <= daysOfCurrentMonth; i++) {
		daysToShow.push(i);
	}

	function getDayName(dateStr: string, locale: string) {
		let date = new Date(dateStr);
		return date.toLocaleDateString(locale, { weekday: 'short' });
	}

	const daysOfTheWeek = daysToShow.map((dayNumber) => {
		return dayNumber === new Date().getDate() ? (
			<StyledCalendarDay
				onClick={() => alert('test')}
				className='styledCalendarDay'
				key={dayNumber}
			>
				<>
					<p>{`${getDayName(
						`0${currentMonthNumber}/0${dayNumber}/2023`,
						'en-dk'
					)}`}</p>
					<p>{dayNumber}</p>
				</>
			</StyledCalendarDay>
		) : (
			<StyledCalendarDay
				onClick={() => alert('test')}
				primary
				className='styledCalendarDay'
				key={dayNumber}
			>
				<>
					<p>{`${getDayName(
						`0${currentMonthNumber}/0${dayNumber}/2023`,
						'en-dk'
					)}`}</p>
					<p>{dayNumber}</p>
				</>
			</StyledCalendarDay>
		);
	});
	return <StyledCalendarDays>{daysOfTheWeek}</StyledCalendarDays>;
};

export default CalendarDays;

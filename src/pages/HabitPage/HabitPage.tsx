import React from 'react';
import { StyledCalendarDay } from '../../components/UI/CalendarDay';
import ColoredContainer from '../../components/UI/ContainerColored';
import { StyledHeaderBanner } from '../../components/UI/HeaderBanner';
import { StyledMainContentWrapper } from '../../components/UI/MainContentWrapper';
import { StyledProgressBar } from '../../components/UI/ProgressBar';
import { Styledhabits } from './Habits/Habits';
import { StyledHabitBox } from './Habits/Habit/Habit';

interface HabitDashboardProps {}

export const HabitDashboard: React.FC<HabitDashboardProps> = () => {
	const getDays = (year: number, month: number) => {
		return new Date(year, month, 0).getDate();
	};

	// TODO: REFACTOR INTO FOR LOOP
	// Check the current day and make it the first.
	// Also allow for backtracking.

	// Ideally:
	// We want to display every day name & date going back 2 weeks and forward 2 weeks.
	// We want the days to be clickable, thereby, toggling the content of the website to reflect the state of that day (and also have the data editable for any day chosen)
	// We also want to default the scrollable div to be located the current day whenever we load the component (meaning, if the user scrolls back 30 days, it shouldn't
	// Stay there when they revisit the site, but instead have the bar scrolled to the current day.

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
			<StyledCalendarDay className='styledCalendarDay' key={dayNumber}>
				<div>
					<p>{`${getDayName(
						`0${currentMonthNumber}/0${dayNumber}/2023`,
						'en-dk'
					)}`}</p>
					<p>{dayNumber}</p>
				</div>
			</StyledCalendarDay>
		) : (
			<StyledCalendarDay primary className='styledCalendarDay' key={dayNumber}>
				<div>
					<p>{`${getDayName(
						`0${currentMonthNumber}/0${dayNumber}/2023`,
						'en-dk'
					)}`}</p>
					<p>{dayNumber}</p>
				</div>
			</StyledCalendarDay>
		);
	});

	return (
		<ColoredContainer>
			<StyledHeaderBanner className='headerBanner' />
			<StyledMainContentWrapper className='d-flex flex-row justify-content-around'>
				{daysOfTheWeek}
			</StyledMainContentWrapper>
			<StyledProgressBar />
			<Styledhabits />
		</ColoredContainer>
	);
};

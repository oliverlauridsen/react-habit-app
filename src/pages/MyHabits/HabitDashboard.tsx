import React from 'react';
import { StyledCalendarDay } from '../../components/UI/CalendarDay';
import ColoredContainer from '../../components/UI/ContainerColored';
import { StyledHeaderBanner } from '../../components/UI/HeaderBanner';
import { StyledMainContentWrapper } from '../../components/UI/MainContentWrapper';

interface HabitDashboardProps {}

export const HabitDashboard: React.FC<HabitDashboardProps> = () => {
	const getDays = (year: number, month: number) => {
		return new Date(year, month, 0).getDate();
	};

	//TODO: REFACTOR INTO FOR LOOP
	// Check the current day and make it the first.
	// Also allow for backtracking.

	// Ideally:
	// We want to display every day name & date going back 2 weeks and forward 2 weeks.
	// We want the days to be clickable, thereby, toggling the content of the website to reflect the state of that day (and also have the data editable for any day chosen)
	// We also want to default the scrollable div to be located the current day whenever we load the component (meaning, if the user scrolls back 30 days, it shouldn't
	// Stay there when they revisit the site, but instead have the bar scrolled to the current day.
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	let d = new Date();
	let dayName = days[d.getDay()];
	console.log(dayName);

	const daysOfTheWeek = days.map((day) => (
		<StyledCalendarDay className='styledCalendarDay' key={day}>
			{day}
			{/* {` ${getDays(2023, 1)}`} */}
		</StyledCalendarDay>
	));

	return (
		<ColoredContainer>
			<StyledHeaderBanner className='headerBanner' />
			<StyledMainContentWrapper className='d-flex flex-row justify-content-around'>
				{daysOfTheWeek}
			</StyledMainContentWrapper>
		</ColoredContainer>
	);
};

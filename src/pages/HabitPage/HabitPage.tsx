import React from 'react';
import ColoredContainer from '../../components/UI/ContainerColored';
import { StyledHeaderBanner } from '../../components/UI/HeaderBanner';
import { StyledProgressBar } from '../../components/UI/ProgressBar';
import { Styledhabits } from './Habits/Habits';
import CalendarDays from './CalendarDays/CalendarDays';

interface HabitDashboardProps {}

export const HabitDashboard: React.FC<HabitDashboardProps> = () => {
	return (
		<ColoredContainer>
			<StyledHeaderBanner className='headerBanner' />
			<CalendarDays></CalendarDays>
			<StyledProgressBar />
			<Styledhabits />
		</ColoredContainer>
	);
};

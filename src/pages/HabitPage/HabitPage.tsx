import React, { useState } from 'react';
import ColoredContainer from '../../components/UI/ContainerColored';
import { StyledHeaderBanner } from '../../components/UI/HeaderBanner';
import { StyledProgressBar } from '../../components/UI/ProgressBar';
import CalendarDays from './CalendarDays/CalendarDays';
import { Outlet } from 'react-router-dom';

interface HabitDashboardProps {}

export const HabitDashboard: React.FC<HabitDashboardProps> = () => {
	const [currentPrimary, setCurrentPrimary] = useState(new Date().getDate());
	const [progressPercentage, setprogressPercentage] = useState(25);

	console.log(currentPrimary);

	return (
		<ColoredContainer>
			<StyledHeaderBanner className='headerBanner' />
			<CalendarDays
				setCurrentPrimary={setCurrentPrimary}
				currentPrimary={currentPrimary}
			/>
			<StyledProgressBar
				progressPercentage={progressPercentage}
				setprogressPercentage={setprogressPercentage}
			/>
			<Outlet />
		</ColoredContainer>
	);
};

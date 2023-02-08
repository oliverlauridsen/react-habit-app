import React, { useState } from 'react';
import ColoredContainer from '../../components/UI/ContainerColored';
import { StyledHeaderBanner } from '../../components/UI/HeaderBanner';
import { StyledProgressBar } from '../../components/UI/ProgressBar';
import CalendarDays from './CalendarDays/CalendarDays';
import { Outlet, useOutletContext } from 'react-router-dom';

export interface iContext {
	progressPercentage: number;
	setprogressPercentage: Function;
}

export const HabitDashboard: React.FC = () => {
	const [currentPrimary, setCurrentPrimary] = useState(new Date().getDate());
	const [progressPercentage, setprogressPercentage] = useState(0);

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
			<Outlet context={{ progressPercentage, setprogressPercentage }} />
		</ColoredContainer>
	);
};

export function useProgress() {
	return useOutletContext<iContext>();
}

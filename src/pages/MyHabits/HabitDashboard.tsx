import React from 'react';
import ColoredContainer from '../../components/UI/ContainerColored';
import { StyledHeaderBanner } from '../../components/UI/HeaderBanner';

interface HabitDashboardProps {}

export const HabitDashboard: React.FC<HabitDashboardProps> = ({}) => {
	return (
		<ColoredContainer>
			<StyledHeaderBanner className='headerBanner' />
			<div className='styled-weekly-progress-wrapper'></div>
		</ColoredContainer>
	);
};

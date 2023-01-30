import React from 'react';
import ColoredContainer from '../../components/UI/ContainerColored';
import { StyledHeaderBanner } from '../../components/UI/HeaderBanner';
import { StyledWeeklyProgress } from './WeeklyProgress';

interface HomeDashboardProps {}

export const HomeDashboard: React.FC<HomeDashboardProps> = () => {
	return (
		<ColoredContainer>
			<StyledHeaderBanner className='headerBanner' />
			<div className='styled-weekly-progress-wrapper'>
				<StyledWeeklyProgress
					categoryName='Health'
					habitName='Meditate'
					className='styledWeeklyProgress'
				/>
				<StyledWeeklyProgress
					categoryName='Creativity'
					habitName='Play piano'
					className='styledWeeklyProgress'
				/>
				<StyledWeeklyProgress
					categoryName='Health'
					habitName='Workout'
					className='styledWeeklyProgress'
				/>
			</div>
		</ColoredContainer>
	);
};

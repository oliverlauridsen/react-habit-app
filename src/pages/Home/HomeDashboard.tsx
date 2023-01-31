import React from 'react';
import ColoredContainer from '../../components/UI/ContainerColored';
import { StyledHeaderBanner } from '../../components/UI/HeaderBanner';
import { StyledWeeklyProgress } from './WeeklyProgress';
import { useNavigate } from 'react-router-dom';

interface HomeDashboardProps {}

export const HomeDashboard: React.FC<HomeDashboardProps> = () => {
	const navigate = useNavigate();

	return (
		<ColoredContainer>
			<StyledHeaderBanner className='headerBanner' />
			<div className='styled-weekly-progress-wrapper'>
				<StyledWeeklyProgress
					categoryName='Health'
					habitName='Meditate'
					className='styledWeeklyProgress'
					onClick={() => navigate('/habit/1')}
				/>
				<StyledWeeklyProgress
					categoryName='Creativity'
					habitName='Play piano'
					className='styledWeeklyProgress'
					onClick={() => navigate('/habit/2')}
				/>
				<StyledWeeklyProgress
					categoryName='Health'
					habitName='Workout'
					className='styledWeeklyProgress'
					onClick={() => navigate('/habit/3')}
				/>
			</div>
		</ColoredContainer>
	);
};

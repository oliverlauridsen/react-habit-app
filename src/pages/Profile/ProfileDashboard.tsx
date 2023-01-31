import React from 'react';
import ColoredContainer from '../../components/UI/ContainerColored';
import { StyledHeaderBanner } from '../../components/UI/HeaderBanner';

interface ProfileDashboardProps {}

export const ProfileDashboard: React.FC<ProfileDashboardProps> = ({}) => {
	return (
		<ColoredContainer>
			<StyledHeaderBanner className='headerBanner' />
			<div className='styled-weekly-progress-wrapper'></div>
		</ColoredContainer>
	);
};

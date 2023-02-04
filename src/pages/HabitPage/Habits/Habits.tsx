import React from 'react';
import { StyledHabitBox } from './Habit/Habit';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

interface HabitsProps {
	className?: string;
}

export const Habits: React.FC<HabitsProps> = ({ className }) => {
	const { dayNumber } = useParams();

	console.log(dayNumber);

	return (
		<div className={className}>
			<StyledHabitBox
				className='HabitBox'
				isDone
				duration={1}
				emojie='🏋️‍♂️'
				habitTitle='Workout'
				timeStart='7:00'
			/>
			<StyledHabitBox
				className='HabitBox'
				isDone={false}
				duration={2}
				emojie='🎹'
				habitTitle='Piano'
				timeStart='16:15'
			/>
			<StyledHabitBox
				className='HabitBox'
				isDone={false}
				duration={0.5}
				emojie='🧘'
				habitTitle='Meditate'
				timeStart='15:00'
			/>
			<StyledHabitBox
				className='HabitBox'
				isDone={false}
				duration={1}
				emojie='📖'
				habitTitle='Read'
				timeStart='20:00'
			/>
		</div>
	);
};

export const Styledhabits = styled(Habits)`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20px;
	margin: 20px;
`;

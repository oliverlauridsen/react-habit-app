import React from 'react';
import { useParams } from 'react-router-dom';

interface SingleHabitProps {}

export const SingleHabit: React.FC<SingleHabitProps> = ({}) => {
	const { id } = useParams();

	return (
		<div>
			<h1> This is the habit {id} </h1>
		</div>
	);
};

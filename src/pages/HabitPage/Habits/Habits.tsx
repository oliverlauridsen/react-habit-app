import React, { useEffect, useState } from 'react';
import { StyledHabitBox } from './Habit/Habit';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../utils/firebase';
import uuid from 'react-uuid';

interface HabitsProps {
	className?: string;
}

export const Habits: React.FC<HabitsProps> = ({ className }) => {
	const auth = getAuth();

	onAuthStateChanged(auth, (user) => {
		if (user) {
			const uid = user.uid;

			if (uid !== currentUser) {
				setCurrentUser(uid);
			}
		}
	});

	const { dayNumber } = useParams();
	const [currentUser, setCurrentUser] = useState('test');
	const [habits, setHabits] = useState([{}]);

	useEffect(() => {
		// declare the data fetching function
		const fetchData = async () => {
			const querySnapshot = await getDocs(
				collection(
					db,
					'Users',
					currentUser,
					'Dates',
					'0' + dayNumber + '-02-2023',
					'Habits'
				)
			);
			let stateArray: Object[] = [];
			querySnapshot.forEach((doc) => {
				stateArray.push(doc.data());
			});
			setHabits(stateArray);
		};

		fetchData().catch(console.error);
	}, [currentUser, dayNumber]);

	const completeHabit = () => {
		console.log(habits);
		setHabits([
			...habits,
			{
				Title: 'Test',
				isDone: false,
				timeStart: '14:00',
				Emoji: '🎹',
				Category: 'Test',
			},
		]);
	};

	//TODO: REFACTOR AWAY FROM :any
	const renderedHabits = habits.map((habit: any) => {
		return (
			<StyledHabitBox
				onClick={() => completeHabit()}
				className='HabitBox'
				isDone={habit.isDone}
				duration={habit.Duration}
				emojie={habit.Emoji}
				habitTitle={habit.Title}
				timeStart={habit.timeStart}
				key={uuid()}
			/>
		);
	});

	return <div className={className}>{renderedHabits}</div>;
};

export const Styledhabits = styled(Habits)`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20px;
	margin: 20px;
`;

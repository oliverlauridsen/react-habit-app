import React, { useEffect, useState } from 'react';
import { StyledHabitBox } from './Habit/Habit';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../utils/firebase';

interface HabitsProps {
	className?: string;
}

export const Habits: React.FC<HabitsProps> = ({ className }) => {
	const auth = getAuth();
	let uid: string;

	onAuthStateChanged(auth, (user) => {
		if (user) {
			uid = user.uid;

			if (uid !== currentUser) {
				setCurrentUser(uid);
			}
		}
	});

	const { dayNumber } = useParams();
	const [currentUser, setCurrentUser] = useState('test');
	const [habits, setHabits] = useState([{}]);

	useEffect(
		() => {
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
					console.log(doc.data());
					stateArray.push(doc.data());
				});
				setHabits(stateArray);
			};

			// call the function
			fetchData()
				// make sure to catch any error
				.catch(console.error);
		},
		[currentUser, dayNumber] // eslint-disable-line react-hooks/exhaustive-deps
	);

	console.log(habits);

	habits.map((habit) => {
		// TODO:  HOW DO WE ACCESS THE habit.isDone property, etc.?
		return console.log(habit);
		// <StyledHabitBox
		// 	className='HabitBox'
		// 	isDone={habit.isDone}
		// 	duration={1}
		// 	emojie='🏋️‍♂️'
		// 	habitTitle='Workout'
		// 	timeStart='7:00'
		// />;
	});

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

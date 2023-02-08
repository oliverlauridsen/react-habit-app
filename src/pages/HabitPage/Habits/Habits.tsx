import React, { useEffect, useState } from 'react';
import { StyledHabitBox } from './Habit/Habit';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../utils/firebase';
import { useProgress } from '../HabitPage';
import uuid from 'react-uuid';

interface HabitsProps {
	className?: string;
}

export const Habits: React.FC<HabitsProps> = ({ className }) => {
	const auth = getAuth();
	const { progressPercentage, setprogressPercentage } = useProgress();

	onAuthStateChanged(auth, (user) => {
		if (user) {
			const uid = user.uid;

			if (uid !== currentUser) {
				setCurrentUser(uid);
			}
		}
	});

	function addMinutes(minutes: number) {
		const currentdate = new Date();

		currentdate.setMinutes(currentdate.getMinutes() + minutes);

		return currentdate;
	}

	const newDate = addMinutes(15);
	const { dayNumber } = useParams();
	const [currentUser, setCurrentUser] = useState('not empty');
	const [habits, setHabits] = useState([{}]);
	const [countDown, setCountDown] = useState(newDate);

	const unDoneHabits = habits.filter((habit: any) => !habit.isDone).length;

	useEffect(() => {
		localStorage.setItem('mytime', newDate.getTime().toString());
	}, [newDate]);

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

	//TODO: REFACTOR - not the prettiest looking useEffect
	useEffect(() => {
		if (habits.length === 0) {
			setprogressPercentage(0);
		} else if (unDoneHabits === 0) {
			setprogressPercentage(100);
		} else if (unDoneHabits === habits.length) {
			setprogressPercentage(0);
		} else {
			setprogressPercentage((unDoneHabits * 100) / habits.length);
		}
	}, [habits, setprogressPercentage, unDoneHabits]);

	//TODO:
	// 1. Make a function before this completeHabit() function that replaces the habit UI with a countdown based on the duration of the habit.
	// 2. Save the timer in localstorage.
	// 3. Update the state to read the localstorage.
	// 4. Make the habit "locked" until the timer has been reached.
	// 5. Once the habit is "unlocked" the UI changes and the user can click the habit and finish it.

	const completeHabit = (Id: string) => {
		setHabits(
			// TODO: REFACTOR AWAY FROM :any
			habits.map((habit: any) => {
				return habit.Id === Id ? { ...habit, isDone: !habit.isDone } : habit;
			})
		);
	};

	//TODO: REFACTOR AWAY FROM :any
	const renderedHabits = habits.map((habit: any) => {
		return (
			<StyledHabitBox
				onClick={() => completeHabit(habit.Id)}
				className='HabitBox'
				id={habit.Id}
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

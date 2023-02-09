import React, { useEffect, useState } from 'react';
import { StyledHabitBox } from './Habit/Habit';
import styled from 'styled-components';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../utils/firebase';
import { useProgress } from '../HabitPage';
import uuid from 'react-uuid';
import Countdown from 'react-countdown';

interface HabitsProps {
	className?: string;
}

export const Habits: React.FC<HabitsProps> = ({ className }) => {
	const auth = getAuth();
	const { setprogressPercentage } = useProgress();

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

	const [currentUser, setCurrentUser] = useState('not empty');
	const [habits, setHabits] = useState([{}]);

	const localStorageTime = new Date(Number(localStorage.getItem('mytime')));

	if (localStorage.getItem('mytime') === null) {
		localStorage.setItem('mytime', new Date().toString());
	}

	const [countDown, setCountDown] = useState(
		new Date(localStorage.getItem('mytime')!)
	);

	console.log(countDown);

	const unDoneHabits = habits.filter((habit: any) => !habit.isDone).length;

	useEffect(() => {
		// declare the data fetching function
		const fetchData = async () => {
			const querySnapshot = await getDocs(
				collection(db, 'Users', currentUser, 'Habits')
			);
			let stateArray: Object[] = [];
			querySnapshot.forEach((doc) => {
				stateArray.push(doc.data());
			});
			setHabits(stateArray);
		};

		fetchData().catch(console.error);
	}, [currentUser]);

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

	const completeHabit = (passedId: string) => {
		setHabits(
			// TODO: REFACTOR AWAY FROM :any
			habits.map((habit: any) => {
				return habit.id === passedId
					? { ...habit, isDone: !habit.isDone }
					: habit;
			})
		);
	};

	const startCountDown = (passedId: string, duration: number) => {
		// TEST ONE
		const timeToUnlock = addMinutes(1);
		// REAL ONE
		// const timeToUnlock = addMinutes(duration * 60);

		if (countDown < new Date()) {
			setCountDown(timeToUnlock);
			localStorage.setItem('mytime', countDown.getTime().toString());

			setHabits(
				habits.map((habit: any) => {
					return habit.id === passedId ? { ...habit, isClicked: true } : habit;
				})
			);
		} else {
			console.log('else');
		}
	};

	//TODO: REFACTOR AWAY FROM :any
	const renderedHabits = habits.map((habit: any) => {
		return habit.isDone ? (
			<>
				<StyledHabitBox
					onClick={() => completeHabit(habit.id)}
					className='HabitBox'
					id={habit.id}
					isDone={habit.isDone}
					duration={habit.duration}
					emojie={habit.emojie}
					habitTitle={habit.title}
					timeStart={habit.timeStart}
					key={uuid()}
				/>
			</>
		) : (
			<>
				{habit.isClicked ? (
					<Countdown date={countDown}>
						<StyledHabitBox
							onClick={() => completeHabit(habit.id)}
							className='HabitBox'
							id={habit.id}
							isDone={habit.isDone}
							duration={habit.duration}
							emojie={habit.emojie}
							habitTitle={habit.title}
							timeStart={habit.timeStart}
							key={uuid()}
						/>
					</Countdown>
				) : (
					<StyledHabitBox
						onClick={() => startCountDown(habit.id, habit.duration)}
						className='HabitBox'
						id={habit.id}
						isDone={habit.isDone}
						duration={habit.duration}
						emojie={habit.emojie}
						habitTitle={habit.title}
						timeStart={habit.timeStart}
						key={uuid()}
					/>
				)}
			</>
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

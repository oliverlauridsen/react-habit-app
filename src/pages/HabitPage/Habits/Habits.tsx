import React, { useEffect, useState } from "react";
import { StyledHabitBox } from "./Habit/Habit";
import styled from "styled-components";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { useProgress } from "../HabitPage";
import uuid from "react-uuid";
import { StyledCounter } from "../Counter/Counter";
import { useParams } from "react-router-dom";

interface HabitsProps {
	className?: string;
}

export const Habits: React.FC<HabitsProps> = ({ className }) => {
	let { dayNumber } = useParams();
	const { setprogressPercentage } = useProgress();

	const auth = getAuth();

	onAuthStateChanged(auth, (user) => {
		if (user) {
			const uid = user.uid;
			console.log(currentUser);

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

	const [currentUser, setCurrentUser] = useState("not empty");
	const [habits, setHabits] = useState([{}]);

	if (localStorage.getItem("mytime") === null) {
		localStorage.setItem("mytime", new Date().toString());
	}

	const [countDown, setCountDown] = useState(
		new Date(localStorage.getItem("mytime")!)
	);

	const unDoneHabits = habits.filter((habit: any) => !habit.isDone).length;

	useEffect(() => {
		// declare the data fetching function
		const fetchData = async () => {
			// 1. QUERY FOR CURRENT DATE AND CHECK IF ANY IS CLICKED
			// const q = query(
			// 	collection(
			// 		db,
			// 		'Users',
			// 		currentUser,
			// 		'Dates',
			// 		`0${dayNumber}-02-2023`,
			// 		'Habits'
			// 	),
			// 	where('isDone', '==', true)
			// );

			// 2. GET THE ID

			const querySnapshot = await getDocs(
				collection(db, "Users", currentUser, "Habits")
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

	const completeHabit = async (passedId: string) => {
		console.log(passedId);

		await setDoc(
			doc(
				db,
				"Users",
				currentUser,
				"Dates",
				`0${dayNumber}-02-2023`,
				"Habits",
				// TODO: MAKE THIS ID DYNAMIC
				"rivwsGjS2Uaon3vmi616"
			),
			{
				id: passedId,
				isClicked: false,
				isDone: true,
			}
		);

		habits.map((habit: any) => {
			return habit.id === passedId
				? { ...habit, isDone: !habit.isDone }
				: habit;
		});

		// 		db,
		// 		'Users',
		// 		currentUser,
		// 		'Dates',
		// 		`0${dayNumber}-02-2023`,
		// 		'Habits'
	};

	const startCountDown = (passedId: string, duration: number) => {
		console.log(passedId);
		// TEST ONE
		const timeToUnlock = addMinutes(1);
		// REAL ONE
		// const timeToUnlock = addMinutes(duration * 60);
		if (countDown < new Date()) {
			setCountDown(timeToUnlock);
			localStorage.setItem("mytime", countDown.toString());

			setHabits(
				habits.map((habit: any) => {
					return habit.id === passedId ? { ...habit, isClicked: true } : habit;
				})
			);
		} else {
			console.log("else");
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
					<StyledCounter key={uuid()} date={countDown}>
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
					</StyledCounter>
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

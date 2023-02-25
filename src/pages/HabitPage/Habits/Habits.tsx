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
	const [currentUser, setCurrentUser] = useState("not empty");
	const [habits, setHabits] = useState([{}]);
	console.log(habits);
	const { setprogressPercentage } = useProgress();
	const auth = getAuth();

	if (localStorage.getItem("timeToUnlock") === null) {
		localStorage.setItem("timeToUnlock", new Date().toString());
	}

	if (localStorage.getItem("idOfLockedHabit") === null) {
		localStorage.setItem("idOfLockedHabit", "");
	}

	const [idOfLockedHabit, setIdOfLockedHabit] = useState(
		localStorage.getItem("idOfLockedHabit")
	);

	const [countDown, setCountDown] = useState(
		new Date(localStorage.getItem("timeToUnlock")!)
	);

	if (Number(dayNumber) < 10) {
		dayNumber = "0" + dayNumber;
	}

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

	const doneHabits = habits.filter((habit: any) => habit.isDone).length;

	useEffect(() => {
		const fetchData = async () => {
			// Check current day of habits to see if any of the habits are already done and should be used for state
			const completedHabitsSnapshot = await getDocs(
				collection(
					db,
					"Users",
					currentUser,
					"Dates",
					`${dayNumber}-02-2023`,
					"Habits"
				)
			);

			// Push any of the habits that are completed to an array
			let habitArray: Object[] = [];
			completedHabitsSnapshot.forEach((doc) => {
				habitArray.push({ id: doc.id, ...doc.data() });
			});

			// Check the general one
			const querySnapshot = await getDocs(
				collection(db, "Users", currentUser, "Habits")
			);

			// Skip any of the habits that are already completed, and push the
			querySnapshot.forEach((doc) => {
				const isObjectPresent = habitArray.find(
					(habit: any) => habit.id === doc.id
				);
				if (isObjectPresent == undefined) {
					habitArray.push({ id: doc.id, ...doc.data() });
				}
			});

			setHabits(habitArray);
		};

		fetchData().catch(console.error);
	}, [currentUser, dayNumber]);

	useEffect(() => {
		if (doneHabits === habits.length) {
			setprogressPercentage(100);
		} else if (doneHabits === habits.length) {
			setprogressPercentage(0);
		} else {
			setprogressPercentage((doneHabits * 100) / habits.length);
		}
	}, [habits, setprogressPercentage, doneHabits]);

	const completeHabit = async (passedHabit: any) => {
		setHabits(
			habits.map((habit: any) => {
				return habit.id === passedHabit.id
					? { ...habit, isDone: !habit.isDone }
					: habit;
			})
		);
		await setDoc(
			doc(
				db,
				"Users",
				currentUser,
				"Dates",
				`${dayNumber}-02-2023`,
				"Habits",
				passedHabit.id
			),
			{
				category: passedHabit.category,
				duration: passedHabit.duration,
				emojie: passedHabit.emojie,
				id: passedHabit.id,
				isDone: true,
				timeStart: passedHabit.timeStart,
				title: passedHabit.title,
				weeklyGoal: passedHabit.weeklyGoal,
			}
		);
	};

	const startCountDown = (passedId: string, duration: number) => {
		// To test:
		const timeToUnlockDate = new Date();
		timeToUnlockDate.setSeconds(timeToUnlockDate.getSeconds() + 3);

		// const timeToUnlockDate = addMinutes(duration * 60);

		if (countDown < new Date()) {
			setCountDown(timeToUnlockDate);
			setIdOfLockedHabit(passedId);

			localStorage.setItem("timeToUnlock", timeToUnlockDate.toString());
			localStorage.setItem("idOfLockedHabit", passedId);

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
					onClick={() => console.log("habit is done!")}
					className='HabitBox'
					id={habit.id}
					isDone={habit.isDone}
					duration={habit.duration}
					emojie={habit.emojie}
					habitTitle={habit.title}
					timeStart={habit.timeStart}
					key={habit.id}
				/>
			</>
		) : (
			<>
				{idOfLockedHabit == habit.id ? (
					<StyledCounter
						key={uuid()}
						date={countDown}
						// onClick={() => console.log("test")}
					>
						<StyledHabitBox
							onClick={() => completeHabit(habit)}
							className='HabitBox'
							id={habit.id}
							isDone={habit.isDone}
							duration={habit.duration}
							emojie={habit.emojie}
							habitTitle={habit.title}
							timeStart={habit.timeStart}
							key={habit.id}
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
						key={habit.id}
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

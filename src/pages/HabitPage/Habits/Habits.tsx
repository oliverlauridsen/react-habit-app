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
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

interface HabitsProps {
	className?: string;
}

export const Habits: React.FC<HabitsProps> = ({ className }) => {
	let { dayNumber } = useParams();

	const [currentUser, setCurrentUser] = useState("not empty");
	const [habits, setHabits] = useState([{}]);

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

	let currentMonthNumber = (new Date().getMonth() + 1).toString();

	if (currentMonthNumber.toString().length < 2)
		currentMonthNumber = "0" + currentMonthNumber;

	const currentYear = new Date().getFullYear();

	onAuthStateChanged(auth, (user) => {
		if (user) {
			const uid = user.uid;

			if (uid !== currentUser) {
				setCurrentUser(uid);
			}
		}
	});

	const confirmAlertOptions = {
		title: "Are you sure you want to undo your habit?",
		message:
			"You will have to wait the full duration of the habit to complete it again",
		buttons: [
			{
				label: "Yes",
				onClick: () => alert("delete"),
			},
			{
				label: "No",
				// onClick: () => alert("Click No"),
			},
		],
		closeOnEscape: true,
		closeOnClickOutside: true,
		keyCodeForClose: [8, 32],
		willUnmount: () => {},
		afterClose: () => {},
		onClickOutside: () => {},
		onKeypress: () => {},
		onKeypressEscape: () => {},
		overlayClassName: "overlay-custom-class-name",
	};

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
					`${dayNumber}-${currentMonthNumber}-${currentYear}`,
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
				`${dayNumber}-${currentMonthNumber}-${currentYear}`,
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
		// const timeToUnlockDate = new Date();
		// timeToUnlockDate.setSeconds(timeToUnlockDate.getSeconds() + 3);

		const timeToUnlockDate = addMinutes(duration * 60);

		if (countDown < new Date()) {
			setCountDown(timeToUnlockDate);
			setIdOfLockedHabit(passedId);

			localStorage.setItem("timeToUnlock", timeToUnlockDate.toString());
			localStorage.setItem("idOfLockedHabit", passedId);

			if (dayNumber!.toString().length < 10) {
				const newDayNumber = dayNumber!.substring(1);
			}

			localStorage.setItem("date", dayNumber!);

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
					onClick={() => confirmAlert(confirmAlertOptions)}
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
				{idOfLockedHabit == habit.id &&
				localStorage.getItem("date") == dayNumber ? (
					<StyledCounter key={uuid()} date={countDown}>
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
	padding-bottom: 100px;
`;

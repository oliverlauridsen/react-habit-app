import React, { useEffect, useState } from "react";
import ColoredContainer from "../../components/UI/ContainerColored";
import { StyledHeaderBanner } from "../../components/UI/HeaderBanner";
import { StyledProgressBar } from "../../components/UI/ProgressBar";
import CalendarDays from "./CalendarDays/CalendarDays";
import { Outlet, useOutletContext } from "react-router-dom";
import {
	collection,
	getDocs,
	collectionGroup,
	query,
	where,
} from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

export interface iContext {
	progressPercentage: number;
	setprogressPercentage: Function;
}

export const HabitDashboard: React.FC = () => {
	const [currentPrimary, setCurrentPrimary] = useState(new Date().getDate());
	const [progressPercentage, setprogressPercentage] = useState(0);
	const [currentUser, setCurrentUser] = useState("not empty");

	onAuthStateChanged(auth, (user) => {
		if (user) {
			const uid = user.uid;

			if (uid !== currentUser) {
				setCurrentUser(uid);
			}
		}
	});

	useEffect(() => {
		const fetchData = async () => {
			const runQuery = query(
				collectionGroup(db, "Habits"),
				where("allDone", "==", true)
			);

			const querySnapshot = await getDocs(runQuery);
			querySnapshot.forEach((doc) => {
				console.log(doc.id, " => ", doc.data());
			});
		};
		fetchData().catch(console.error);
	}, [currentUser]);

	return (
		<ColoredContainer>
			<StyledHeaderBanner className='headerBanner' />
			<CalendarDays
				setCurrentPrimary={setCurrentPrimary}
				currentPrimary={currentPrimary}
				progressPercentage={progressPercentage}
			/>
			<StyledProgressBar
				progressPercentage={progressPercentage}
				setprogressPercentage={setprogressPercentage}
			/>
			<Outlet context={{ progressPercentage, setprogressPercentage }} />
		</ColoredContainer>
	);
};

export function useProgress() {
	return useOutletContext<iContext>();
}

import React, { useState } from "react";
import ColoredContainer from "../../components/UI/ContainerColored";
import { StyledHeaderBanner } from "../../components/UI/HeaderBanner";
import StyledForm from "../Welcome/StyledForm";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface AddHabitProps {}

export const AddHabit: React.FC<AddHabitProps> = ({}) => {
	const navigate = useNavigate();
	const today = new Date().getDate();

	type Inputs = {
		habitTitle: string;
		Category: string;
		weeklyGoal: number;
		duration: number;
		icon: string;
		timeStart: string;
	};

	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		console.log(data);

		await addDoc(collection(db, "Users", currentUser, "Habits"), {
			category: data.Category[0],
			duration: data.duration,
			emojie: data.icon,
			isDone: false,
			timeStart: data.timeStart,
			title: data.habitTitle,
			weeklyGoal: data.weeklyGoal,
		});
		navigate(`/habits/${today}`);
	};

	const handleClick = (e: EventTarget) => {
		const allCheckBoxes = document.querySelectorAll(
			".hidden-checkbox"
		) as NodeListOf<HTMLInputElement>;

		allCheckBoxes.forEach((checkbox) => {
			if (checkbox !== e) {
				checkbox.checked = false;
			}
		});
	};

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

	const [currentUser, setCurrentUser] = useState("not empty");

	return (
		<ColoredContainer>
			<StyledHeaderBanner className='headerBanner' />
			<StyledDiv>
				<StyledForm onSubmit={handleSubmit(onSubmit)}>
					<b>
						<label htmlFor='habitTitle'> Title</label>
					</b>
					<span style={{ color: "#ec603c" }}>{errors.habitTitle?.message}</span>

					<input
						{...register("habitTitle", { required: "Required" })}
						id='habitTitle'
						name='habitTitle'
						placeholder='Ex. "Workout"'
					/>

					<b>
						<label htmlFor='icon'> Icon (use emoji)</label>
					</b>
					<span style={{ color: "#ec603c" }}>{errors.icon?.message}</span>

					<input
						{...register("icon", { required: "Required" })}
						id='icon'
						name='icon'
						placeholder='Ex. "🧘‍♂️"'
					/>

					<b>
						<label htmlFor='timeStart'> What time will you do it?</label>
					</b>
					<span style={{ color: "#ec603c" }}>{errors.timeStart?.message}</span>

					<input
						type='time'
						{...register("timeStart", { required: "Required" })}
						id='timeStart'
						name='timeStart'
						placeholder='Ex. "2"'
					/>

					<b>
						<label htmlFor='duration'> How long will it take (in hours)?</label>
					</b>
					<span style={{ color: "#ec603c" }}>{errors.duration?.message}</span>

					<input
						type='number'
						{...register("duration", {
							required: "Required",
							valueAsNumber: true,
						})}
						id='duration'
						name='duration'
						placeholder='Ex. "2"'
					/>

					<b> Category </b>
					<span style={{ color: "#ec603c" }}>{errors.Category?.message}</span>

					<StyledCategories className='checkbox-wrapper'>
						<input
							{...register("Category", { required: "Required" })}
							className='hidden-checkbox'
							onClick={(e) => handleClick(e.target)}
							id='Health'
							type='checkbox'
							name='Category'
							value='Health'
						/>
						<label className='shown-labels' htmlFor='Health'>
							<span className='check'>✓</span>Health
						</label>
						<input
							{...register("Category", { required: "Required" })}
							className='hidden-checkbox'
							onClick={(e) => handleClick(e.target)}
							id='Creativity'
							type='checkbox'
							name='Category'
							value='Creativity'
						/>
						<label className='shown-labels' htmlFor='Creativity'>
							<span className='check'>✓</span>Creativity
						</label>
						<input
							{...register("Category", { required: "Required" })}
							className='hidden-checkbox'
							onClick={(e) => handleClick(e.target)}
							id='Spiritual'
							type='checkbox'
							name='Category'
							value='Spiritual'
						/>
						<label className='shown-labels' htmlFor='Spiritual'>
							<span className='check'>✓</span>Spiritual
						</label>
						<input
							{...register("Category", { required: "Required" })}
							className='hidden-checkbox'
							onClick={(e) => handleClick(e.target)}
							id='Career'
							type='checkbox'
							name='Category'
							value='Career'
						/>
						<label className='shown-labels' htmlFor='Career'>
							<span className='check'>✓</span>Career
						</label>
						<input
							{...register("Category", { required: "Required" })}
							className='hidden-checkbox'
							onClick={(e) => handleClick(e.target)}
							id='Education'
							type='checkbox'
							name='Category'
							value='Education'
						/>
						<label className='shown-labels' htmlFor='Education'>
							<span className='check'>✓</span>Education
						</label>
						<input
							{...register("Category", { required: "Required" })}
							className='hidden-checkbox'
							onClick={(e) => handleClick(e.target)}
							id='Business'
							type='checkbox'
							name='Category'
							value='Business'
						/>
						<label className='shown-labels' htmlFor='Business'>
							<span className='check'>✓</span>Business
						</label>
					</StyledCategories>

					<b>
						<label htmlFor='weeklyGoal'>Weekly goal</label>
					</b>
					<span style={{ color: "#ec603c" }}>{errors.weeklyGoal?.message}</span>

					<input
						type='number'
						{...register("weeklyGoal", {
							valueAsNumber: true,
							min: {
								value: 1,
								message: "Must be at least 1 day a week",
							},
							max: {
								value: 7,
								message: "Cannot exceed 7 days a week",
							},
							required: "Required",
						})}
						name='weeklyGoal'
						id='weeklyGoal'
						placeholder='Ex. "3"'
					/>
					<input type='submit' />
				</StyledForm>
			</StyledDiv>
		</ColoredContainer>
	);
};

const StyledDiv = styled.div`
	width: 90%;
	margin: auto;
	padding-bottom: 100px;

	b {
		margin-bottom: 10px;
	}
`;

const StyledCategories = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
	margin: 0 0 20px 0;

	input {
		margin: 0 !important;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		width: 100%;
	}

	.hidden-checkbox {
		display: none;
	}

	.shown-labels {
		width: 100%;
		border-radius: 5px;
		padding: 10px;
		border: 1px solid #3b2a37;
		text-align: center;
		position: relative;
	}

	.check {
		visibility: hidden;
		position: absolute;
		top: -10px;
		right: -10px;
		background-color: #3b2a37;
		border-radius: 100px;
		width: 25px;
		height: 25px;
		line-height: 25px;
		color: white;
	}

	input:checked + label .check {
		visibility: visible;
	}
`;

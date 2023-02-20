import React from "react";
import ColoredContainer from "../../components/UI/ContainerColored";
import { StyledHeaderBanner } from "../../components/UI/HeaderBanner";
import StyledForm from "../Welcome/StyledForm";
import { StyledCategories } from "./Categories/Categories";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";

interface AddHabitProps {}

export const AddHabit: React.FC<AddHabitProps> = ({}) => {
	type Inputs = {
		habitTitle: string;
		Category: string;
		weeklyGoal: number;
		exampleRequired: string;
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	const addHabit = async () => {
		try {
			console.log("habit added");
		} catch (error: any) {
			console.log(error.message);
		}
	};

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
						placeholder='Ex. "Workout 🏋️‍♂️"'
					/>

					{/* TODO: FIGURE OUT LOGIC HERE */}
					<StyledCategories
						className='categories-wrapper'
						category={{
							...register("Category", {
								required: "Category is required",
							}),
						}}
					/>
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
						placeholder='3'
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

	b {
		margin-bottom: 10px;
	}
`;

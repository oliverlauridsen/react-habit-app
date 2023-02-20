import React from 'react';
import ColoredContainer from '../../components/UI/ContainerColored';
import { StyledHeaderBanner } from '../../components/UI/HeaderBanner';
import StyledForm from '../Welcome/StyledForm';
import { StyledCategories } from './Categories/Categories';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';

interface AddHabitProps {}

export const AddHabit: React.FC<AddHabitProps> = ({}) => {
	type Inputs = {
		habitTitle: string;
		Category: string;
		WeeklyGoal: number;
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	return (
		<ColoredContainer>
			<StyledHeaderBanner className='headerBanner' />
			<StyledDiv>
				<StyledForm>
					<b>
						<label htmlFor='habitTitle'> Title</label>
					</b>
					<input
						{...register('habitTitle', { required: 'Title is required' })}
						id='habitTitle'
						name='habitTitle'
						placeholder='Ex. "Workout 🏋️‍♂️"'
					/>
					<StyledCategories
						className='categories-wrapper'
						category={{
							...register('Category', {
								required: 'Category is required',
							}),
						}}
					/>
					<b>
						<label htmlFor='habitTitle'>Weekly goal</label>
					</b>
					<input
						{...register('WeeklyGoal', { required: 'Goal is required' })}
						name='habitGoal'
						id='habitGoal'
						type='number'
						placeholder='Ex. "3"'
						min={1}
						max={7}
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

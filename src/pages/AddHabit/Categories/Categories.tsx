import React from "react";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";

interface CategoriesProps {
	className: string;
}

export const Categories: React.FC<CategoriesProps> = ({ className }) => {
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

	return (
		<>
			<b> Category </b>
			<div className={className}>
				<input
					className='hidden-checkbox'
					onClick={(e) => handleClick(e.target)}
					id='Health'
					type='checkbox'
					name='Category'
				/>
				<label className='shown-labels' htmlFor='Health'>
					<span className='check'>✓</span>Health
				</label>
				<input
					className='hidden-checkbox'
					onClick={(e) => handleClick(e.target)}
					id='Creativity'
					type='checkbox'
					name='Category'
				/>
				<label className='shown-labels' htmlFor='Creativity'>
					<span className='check'>✓</span>Creativity
				</label>
				<input
					className='hidden-checkbox'
					onClick={(e) => handleClick(e.target)}
					id='Spiritual'
					type='checkbox'
					name='Category'
				/>
				<label className='shown-labels' htmlFor='Spiritual'>
					<span className='check'>✓</span>Spiritual
				</label>
				<input
					className='hidden-checkbox'
					onClick={(e) => handleClick(e.target)}
					id='Fitness'
					type='checkbox'
					name='Category'
				/>
				<label className='shown-labels' htmlFor='Fitness'>
					<span className='check'>✓</span>Fitness
				</label>
				<input
					className='hidden-checkbox'
					onClick={(e) => handleClick(e.target)}
					id='Education'
					type='checkbox'
					name='Category'
				/>
				<label className='shown-labels' htmlFor='Education'>
					<span className='check'>✓</span>Education
				</label>
				<input
					className='hidden-checkbox'
					onClick={(e) => handleClick(e.target)}
					id='Business'
					type='checkbox'
					name='Category'
				/>
				<label className='shown-labels' htmlFor='Business'>
					<span className='check'>✓</span>Business
				</label>
			</div>
		</>
	);
};

export const StyledCategories = styled(Categories)`
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

import React from "react";
import styled from "styled-components";
import HabitStatusImage from "../../../../components/UI/Checkmark";
import CheckMarkSVG from "../../../../assets/images/checkmark.svg";
import QuestionMarkSvg from "../../../../assets/images/questionMark.svg";

interface SingleHabitBoxProps {
	isDone: Boolean;
	habitTitle: string;
	timeStart: string;
	duration: number;
	emojie: string;
	className: string;
	key: string;
	onClick: React.MouseEventHandler<HTMLElement> | undefined;
	id: string;
}

export const SingleHabitBox: React.FC<SingleHabitBoxProps> = ({
	habitTitle,
	timeStart,
	duration,
	emojie,
	className,
	isDone,
	onClick,
}) => {
	return (
		<div onClick={onClick} className={className}>
			{isDone ? (
				<HabitStatusImage src={CheckMarkSVG} alt='checkmark' />
			) : (
				<HabitStatusImage src={QuestionMarkSvg} alt='question mark' />
			)}
			<p className='habit-emojie'>{emojie}</p>
			<p className='habit-title'>{habitTitle}</p>
			<p className='habit-time'>
				{timeStart} for {duration} hour
			</p>
		</div>
	);
};

export const StyledHabitBox = styled(SingleHabitBox)`
	width: 100%;
	border-radius: 5px;
	background-color: white;
	text-align: left;
	padding: 20px;
	position: relative;

	p {
		margin: 0;
	}

	.habit-title {
		font-size: 20px;
		font-weight: 900;
	}

	.habit-time {
		color: rgba(59, 42, 55, 0.5);
		font-size: 14px;
	}

	.habit-emojie {
		font-size: 40px;
	}
`;

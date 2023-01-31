import React, { useState } from 'react';
import RightArrow from '../../assets/images/rightArrow.svg';
import styled from 'styled-components';
import { StyledCircularProgressBar } from '../../components/UI/StyledCircularProgressBar';
import { useNavigate } from 'react-router-dom';

interface WeeklyProgressProps {
	className?: string;
	habitName: string;
	categoryName: string;
	onClick?: React.MouseEventHandler<HTMLElement> | undefined;
}

export const WeeklyProgress: React.FC<WeeklyProgressProps> = ({
	className,
	habitName,
	categoryName,
	onClick,
}) => {
	const [percentage, setPercentage] = useState(25);
	const navigate = useNavigate();

	return (
		<div className={className} onClick={onClick}>
			<div className='single-habit-wrapper'>
				<div className='single-habit-wrapper-left-column'>
					<StyledCircularProgressBar
						percentage={percentage}
						value={percentage}
						text={`${percentage}%`}
						className='styledCircularProgressBar'
					/>
					<div className='single-habit-text-wrapper'>
						<p className='single-habit-wrapper-category'> {categoryName} </p>
						<p className='single-habit-wrapper-habit'> {habitName} </p>
					</div>
				</div>
				<div className='single-haibt-right-column'>
					<div className='single-habit-wrapper-percentage'>{percentage}%</div>
					<div className='single-habit-wrapper-percentage-arrow'>
						<img src={RightArrow} alt='' />
					</div>
				</div>
			</div>
		</div>
	);
};

export const StyledWeeklyProgress = styled(WeeklyProgress)`
	width: 100%;
	background-color: #fdf4e7;
	display: flex;
	flex-direction: column;
	margin: auto;

	.weekly-progress-wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.single-habit-wrapper {
		display: flex;
		flex-direction: row;
		background-color: #fff;
		padding: 10px 20px;
		width: 100%;
		justify-content: space-between;
		border-bottom: 1px solid #efeff3;

		p {
			margin: 0;
			text-align: left;
		}
	}

	.single-habit-wrapper-left-column {
		display: flex;
		flex-direction: row;
		font-weight: 900;
		align-items: center;

		.single-habit-text-wrapper {
			margin-left: 20px;
		}

		.single-habit-wrapper-category {
			color: #ec603c;
			font-size: 12px;
			font-weight: 600;
		}
	}

	.single-haibt-right-column {
		display: flex;
		flex-direction: row;
		align-items: center;

		.single-habit-wrapper-percentage {
			margin-right: 25px;
			color: #b1b1b1;
			font-size: 14px;
			font-weight: 600;
		}
	}
`;

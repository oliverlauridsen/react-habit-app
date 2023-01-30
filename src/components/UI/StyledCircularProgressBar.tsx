import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styled from 'styled-components';
import React from 'react';

interface CircularProgressBarProps {
	value: number;
	text: string;
	percentage: number;
	className?: string;
}

export const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
	percentage,
	className,
}) => {
	return (
		<CircularProgressbar
			className={className}
			value={percentage}
			text={`${percentage}%`}
		/>
	);
};

export const StyledCircularProgressBar = styled(CircularProgressBar)`
	width: 50px;

	.CircularProgressbar-path {
		stroke: #ffcb5b;
	}

	.CircularProgressbar-text {
		fill: #ffcb5b;
		font-size: 25px;
	}
`;

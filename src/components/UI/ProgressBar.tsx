import ProgressBar from 'react-bootstrap/ProgressBar';
import styled from 'styled-components';

interface ProgressBarWithLabelInterface {
	className?: string;
	progressPercentage: number;
	setprogressPercentage: Function;
}

export const ProgressBarWithLabel: React.FC<ProgressBarWithLabelInterface> = ({
	className,
	progressPercentage,
}) => {
	return (
		<ProgressBar
			className={className}
			now={progressPercentage}
			label={`${progressPercentage}%`}
		/>
	);
};

export const StyledProgressBar = styled(ProgressBarWithLabel)`
	width: 90%;
	margin: 0 auto;
	background-color: white;
	border-radius: 5px;

	.progress-bar {
		background-color: #ffcb5b;
		color: #3b2a37;
		font-weight: 900;
		border-radius: 5px;
	}
`;

export default ProgressBarWithLabel;

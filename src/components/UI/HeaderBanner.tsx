import React from 'react';
import styled from 'styled-components';
import targetImage from '../../assets/images/targetImage.svg';
interface HeaderBannerProps {
	className?: string;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({ className }) => {
	return (
		<div className={className}>
			<div className='headerBanner'>
				<div>
					<h1> Good morning! </h1>
					<p> Keep up your streaks, reach your goals</p>
				</div>
				<div>
					<img
						src={targetImage}
						alt='Two persons hitting their target with a dart pin'
					/>
				</div>
			</div>
		</div>
	);
};

export const StyledHeaderBanner = styled(HeaderBanner)`
	width: 100%;
	display: flex;
	background-color: #fdf4e7;

	.headerBanner {
		background-color: #ffcb5b;
		border-radius: 30px;
		width: 100%;
		height: 100%;
		display: flex;
		padding: 40px 20px;
	}
	div {
		height: 100%;
	}
	h1 {
		font-size: 20px;
	}

	p {
		font-size: 14px;
	}
`;

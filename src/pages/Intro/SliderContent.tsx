import React from 'react';
import CustomImage from '../../components/UI/CustomImage';
import Header from '../../components/UI/Header';
import styled from 'styled-components';

interface SliderContentInterface {
	image: string;
	headerText: string;
	bodyText: string;
	className: string;
}

export const SliderContent: React.FC<SliderContentInterface> = ({
	image,
	headerText,
	bodyText,
	className,
}) => {
	return (
		<div className={className}>
			<CustomImage src={image} />
			<Header>{headerText} </Header>
			<p> {bodyText} </p>
		</div>
	);
};

export const StyledSliderContent = styled(SliderContent)`
	padding-top: 75px;
	text-align: left;

	p {
		text-align: left;
	}
`;

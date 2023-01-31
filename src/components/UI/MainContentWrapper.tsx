import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

interface MainContentWrapperProps {
	className?: string;
	children: JSX.Element[];
}

export const MainContentWrapper: React.FC<MainContentWrapperProps> = ({
	className,
	children,
}) => {
	return (
		<div className={className}>
			<div className='children-wrapper'>{children}</div>
		</div>
	);
};

export const StyledMainContentWrapper = styled(MainContentWrapper)`
	width: 90%;
	margin: 25px auto;
	flex-direction: column;
	overflow-x: scroll;

	.children-wrapper {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		overflow-x: scroll;
		width: 100vw;
		gap: 10px;
	}
	div {
		padding: 10px 20px;
		/* margin-right: 10px; */
	}
`;

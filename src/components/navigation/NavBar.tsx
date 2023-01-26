import React from 'react';
import styled from 'styled-components';
import HomeIcon from '../../assets/images/navigation/home.svg';
import HabitIcon from '../../assets/images/navigation/habit.svg';
import PersonIcon from '../../assets/images/navigation/person.svg';
import SettingsIcon from '../../assets/images/navigation/settings.svg';
import { useNavigate } from 'react-router-dom';

interface NavBarProps {
	className?: string;
}

const NavBar: React.FC<NavBarProps> = ({ className }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<div>
				<img onClick={() => navigate('/home')} src={HomeIcon} alt='' />
				<img onClick={() => navigate('/habits')} src={HabitIcon} alt='' />
				<button> + </button>
				<img onClick={() => navigate('/user')} src={PersonIcon} alt='' />
				<img onClick={() => navigate('/settings')} src={SettingsIcon} alt='' />
			</div>
		</div>
	);
};

export const StyledNavBar = styled(NavBar)`
	width: 100%;
	position: absolute;
	bottom: 0;
	background-color: white;
	justify-content: space-around;
	box-shadow: 0px 4px 20px 0px #00000040;

	div {
		width: 100%;
		display: flex;
		justify-content: space-around;
		position: relative;
	}
	img {
		width: 25px;
		height: 25px;
		padding: 20px 0;
	}

	button {
		position: absolute;
		top: -25px;
		width: 50px;
		height: 50px;
		background-color: #ffcb5b;
		border-radius: 100px;
		border: none;
		font-size: 30px;
		color: white;
		box-shadow: 0px 4px 5px 1px #0000000d;
	}
`;

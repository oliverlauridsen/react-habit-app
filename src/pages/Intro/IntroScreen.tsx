// 3rd party
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { StyledSliderContent } from './SliderContent';
import { useNavigate } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Images
import SunSVG from '../../assets/images/sun.svg';
import PersonWorkingOut from '../../assets/images/personWorkingOut.svg';
import KidShowingHabits from '../../assets/images/kidShowingHabits.svg';
import HittingGoals from '../../assets/images/hittingGoals.svg';
import UserConnections from '../../assets/images/userConnections.svg';
import Question from '../../assets/images/question.svg';
// Components
import Container from '../../components/UI/Container';
import Sun from '../../components/UI/Sun';
import Button from '../../components/UI/Button';

export const IntroScreen = () => {
	const navigate = useNavigate();

	const exitIntroFlow = () => {
		navigate('/home');
	};

	return (
		<>
			<Container>
				<Container contentWrapper>
					<Sun src={SunSVG} alt='Your SVG' />

					<Swiper
						pagination={{
							dynamicBullets: true,
						}}
						modules={[Pagination]}
						className='mySwiper'
					>
						<SwiperSlide>
							<StyledSliderContent
								image={Question}
								headerText='How does this work?'
								bodyText='Start new routines, track progress over time, compete with friends and win money while reaching life goals!'
								className='styledSliderContent'
							></StyledSliderContent>
						</SwiperSlide>
						<SwiperSlide>
							<StyledSliderContent
								image={PersonWorkingOut}
								headerText='Make the habits stick'
								bodyText='Receive advanced statistics on your habits, to help you identify when, where and how to make the habits finally stick.'
								className='styledSliderContent'
							/>
						</SwiperSlide>
						<SwiperSlide>
							<StyledSliderContent
								image={KidShowingHabits}
								headerText='Stay true to your goals'
								bodyText='With the built-in time constraint system, we help you finish your daily habits, by setting time-constraints for completion, based on how long it should take!'
								className='styledSliderContent'
							/>
						</SwiperSlide>
						<SwiperSlide>
							<StyledSliderContent
								image={HittingGoals}
								headerText='Up the stakes'
								bodyText='Set a goal. Bet a sum that you’ll reach that goal. Should you not reach your monthly goal, you’ll have a second chance to get 50% of the sum back!'
								className='styledSliderContent'
							/>
						</SwiperSlide>
						<SwiperSlide>
							<StyledSliderContent
								image={UserConnections}
								headerText='Compete with friends'
								bodyText='Set up bets with friends in-app, and win money while improving at the same time! Compare progress over periods, to see your progress compared to your peers.'
								className='styledSliderContent'
							/>
							<Button onClick={exitIntroFlow}>Let's start!</Button>
						</SwiperSlide>
					</Swiper>
				</Container>
			</Container>
		</>
	);
};

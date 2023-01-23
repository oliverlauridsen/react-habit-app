import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import '../../assets/css/App.css';
import Container from '../../components/UI/Container';
import Header from '../../components/UI/Header';
import WelcomeSVG from '../../assets/images/meditate.svg';
import SunSVG from '../../assets/images/sun.svg';
import '../../assets/css/index.css';
import YogaLady from '../../components/UI/Yoga';
import Sun from '../../components/UI/Sun';
import StyledGoogleButton from '../../components/UI/StyledGoogleButton';
import { Example } from './Example';
import { db } from '../../utils/firebase';
import { onValue, ref } from 'firebase/database';

function WelcomeScreen() {
	const clientId =
		'85237359971-eg77ceikdaic9ubnnit2thkd88qt01ed.apps.googleusercontent.com';

	console.log(db);
	useEffect(() => {
		const initClient = () => {
			gapi.client.init({
				clientId: clientId,
				scope: '',
			});
		};
		gapi.load('client:auth2', initClient);
	});

	return (
		<div className='App'>
			<Container>
				<Container contentWrapper>
					<Sun src={SunSVG} alt='Your SVG' />
					<YogaLady src={WelcomeSVG} alt='Your SVG' />
					<Header>Welcome to Habit </Header>
					<p>
						Start a new routine, track your progress over time, compete with
						friends and win money while improving yourself in the process!
					</p>

					<StyledGoogleButton
						buttonText='Sign in with Google'
						className='needsToBeHere'
					></StyledGoogleButton>
					{/* <Button primary>Sign in with email</Button> */}
					{/* <StyledForm onSubmit={handleSubmit(onSubmit)}>
						<input
							{...register('email', { required: 'Email is required' })}
							placeholder='Email'
						/>
						<span>{errors.email?.message}</span>
						<input
							type='password'
							{...register('password', { required: 'Password is required' })}
							placeholder='Password'
						/>
						<span>{errors.password?.message}</span>
						<input type='submit' />
					</StyledForm> */}

					<Example />

					{/* <StyledMotion className='box' /> */}
				</Container>
			</Container>
		</div>
	);
}

export default WelcomeScreen;

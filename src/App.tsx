import { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

import './assets/css/App.css';
import Button from './components/UI/Button';
import Container from './components/UI/Container';
import Header from './components/UI/Header';
import WelcomeSVG from './assets/images/meditate.svg';
import SunSVG from './assets/images/sun.svg';
import './assets/css/index.css';
import YogaLady from './components/UI/Yoga';
import Sun from './components/UI/Sun';

function App() {
	const clientId =
		'85237359971-eg77ceikdaic9ubnnit2thkd88qt01ed.apps.googleusercontent.com';

	useEffect(() => {
		const initClient = () => {
			gapi.client.init({
				clientId: clientId,
				scope: '',
			});
		};
		gapi.load('client:auth2', initClient);
	});

	const onSuccess = (res: Object) => {
		console.log('success:', res);
	};
	const onFailure = (err: Error) => {
		console.log('failed:', err);
	};

	return (
		<div className='App'>
			<Container>
				<Container contentWrapper>
					<Sun src={SunSVG} alt='Your SVG' />
					<YogaLady src={WelcomeSVG} alt='Your SVG' />
					<Header>Welcome to Habit </Header>
					<p>
						{' '}
						Start a new routine, track your progress over time, compete with
						friends and win money while improving yourself in the process!
					</p>
					<GoogleLogin
						clientId='85237359971-eg77ceikdaic9ubnnit2thkd88qt01ed.apps.googleusercontent.com'
						render={(renderProps) => (
							<button
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								className={'GoogleButton'}
							>
								Sign in with Google
							</button>
						)}
						buttonText='Login'
						onSuccess={onSuccess}
						onFailure={onFailure}
						cookiePolicy={'single_host_origin'}
					/>{' '}
					<Button primary>Sign in with email</Button>
				</Container>
			</Container>
		</div>
	);
}

export default App;

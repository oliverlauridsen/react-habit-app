import { useEffect, useState } from 'react';
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
// import { addDoc, collection, getDocs } from 'firebase/firestore';

function WelcomeScreen() {
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

	const [message, setMessage] = useState('Hello World');

	const testFunctionToChild = (message: string) => {
		setMessage(message);
	};

	// const [users, setUsers] = useState<object[]>([]);

	// const addUser = async () => {
	// 	try {
	// 		const docRef = await addDoc(collection(db, 'users'), {
	// 			email: 'test@hotmail.com',
	// 			password: 'test',
	// 		});
	// 		console.log('Document written with ID: ', docRef.id);
	// 	} catch (e) {
	// 		console.error('Error adding document: ', e);
	// 	}
	// };

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

					<Example testFunctionToChild={testFunctionToChild} />
				</Container>
			</Container>
		</div>
	);
}

export default WelcomeScreen;

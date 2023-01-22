import { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import '../../assets/css/App.css';
import Button from '../../components/UI/Button';
import Container from '../../components/UI/Container';
import Header from '../../components/UI/Header';
import WelcomeSVG from '../../assets/images/meditate.svg';
import SunSVG from '../../assets/images/sun.svg';
import '../../assets/css/index.css';
import YogaLady from '../../components/UI/Yoga';
import Sun from '../../components/UI/Sun';
import { useForm, SubmitHandler } from 'react-hook-form';
import StyledForm from './StyledForm';

type Inputs = {
	email: string;
	password: string;
};

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

	const onSuccess = (res: Object) => {
		console.log('success:', res);
	};
	const onFailure = (err: Error) => {
		console.log('failed:', err);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	// console.log(watch('email')); // watch input value by passing the name of it

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
					<StyledForm onSubmit={handleSubmit(onSubmit)}>
						{/* register your input into the hook by invoking the "register" function */}
						<input
							{...register('email', { required: true })}
							placeholder='Email'
						/>
						{errors.email && <span>This field is required</span>}

						{/* include validation with required or other standard HTML validation rules */}
						<input
							{...register('password', { required: true })}
							placeholder='Password'
						/>
						{/* errors will return when field validation fails  */}
						{errors.password && <span>This field is required</span>}

						<input type='submit' />
					</StyledForm>
				</Container>
			</Container>
		</div>
	);
}

export default WelcomeScreen;

import { useEffect } from "react";
import { gapi } from "gapi-script";
import "../../assets/css/App.css";
import Container from "../../components/UI/Container";
import Header from "../../components/UI/Header";
import WelcomeSVG from "../../assets/images/meditate.svg";
import SunSVG from "../../assets/images/sun.svg";
import "../../assets/css/index.css";
import CustomImage from "../../components/UI/CustomImage";
import Sun from "../../components/UI/Sun";
import StyledGoogleButton from "../../components/UI/StyledGoogleButton";
import { Example } from "./Example";
import { StyledSignInForm } from "./SignInForm";

function WelcomeScreen() {
	const clientId =
		"85237359971-eg77ceikdaic9ubnnit2thkd88qt01ed.apps.googleusercontent.com";

	useEffect(() => {
		const initClient = () => {
			gapi.client.init({
				clientId: clientId,
				scope: "",
			});
		};
		gapi.load("client:auth2", initClient);
	});

	return (
		<>
			<Container>
				<Container contentWrapper>
					<Sun src={SunSVG} alt='Your SVG' />
					<CustomImage src={WelcomeSVG} alt='Your SVG' />
					<Header>Welcome to Habit </Header>
					<p>
						Start a new routine, track your progress over time, compete with
						friends and earn money while improving yourself in the process!
					</p>

					<StyledGoogleButton
						buttonText='Sign up with Google'
						className='needsToBeHere'></StyledGoogleButton>

					<Example />
					<p> or </p>
					<StyledSignInForm className='sign-in-form'></StyledSignInForm>
				</Container>
			</Container>
		</>
	);
}

export default WelcomeScreen;

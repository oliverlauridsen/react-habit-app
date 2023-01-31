import { GoogleLogin } from 'react-google-login';
import styled from 'styled-components';

interface GoogleButtonProps {
	className: string;
	buttonText: string;
}

const onSuccess = (res: Object) => {
	console.log('success:', res);
};

const onFailure = (err: Error) => {
	console.log('failed:', err);
};

const GoogleLoginButton: React.FunctionComponent<GoogleButtonProps> = ({
	className,
	buttonText,
}) => (
	<GoogleLogin
		clientId='85237359971-eg77ceikdaic9ubnnit2thkd88qt01ed.apps.googleusercontent.com'
		render={(renderProps) => (
			<button
				onClick={renderProps.onClick}
				disabled={renderProps.disabled}
				className={className}
			>
				{buttonText}
			</button>
		)}
		buttonText='Login'
		onSuccess={onSuccess}
		onFailure={onFailure}
		cookiePolicy={'single_host_origin'}
	></GoogleLogin>
);

const StyledGoogleButton = styled(GoogleLoginButton)`
	background: #ec603c;
	border-radius: 3px;
	border: none;
	border-radius: 5px;
	color: white;
	margin-top: 20px;
	padding: 1em;
	width: 100%;
	font-size: 1em;
	font-weight: 600;
`;

export default StyledGoogleButton;

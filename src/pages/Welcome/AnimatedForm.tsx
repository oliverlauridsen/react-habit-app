import { useState } from 'react';
import { motion } from 'framer-motion';
import StyledForm from './StyledForm';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

type Inputs = {
	email: string;
	password: string;
};

function AnimatedForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');
	const [user, setUser] = useState<any>({});
	const navigate = useNavigate();

	onAuthStateChanged(auth, (currentUser) => {
		setUser(currentUser);
	});

	const registerUser = async () => {
		try {
			const user = await createUserWithEmailAndPassword(
				auth,
				registerEmail,
				registerPassword
			);
			navigate('/intro');
		} catch (error: any) {
			console.log(error.message);
		}
	};

	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	return (
		<motion.div
			variants={{ collapsed: { scale: 1 }, open: { scale: 1 } }}
			transition={{ duration: 0.5 }}
			className='content-placeholder'
		>
			<StyledForm onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register('email', { required: 'Email is required' })}
					placeholder='Email'
					onChange={(event) => {
						setRegisterEmail(event.target.value);
					}}
				/>
				<span>{errors.email?.message}</span>
				<input
					type='password'
					{...register('password', { required: 'Password is required' })}
					placeholder='Password'
					onChange={(event) => {
						setRegisterPassword(event.target.value);
					}}
				/>
				<span>{errors.password?.message}</span>
				<input type='submit' onClick={registerUser} />
			</StyledForm>
		</motion.div>
	);
}

export default AnimatedForm;

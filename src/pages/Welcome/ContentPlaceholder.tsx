import * as React from 'react';
import { motion } from 'framer-motion';
import StyledForm from './StyledForm';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
	email: string;
	password: string;
};

function ContentPlaceholder() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

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
				/>
				<span>{errors.email?.message}</span>
				<input
					type='password'
					{...register('password', { required: 'Password is required' })}
					placeholder='Password'
				/>
				<span>{errors.password?.message}</span>
				<input type='submit' />
			</StyledForm>
		</motion.div>
	);
}

export default ContentPlaceholder;

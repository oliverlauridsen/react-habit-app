import React from 'react';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	Link,
	Outlet,
	RouterProvider,
} from 'react-router-dom';
import { About } from './pages/Intro/About';
import WelcomeScreen from './pages/Welcome/WelcomeScreen';

export const App: React.FC = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Root />}>
				<Route index element={<WelcomeScreen />}></Route>
				<Route path='/about' element={<About />}></Route>
			</Route>
		)
	);
	return (
		<div className='App'>
			<RouterProvider router={router} />
			{/* <WelcomeScreen /> */}
		</div>
	);
};

const Root = () => {
	return (
		<div>
			<Link to='/'>Home</Link>
			<Link to='/about'>About</Link>
			<Outlet />
		</div>
	);
};

export default App;

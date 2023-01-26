import React from 'react';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	Link,
	Outlet,
	RouterProvider,
} from 'react-router-dom';
import ErrorPage from './pages/Error/ErrorPage';
import { About } from './pages/Intro/About';
import { IntroScreen } from './pages/Intro/IntroScreen';
import WelcomeScreen from './pages/Welcome/WelcomeScreen';

export const App: React.FC = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Root />}>
				<Route index element={<WelcomeScreen />}></Route>
				<Route path='/about' element={<About />}></Route>
				<Route path='/intro' element={<IntroScreen />}></Route>
				<Route path='*' element={<ErrorPage />}></Route>
			</Route>
		)
	);

	return (
		<div className='App'>
			<RouterProvider router={router} />
		</div>
	);
};

const Root = () => {
	return (
		<div>
			{
				// TODO: Think about how to add the <Link />'s later on in the application
				// Most likely, this can be accomplished simply by adding the <Link/> later on
			}
			{/* <Link to='/'>Home</Link>
			<Link to='/about'>About</Link> */}
			<Outlet />
		</div>
	);
};

export default App;

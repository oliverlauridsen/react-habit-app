import React from 'react';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	Outlet,
	RouterProvider,
} from 'react-router-dom';
import { StyledNavBar } from './components/navigation/NavBar';
import ErrorPage from './pages/Error/ErrorPage';
import { HomeDashboard } from './pages/Home/HomeDashboard';
import { IntroScreen } from './pages/Intro/IntroScreen';
import { HabitDashboard } from './pages/HabitPage/HabitPage';
import { SingleHabit } from './components/navigation/RouteSingleHabit';
import { ProfileDashboard } from './pages/Profile/ProfileDashboard';
import { SettingsDashboard } from './pages/Settings/SettingsDashboard';
import WelcomeScreen from './pages/Welcome/WelcomeScreen';
import { Styledhabits } from './pages/HabitPage/Habits/Habits';

export const App: React.FC = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Root />}>
				<Route index element={<WelcomeScreen />}></Route>
				<Route path='/intro' element={<IntroScreen />}></Route>
				<Route path='*' element={<ErrorPage />}></Route>
				<Route path='/home' element={<HomeDashboard />}></Route>
				<Route path='/habits' element={<HabitDashboard />}>
					<Route path=':dayNumber' element={<Styledhabits />}></Route>
				</Route>
				<Route path='/user' element={<ProfileDashboard />}></Route>
				<Route path='/settings' element={<SettingsDashboard />}></Route>
				<Route path='/habit/:habitID' element={<SingleHabit />} />
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
	const currentURL = window.location.href;
	let navBarIsShown = false;

	if (
		currentURL !== 'http://localhost:3000/' &&
		currentURL !== 'http://localhost:3000/intro'
	) {
		navBarIsShown = true;
	}
	return (
		<div>
			{navBarIsShown && <StyledNavBar className='navbar' />}
			<Outlet />
		</div>
	);
};

export default App;

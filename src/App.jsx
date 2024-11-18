/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import { UpdateFollower } from 'react-mouse-follower';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import BackgroundImage from '../src/assets/banner_bg2.png';
import TokenImage from '../src/assets/token_bg.png';
import './App.css';
import Footer from './Modules/footer';
import Navbar from './Modules/navbar';
import Dashboard from './Page/dashboard';
import Home from './Page/home';
import Login from './Page/login';
import NotFound from './Page/notFound';

function App() {


	const ProtectedRoute = ({ children, auth }) => {
		const location = useLocation();
		const isLoggedIn = !!localStorage.getItem('walletAddress'); // Dynamically compute login status

		if (!isLoggedIn && auth) {
			return <Navigate to="/login" replace />;
		} else if (isLoggedIn && location.pathname === '/login') {
			return <Navigate to="/" replace />;
		}

		return children;
	};

	const routes = [
		{
			path: '/',
			element: (
				<Home/>
			),
			auth: false,
		},
		{
			path: '/login',
			element: <Login />,
			auth: false,
		},
		{
			path: '/dashboard',
			element: <Dashboard/>,
			auth: true,
		},
	];

	const scrollableDivRef = useRef(null);

	// Scroll to top on route change
	const location = useLocation();
	useEffect(() => {
		if (scrollableDivRef.current) {
			scrollableDivRef.current.scrollTo(0, 0);
		}
	}, [location]);

	useEffect(() => {
		const titles = {
			'/login': 'Login',
			'/dashboard': 'Dashboard',
		};

		const defaultTitle = 'USDT Live Staking';
		const pageTitle = titles[location.pathname]
			? `${titles[location.pathname]} | USDT Live Staking`
			: defaultTitle;

		document.title = pageTitle;
	}, [location]);

	return (
		<UpdateFollower
			mouseOptions={{
				backgroundColor: 'white',
				zIndex: 999,
				followSpeed: 1.5,
			}}
		>
			<div className="bg-[#0c0e27] relative h-screen overflow-hidden">
				<div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-10">
					<img
						src={BackgroundImage}
						alt="Background"
						className="w-full h-full object-cover"
					/>
				</div>

				<div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-20 opacity-70">
					<img
						src={TokenImage}
						alt="Token Overlay"
						className="w-full h-full object-cover"
					/>
				</div>

				<div
					className="relative z-30 h-screen overflow-y-scroll"
					ref={scrollableDivRef}
				>
					<Navbar
					/>

					<Routes>
						{routes.map(({ path, element, auth }, index) => (
							<Route
								key={index}
								path={path}
								element={<ProtectedRoute auth={auth}>{element}</ProtectedRoute>}
							/>
						))}
						<Route path="*" element={<NotFound />} />
					</Routes>

					<Footer />
				</div>
			</div>
		</UpdateFollower>
	);
}

export default App;

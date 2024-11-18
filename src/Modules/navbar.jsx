/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { useState } from 'react';
import { UpdateFollower } from 'react-mouse-follower';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import NavIcon from '../assets/navicon.png';
import { disconnectWallet } from '../util/interact';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/hook';
import { disconnect } from '../redux/features/auth/authSlice';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const loggedInInfo = useSelector((state) => state?.auth);


	// Handle disconnect wallet
	const handleDisconnect = () => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'You want to disconnect wallet',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Disconnect',
		}).then((result) => {
			if (result.isConfirmed) {
				const { address, status } = disconnectWallet();
				/* setWallet(address);
				setStatus(status); */

				// Clear local storage and reset address
				dispatch(
					disconnect({
						walletAddress: loggedInInfo?.walletAddress,
						referCode: loggedInInfo?.referCode,
					})
				);
				//setAddress(''); // Update state after disconnection

				Swal.fire({
					title: 'Disconnected!',
					text: 'Wallet Disconnected.',
					icon: 'success',
				});

				navigate('/'); // Redirect to home page
			}
		});
	};

	return (
		<div className="bg-[#262d4e] sticky w-full z-50 top-0 start-0 mb-4">
			<motion.nav
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1, delay: 0.5 }}
			>
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
					<UpdateFollower
						mouseOptions={{
							backgroundColor: 'white',
							zIndex: 999,
							followSpeed: 1.5,
							scale: 5,
							mixBlendMode: 'difference',
						}}
					>
						<NavLink to="/">
							<img src={NavIcon} className="h-14" alt="Flowbite Logo" />
						</NavLink>
					</UpdateFollower>
					<div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							type="button"
							className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[#00df9a] md:hidden "
							aria-controls="navbar-sticky"
							aria-expanded={isOpen}
						>
							<svg
								className="w-5 h-5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 17 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M1 1h15M1 7h15M1 13h15"
								/>
							</svg>
						</button>
					</div>
					<div
						className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
							isOpen ? 'block' : 'hidden'
						}`}
						id="navbar-sticky"
					>
						<ul className="flex flex-col p-4 md:p-0 mt-4 text-white font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
							<UpdateFollower
								mouseOptions={{
									backgroundColor: 'white',
									zIndex: 999,
									followSpeed: 1.5,
									scale: 5,
									mixBlendMode: 'difference',
								}}
							>
								<li>
									<NavLink
										to="/"
										className={({ isActive }) =>
											`block py-2 px-3 rounded md:p-0 ${
												isActive
													? 'text-[#00df9a] bg-[#00df9a] md:bg-transparent sm:bg-transparent md:text-[#00df9a]'
													: 'text-white '
											}`
										}
										aria-current="page"
									>
										Home
									</NavLink>
								</li>
							</UpdateFollower>

							{!loggedInInfo?.walletAddress ? (
								<UpdateFollower
									mouseOptions={{
										backgroundColor: 'white',
										zIndex: 999,
										followSpeed: 1.5,
										scale: 5,
										mixBlendMode: 'difference',
									}}
								>
									<li>
										<NavLink
											to="/login"
											className={({ isActive }) =>
												`block py-2 px-3 rounded md:p-0 ${
													isActive
														? 'text-[#00df9a] bg-[#00df9a] md:bg-transparent sm:bg-transparent md:text-[#00df9a]'
														: 'text-white '
												}`
											}
										>
											Login
										</NavLink>
									</li>
								</UpdateFollower>
							) : (
								<>
									<UpdateFollower
										mouseOptions={{
											backgroundColor: 'white',
											zIndex: 999,
											followSpeed: 1.5,
											scale: 5,
											mixBlendMode: 'difference',
										}}
									>
										<li>
											<NavLink
												to="/dashboard"
												className={({ isActive }) =>
													`block py-2 px-3 rounded md:p-0 ${
														isActive
															? 'text-[#00df9a] bg-[#00df9a] md:bg-transparent sm:bg-transparent md:text-[#00df9a]'
															: 'text-white '
													}`
												}
											>
												Dashboard
											</NavLink>
										</li>
									</UpdateFollower>
									<UpdateFollower
										mouseOptions={{
											backgroundColor: 'white',
											zIndex: 999,
											followSpeed: 1.5,
											scale: 5,
											mixBlendMode: 'difference',
										}}
									>
										<li>
											<div
												onClick={handleDisconnect}
												className="block py-2 px-3 rounded md:p-0 text-white cursor-pointer hover:text-[#00df9a]"
											>
												Disconnect
											</div>
										</li>
									</UpdateFollower>
								</>
							)}
						</ul>
					</div>
				</div>
			</motion.nav>
		</div>
	);
};

export default Navbar;

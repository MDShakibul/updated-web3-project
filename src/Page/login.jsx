import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import USDTImage from '../assets/hero_section_image.png';
import api from '../util/api';
import { useAppDispatch } from '../redux/hook';
import { login } from '../redux/features/auth/authSlice';

const Login = () => {
	const [walletAddress, setWalletAddress] = useState('');
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const handleLogin = async (e) => {
		e.preventDefault();
		

		if (!walletAddress) {
			Swal.fire({
				icon: 'error',
				title: 'Input Required',
				text: 'Please enter a wallet address.',
			});
			return;
		}

		try {
			const response = await api.post('/login', {
				address: walletAddress,
			});

			const data = response.data;

			if (data.success) {
				dispatch(
					login({
						walletAddress: walletAddress,
						referCode: data?.refer_code,
					})
				);
				
				navigate('/dashboard'); // Redirect to dashboard page
			} else {
				// If API returns false, log the error
				console.error('Login failed: Invalid wallet address');
				Swal.fire({
					icon: 'error',
					title: 'Login Failed',
					text: 'Invalid wallet address. Please try again.',
				});
			}
		} catch (error) {
			console.error('Error logging in:', error);
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Something went wrong. Please try again later.',
			});
		}
	};
	return (
		<div className="container md:h-4/6">
			<section className="grid max-w-screen-xl py-8 mx-auto lg:gap-24 xl:gap-0 lg:py-16 lg:grid-cols-12 h-5/6">
				<div className="mr-auto place-self-center lg:col-span-7 lg-order-1 sm:order-2 w-full">
					<form onSubmit={handleLogin}>
						<div className="flex flex-col space-y-2 w-full">
							<label className="text-base font-medium text-white">
								Wallet Address
							</label>
							<input
								type="input"
								id="name"
								name="name"
								placeholder="Enter your Wallet Address"
								className="w-full md:w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
								value={walletAddress}
								onChange={(e) => setWalletAddress(e.target.value)}
							/>
						</div>
						<motion.div
							className="flex mt-6"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.4 }}
						>
							<button className="inline-flex items-center justify-center px-5 py-3 text-base font-medium bg-gradient-to-r from-[#40f8a6] to-[#43b1fb] text-white rounded-md uppercase">
								Login
								<svg
									className="w-5 h-5 ml-2 -mr-1"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
										clipRule="evenodd"
									></path>
								</svg>
							</button>
						</motion.div>
					</form>
				</div>
				<motion.div
					className="lg:mt-0 lg:col-span-5 lg:flex justify-center items-center lg:order-2 sm:order-1"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.5 }}
				>
					<img src={USDTImage} alt="mockup" className="w-full h-auto" />
				</motion.div>
			</section>
		</div>
	);
};

export default Login;

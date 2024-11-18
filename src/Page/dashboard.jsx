/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import api from '../util/api';
import { formatDate } from '../util/interact';
import { useSelector } from 'react-redux';

const Dashboard = () => {
	const [referredUsers, setReferredUsers] = useState([]);
	const loggedInInfo = useSelector((state) => state?.auth);

	useEffect(() => {
		const fetchTokenTransfer = async () => {
			try {
				const res = await api.get('/referred_user', {
					params: { referCode: loggedInInfo?.referCode }, // Pass address as a query parameter
				});
				/* console.log(res?.data); */
				console.log('referd users ');
				setReferredUsers(res?.data?.referred_users);
			} catch (error) {
				console.log('stories error response :: ', error);
			}
		};

		fetchTokenTransfer();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loggedInInfo]);

	const shareLink = (code) => {
		const shareUrl = `${window.location.origin}/?referCode=${code}`;
		const shareText = 'Refer code for join';

		if (navigator.share) {
			navigator
				.share({
					title: 'Referral',
					text: shareText,
					url: shareUrl,
				})
				.then(() => console.log('Shared successfully'))
				.catch((error) => console.error('Error sharing:', error));
		} else {
			window.open('https:google.com');
		}
	};
	return (
		<div className="container h-4/6">
			<div className="grid grid-cols-12 gap-1 h-full">
				<div className="col-span-12 md:col-span-5 text-white p-4 flex items-center">
					<div>
						<h4 className="mb-3 text-[#5957cd] text-4xl font-Sans">
							Share Link
						</h4>
						<p className="font-semibold text-base mb-3">{`${window.location.origin}/?referCode=${loggedInInfo?.referCode}`}</p>
						<button
							className="inline-flex items-center justify-center px-5 py-2 text-base font-medium bg-gradient-to-r from-[#40f8a6] to-[#43b1fb] text-white rounded-md uppercase"
							onClick={() => {
								shareLink(loggedInInfo?.referCode);
							}}
						>
							Copy
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
					</div>
				</div>
				<div className="col-span-12 md:col-span-7 text-white p-4 flex  items-center">
					<div className="overflow-x-auto">
						<h4 className="mb-3 text-[#5957cd] text-4xl font-Sans text-center">
							Referred User
						</h4>
						<table className="min-w-full border-collapse border border-gray-300">
							<thead>
								<tr className="bg-gray-200">
									<th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">
										#
									</th>
									<th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">
										Date
									</th>
									<th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">
										Address
									</th>
								</tr>
							</thead>
							<tbody>
								{referredUsers?.length === 0 ? (
									<tr>
										<th colSpan="3">
											<h6 className="text-center text-red-600 bg-white py-3">
												No User Found
											</h6>
										</th>
									</tr>
								) : (
									referredUsers?.map((user, index) => (
										<tr key={index} className="bg-white">
											<th className="border border-gray-300 px-6 py-4 text-sm text-gray-900">
												{index + 1}
											</th>
											<td className="border border-gray-300 px-6 py-4 text-sm text-gray-900">
												{formatDate(user.created_at)}
											</td>
											<td className="border border-gray-300 px-6 py-4 text-sm text-gray-900">
												{user.walletAddress}
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

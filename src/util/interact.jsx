import { chainId } from '../constants/address';

export const connectWallet = async () => {
	if (window.ethereum) {
		try {
			const chain = await window.ethereum.request({ method: 'eth_chainId' });
			// console.log(chain, parseInt(chain, 16), chainId, parseInt(chain, 16) === chainId)
			if (chain == chainId) {
				const addressArray = await window.ethereum.request({
					method: 'eth_requestAccounts',
				});
				if (addressArray.length > 0) {
					return {
						address: addressArray[0],
						status: '👆🏽 You can mint new pack now.',
					};
				} else {
					return {
						address: '',
						status: '😥 Connect your wallet account to the site.',
					};
				}
			} else {
				window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: chainId }],
				});
				return {
					address: '',
					status: '😥 Connect your wallet account to the site.',
				};
			}
		} catch (err) {
			return {
				address: '',
				status: '😥 ' + err.message,
			};
		}
	} else {
		return {
			address: '',
			status: (
				<span>
					<p>
						{' '}
						🦊{' '}
						{/* <a target="_blank" href={`https://metamask.io/download.html`}> */}
						You must install Metamask, a virtual Ethereum wallet, in your
						browser.(https://metamask.io/download.html)
						{/* </a> */}
					</p>
				</span>
			),
		};
	}
};

export const getCurrentWalletConnected = async () => {
	if (window.ethereum) {
		try {
			const addressArray = await window.ethereum.request({
				method: 'eth_accounts',
			});
			if (addressArray.length > 0) {
				return {
					address: addressArray[0],
					status: '👆🏽 Write a message in the text-field above.',
				};
			} else {
				return {
					address: '',
					status: '🦊 Connect to Metamask using the top right button.',
				};
			}
		} catch (err) {
			return {
				address: '',
				status: '😥 ' + err.message,
			};
		}
	} else {
		return {
			address: '',
			status: (
				<span>
					<p>
						{' '}
						🦊{' '}
						<a target="_blank" href={`https://metamask.io/download.html`}>
							You must install Metamask, a virtual Ethereum wallet, in your
							browser.
						</a>
					</p>
				</span>
			),
		};
	}
};

export const disconnectWallet = async () => {
	localStorage.removeItem('referCode');
	localStorage.removeItem('walletAddress');
	await window.ethereum.request({
		method: 'wallet_revokePermissions',
		params: [
			{
				eth_accounts: {},
			},
		],
	});
};

export const walletAddressResize = (address) => {
	return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

export const formatDate = (isoDate) => {
	const date = new Date(isoDate);

	// Define options for formatting the date
	const options = { day: 'numeric', month: 'short', year: '2-digit' };

	// Format the date to "23 Sep, 24"
	return date.toLocaleDateString('en-GB', options).replace(' ', ', ');
};
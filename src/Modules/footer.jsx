import { motion } from 'framer-motion';
import FooterImage from '../assets/navicon.png';

const Footer = () => {
	return (
		<div>
			<div className="relative w-full py-[100px]">
				{/* Red Overlay */}
				<div className="absolute top-0 left-0 w-full h-full bg-[#121833] opacity-60 z-10"></div>

				{/* Footer Content */}
				<div className="relative z-10 h-full text-white">
					<div className="container grid grid-cols-12 gap-4">
						<div className="col-span-12 md:col-span-4 text-white">
							<img src={FooterImage} alt="logo" height="50px" width="50px" />

							<div className="mt-4 font-Sans leading-7 font-medium">
								<p>
									Welcome to USDT Live Staking Company, a pioneering enterprise
									in the cryptocurrency staking sector. Our focus is on
									providing users with a seamless and profitable staking
									experience using USDT, integrated with the Metamask wallet on
									the Binance Smart Chain (BSC) network. Our innovative platform
									ensures daily staking interest ranging from a minimum of 0.7%
									to higher returns, catering to both small and large investors.
								</p>

								<h4 className="mt-3 mb-2 text-[#5957cd] text-2xl">
									Company Overview
								</h4>

								<p>
									<strong>USDT Live Staking Company</strong> is committed to
									offering reliable and lucrative staking opportunities. With a
									current market capitalization of 15.8 billion USDT and 213.7
									million USDT staked in the last seven days, we are positioned
									as a strong player in the cryptocurrency staking market.
								</p>

								<h4 className="mt-3 mb-2 text-[#5957cd] text-2xl">
									Investment Details
								</h4>

								<ul className="list-disc ml-5">
									<li>
										<strong>Daily Staking Interest:</strong> Minimum of 0.7% to
										2.8% daily, with potential for higher returns.
									</li>
									<li>
										<strong>Integration with Metamask Wallet:</strong> Ensures
										secure and efficient transactions.
									</li>
									<li>
										<strong>Binance Smart Chain (BSC):</strong> Utilizes BSC for
										optimal performance and low transaction costs.
									</li>
									<li>
										<strong>Gas Fees:</strong> Minimal gas fees ranging from
										$0.02 to $0.1, payable in BNB.
									</li>
									<li>
										<strong>Weekly Interest Payout:</strong> Every single day,
										the accumulated interest will be added to the user’s USDT
										wallet.
									</li>
								</ul>

								<h4 className="mt-3 mb-2 text-[#5957cd] text-2xl">
									Investment Details
								</h4>
								<p>Minimum Staking Amount: 10 USDT</p>
								<p>Maximum Staking Amount: 10,000,000 USDT</p>

								<h5 className="mt-3 mb-2 text-[#5957cd] text-2xl">
									How It Works
								</h5>

								<ul className="list-disc ml-5">
									<li>
										<strong>Deposit Funds:</strong> Users deposit USDT into
										their Web3-based wallet under the Binance Smart Chain
										network.
									</li>
									<li>
										<strong>Daily Returns:</strong> Earn daily interest from a
										minimum of 0.7% to 2.8%, depending on market conditions and
										staking performance.
									</li>
									<li>
										<strong>Interest Payout:</strong> Every single day, the
										accumulated interest will be added to the user’s USDT
										wallet.
									</li>
									<li>
										<strong>Gas Fees:</strong> All transactions incur minimal
										gas fees, paid in BNB, ensuring cost-effectiveness and
										transparency.
									</li>
								</ul>

								<h5 className="mt-3 mb-2 text-[#5957cd] text-2xl">
									Terms and Conditions
								</h5>
								<ul className="list-disc ml-5">
									<li>
										<strong>Gas Fees:</strong> Transactions require gas fees to
										be paid in BNB. The gas fee ranges from $0.02 to $0.1.
									</li>
									<li>
										<strong>Network:</strong> All transactions and staking
										activities occur on the Binance Smart Chain (BSC).
									</li>
									<li>
										<strong>Staking Currency:</strong> USDT is the primary
										currency used for staking.
									</li>
									<li>
										<strong>Metamask Wallet:</strong> All staking activities and
										fund transactions are managed through the Metamask wallet
										for enhanced security and user convenience.
									</li>
								</ul>

								<h5 className="mt-3 mb-2 text-[#5957cd] text-2xl">
									Market Performance
								</h5>
								<p>
									Our company has shown robust performance with a significant
									market presence:
								</p>
								<ul className="list-disc ml-5">
									<li>
										<strong>Current Market Cap:</strong> 15.8 Billion USDT
									</li>
									<li>
										<strong>Last 7 Days Staking:</strong> 213.7 million USDT
										staked, indicating strong and consistent staking activity.
									</li>
									<li>
										<strong>Volume (24h):</strong> $13,635,339 (8.68% increase)
									</li>
									<li>
										<strong>Volume/Market Cap (24h):</strong> 19.39%
									</li>
									<li>
										<strong>Circulating Supply:</strong> 70,511,448 USDT
									</li>
									<li>
										<strong>Total Supply:</strong> 70,511,448 USDT
									</li>
									<li>
										<strong>Max. Supply:</strong> ∞
									</li>
									<li>
										<strong>Fully Diluted Market Cap:</strong> $70,516,556
									</li>
								</ul>

								<h5 className="mt-3 mb-2 text-[#5957cd] text-2xl">
									Benefits to Investors
								</h5>

								<ul className="list-disc ml-5">
									<li>
										<strong>Consistent Returns:</strong> Investors can expect
										steady daily returns on their investments.
									</li>
									<li>
										<strong>Secure Transactions:</strong> Integration with
										Metamask wallet ensures secure and hassle-free transactions.
									</li>
									<li>
										<strong>Low Fees:</strong> Minimal gas fees make it
										cost-effective for investors.
									</li>
									<li>
										<strong>Scalability:</strong> Flexible investment amounts
										allow for a wide range of investors to participate.
									</li>
									<li>
										<strong>Weekly Payouts:</strong> Interest is accumulated
										daily and added to the user’s wallet every 7 days, providing
										regular and reliable payouts.
									</li>
								</ul>

								<h5 className="mt-3 mb-2 text-[#5957cd] text-2xl">
									Conclusion
								</h5>

								<p>
									USDT Live Staking Company is dedicated to providing a
									reliable, profitable, and secure staking environment for our
									users. By leveraging the power of Binance Smart Chain and the
									security of Metamask, we ensure that our investors receive the
									best possible returns on their investments with minimal costs.
									Join us in the world of cryptocurrency staking and start
									earning daily interest on your USDT investments today.
								</p>

								<h5 className="mt-3 mb-2 text-[#5957cd] text-2xl">
									Contact Us
								</h5>

								<p>
									For more information and to start investing, please visit our
									website or contact our support team. We look forward to
									helping you achieve your financial goals through innovative
									and secure mining solutiFor more information and to start
									investing, please visit our website or contact our support
									team. We look forward to helping you achieve your financial
									goals through innovative and secure staking solutions.
								</p>
							</div>
						</div>
						<div className="col-span-12 md:col-span-5 text-white">
							<div className="newsletter_form">
								<motion.h4
									className="text-white text-[22px] font-semibold uppercase relative mb-7 pl-10 after:absolute after:top-[18px] after:left-0 after:w-8 after:h-[2px] after:bg-white"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2, duration: 0.5 }}
								>
									Newsletter
								</motion.h4>
								<p className="font-Sans leading-7 font-medium">
									By subscribing to our mailing list you will always be update
									with the latest news from us.
								</p>
								<form className="flex items-center justify-center w-full max-w-md mx-auto bg-transparent mt-6">
									<input
										type="email"
										placeholder="Enter Email Address"
										className="w-full px-4 py-3 text-gray-800 bg-white rounded-l-full border border-gray-300 focus:outline-none"
									/>
									<button className="px-6 py-[13px] text-black font-semibold bg-gradient-to-r from-[#40f8a6] to-[#43b1fb] rounded-r-full focus:outline-none">
										SUBSCRIBE
									</button>
								</form>
							</div>
						</div>
						
					</div>
				</div>
			</div>

      <p className="container py-6 text-white text-[14px]" id="company">
  Binance Web3 © {new Date().getFullYear()}
</p>
		</div>
	);
};

export default Footer;

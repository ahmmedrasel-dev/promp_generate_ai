"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
	const isUserLoggedIn = true;
	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);
	useEffect(() => {
		const getProvider = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		getProvider();
	}, []);
	return (
		<nav className="flex-between w-full mb-16 pt-3">
			<Link href="/" className="flex gap-2 flex-center">
				<Image
					src="/assets/images/logo.svg"
					width={30}
					height={30}
					alt="Promtp Generate Logo"
					className="object-contain"
				/>
				<p className="logo_text">Prompt Generate AI</p>
			</Link>

			{/* Dasktop Navigation */}
			<div className="sm:flex hidden">
				{isUserLoggedIn ? (
					<div className="flex gap-3 md:gap-5">
						<Link href="/create-prompt" className="black_btn">
							Create Post
						</Link>
						<button
							type="button"
							className="outline_btn"
							onClick={signOut}
						>
							Sign Out
						</button>

						<Link href="/profile">
							<Image
								src="/assets/images/logo.svg"
								width={30}
								height={30}
								className="rounded-full"
								alt="Profile Picture"
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>

			{/* Mobile Navigation */}
			<div className="sm:hidden flex relative">
				{isUserLoggedIn ? (
					<div className="flex gap-3 md:gap-5">
						<Image
							src="/assets/images/logo.svg"
							width={30}
							height={30}
							className="rounded-full"
							alt="Profile Picture"
							onClick={() => setToggleDropdown((prev) => !prev)}
						/>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;

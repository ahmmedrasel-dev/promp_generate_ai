import Nav from "@components/Nav";
import "@styles/globals.css";
export const metadata = {
	title: "Promptopia",
	description: "Descover & Shere AI Prompts",
};
const RootLayout = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<div className="main">
					<div className="gradient"></div>
				</div>

				<main className="app">
					<Nav />
					{children}
				</main>
			</body>
		</html>
	);
};

export default RootLayout;

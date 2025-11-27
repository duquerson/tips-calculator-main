//@ts-nocheck
import IconDollar from "./assets/images/icon-dollar.svg?react";
import IconPeople from "./assets/images/icon-person.svg?react";
import Logo from "./assets/images/logo.svg?react";

export default function App() {
	return (
		<main className="flex min-h-screen min-w-full flex-col justify-center bg-primary-green/50 font-mono">
			<Logo className="mx-auto mt-32 mb-4" />
			<Calculator />
		</main>
	);
}

const Calculator = () => {
	return (
		<section className="min-w-93.75 rounded-2xl bg-neutral-white p-8 text-neutral-green-900 shadow-xl">
			<Tips />
			<TipsResult />
		</section>
	);
};

const Tips = () => {
	return (
		<>
			<h1 className="mb-3 text-xs text-neutral-grey-500">Bill</h1>
			<Inputs icon="dollar" text="0" id="bill" name="bill" />
			<h2 className="mb-4 text-xs font-semibold text-neutral-grey-500">
				Select Tip %
			</h2>
			<section className="mb-10 grid grid-cols-2 grid-rows-3 gap-7 text-white">
				{[5, 10, 15, 25, 50].map((percent) => {
					return (
						<Button key={percent} text={`${percent}%`} id={`${percent}`} />
					);
				})}
				<div className="flex min-w-28 items-center justify-between rounded-md border-2 border-transparent bg-neutral-grey-200/50 px-5 py-3 hover:cursor-pointer hover:border-primary-green">
					<input
						type="number"
						name="custom"
						id="custom"
						placeholder="Custom"
						className="w-full bg-transparent text-right text-xl font-semibold text-cyan-950 focus:outline-none"
					/>
				</div>
			</section>
			<h2 className="mb-3 text-xs font-semibold text-neutral-grey-500">
				Number of People
			</h2>
			<Inputs icon="people" text="0" id="people" name="people" />
		</>
	);
};

const TipsResult = () => {
	return (
		<article className="flex flex-col gap-8 rounded-xl bg-neutral-green-900 p-7">
			<section className="flex justify-between">
				<div className="flex flex-col">
					<h2 className="text-white">Tip Amount</h2>
					<h3 className="text-xs text-neutral-grey-500">/ person</h3>
				</div>
				<p
					id="tip-amount"
					className="flex items-center text-xl font-semibold text-primary-green"
				>
					<span className="mr-1 text-2xl">$</span> 0.00
				</p>
			</section>
			<section className="flex justify-between">
				<div className="flex flex-col">
					<h2 className="text-white">Total</h2>
					<h3 className="text-xs text-neutral-grey-500">/ person</h3>
				</div>
				<p
					id="total"
					className="flex items-center text-xl font-semibold text-primary-green"
				>
					{" "}
					<span className="mr-1 text-2xl">$</span> 0.00
				</p>
			</section>
			<button className="rounded-md bg-primary-green px-5 py-3 text-xl font-semibold text-neutral-green-900 transition hover:cursor-pointer hover:bg-primary-green/50 hover:text-white">
				RESET
			</button>
		</article>
	);
};

const Inputs = ({
	icon = "dollar",
	text = "0",
	id = "bill",
	name = "bill",
}) => {
	return (
		<section
			className="mb-8 flex items-center justify-between rounded-md border-2 border-transparent bg-neutral-grey-200/50 px-5 py-3 hover:cursor-pointer hover:border-primary-green"
			id={id}
		>
			{icon === "dollar" ? (
				<IconDollar className="h-4" />
			) : (
				<IconPeople className="h-4" />
			)}

			<div>
				<input
					type="number"
					id={id}
					name={name}
					placeholder={text}
					className="w-24 bg-transparent text-right text-inputs font-semibold text-cyan-950 focus:outline-none"
				/>
			</div>
		</section>
	);
};

const Button = ({ text = "Reset", id = "" }) => {
	return (
		<button
			type="button"
			className="min-w-28 rounded-md bg-neutral-green-900 px-5 py-3 text-center text-xl font-semibold transition hover:cursor-pointer hover:bg-primary-green/80 hover:text-neutral-green-900"
			id={id}
		>
			{text}
		</button>
	);
};

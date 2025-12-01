//@ts-nocheck
import IconDollar from './assets/images/icon-dollar.svg?react';
import IconPeople from './assets/images/icon-person.svg?react';
import Logo from './assets/images/logo.svg?react';

export default function App() {
	return (
		<main className="flex min-h-screen min-w-full flex-col justify-center bg-primary-green/50 font-mono transition-all duration-300 md:items-center">
			<Logo className="mx-auto mt-32 mb-4 transition-all duration-300" aria-hidden="true" />
			<Calculator />
		</main>
	);
}

const Calculator = () => {
	return (
		<section
			className="min-w-93.75 rounded-2xl bg-neutral-white p-8 text-neutral-green-900 shadow-xl transition-all duration-300 md:flex md:h-[490px] md:w-[950px] md:p-10"
			aria-label="Tip calculator"
		>
			<Tips />
			<TipsResult />
		</section>
	);
};

const Tips = () => {
	return (
		<div className="transition-all duration-300 md:w-1/2 md:pr-8">
			<h1 className="mb-3 text-xs text-neutral-grey-500">Bill amount</h1>
			<Inputs icon="dollar" text="0" id="bill" name="bill" ariaLabel="Bill amount in dollars" />

			<h2 className="mb-4 text-xs font-semibold text-neutral-grey-500 md:mb-3">Select tip %</h2>

			<section
				className="mb-10 grid grid-cols-2 grid-rows-3 gap-7 text-white transition-all duration-300 md:mb-8 md:grid-cols-3 md:grid-rows-2 md:gap-5"
				role="list"
			>
				{[5, 10, 15, 25, 50].map((percent) => {
					return (
						<Button
							key={percent}
							text={`${percent}%`}
							id={`tip-${percent}`}
							ariaLabel={`Select ${percent} percent tip`}
						/>
					);
				})}

				<div
					className="flex min-w-28 items-center justify-between rounded-md border-2 border-transparent bg-neutral-grey-200/50 px-5 py-3 transition-all duration-300 hover:cursor-pointer hover:border-primary-green"
					role="group"
					aria-label="Custom tip percentage"
				>
					<label htmlFor="custom" className="sr-only">
						Custom tip percentage
					</label>
					<input
						type="text"
						inputMode="decimal"
						pattern="[0-9]*"
						name="custom"
						id="custom"
						placeholder="Custom"
						aria-label="Custom tip percentage (in percent)"
						className="w-full bg-transparent text-right text-xl font-semibold text-cyan-950 focus:outline-none"
					/>
				</div>
			</section>

			<h2 className="mb-3 text-xs font-semibold text-neutral-grey-500">Number of people</h2>
			<Inputs
				icon="people"
				text="0"
				id="people"
				name="people"
				ariaLabel="Number of people sharing the bill"
			/>
		</div>
	);
};

const TipsResult = () => {
	return (
		<article
			className="flex w-full flex-col gap-8.5 rounded-xl bg-neutral-green-900 p-7 transition-all duration-300 md:w-1/2 md:justify-between"
			aria-label="Results"
		>
			<div className="flex h-full flex-col">
				<section className="mt-4 flex justify-between" aria-hidden={false}>
					<div className="flex flex-col">
						<h2 className="text-white">Tip amount</h2>
						<h3 className="text-xs text-neutral-grey-500">/ person</h3>
					</div>
					<p
						id="tip-amount"
						className="flex items-center text-2xl font-semibold text-primary-green"
						aria-live="polite"
						aria-atomic="true"
						role="status"
					>
						<span className="mr-1 text-2xl" aria-hidden="true">
							$
						</span>{' '}
						0.00
					</p>
				</section>

				<section className="mt-10 flex justify-between">
					<div className="flex flex-col">
						<h2 className="text-white">Total</h2>
						<h3 className="text-xs text-neutral-grey-500">/ person</h3>
					</div>
					<p
						id="total"
						className="flex items-center text-2xl font-semibold text-primary-green"
						aria-live="polite"
						aria-atomic="true"
						role="status"
					>
						<span className="mr-1 text-2xl" aria-hidden="true">
							$
						</span>{' '}
						0.00
					</p>
				</section>
			</div>
			<button
				className="rounded-md bg-primary-green px-5 py-3 text-xl font-semibold text-neutral-green-900 transition-all duration-300 hover:cursor-pointer hover:bg-primary-green/50 hover:text-white"
				aria-label="Reset calculator"
				type="button"
			>
				RESET
			</button>
		</article>
	);
};

const Inputs = ({ icon = 'dollar', text = '0', id = 'bill', name = 'bill', ariaLabel = '' }) => {
	const fallbackLabel = icon === 'dollar' ? 'Bill amount in dollars' : 'Number of people';

	return (
		<section
			className="mb-8 flex items-center justify-between rounded-md border-2 border-transparent bg-neutral-grey-200/50 px-5 py-3 transition-all duration-300 hover:cursor-pointer hover:border-primary-green md:mb-6"
			id={id}
		>
			{icon === 'dollar' ? (
				<IconDollar className="h-4" aria-hidden="true" focusable="false" />
			) : (
				<IconPeople className="h-4" aria-hidden="true" focusable="false" />
			)}

			<div>
				<label htmlFor={id} className="sr-only">
					{ariaLabel || fallbackLabel}
				</label>

				<input
					type="text"
					inputMode="decimal"
					pattern={icon === 'dollar' ? '[0-9]*[.]?[0-9]*' : '[0-9]*'}
					id={id}
					name={name}
					placeholder={text}
					aria-label={ariaLabel || fallbackLabel}
					className="w-24 bg-transparent text-right text-inputs font-semibold text-cyan-950 focus:outline-none"
				/>
			</div>
		</section>
	);
};

const Button = ({ text = 'Reset', id = '', ariaLabel = '' }) => {
	return (
		<button
			type="button"
			className="min-w-28 rounded-md bg-neutral-green-900 px-5 py-3 text-center text-xl font-semibold transition-all duration-300 hover:cursor-pointer hover:bg-primary-green/80 hover:text-neutral-green-900"
			id={id}
			aria-label={ariaLabel || `Select ${text}`}
		>
			{text}
		</button>
	);
};

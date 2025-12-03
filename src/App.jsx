//@ts-nocheck
import PropTypes from 'prop-types';
import IconDollar from './assets/images/icon-dollar.svg?react';
import IconPeople from './assets/images/icon-person.svg?react';
import Logo from './assets/images/logo.svg?react';
import { createContext, useContext, useState, useMemo } from 'react';

// ============================================
// CONTEXT Y CUSTOM HOOK
// ============================================

const TipCalculatorContext = createContext(undefined);

const TipCalculatorProvider = ({ children }) => {
	const [bill, setBill] = useState('');
	const [tipPercent, setTipPercent] = useState(0);
	const [customTip, setCustomTip] = useState('');
	const [people, setPeople] = useState('');
	const [error, setError] = useState(false);

	// Calcular el monto de propina por persona
	const tipAmount = useMemo(() => {
		if (!bill || !people || people === '0') {
			return '0.00';
		}

		const billNum = parseFloat(bill);
		const peopleNum = parseInt(people, 10);

		const activePercent = customTip ? parseFloat(customTip) : tipPercent;

		if (isNaN(billNum) || isNaN(peopleNum) || peopleNum === 0) {
			return '0.00';
		}

		const tip = (billNum * (activePercent / 100)) / peopleNum;
		return tip.toFixed(2);
	}, [bill, people, tipPercent, customTip]);

	// Calcular el total por persona
	const totalAmount = useMemo(() => {
		if (!bill || !people || people === '0') {
			return '0.00';
		}

		const billNum = parseFloat(bill);
		const peopleNum = parseInt(people, 10);

		const activePercent = customTip ? parseFloat(customTip) : tipPercent;

		if (isNaN(billNum) || isNaN(peopleNum) || peopleNum === 0) {
			return '0.00';
		}

		const total = (billNum * (1 + activePercent / 100)) / peopleNum;
		return total.toFixed(2);
	}, [bill, people, tipPercent, customTip]);

	// Validar número de personas
	const handleSetPeople = (value) => {
		// No permitir negativos, solo enteros positivos (sin decimales)
		if (value.includes('-')) return;
		// Permitir solo dígitos
		const regex = /^\d*$/;
		if (!regex.test(value) && value !== '') return;

		setPeople(value);

		// Error si es cero (cuando no vacío)
		if (value === '0' || (parseInt(value || '0', 10) === 0 && value !== '')) {
			setError(true);
		} else {
			setError(false);
		}
	};

	// Función para resetear todo
	const resetCalculator = () => {
		setBill('');
		setTipPercent(0);
		setCustomTip('');
		setPeople('');
		setError(false);
	};

	const value = {
		bill,
		setBill,
		tipPercent,
		setTipPercent,
		customTip,
		setCustomTip,
		people,
		setPeople: handleSetPeople,
		error,
		tipAmount,
		totalAmount,
		resetCalculator,
	};

	return <TipCalculatorContext.Provider value={value}>{children}</TipCalculatorContext.Provider>;
};

// Custom hook para usar el contexto
const useTipCalculator = () => {
	const context = useContext(TipCalculatorContext);

	if (context === undefined) {
		throw new Error('useTipCalculator debe ser usado dentro de TipCalculatorProvider');
	}

	return context;
};

// ============================================
// COMPONENTES
// ============================================

export default function App() {
	return (
		<TipCalculatorProvider>
			<main className="justificar-center flex min-h-screen min-w-full flex-col bg-primary-green/50 font-mono transition-all duration-300 md:items-center">
				<h1 className="sr-only">Tip Calculator</h1>
				<Logo
					className="mx-auto mt-32 mb-4 transition-all duration-300"
					aria-label="Splitter - Tip Calculator"
				/>
				<Calculator />
			</main>
		</TipCalculatorProvider>
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
	const {
		bill,
		setBill,
		tipPercent,
		setTipPercent,
		customTip,
		setCustomTip,
		people,
		setPeople,
		error,
	} = useTipCalculator();

	const handleTipClick = (percent) => {
		setTipPercent(percent);
		setCustomTip(''); // Limpiar custom cuando se selecciona un botón
	};

	// Validación para bill: permitir números y máximo 2 decimales, no negativos
	const handleBillChange = (value) => {
		if (value.includes('-')) return;
		// Regex: números antes del punto (cualquiera) y hasta 2 decimales opcionales
		const regex = /^\d*(\.\d{0,2})?$/;
		if (regex.test(value) || value === '') {
			setBill(value);
		}
	};

	// Validación para custom tip: máximo 3 dígitos antes, 2 después
	const handleCustomChange = (value) => {
		if (value.includes('-')) return;
		const regex = /^\d{0,3}(\.\d{0,2})?$/;
		if (regex.test(value) || value === '') {
			setCustomTip(value);
			setTipPercent(0); // Limpiar botones cuando se usa custom
		}
	};

	return (
		<div className="transition-all duration-300 md:w-1/2 md:pr-8">
			<div className="mb-8 md:mb-6">
				<label htmlFor="bill" className="mb-3 block text-xs text-neutral-grey-500">
					Bill amount
				</label>
				<Inputs
					icon="dollar"
					text="0"
					id="bill"
					name="bill"
					ariaLabel="Bill amount in dollars"
					value={bill}
					onChange={handleBillChange}
				/>
			</div>

			<fieldset className="mb-10 border-0 p-0 md:mb-8">
				<legend className="mb-4 text-xs font-semibold text-neutral-grey-500 md:mb-3">
					Select tip %
				</legend>

				<div
					className="grid grid-cols-2 grid-rows-3 gap-7 text-white transition-all duration-300 md:grid-cols-3 md:grid-rows-2 md:gap-5"
					role="group"
					aria-label="Tip percentage options"
				>
					{[5, 10, 15, 25, 50].map((percent) => {
						return (
							<Button
								key={percent}
								text={`${percent}%`}
								id={`tip-${percent}`}
								ariaLabel={`Select ${percent} percent tip`}
								isActive={tipPercent === percent && !customTip}
								onClick={() => handleTipClick(percent)}
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
							pattern="[0-9]*[.]?[0-9]*"
							name="custom"
							id="custom"
							value={customTip}
							onChange={(e) => handleCustomChange(e.target.value)}
							placeholder="Custom"
							aria-label="Custom tip percentage (in percent)"
							className="w-full bg-transparent text-right text-xl font-semibold text-cyan-950 focus:outline-none"
						/>
					</div>
				</div>
			</fieldset>

			<div className="mb-8 md:mb-6">
				<div className="mb-3 flex justify-between">
					<label htmlFor="people" className="text-xs font-semibold text-neutral-grey-500">
						Number of people
					</label>
					<span
						id="mjs-error"
						className={`text-xs text-red-500 transition-all duration-300 ${error ? 'visible' : 'invisible'}`}
						role={error ? 'alert' : undefined}
					>
						Can't be zero
					</span>
				</div>
				<Inputs
					icon="people"
					text="0"
					id="people"
					name="people"
					ariaLabel="Number of people sharing the bill"
					value={people}
					onChange={setPeople}
					hasError={error}
					ariaDescribedBy={error ? 'mjs-error' : undefined}
				/>
			</div>
		</div>
	);
};

const TipsResult = () => {
	const { tipAmount, totalAmount, resetCalculator, bill, tipPercent, customTip, people } =
		useTipCalculator();

	const hasData = bill || tipPercent > 0 || customTip || people;

	return (
		<aside
			className="flex w-full flex-col gap-8.5 rounded-xl bg-neutral-green-900 p-7 transition-all duration-300 md:w-1/2 md:justify-between"
			aria-label="Results"
		>
			<div className="flex h-full flex-col">
				<div className="mt-4 flex justify-between">
					<div className="flex flex-col">
						<span className="text-white">Tip amount</span>
						<span className="text-xs text-neutral-grey-500">/ person</span>
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
						{tipAmount}
					</p>
				</div>

				<div className="mt-10 flex justify-between">
					<div className="flex flex-col">
						<span className="text-white">Total</span>
						<span className="text-xs text-neutral-grey-500">/ person</span>
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
						{totalAmount}
					</p>
				</div>
			</div>
			<button
				className="rounded-md bg-primary-green px-5 py-3 text-xl font-semibold text-neutral-green-900 transition-all duration-300 hover:cursor-pointer hover:bg-primary-green/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
				aria-label="Reset calculator"
				type="button"
				onClick={resetCalculator}
				disabled={!hasData}
			>
				RESET
			</button>
		</aside>
	);
};

const Inputs = ({
	icon = 'dollar',
	text = '0',
	id = 'bill',
	name = 'bill',
	ariaLabel = '',
	value = '',
	onChange,
	hasError = false,
	ariaDescribedBy,
}) => {
	const fallbackLabel = icon === 'dollar' ? 'Bill amount in dollars' : 'Number of people';

	// Internally validar antes de propagar con onChange (si onChange espera solo el string válido)
	const handleChange = (e) => {
		const next = e.target.value;
		// Delegar validación a la función pasada (si la hubo)
		if (typeof onChange === 'function') {
			onChange(next);
		}
	};

	return (
		<div
			className={`flex items-center justify-between rounded-md border-2 bg-neutral-grey-200/50 px-5 py-3 transition-all duration-300 hover:cursor-pointer ${
				hasError ? 'border-red-500/60 hover:border-red-500/60' : 'border-transparent'
			}`}
			id={`${id}-container`}
		>
			{icon === 'dollar' ? (
				<IconDollar className="h-4" aria-hidden="true" focusable="false" />
			) : (
				<IconPeople className="h-4" aria-hidden="true" focusable="false" />
			)}

			<input
				type="text"
				// Para bill usamos decimal (permitir punto), para people numeric (enteros)
				inputMode={icon === 'dollar' ? 'decimal' : 'numeric'}
				pattern={icon === 'dollar' ? '[0-9]*[.]?[0-9]*' : '[0-9]*'}
				id={id}
				name={name}
				value={value}
				onChange={handleChange}
				placeholder={text}
				aria-label={ariaLabel || fallbackLabel}
				aria-invalid={hasError}
				aria-describedby={ariaDescribedBy}
				className={`w-24 bg-transparent text-right text-inputs font-semibold text-cyan-950 transition-all duration-300 focus:outline-none ${
					hasError ? 'text-red-500' : 'text-cyan-950'
				}`}
			/>
		</div>
	);
};

Inputs.propTypes = {
	icon: PropTypes.oneOf(['dollar', 'people']),
	text: PropTypes.string,
	id: PropTypes.string.isRequired,
	name: PropTypes.string,
	ariaLabel: PropTypes.string,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	hasError: PropTypes.bool,
	ariaDescribedBy: PropTypes.string,
};

const Button = ({ text = 'Reset', id = '', ariaLabel = '', isActive = false, onClick }) => {
	return (
		<button
			type="button"
			className={`min-w-28 rounded-md px-5 py-3 text-center text-xl font-semibold transition-all duration-300 hover:cursor-pointer ${
				isActive
					? 'bg-primary-green text-neutral-green-900'
					: 'bg-neutral-green-900 text-white hover:bg-primary-green/80 hover:text-neutral-green-900'
			}`}
			id={id}
			aria-label={ariaLabel || `Select ${text}`}
			aria-pressed={isActive}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

Button.propTypes = {
	text: PropTypes.string,
	id: PropTypes.string,
	ariaLabel: PropTypes.string,
	isActive: PropTypes.bool,
	onClick: PropTypes.func,
};

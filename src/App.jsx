//@ts-nocheck
import { createContext, useContext, useState, useMemo, memo, useCallback } from 'react';

// ============================================
// ICONOS SVG INLINE
// ============================================

const IconDollar = ({ className = '', ...props }) => (
	<svg className={className} xmlns="http://www.w3.org/2000/svg" width="11" height="17" {...props}>
		<path
			fill="#9EBBBD"
			d="M6.016 16.328v-1.464c1.232-.08 2.22-.444 2.964-1.092.744-.648 1.116-1.508 1.116-2.58v-.144c0-.992-.348-1.772-1.044-2.34-.696-.568-1.708-.932-3.036-1.092V4.184c.56.144 1.012.4 1.356.768.344.368.516.816.516 1.344v.288h1.824v-.432c0-.448-.088-.876-.264-1.284a3.783 3.783 0 00-.744-1.116A4.251 4.251 0 007.54 2.9a5.324 5.324 0 00-1.524-.492V.872H4.288V2.36a5.532 5.532 0 00-1.416.324c-.448.168-.84.392-1.176.672-.336.28-.604.616-.804 1.008-.2.392-.3.844-.3 1.356v.144c0 .96.316 1.708.948 2.244.632.536 1.548.884 2.748 1.044v3.912c-.704-.16-1.248-.472-1.632-.936-.384-.464-.576-1.08-.576-1.848v-.288H.256v.576c0 .464.08.924.24 1.38.16.456.404.88.732 1.272.328.392.744.728 1.248 1.008s1.108.476 1.812.588v1.512h1.728zM4.288 7.424c-.688-.128-1.164-.332-1.428-.612-.264-.28-.396-.644-.396-1.092 0-.464.176-.832.528-1.104.352-.272.784-.448 1.296-.528v3.336zm1.728 5.712V9.344c.768.128 1.328.328 1.68.6.352.272.528.688.528 1.248 0 .544-.196.984-.588 1.32-.392.336-.932.544-1.62.624z"
		/>
	</svg>
);

const IconPeople = ({ className = '', ...props }) => (
	<svg className={className} xmlns="http://www.w3.org/2000/svg" width="13" height="16" {...props}>
		<path
			fill="#9EBBBD"
			d="M9.573 7.729c.406 0 .784.07 1.126.209.342.14.639.33.881.569.232.227.438.503.614.82a5.1 5.1 0 01.407.949c.097.312.178.654.242 1.016.062.359.105.699.126 1.011.02.307.031.624.031.945 0 .836-.259 1.512-.768 2.01-.504.492-1.17.742-1.98.742H2.748c-.81 0-1.477-.25-1.98-.742C.259 14.76 0 14.084 0 13.248c0-.322.01-.64.032-.945.02-.312.063-.652.126-1.01.063-.363.144-.705.242-1.017.1-.323.238-.643.407-.948.176-.318.382-.594.613-.821.243-.238.54-.43.882-.57.342-.138.72-.208 1.125-.208.16 0 .313.067.61.265.183.123.397.264.636.421.204.134.48.259.822.372.333.11.671.167 1.005.167a3.19 3.19 0 001.006-.167c.341-.113.618-.238.822-.372l.636-.42c.296-.2.45-.266.61-.266zM6.598 0C7.63 0 8.522.38 9.252 1.129s1.094 1.606 1.094 2.545c0 .938-.365 1.797-1.094 2.546-.73.748-1.623 1.129-2.654 1.129-1.03 0-1.924-.38-2.653-1.129C3.216 5.471 2.85 4.613 2.85 3.674c0-.939.366-1.797 1.095-2.545C4.674.379 5.567 0 6.598 0z"
		/>
	</svg>
);

const Logo = ({ className = '', ...props }) => (
	<svg className={className} xmlns="http://www.w3.org/2000/svg" width="87" height="54" {...props}>
		<path
			fill="#3D6666"
			d="M6.72 17.472c.944 0 1.792-.12 2.544-.36s1.392-.584 1.92-1.032a4.476 4.476 0 001.212-1.62c.28-.632.42-1.34.42-2.124v-.288c0-1.472-.464-2.584-1.392-3.336-.928-.752-2.272-1.288-4.032-1.608a14.615 14.615 0 01-1.74-.408c-.456-.144-.824-.308-1.104-.492-.28-.184-.476-.392-.588-.624a1.771 1.771 0 01-.168-.78c0-.56.232-1.004.696-1.332.464-.328 1.096-.492 1.896-.492.944 0 1.676.248 2.196.744.52.496.78 1.08.78 1.752v.576h3.168v-.864a5 5 0 00-.396-1.968 4.762 4.762 0 00-1.176-1.656C10.436 1.08 9.792.7 9.024.42 8.256.14 7.376 0 6.384 0c-.88 0-1.676.12-2.388.36s-1.32.576-1.824 1.008c-.504.432-.896.94-1.176 1.524-.28.584-.42 1.22-.42 1.908v.144c0 .832.144 1.536.432 2.112a3.978 3.978 0 001.212 1.44c.52.384 1.132.692 1.836.924.704.232 1.48.42 2.328.564.64.112 1.168.248 1.584.408.416.16.744.34.984.54s.408.424.504.672c.096.248.144.508.144.78 0 .576-.232 1.072-.696 1.488-.464.416-1.176.624-2.136.624-1.232 0-2.14-.3-2.724-.9-.584-.6-.876-1.404-.876-2.412v-.576H0v.72c0 .88.144 1.692.432 2.436a5.47 5.47 0 001.272 1.944c.56.552 1.26.984 2.1 1.296.84.312 1.812.468 2.916.468zm22-.336V10.8h3.408c.864 0 1.616-.144 2.256-.432a4.707 4.707 0 001.596-1.14 4.833 4.833 0 00.96-1.608c.216-.6.324-1.212.324-1.836v-.576c0-.608-.108-1.204-.324-1.788a4.625 4.625 0 00-.96-1.56A4.737 4.737 0 0034.384.756c-.64-.28-1.392-.42-2.256-.42h-6.576v16.8h3.168zm3.096-9.36H28.72V3.36h3.096c.704 0 1.26.192 1.668.576.408.384.612.88.612 1.488v.288c0 .608-.204 1.104-.612 1.488-.408.384-.964.576-1.668.576zm29.464 9.36v-3.024h-7.632V.336H50.48v16.8h10.8zm24.88 0v-3.024h-4.032V3.36h4.032V.336H74.928V3.36h4.032v10.752h-4.032v3.024H86.16zm-78.096 36V39.36h4.464v-3.024H.432v3.024h4.464v13.776h3.168zm24.688 0V39.36h4.464v-3.024H25.12v3.024h4.464v13.776h3.168zm28.624 0v-3.024h-7.728v-3.888H60.8V43.2h-7.152v-3.84h7.44v-3.024H50.48v16.8h10.896zm16.744 0V46.8h3.648c.464 0 .796.12.996.36.2.24.3.552.3.936v5.04h3.168v-5.808c0-.56-.164-1.024-.492-1.392-.328-.368-.772-.584-1.332-.648v-.432c.768-.32 1.336-.78 1.704-1.38a3.63 3.63 0 00.552-1.932v-.576c0-.64-.116-1.24-.348-1.8a4.332 4.332 0 00-1.008-1.476c-.44-.424-.988-.756-1.644-.996-.656-.24-1.416-.36-2.28-.36h-6.432v16.8h3.168zm3.024-9.36H78.12V39.36h3.024c.768 0 1.352.204 1.752.612.4.408.6.892.6 1.452v.288c0 .656-.2 1.164-.6 1.524-.4.36-.984.54-1.752.54z"
		/>
	</svg>
);

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

	// Sanitizador ligero reutilizable
	const sanitize = useCallback(
		(
			next,
			{ allowDecimal = false, maxIntegerDigits = Infinity, maxDecimalDigits = Infinity } = {}
		) => {
			let s = String(next ?? '');

			if (allowDecimal) {
				s = s.replace(/[^0-9.]/g, '');
				const parts = s.split('.');
				if (parts.length > 2) {
					s = parts.shift() + '.' + parts.join('');
				}
				if (s.includes('.')) {
					const [intPart, decPart] = s.split('.');
					const intClamped = intPart.slice(0, maxIntegerDigits);
					const decClamped = decPart.slice(0, maxDecimalDigits);
					s = decClamped.length > 0 ? `${intClamped}.${decClamped}` : intClamped;
				} else {
					s = s.slice(0, maxIntegerDigits);
				}
			} else {
				s = s.replace(/\D/g, '');
				s = s.slice(0, maxIntegerDigits);
			}

			return s;
		},
		[]
	);

	// Calcular el monto de propina por persona
	const tipAmount = useMemo(() => {
		if (!bill || !people || people === '0') {
			return '0.00';
		}

		const billNum = parseFloat(bill);
		const peopleNum = parseInt(people, 10);

		if (isNaN(billNum) || isNaN(peopleNum) || peopleNum === 0) {
			return '0.00';
		}

		const activePercent = customTip ? parseFloat(customTip) : tipPercent;
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

		if (isNaN(billNum) || isNaN(peopleNum) || peopleNum === 0) {
			return '0.00';
		}

		const activePercent = customTip ? parseFloat(customTip) : tipPercent;
		const total = (billNum * (1 + activePercent / 100)) / peopleNum;
		return total.toFixed(2);
	}, [bill, people, tipPercent, customTip]);

	// Validar número de personas
	const handleSetPeople = useCallback(
		(value) => {
			const cleaned = sanitize(value, { allowDecimal: false, maxIntegerDigits: 6 });
			setPeople(cleaned);

			if (cleaned === '0' || (parseInt(cleaned || '0', 10) === 0 && cleaned !== '')) {
				setError(true);
			} else {
				setError(false);
			}
		},
		[sanitize]
	);

	// Función para resetear todo
	const resetCalculator = useCallback(() => {
		setBill('');
		setTipPercent(0);
		setCustomTip('');
		setPeople('');
		setError(false);
	}, []);

	const calculatedValues = useMemo(
		() => ({
			tipAmount,
			totalAmount,
		}),
		[tipAmount, totalAmount]
	);

	const inputHandlers = useMemo(
		() => ({
			setBill,
			setTipPercent,
			setCustomTip,
			setPeople: handleSetPeople,
			resetCalculator,
		}),
		[handleSetPeople, resetCalculator]
	);

	const value = useMemo(
		() => ({
			bill,
			tipPercent,
			customTip,
			people,
			error,
			...calculatedValues,
			...inputHandlers,
		}),
		[bill, tipPercent, customTip, people, error, calculatedValues, inputHandlers]
	);

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
			<main className="flex min-h-screen min-w-full flex-col bg-cyan-200 font-mono transition-all duration-300 md:items-center md:justify-center">
				<h1 className="sr-only">Splitter - Tip Calculator</h1>
				<Logo className="mx-auto mt-12 mb-8 md:mt-0 md:mb-12" role="img" aria-hidden="true" />
				<Calculator />
			</main>
		</TipCalculatorProvider>
	);
}

const Calculator = () => {
	return (
		<section
			className="w-full max-w-4xl rounded-2xl bg-white p-8 text-cyan-900 shadow-xl transition-all duration-300 md:flex md:p-10"
			aria-labelledby="calculator-heading"
		>
			<h2 id="calculator-heading" className="sr-only">
				Tip calculator
			</h2>
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

	const sanitizeLocal = useCallback(
		(value, { maxIntegerDigits = 12, maxDecimalDigits = 2 } = {}) => {
			let s = String(value ?? '');
			s = s.replace(/[^0-9.]/g, '');
			const parts = s.split('.');
			if (parts.length > 2) {
				s = parts.shift() + '.' + parts.join('');
			}
			if (s.includes('.')) {
				const [intPart, decPart] = s.split('.');
				const intClamped = intPart.slice(0, maxIntegerDigits);
				const decClamped = decPart.slice(0, maxDecimalDigits);
				s = decClamped.length > 0 ? `${intClamped}.${decClamped}` : intClamped;
			} else {
				s = s.slice(0, maxIntegerDigits);
			}
			return s;
		},
		[]
	);

	const handleTipClick = useCallback(
		(percent) => {
			setTipPercent(percent);
			setCustomTip('');
		},
		[setTipPercent, setCustomTip]
	);

	const handleBillChange = useCallback(
		(value) => {
			const cleaned = sanitizeLocal(value, { maxIntegerDigits: 12, maxDecimalDigits: 2 });
			setBill(cleaned);
		},
		[setBill, sanitizeLocal]
	);

	const handleCustomChange = useCallback(
		(value) => {
			const cleaned = sanitizeLocal(value, { maxIntegerDigits: 3, maxDecimalDigits: 2 });
			setCustomTip(cleaned);
			setTipPercent(0);
		},
		[setCustomTip, setTipPercent, sanitizeLocal]
	);

	return (
		<div className="transition-all duration-300 md:w-1/2 md:pr-8">
			<div className="mb-8 md:mb-6">
				<label htmlFor="bill" className="mb-3 block text-sm font-semibold text-gray-500">
					Bill
				</label>
				<Inputs
					icon="dollar"
					text="0"
					id="bill"
					name="bill"
					value={bill}
					onChange={handleBillChange}
				/>
			</div>

			<fieldset className="mb-10 border-0 p-0 md:mb-8">
				<legend className="mb-4 text-sm font-semibold text-gray-500 md:mb-3">Select Tip %</legend>

				<div className="grid grid-cols-2 grid-rows-3 gap-4 text-white transition-all duration-300 md:grid-cols-3 md:grid-rows-2">
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

					<div className="flex items-center justify-between rounded-md border-2 border-transparent bg-gray-100 px-5 py-3 transition-all duration-300 focus-within:border-cyan-400 hover:cursor-pointer hover:border-cyan-400">
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
							className="w-full bg-transparent text-right text-xl font-bold text-cyan-900 placeholder:text-gray-400 focus:outline-none"
						/>
					</div>
				</div>
			</fieldset>

			<div className="mb-8 md:mb-6">
				<div className="mb-3 flex justify-between">
					<label htmlFor="people" className="text-sm font-semibold text-gray-500">
						Number of People
					</label>
					<span
						id="mjs-error"
						className={`text-xs text-red-500 transition-all duration-300 ${error ? 'visible' : 'invisible'}`}
						role={error ? 'alert' : undefined}
						aria-live={error ? 'assertive' : 'off'}
					>
						{"Can't be zero"}
					</span>
				</div>
				<Inputs
					icon="people"
					text="0"
					id="people"
					name="people"
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
		<section
			className="flex w-full flex-col gap-8 rounded-xl bg-cyan-900 p-8 transition-all duration-300 md:w-1/2 md:justify-between"
			aria-labelledby="results-heading"
		>
			<h2 id="results-heading" className="sr-only">
				Results
			</h2>
			<div className="flex h-full flex-col">
				<div className="mt-4 flex justify-between">
					<div className="flex flex-col">
						<span className="text-sm text-white">Tip Amount</span>
						<span className="text-xs text-gray-400">/ person</span>
					</div>
					<p
						id="tip-amount"
						className="flex items-center text-5xl font-bold text-cyan-400"
						aria-live="polite"
						aria-atomic="true"
					>
						<span className="mr-1" aria-hidden="true">
							$
						</span>
						<span className="sr-only">Tip amount per person: </span>
						{tipAmount}
					</p>
				</div>

				<div className="mt-10 flex justify-between">
					<div className="flex flex-col">
						<span className="text-sm text-white">Total</span>
						<span className="text-xs text-gray-400">/ person</span>
					</div>
					<p
						id="total"
						className="flex items-center text-5xl font-bold text-cyan-400"
						aria-live="polite"
						aria-atomic="true"
					>
						<span className="mr-1" aria-hidden="true">
							$
						</span>
						<span className="sr-only">Total per person: </span>
						{totalAmount}
					</p>
				</div>
			</div>
			<button
				className="rounded-md bg-cyan-400 px-5 py-3 text-xl font-bold text-cyan-900 transition-all duration-300 hover:cursor-pointer hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-cyan-900 disabled:text-cyan-600"
				type="button"
				onClick={resetCalculator}
				disabled={!hasData}
			>
				RESET
			</button>
		</section>
	);
};

const Inputs = memo(
	({
		icon = 'dollar',
		text = '0',
		id = 'bill',
		name = 'bill',
		value = '',
		onChange,
		hasError = false,
		ariaDescribedBy,
	}) => {
		const handleChange = useCallback(
			(e) => {
				const next = e.target.value;

				if (typeof onChange === 'function') {
					if (icon === 'dollar') {
						let s = String(next ?? '').replace(/[^0-9.]/g, '');
						const parts = s.split('.');
						if (parts.length > 2) {
							s = parts.shift() + '.' + parts.join('');
						}
						if (s.includes('.')) {
							const [intPart, decPart] = s.split('.');
							s = decPart.length > 0 ? `${intPart}.${decPart.slice(0, 2)}` : intPart;
						}
						onChange(s);
					} else {
						const cleaned = String(next ?? '')
							.replace(/\D/g, '')
							.slice(0, 6);
						onChange(cleaned);
					}
				}
			},
			[onChange, icon]
		);

		return (
			<div
				className={`flex items-center justify-between rounded-md border-2 bg-gray-100 px-5 py-3 transition-all duration-300 focus-within:border-cyan-400 hover:cursor-pointer ${
					hasError ? 'border-red-500 hover:border-red-500' : 'border-transparent'
				}`}
			>
				{icon === 'dollar' ? (
					<IconDollar className="h-4 w-4" aria-hidden="true" />
				) : (
					<IconPeople className="h-4 w-4" aria-hidden="true" />
				)}

				<input
					type="text"
					inputMode={icon === 'dollar' ? 'decimal' : 'numeric'}
					pattern={icon === 'dollar' ? '^[0-9]*\\.?[0-9]{0,2}$' : '^[0-9]*$'}
					id={id}
					name={name}
					value={value}
					onChange={handleChange}
					placeholder={text}
					aria-invalid={hasError}
					aria-describedby={ariaDescribedBy}
					className={`w-full bg-transparent text-right text-2xl font-bold transition-all duration-300 placeholder:text-gray-400 focus:outline-none ${
						hasError ? 'text-red-500' : 'text-cyan-900'
					}`}
				/>
			</div>
		);
	}
);

Inputs.displayName = 'Inputs';

const Button = memo(({ text = 'Reset', id = '', ariaLabel = '', isActive = false, onClick }) => {
	return (
		<button
			type="button"
			className={`rounded-md px-5 py-3 text-center text-xl font-bold transition-all duration-300 hover:cursor-pointer ${
				isActive
					? 'bg-cyan-400 text-cyan-900'
					: 'bg-cyan-900 text-white hover:bg-cyan-300 hover:text-cyan-900'
			}`}
			id={id}
			aria-label={ariaLabel || `Select ${text}`}
			aria-pressed={isActive}
			onClick={onClick}
		>
			{text}
		</button>
	);
});

Button.displayName = 'Button';

//@ts-nocheck
import PropTypes from 'prop-types';
import IconDollar from './assets/images/icon-dollar.svg?react';
import IconPeople from './assets/images/icon-person.svg?react';
import Logo from './assets/images/logo.svg?react';
import { createContext, useContext, useState, useMemo, memo, useCallback } from 'react';

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
			// next: string
			let s = String(next ?? '');

			// eliminar todo lo que no sean dígitos o punto
			if (allowDecimal) {
				// conservar solo dígitos y puntos
				s = s.replace(/[^0-9.]/g, '');
				// si hay más de un punto, eliminar los extra (dejar el primero)
				const parts = s.split('.');
				if (parts.length > 2) {
					s = parts.shift() + '.' + parts.join('');
				}
				// controlar longitud parte entera y decimales
				if (s.includes('.')) {
					const [intPart, decPart] = s.split('.');
					const intClamped = intPart.slice(0, maxIntegerDigits);
					const decClamped = decPart.slice(0, maxDecimalDigits);
					s = decClamped.length > 0 ? `${intClamped}.${decClamped}` : intClamped;
				} else {
					s = s.slice(0, maxIntegerDigits);
				}
			} else {
				// solo enteros: eliminar todo menos dígitos
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

	// Validar número de personas (usando sanitize)
	const handleSetPeople = useCallback(
		(value) => {
			// Sanitizamos: solo dígitos, sin decimales, máximo 6 dígitos por ejemplo
			const cleaned = sanitize(value, { allowDecimal: false, maxIntegerDigits: 6 });

			// Si el usuario intenta ingresar algo no numérico, cleaned será '' o dígitos
			// Actualizamos el estado con la cadena limpia
			setPeople(cleaned);

			// Error si es cero (cuando no vacío)
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

	// Separar valores calculados y handlers para optimizar re-renders
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
			// Estados
			bill,
			tipPercent,
			customTip,
			people,
			error,
			// Valores calculados
			...calculatedValues,
			// Handlers
			...inputHandlers,
		}),
		[bill, tipPercent, customTip, people, error, calculatedValues, inputHandlers]
	);

	return <TipCalculatorContext.Provider value={value}>{children}</TipCalculatorContext.Provider>;
};

TipCalculatorProvider.propTypes = {
	children: PropTypes.node.isRequired,
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

	// Sanitizador para handler de bill y custom (usado localmente)
	const sanitizeLocal = useCallback(
		(value, { maxIntegerDigits = 12, maxDecimalDigits = 2 } = {}) => {
			// reutilizamos la misma lógica: permitir punto y dos decimales por defecto
			// quitar caracteres inválidos
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
			setCustomTip(''); // Limpiar custom cuando se selecciona un botón
		},
		[setTipPercent, setCustomTip]
	);

	// Validación ligera para bill: permitir números y máximo 2 decimales, no negativos
	const handleBillChange = useCallback(
		(value) => {
			// Sanitizamos con allow decimal y max 2 decimales
			const cleaned = sanitizeLocal(value, { maxIntegerDigits: 12, maxDecimalDigits: 2 });
			setBill(cleaned);
		},
		[setBill, sanitizeLocal]
	);

	// Validación para custom tip: máximo 3 dígitos antes, 2 después
	const handleCustomChange = useCallback(
		(value) => {
			const cleaned = sanitizeLocal(value, { maxIntegerDigits: 3, maxDecimalDigits: 2 });
			setCustomTip(cleaned);
			setTipPercent(0); // Limpiar botones cuando se usa custom
		},
		[setCustomTip, setTipPercent, sanitizeLocal]
	);

	return (
		<div className="transition-all duration-300 md:w-1/2 md:pr-8">
			<div className="mb-8 md:mb-6">
				<label htmlFor="bill" className="text-md mb-3 block text-neutral-grey-500">
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
				<legend className="text-md mb-4 font-semibold text-neutral-grey-500 md:mb-3">
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
					<label htmlFor="people" className="text-md font-semibold text-neutral-grey-500">
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
						<span className="text-md text-neutral-grey-400">/ person</span>
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
						<span className="text-md text-neutral-grey-400">/ person</span>
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

const Inputs = memo(
	({
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
		const handleChange = useCallback(
			(e) => {
				const next = e.target.value;
				// Sanitizador: para dollar permitimos punto y 2 decimales; para people solo dígitos
				if (typeof onChange === 'function') {
					if (icon === 'dollar') {
						// permitir hasta 2 decimales y muchos enteros
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
						// people: solo dígitos, máximo 6 digitos por ejemplo
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
					pattern={icon === 'dollar' ? '^[0-9]*\\.?[0-9]{0,2}$' : '^[0-9]*$'}
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
	}
);

Inputs.displayName = 'Inputs';

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

const Button = memo(({ text = 'Reset', id = '', ariaLabel = '', isActive = false, onClick }) => {
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
});

Button.displayName = 'Button';

Button.propTypes = {
	text: PropTypes.string,
	id: PropTypes.string,
	ariaLabel: PropTypes.string,
	isActive: PropTypes.bool,
	onClick: PropTypes.func,
};

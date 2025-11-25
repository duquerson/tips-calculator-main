//@ts-nocheck
import IconDollar from './assets/images/icon-dollar.svg?react'
import IconPeople from './assets/images/icon-person.svg?react'
import Logo from './assets/images/logo.svg?react'

export default function App() {
	return (
		<main className="bg-primary-green/50 font-mono min-w-full min-h-screen flex flex-col justify-center">
			<Logo className="mt-32 mb-4 mx-auto" />
			<Calculator />
		</main>
	)
}

const Calculator = () => {
	return (
		<section className="min-w-93.75 bg-neutral-white rounded-2xl p-8 shadow-xl text-neutral-green-900">
			<Tips />
			<TipsResult />
		</section>
	)
}

const Tips = () =>{
	return (
		<>
			<h1 className="mb-3 text-xs text-neutral-grey-500">Bill</h1>
			<Inputs icon="dollar" text="0" id="bill" name="bill" />
			<h2 className='text-neutral-grey-500 text-xs mb-4 font-semibold'>Select Tip %</h2>
			<section className='grid grid-cols-2 grid-rows-3 gap-7 text-white  mb-10'>
				{[5, 10, 15, 25, 50].map((percent) => {
					return (
						<Button key={percent} text={`${percent}%`} id={`${percent}`} />
					);
				})}
				<div className='bg-neutral-grey-200/50 rounded-md py-3 px-5 flex justify-between items-center min-w-28 border-2 border-transparent hover:border-primary-green hover:cursor-pointer'>
					<input type="number" name="custom" id="custom" placeholder="Custom" className="w-full text-xl font-semibold text-right focus:outline-none text-cyan-950 bg-transparent "/>
				</div>
			</section>
			<h2 className='mb-3 text-xs text-neutral-grey-500 font-semibold'>Number of People</h2>
			<Inputs icon="people" text="0" id="people" name="people" />
		</>
	)
}

const TipsResult = () => {
	return (
		<article className='bg-neutral-green-900 rounded-xl p-7 flex  flex-col gap-8'>
			<section className='flex justify-between'>
				<div className='flex flex-col'>
					<h2 className='text-white'>Tip Amount</h2>
					<h3 className='text-neutral-grey-500 text-xs'>/ person</h3>
				</div>
				<p id='tip-amount' className='text-primary-green flex font-semibold text-xl  items-center'><span className='text-2xl mr-1'>$</span> 0.00</p>
			</section>
			<section className='flex justify-between'>
				<div className='flex flex-col'>
					<h2 className='text-white'>Total</h2>
					<h3 className='text-neutral-grey-500 text-xs'>/ person</h3>
				</div>
				<p id='total' className='text-primary-green flex font-semibold text-xl  items-center'> <span className='text-2xl mr-1'>$</span> 0.00</p>
			</section>
			<button className='bg-primary-green text-neutral-green-900 rounded-md py-3 px-5 font-semibold text-xl hover:bg-primary-green/50 hover:cursor-pointer transition'>RESET</button>
	
		</article>
	)
}

const Inputs = ({ icon = "dollar", text = "0", id = "bill", name = "bill" }) => {
	return (
		<section className="py-3 px-5 bg-neutral-grey-200/50 flex justify-between items-center rounded-md mb-8 border-2 border-transparent hover:border-primary-green hover:cursor-pointer" id={id}>
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
					className="text-right text-inputs focus:outline-none text-cyan-950 bg-transparent w-24 font-semibold"
				/>
			</div>
		</section>
	)
}

const Button = ({ text = "Reset", id = "" }) => {
	return (
		<button type="button" className="rounded-md py-3 px-5 min-w-28 bg-neutral-green-900 font-semibold text-center text-xl hover:bg-primary-green/80 hover:cursor-pointer transition hover:text-neutral-green-900" id={id}>
			{text}
		</button>
	)
}
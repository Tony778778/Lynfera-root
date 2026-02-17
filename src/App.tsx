import { useEffect, useRef, useState } from "react"
import FractalTree from "./components/FractalTree"

function App() {
	const [timer, setTimer] = useState(15)
	const timerRef = useRef<null | number>(null)
	const redirectUrl = import.meta.env.VITE_PUBLIC_REDIRECT_URL
	useEffect(() => {

		timerRef.current = setInterval(() => {
			setTimer(prev => {
				if (prev <= 1) {
					window.location.href = redirectUrl
					return 0
				}
				return prev - 1
			})
		}, 1000)

		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current)
			}
		}
	}, [])

	return (
		<div className="relative h-screen w-screen">
			<FractalTree
				primaryColor={'rgb(169, 169, 169)'}
				maxDepth={30}
				branchLength={6}
				branchProbability={0.5}
				growthSpeed={40}
			/>
			<div className="py-6 h-full w-full flex items-center justify-center flex-col gap-4">
				<div>
					<img src="/icon.svg" alt="" className="size-15 opacity-80" />
				</div>
				<div className="flex flex-col items-center justify-center gap-3">
					<h2 className="text-2xl tracking-wider font-semibold">LYNFERA</h2>
					<p className="text-neutral-300">Build with us</p>
				</div>
				<div>
					<p className="text-neutral-300">Redirecting to <span className="text-sky-400/80 hover:underline">{redirectUrl}</span> in {timer}...</p>
				</div>
				<div className="mt-6">
					<button className="border border-neutral-700 rounded-md cursor-pointer hover:bg-neutral-500 duration-700 transition-colors" style={{ padding: "10px 20px" }} onClick={() => setTimer(timer + 20)}>Increase timer</button>
				</div>
			</div>
		</div>
	)
}

export default App

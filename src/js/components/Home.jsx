import React, { useEffect } from "react";

//include images into your bundle

//create your first component
const Home = () => {
	const [isTimer, setIsTimer] = React.useState(false);
	const [isPaused, setIsPaused] = React.useState(true);
	const [toTimer, setToTimer] = React.useState(360);
	const [displayTime, setDisplayTime] = React.useState(() => (isTimer ? toTimer : 0))

	useEffect(() => {
		if (isPaused) {
			return;
		}
		const interval = setInterval(() => {
			if(!isTimer) {
				setDisplayTime((prevTime) => prevTime + 1);
			}
			else if (displayTime <= 0) {
				setIsPaused(true);
				setDisplayTime(0);
				alert("Time's up!");
			}
			setDisplayTime((prevTime) => prevTime - 1);
		}, 1000);

		return () => clearInterval(interval);
	}
	, [isPaused, isTimer]);
	return (
	<div>
		<div className="display">{displayTime.toString().padStart(8, "⏱️000000")}</div>
		<div className="container">
		<input
    		type="number"
			className="input"
			placeholder={toTimer}
    		onKeyDown={(e) => {
        	if (e.key === "Enter") {
            setToTimer(Number(e.target.value));
			setDisplayTime(Number(e.target.value));
        	}}}
    	/> <p>Type a new value to timer and press Enter</p>
		</div>
		<div className="container">
			<button 
			onClick={() => {
				if (isTimer) return;
				setIsTimer(true);
				setIsPaused(true);
				setDisplayTime(toTimer);
			}}
			className="button"
			>Timer</button>
			<button
			onClick={() => {
				if (!isTimer) return;
				setIsTimer(false);
				setIsPaused(true);
				setDisplayTime(0);
			}}
			className="button">Chrono</button>
		</div>
		<div className="container">
			<button
			onClick={() => {
				setIsPaused(!isPaused);
			}}
			className="button">{isPaused ? "Start" : "Pause"}</button>
			<button
			onClick={() => {
				setIsPaused(true);
				setDisplayTime(isTimer ? toTimer : 0);
			}}
			className="button">Reset</button>
		</div>
	</div>
	);
};

export default Home;
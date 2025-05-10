import React, { useEffect } from "react";

//include images into your bundle

//create your first component
const Home = () => {
	const [isTimer, setIsTimer] = React.useState(false); // Para seleccionar el temporizador
	const [isPaused, setIsPaused] = React.useState(true); // Para seleccionar Inicio o Pausa
	const [toTimer, setToTimer] = React.useState(360); // Guarda el valor del temporizador
	const [displayTime, setDisplayTime] = React.useState(() => (isTimer ? toTimer : 0)) // Valor mostrado

	useEffect(() => {
		if (isPaused) {
			return;
		} // Detiene el cronómetro/temporizador
		if (displayTime <= 0 && isTimer) {
				setIsPaused(true);
				alert("Time's up!");
				return;
			} // Detiene el temporizador cuando llega a 0 y nuestra una alerta
		const interval = setInterval(() => {
			if(!isTimer) {
				setDisplayTime((prevTime) => prevTime + 1);
			}
			else setDisplayTime((prevTime) => prevTime - 1);
		}, 1000);

		return () => clearInterval(interval);
	}
	, [isPaused, displayTime]); // Dependencias necesarias aseguran que el efecto se ejecuta
	// Ambas dependencias cambian durante la ejecución del efecto y son usadas en los condicionales
	return (
	<div>
		<div className="display">{displayTime.toString().padStart(8, "⏱️000000")}</div>
		<div className="container">
			<button
			onClick={() => {
				setIsPaused(!isPaused); // Alterna entre inicio y pausa
			}}
			className={`button ${isPaused ? "start" : "pause"}`}>{isPaused ? "Start" : "Pause"}</button>
			<button
			onClick={() => {
				setIsPaused(true);
				setDisplayTime(isTimer ? toTimer : 0); // Regresa a los valores iniciales o al valor introducido por el usuario
			}}
			className="button">Reset</button>
		</div>
		<div className="container">
			<button // Activa el temporizador
			onClick={() => {
				if (isTimer) return;
				setIsTimer(true);
				setIsPaused(true);
				setDisplayTime(toTimer);
			}}
			className={`button ${isTimer ? "active" : ""}`}
			>Timer</button>
			<button //Activa el cronómetro
			onClick={() => {
				if (!isTimer) return;
				setIsTimer(false);
				setIsPaused(true);
				setDisplayTime(0);
			}}
			className={`button ${!isTimer ? "active" : ""}`}
			>Chrono</button>
		</div>
		{isTimer?
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
		</div> : null}
	</div>
	);
};

export default Home;
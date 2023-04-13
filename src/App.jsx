import { useState, useEffect } from 'react';

import './App.css';

function App() {
	const [count, setCount] = useState(0);
	const [img, setImg] = useState('');
	const [res, setRes] = useState([]);
	const Submit = () => {
		fetchRequest();
		setImg();
	};

	const fetchRequest = async () => {
		const data = await fetch(
			`https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${'srQKVA6ySIeGoAcG7rGZkSOCn0IPkf9OcIBwgK4w6cI'}&per_page=20`
		);
		const dataJ = await data.json();
		const result = dataJ.results;
		console.log(img);
		console.log(result);
		setRes(result);
	};
	useEffect(() => {
		fetchRequest();
	}, []);

	useEffect(() => {
		const listener = event => {
		  if (event.code === "Enter" || event.code === "NumpadEnter") {
			console.log("Enter key was pressed. Run your function.");
			event.preventDefault();
			// callMyFunction();
			Submit();
		  }
		};
		document.addEventListener("keydown", listener);
		return () => {
		  document.removeEventListener("keydown", listener);
		};
	  }, []);

	return (
		<div className="App container-fluid">
			<div className="row">
				<div className="col-12 d-flex justify-content-evenly flex-wrap">
					{res.map((val) => {
						return (
							<>
								<img
									key={val.id}
									className="col-3 img-fluid img-thumbnail"
									src={val.urls.small}
									alt="val.alt_description"
								/>
							</>
						);
					})}
				</div>
				<div className="card">
					<button onClick={() => setCount((count) => count + 1)}>
						count is {count}
					</button>
				</div>
				<div className="col-12 d-flex justify-content-center align-items-center input">
					<input
						className="col-3 form-control-sm py-1 fs-4 text-capitalize border border-3 border-dark"
						type="text"
						onChange={(e) => setImg(e.target.value)}
						value={img}
						placeholder="Search Anything..."
					/>
					<button
						type="submit"
						onClick={Submit}
						className="btn bg-dark text-white fs-3 mx-3"
					>
						Search
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;

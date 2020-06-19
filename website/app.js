/* Global Variables */
//credentials
const key = '2af85d77026a9c00d226ea7dbe247257';
// let zip;
const baseurl = `https://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=${key}`;
const api = 'http://localhost:8080/';

const postData = async (url, data) => {
	const res = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	try {
		const newData = await res.json();
		return newData;
	} catch (err) {
		console.log('error', err);
	}
	// // console.log(res);
};

const getData = async (url, usr) => {
	const res = await fetch(url);
	try {
		const data = await res.json();
		data.user = usr;
		let d = new Date();
		let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
		data.date = newDate;
		// console.log(data);
		return data;
	} catch (err) {
		console.log('Error', err);
	}
};

document.getElementById('generate').addEventListener('click', () => {
	getData(baseurl, 'some user data')
		.then((data) => {
			postData('http://localhost:8080/add', data);
		})
		.then(() => {
			updateUI('http://localhost:8080/all');
		})
		.catch((error) => console.log('Error', error));
});

// event listener to run the asynchronus function
// document.getElementById('generate').addEventListener('click', (e) => {
// 	console.log('Clicked');
// 	e.preventDefault();
// 	// zip = document.getElementById('zip').value;
// 	zip = 94040;
// 	console.log(zip);
// 	user = document.getElementById('feelings').value;
// 	const data = await getData(baseurl, user);
// 	const response = await postData(data);
// 	console.log(response);
// });

const updateUI = async (url) => {
	const res = await fetch(url);

	const data = await res.json();
	console.log(data);
	document.getElementById('date').innerText = data.date;
	document.getElementById('temp').innerText = data.temperature;
	document.getElementById('content').innerText = data.user;
};

// Create a new date instance dynamically with JS

// JS Code here...


let btnSubmit = document.getElementById("btn-submit");
localStorage.clear();

btnSubmit.addEventListener("click", function(e){
	e.preventDefault()
	let today = new Date();
	today = today.toDateString();
	let id = setId();
	let product = document.getElementById("product").value;
	let price = document.getElementById("price").value;
	let iva = ""

	if (product == "" || price == "") {
		alert("Product and price box must not be empty");
	}
	if (iva === "") {
		iva = 0.21;
	}
	let total = price * iva;
	let fullProduct = {
		id:id,
		product: document.getElementById("product").value,
		price: document.getElementById("price").value,
		iva:iva,
		total: total,
		date:today
	}
	saveData(fullProduct);
	renderData();
} );

const setId = () => {
	let id = Math.floor(Math.random() * (999 - 1) + 1);
	return id;
}

function saveData(fullProduct){
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks'))
	}
	tasks.push(fullProduct);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}


function renderData(){
	const tableBody = document.querySelector(".body-table");

	tableBody.innerHTML = "";
	const tasks = JSON.parse(localStorage.getItem('tasks'));
	const headers = `<thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Price</th>
            <th>IVA</th>
            <th>Total</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
        </thead>`
        document.querySelector(".body-table").insertAdjacentHTML('beforeend', headers);
	tasks.forEach(task => {
		const row = `<tr>
			<td class="td">${task.id}</td>
			<td class="td">${task.product}</td>
			<td class="td">${task.price}</td>
			<td class="td">${task.iva}</td>
			<td class="td">${task.total}</td>
			<td class="td">${task.date}</td>
			<td class="td"><button>DELETE</button></td>
		</tr>`
		document.querySelector(".body-table").insertAdjacentHTML('beforeend', row);
	});
}


document.getElementById('start_btn').addEventListener('click',
	(e) => {
		handleWithPromise().
		then(() => { document.getElementById('status').innerHTML='Accepted';}).
		catch(() => {document.getElementById('status').innerHTML='Rejected'});
	}
)

function handleWithPromise() {
// add yout code here. The function should return a promise and implement all the requested behavior.
	
	document.getElementById("status").innerHTML="Promise pending. Please click on a button to accept or reject the promise.";
	return new Promise((resolve, reject) => {
		document.getElementById('accept_btn').addEventListener('click',
		() => {
			resolve();
		});
		document.getElementById('reject_btn').addEventListener('click',
		() => {
			reject();
		});
	});
}



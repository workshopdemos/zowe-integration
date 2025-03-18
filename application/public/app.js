document.getElementById('list-btn').addEventListener('click', async () => {
    fetchStcList();
});

document.getElementById('start-btn').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/startSTC');
        const data = await response.json();
        console.log(data);
        fetchStcList();
    } catch (error) {
        console.error('Error starting STC:', error);
    }
});

document.getElementById('stop-btn').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/stopSTC');
        const data = await response.json();
        console.log(data);
        fetchStcList();
    } catch (error) {
        console.error('Error stopping STC:', error);
    }
});

async function fetchStcList() {
    try {
        const tableBody = document.getElementById('stc-table').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';

        const response = await fetch('/api/getList');
        const data = await response.json();

        data.list.forEach(item => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = item.jobname || 'N/A';
            row.insertCell(1).textContent = item.owner || 'N/A';
            row.insertCell(2).textContent = item.status || 'N/A';
        });
    } catch (error) {
        console.error('Error retrieving STC list:', error);
    }
}

window.onload = fetchStcList;

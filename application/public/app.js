let isRunning = true;

function getTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function addLogMessage(message) {
    const logTextarea = document.getElementById('log');
    logTextarea.value += `${getTimestamp()} ${message}\n`;
    logTextarea.scrollTop = logTextarea.scrollHeight;
}

async function fetchStcList() {
    const tableBody = document.getElementById('stc-table').getElementsByTagName('tbody')[0];

    try {
        tableBody.innerHTML = 'Loading...';
        const response = await fetch('/api/getList');
        const data = await response.json();
        tableBody.innerHTML = '';
        data.list.forEach(job => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${job.jobname}</td>
                <td>${job.owner}</td>
                <td>${job.status}</td>
                <td style="background:${job.status === 'ACTIVE' ? '#00be00' : '#db0000'};width:10px;"></td>
            `;
            tableBody.appendChild(tr);
        });
    } catch (error) {
        tableBody.innerHTML = 'Error retrieving STC list';
        console.error('Error retrieving STC list:', error);
    }
}

async function watchSTC() {
    setInterval(async () => {
        const response = await fetch('/api/getList');
        const data = await response.json();
        const active = data.list.filter(job => job.status === "ACTIVE");
        if (!active.length) {
            addLogMessage('WARNING: No active ZWEDUMMY detected, restarting the STC');
            fetchStcList();
            isRunning = false;
            const response = await fetch('/api/startSTC');
            const result = await response.json();
            if (result?.data?.context?.message) {
                addLogMessage(`INFO:    ${result.data.context.message}`);
            }
        } else {
            addLogMessage(`INFO:    ${active.length} active ZWEDUMMY detected, sleep for 10 seconds`);
            if (!isRunning) {
                fetchStcList();
                isRunning = true;
            }
        }
    }, 10000);
};

async function fetchLogMessages() {
    try {

        setInterval(async () => {
            const response = await fetch('/api/log');
            const data = await response.json();
            data.logMessages.forEach(addLogMessage);
        }, 2000);
    } catch (error) {
        console.error('Error fetching log messages:', error);
    }
}

fetchLogMessages();

document.getElementById('list-btn').addEventListener('click', async () => {
    fetchStcList();
});

document.getElementById('start-btn').addEventListener('click', async () => {
    try {
        addLogMessage(`INFO:    Start watching ZWEDUMMY`);
        watchSTC();
    } catch (error) {
        console.error('Error starting STC:', error);
    }
});

window.onload = fetchStcList;

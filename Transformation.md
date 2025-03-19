# Zowe API Transformation

## Getting Started

This session is intended to describe the process of creating an application that utilizes capabilities of different services onboarded to the Zowe API Mediation Layer.</br> 
Let's start with reviewing what services are onboarded to the Zowe APIML.

## Browse the Zowe API Catalog UI

Navigate to the Strong Network platform main page and then go to the **Resourses** -> **Connected HTTP Services** </br>
Click on **zowe** service to open the Zowe API Catalog UI

<img style="height: 400px" src="./assets/zowe-ui-access.png">
</br></br>

You can browse the list of currently onboarded services

<img style="height: 400px" src="./assets/api-catalog-onboarded.png">
</br></br>

Click on the **SYSVIEW Performance Management** tile to drilldown to the API documentation and browse available endpoints</br>
Take a closer look on the **/SYSVIEW/Command** which allows us to execute a SYSVIEW function command. 

<img style="height: 150px" src='./assets/sysview-command.png'>
</br></br>

Select the endpoint, click **Try it out**, enter **/S ZWEDUMMY** value to the *command* field and click **Execute** button below.</br>
You should see the Server response code **200** and response content.</br></br> 
Click on NodeJS tab on snippets panel and copy code content. Now we can use this code in our application.

<img style="height: 250px" src='./assets/sysview-command-snippet.png'>
</br></br>

## Develop the application
### Open cloud IDE

Return back to the the Strong Network platform main page, switch to the **Overview** tab and click on *Running* / *Paused* button to open your cloud IDE

<img style="height: 400px" src="./assets/sn-workspace.png">
</br></br>

You are in the secure cloud environment which runs VS Code and is connected to the Mainframe

### Get familiar with the VSCode Activity Bar
<img style="height: 400px" src='./assets/side-menu.png'>
</br></br>

### Update SYSVIEW service

Using File Explorer navigate to the **application** -> **services** folder and open **sysview.js**</br>
Paste the snippet code below the green comment line. It should look similar to this:

<img style="height: 300px" src='./assets/sysview-service.png'>
</br></br>

Let's make few changes to prepare it to work with our application
1. Update URL so it is not using hardcoded connection details and command value:
```javascript
    let url = `${connection.scheme}://${hostname}:${connection.zowePort}/casysview/api/v1/SYSVIEW/Command?command=${command}/`;
```

2. Authorization token for our application is stored in **token** variable and should be passed as 'Cookie' with the request. Update headers to include 'Cookie' with token:
```javascript
    let options = {method: 'GET', headers: {'Content-Type': 'application/json', 'Cookie': token}};
```

3. Code snippet prints request output to the console, while we need to return it from the function, Add **return** keyword and remove the console output:

```javascript
    return fetch(url, options)
        .then(res => res.json());
```

Save the file, now it should look similar to this:

<img style="height: 300px" src='./assets/sysview-service-ready.png'>
</br></br>

### Update z/OSMF service

Navigate back to the API Catalog and switch to z/OSMF 

<img style="height: 300px" src='./assets/api-catalog-zosmf.png'>
</br></br>

Find **Jobs APIs** and open **/zosmf/restjobs/jobs** endpoint description</br>
Type down a wildcard * as an owner and **ZWEDUMMY** as a prefix, scroll down and click Execute button below

<img style="height: 300px" src='./assets/zosmf-api.png'>
</br></br>

Open a NodeJS snippet and copy the code

<img style="height: 300px" src='./assets/zosmf-snippet.png'>
</br></br>

Return to the cloud IDE and in File Explorer navigate to the **application** -> **services** folder and open **zosmf.js**</br>

Paste the snippet code below the green comment line, and adjust the code similarly to the sysview service: 

1. Update URL so it is not using hardcoded connection details and prefix value:
```javascript
    let url = `${connection.scheme}://${hostname}:${connection.zowePort}/ibmzosmf/api/v1/zosmf/restjobs/jobs?owner=*&prefix=${prefix}&max-jobs=1000&exec-data=N`;
```

2. Authorization token for our application is stored in **token** variable and should be passed as 'Cookie' with the request. Update headers to include z/OSMF specific header "X-CSRF-ZOSMF-HEADER" and 'Cookie' with token:
```javascript
    let options = {method: 'GET', headers: {
                "X-CSRF-ZOSMF-HEADER": "",
                'Content-Type': 'application/json',
                'Cookie': token
            }};
```

3. Code snippet prints request output to the console, while we need to return it from the function, Add **return** keyword and remove the console output:

```javascript
    return fetch(url, options)
        .then(res => res.json());
```

Save the file and lets start our application.

### Start the application

Open an IDE terminal by using **Hamburger menu** -> **Terminal** -> **New Terminal** and run a zowe command there:

`node application/server.js `
</br></br>

<img src='./assets/server-start.png'>
</br></br>

A popup message should appear in the bottom right corner, click on **Create App** (Or **Preview** if application already exists)

<img src='./assets/service-create.png'>
</br></br>

Fill in any application name, select **Public** access and click **Create**

<img src='./assets/service-input.png'>
</br></br>

Click browse icon to open our application UI

<img src='./assets/service-browse.png'>
</br></br>

You should be able to see our ZWEDUMMY Monitor application. </br>
This application uses z/osmf jobs REST API to get the list of jobs with prefix "ZWEDUMMY" </br>
If we click on "Watch ZWEDUMMY" button we will start checking if ZWEDUMMY is running every 10 seconds </br>
In case there is no ACTIVE ZWEDUMMY then it will automatically start one using SYSVIEW /S ZWEDUMMY command.

<img src='./assets/zwedummy-monitor.png'>
</br></br>

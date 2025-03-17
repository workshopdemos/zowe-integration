# Zowe API Integration

## Getting Started

This session is intended to describe the process of creating an application that utilizes capabilities of various services onboarded to the Zowe API Mediation Layer. Let's start with reviewing what services are onboarded to the Zowe APIML.

## Browse the Zowe API Catalog UI

Navigate to the Strong Network platform main page and then go to the **Resourses** -> **Connected HTTP Services** 

<img style="height: 400px" src="./assets/zowe-ui-access.png">
</br></br>

Click on **zowe** service to open the Zowe API Catalog UI

<img style="height: 400px" src="./assets/api-catalog-onboarded.png">
</br></br>

Click on the **SYSVIEW Performance Management** tile to drilldown to the API documentation and browse available endpoints</br>
Take a closer look on the /SYSVIEW/Command which allows us to execute a SYSVIEW function command. 

<img style="height: 150px" src='./assets/sysview-command.png'>
</br></br>

Select the endpoint, click **Try it out**, enter **PTFCVSS** value to the *command* field and click **Execute** button below.</br>
You should see the Server response code 200 and response content. Click on NodeJS tab on snippets panel. Now we can use this code in our applicatgion.

<img style="height: 250px" src='./assets/sysview-command-snippet.png'>
</br></br>

## Work on the application
### Open cloud IDE

Return back to the the Strong Network platform main page, switch to the **Overview** tab and click on *Running* / *Paused* button to open your cloud IDE

<img style="height: 400px" src="./assets/sn-workspace.png">
</br></br>

You are in the secure cloud environment which runs VS Code and is connected to the Mainframe

### Get familiar with the VSCode Activity Bar
<img style="height: 400px" src='./assets/side-menu.png'>
</br></br>


* Complete and run the sample application
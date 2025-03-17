# Zowe API Integration

## Getting Started

This session is intended to describe the process of onboarding of the SYSVIEW application to the Zowe API Mediation Layer. Let's start with reviewing what services are already onboarded to the Zowe APIML.

### Browse the Zowe API Catalog UI

Navigate to the Strong Network platform main page and then go to the **Resourses** -> **Connected HTTP Services** 

<img style="height: 400px" src="./assets/zowe-ui-access.png">
</br></br>

Click on **zowe** service to open the Zowe API Catalog UI

<img style="height: 250px" src="./assets/api-catalog.png">
</br></br>

### Open cloud IDE

Return back to the the Strong Network platform main page, switch to the **Overview** tab and click on *Running* / *Paused* button to open your cloud IDE

<img style="height: 400px" src="./assets/sn-workspace.png">
</br></br>

You are in the secure cloud environment which runs VS Code and is connected to the Mainframe

### Get familiar with the VSCode Activity Bar
<img style="height: 400px" src='./assets/side-menu.png'>
</br></br>


## Onboard SYSVIEW to the APIML

Now we are gong to onboard the SYSVIEW REST API service to the APIML.

Let's connect to the Mainframe</br>
IP: **<zdnt-ip>**</br>
Host: **<host>**</br>
User ID: **<tso_user_id>**</br>
Password: **<tso_user_password>**

There are two ways to interact with the Mainframe from this environment: you can use Zowe Explorer or tn3270 terminal emulator. 

Locate the SYSVAPPS (SYSVIEW Application Server) run-time directory using Zowe Explorer.

Go tho the Zowe Explorer extension by selecting it on the side panel, then click on the magnifying lens icon under USS section - zosmf profile.

<img style="height: 130px" src='./assets/uss.png'>
</br></br>

Input field would appear in the top part of IDE after validating the profile, paste path to the SYSVAPPS configuration:

`/u/users/cai/sysview/runtime/cnm4h00/runtime_apps/config`

<img style="height: 100px" src='./assets/path-input.png'>
</br></br>

Click on application.yml file in the USS section or the Zowe Explorer to open it.</br>
Find the apiml section of configuration and update it with your mainframe host and IP details and save file.

<img style="height: 130px" src='./assets/application-apiml.png'>
</br></br>

Now for changes to take effect we need to restart SYSVIEW Application Server.</br>
We can use zowe cli console command for that, open an IDE terminal by using **Hamburger menu** -> **Terminal** -> **New Terminal** and run a zowe command there:

`zowe zos-console issue command "C SYSVAPPS"`
</br></br>

## Verify onboarding
### Browse the Zowe API Catalog UI once again

If the application was configured properly we will see the SYSVIEW tile in the API Catalog

<img style="height: 100px" src='./assets/sysview-tile.png'>
</br></br>

Click on the tile to drilldown to the API documentation. You can verify the service is confiugured properly by trying out some endpoint. Select endpoint, click **Try it out**, fill in parameters if needed and click **Execute** button below

<img style="height: 100px" src='./assets/sysview-endpoint.png'>
</br></br>

### Run the code snippet from IDE

Now you can reach the same endpoint from the cloud IDE using curl command.</br> 
Navigate to the IDE terminal window and paste following command there: </br></br>
 `curl -X "GET" "https://<ip>:7554/casysview/api/v1/SYSVIEW/Display?command=status" -H "accept: application/json" -u <tso_user_id>:<tso_user_password>`


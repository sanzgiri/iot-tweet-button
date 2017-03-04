# iot-tweet-button
The iot-tweet-button gives you the ability to press your AWS IoT Button and send a customizable tweet to your Twitter account.

### What exactly is the AWS IoT button?
The AWS IoT button is a developer button (modeled after the Amazon Dash buttons) that allows you to connect to your home or office WiFi network and send messages that can trigger actions in the AWS IoT platform.

### What is the AWS IoT Platform?
The AWS IoT platform provides developers with a way to communicate with 'things' such as the AWS IoT button.

### What is AWS Lambda?
AWS Lambda gives you the ability to execute Java, NodeJS or Python code in a short-lived container triggered by a number of events such as an HTTP request, SMS message (via SNS), IoT action, etc. without having to fuss with servers.  Lambda paves the way for serverless architecture in the AWS ecosystem.

#### To get started, you'll need:
  - A Twitter account with API access
  - An AWS IoT Button (you can order these from Amazon for approx $20)
  - An AWS account
  - Node.js installed on your system

### AWS IOT Button Setup
- Install AWS IOT Button app on you iOS or Android phone.
- Lauch the app and login with your AWS/Amazon credentials.
- Click the "+" symbol on the top left to add your IOT button.
    - This launches the "Setup your button" process.
    - Select "Agree & get started".
- With your phone, scan the barcode on the box the IOT button came in by choosing "Tap here to scan barcode". You can also manually enter the serial number (DSN) listed on the box or the back of the IOT button.
- Once the serial number has been entered, you can (optionallly) give your Button a friendly name to distinguish it.
- Next, select "Register Button".
    - This creates the necessary resources in AWS IOT.
- Next, configure the button by pressing it for 6 seconds until the blue light flashes.
    - Now go to your phone's settings and connect to the button's wi-fi network using the provided credentials (you can copy the wi-fi password to your clipboard)
    - Once connected, pick the wi-fi network that your button should use.
- Next, set the button action i.e. choose what to do when your button is pressed.
    - For now, choose "Send SMS (nodejs)" to test that the button is functioning correctly, and provide the phone number 1-xxx-xxxx where you want to receive it.
    - Click set action.
- Your button should now appear on the main screen on the AWS IOT button app, listed with its name, serial number and your selected action.
- Press the button. It will flash white five times, then flash green once, and then stop flashing. The green flash indicates success!
- You should receive the sms shortly. This confirms that your IOT Button is fully configured and ready to go!

Note that from the main screen, you can change the wireless network by selecting the wi-fi icon next to the button. You can change the button action by selecting the "lambda" symbol.

Finally, note that if the button flashes white for a long time and then flashes red for 3 times before flashing stops - it means that it was not configured correctly. In that case, select the "Delete" icon on the main screen of the app next to the button. Then start the configuration process described above all over again.

### Create a Zipfile with your Lambda Function
This is a package called "iotweet.zip" that contains your Node app that you will build using the steps below.
- Clone this github repo.
- Obtain Twitter API keys. You can do this by going to https://apps.twitter.com/ and creating a new app. 
- Modify the .env file with the appropriate values for your Twitter API account
```
TWITTER_CONSUMER_KEY=[YOUR API KEY HERE]
TWITTER_CONSUMER_SECRET=[YOUR API SECRET HERE]
TWITTER_ACCESS_TOKEN_KEY=[YOUR ACCESS TOKEN HERE]
TWITTER_ACCESS_TOKEN_SECRET=[YOUR TOKEN SECRET HERE]
```
- Edit the "config.json" file, replacing the messages for "single", "double" and "long" for the tweet you would like to post for Single, Double and Long button presses, respectively.
- Install the node dependencies using npm in the root of the folder containing this repo.
```
npm install
```
- Zip all the files in this folder.
```
zip -r iotweet.zip .
```

### Upload your Lambda Function
- Go to https://aws.amazon.com/
- Select Products -> AWS Lambda (Under "Compute" Category)
- Sign in to the console with your AWS credentials
- Select "Lambda" under AWS Services
- Click "Create a Lambda Function"
- Under "Select Blueprint" - select "Create Blank Function".
- Click "Next" to Configure Function
- Under "Configure Function"
    - Set Name to "awsIotTweet"
    - Set Description to "Send a configurable tweet when the AWS IOT button is pressed"
    - Set Runtime to "Node.JS 4.3"
- Code Entry Type: Upload a .ZIP file
- Function Package: Click "Upload" button
    - Select "iotweet.zip" from your hard drive
- Handler: tweet.handler
- Role: Choose an existing role
- Existing Role: lambda_basic_execution
- Advanced Settings: Set Timeout to 0 min 30 sec
- Click "Next"
- Click "Create Function"
- You should get the message: Congratulations! Your Lambda function "awsIotTweet" has been successfully created. You can now click on the "Test" button to input a test event and test your function.

### Notes and Caveats:
- The 1st gen AWS IOT Button had a lifetime of 1000 button presses. The 2nd gen released in Feb 2017 has a lifetime of 2000 button presses.
- If Twitter's API detects a second tweet within a certain time window with an identical status, it will block the second one. This time window is variable and is not documented. This app appends a time stamp to the message to get around the restriction.
- Twitter may place restrictions or ban such automated "tweet bots" at any time.

### Resources
* [AWS IoT Button](https://aws.amazon.com/iot/button/)
* [AWS Lambda Documentation](http://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
* [AWS Free Tier/Signup](https://aws.amazon.com/free/)

### Tech
The iot-tweet-button uses two open source projects to work properly:
* [Node Twitter](https://www.npmjs.com/package/twitter) - For tweeting
* [Dotenv](https://www.npmjs.com/package/dotenv) - Allows the use of environment variables in AWS Lambda

### Acknowledgements
Dan Russ, for his original code, on which this is based.





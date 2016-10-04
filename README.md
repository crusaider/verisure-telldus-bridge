# Verisure-Telldus bridge
A very simple application that bridges between the Verisure home alarm system and the Telldus Live service.

When run, the application will monitor the alarm state in the Verisure service by polling the service every 30th second. If the state is changed a call will be made to the telldus live service to change the state of a given device. (The devcice in the Verisure service can be "virtual", i.e. there does not need to be a physical device).

| Alarm State | Armed Home Device | Armed Way Device |
|:------------|:------------------|:-----------------|
| Unarmed| Off | Off |
| Armed Home | On | Off |
| Armed Away | Off | On | 

# Installation and configuration

## Installation

Clone the repo to a location on your machine, from the root directory of the repo issue the `$ npm install --production` command.


## Runtime Configuration
The application is configured trough a number of environment variables that needs to be set before the application is started.

| Variable | Default Value | Comment |
|:---------|:--------------|:--------|
|`LOGLEVEL`|`info`|Granulairity of server side log messages, has to be one of `debug`, `info`, `warn` or `error`.|
|`TELLDUS_PUBLIC_KEY`|Undefined|Telldus public key |
|`TELLDUS_PRIVATE_KEY`|Undefined|Telldus private key.|
|`TELLDUS_TOKEN`|Undefined|Telldus user token.|
|`TELLDUS_TOKEN_SECRET`|Undefined|Telldus user token secret.|
|`TELLDUS_ARMEDHOME_DEVICE`|Undefined|Telldus device id if the device that should be switched on when the alarm is set in state `armedhome`. The device will have to be defined in the Telldus Live service before the application is used.|
|`TELLDUS_ARMEDAWAY_DEVICE`|Undefined|Telldus device id if the device that should be switched on when the alarm is set in state `armedaway`. The device will have to be defined in the Telldus Live service before the application is used.|
|`VERISURE_USER`|Undefined|Username of the user that should be inpersonated when communicating with the Verisure service.|
|`VERISURE_PASSWORD`|Undefined|Password of the verisure user.|

### Telldus API keys
To be able to integration with telldus live you will have to supply four different values in the enviroment, the API keys and user tokens can be generated on the [Telldus Live API website](http://api.telldus.com/keys/index).

# Starting the application

In the root directory of the repo run the comand `$ npm start`. This will start the application and start logging to `STDOUT`. 

## Contact
Questions, comments, suggestions: jonas.m.andreasson(a)gmail.com.

Development: Send a pull request on github [https://github.com/crusaider/verisure-telldus-bridge](https://github.com/crusaider/verisure-telldus-bridge)

# License

## The MIT License (MIT)

Copyright (c) 2016 Jonas Andreasson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,                  and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

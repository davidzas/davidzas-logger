# Davidzas' Logger
This logger demo was developed using express 4

## Installation
```bash
npm i
```
## Demo
Demo it's explained below with the given urls

## Usage
```bash
npm start
```
This logger can register (not persistent) logs with a given key
1. [post](https://us-central1-davidzas.cloudfunctions.net/metric/david?key=50899802-2d8f-47dd-aa57-d71a203c1ab6) to this url changing "david" with another one to start logging data.![enter image description here](https://firebasestorage.googleapis.com/v0/b/davidzas.appspot.com/o/i1.PNG?alt=media&token=bd9c4a4e-53e7-488a-8596-376e69badb3f)

2. [get](https://us-central1-davidzas.cloudfunctions.net/metric/david/sum?key=50899802-2d8f-47dd-aa57-d71a203c1ab6) this url and change the key "david" to see the sum of the values![enter image description here](https://firebasestorage.googleapis.com/v0/b/davidzas.appspot.com/o/i2.PNG?alt=media&token=8c211e95-15c8-4374-8ef9-25e8b430272f)

3. The logger only sums the last hour logs.

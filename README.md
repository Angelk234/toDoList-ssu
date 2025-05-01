This is a proyesct as a test to get in at cenedict to development area.


Multiconextion (no localhost and only LAN)
if you want to connect to this app

----machine as a server----

youn need write "ipconfig" in your command windows, search IPv4 and save that IP.

also you need to change all files:
- login.js
- structure.js
- newuser.js
you need to change the url by each fecth from "http:// |localhost| :3000" to IP.
example:
fetch('http://192.168.100.8:3000/login').....

then you start "live server".


----machine as a client----

you only write the IP of you server and ":5500".
example:
'192.168.100.8:5500'

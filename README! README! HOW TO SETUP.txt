IMPORTANT: this tool will work with es6 compatible browsers such as edge, firefox, chrome, and safari.(not internet explorer)

To get this app working, the build folder (in this file's parent folder) needs to be on a webserver
Then, on the page you want the calculator to be displayed on, embed the calculator within an iframe. There 
is an example in embeddedAppExample.html

setting up a test server:
install nodejs, 
npm install serve
copy the build folder to wherever makes sense
navigate to the parent directory of the build folder
serve -s build //will start the webserver at localhost:5000 by default using the code in the build folder
Then, embed in an Iframe in your webpage and size the app inside of it. Look at the example in embeddedAppExample.html
you can also just create a link/forward the resolves to <whatever your ip is>:5000


You can change the contents of the help bubble within the help.json file in /src and rebuilding with npm run build
You will need the full tool chain to create a new build which can be installed with npm install --save-dev

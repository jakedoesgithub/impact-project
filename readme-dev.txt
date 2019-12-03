If you install dependencies using yarn or npm and the app
breaks then you will likenly need to go to here:
\node_modules\metro-config\src\defaults\blacklist.js, 
and update an invalid regular expression that needs changing. 

Change the first expression under sharedBlacklist from:

var sharedBlacklist = [
  /node_modules[/\\]react[/\\]dist[/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];

to:

var sharedBlacklist = [
  /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];

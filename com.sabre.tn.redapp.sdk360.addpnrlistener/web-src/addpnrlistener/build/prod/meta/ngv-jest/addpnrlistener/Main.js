var reflex = require('ngv-jest-platform');
var _0 = require("..\\..\\..\\..\\sabre-ngv-app\\module.js");
var _1 = require("..\\..\\..\\..\\sabre-ngv-core\\module.js");
var _2 = require("..\\..\\..\\..\\sabre-ngv-xp\\module.js");
var _3 = require("..\\..\\..\\..\\sabre-ngv-hints\\module.js");
var _4 = require("..\\..\\..\\module.js");

var module = reflex.require("addpnrlistener/Main");
reflex.initModule({"name":"addpnrlistener","version":"4.8.7","meta":{},"dependencies":["sabre-ngv-app","sabre-ngv-core","sabre-ngv-xp","sabre-ngv-hints"],"submodules":["addpnrlistener/Context","addpnrlistener/index","addpnrlistener/Main","addpnrlistener/views/addPNRDialog"],"hasTemplates":true,"hasStyles":true});

for( var i in module ) {
    if( module.hasOwnProperty(i) ) {
        exports[i] = module[i];
    }
}

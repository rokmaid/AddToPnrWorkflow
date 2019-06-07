var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
///<amd-module name="addpnrlistener/Context" />
/// <ngv scope="public" />
define("addpnrlistener/Context", ["require", "exports", "sabre-ngv-core/modules/ModuleContext"], function (require, exports, ModuleContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Cannot use IModuleContext['something'] for types - it seems to break generics
    // types are copied from IModuleContext
    /** @internal **/
    exports.context = new ModuleContext_1.ModuleContext("addpnrlistener");
    /** @internal **/
    exports.cf = exports.context.cf.bind(exports.context);
    /** @internal **/
    exports.registerService = exports.context.registerService.bind(exports.context);
    /** @internal **/
    exports.getService = exports.context.getService.bind(exports.context);
});
define("addpnrlistener/views/addPNRDialog", ["require", "exports", "sabre-ngv-app/app/widgets/pnrAdd/views/PnrAdd", "sabre-ngv-app/app/widgets/pnrAdd/models/PnrAddSubmitter", "addpnrlistener/Context"], function (require, exports, PnrAdd_1, PnrAddSubmitter_1, Context_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var addPNRDialog = (function (_super) {
        __extends(addPNRDialog, _super);
        function addPNRDialog() {
            return _super.call(this) || this;
        }
        addPNRDialog.prototype.selfCancelAction = function () {
            _super.prototype.triggerOnEventBus.call(this, 'close-modal');
        };
        addPNRDialog.prototype.selfSubmitAction = function () {
            if (_super.prototype._validateForm.call(this)) {
                var submitter = new PnrAddSubmitter_1.PnrAddSubmitter({ form: this });
                submitter.submit()
                    .done(function () {
                    console.log("PNR Information has been added");
                    /*
                    Send command to end pnr

                    */
                    Context_1.cf('ER').send();
                })
                    .fail(function () {
                    console.log("Error occurred");
                    (5);
                });
                _super.prototype.triggerOnEventBus.call(this, 'close-modal');
            }
        };
        return addPNRDialog;
    }(PnrAdd_1.PnrAdd));
    exports.addPNRDialog = addPNRDialog;
});
define("addpnrlistener/Main", ["require", "exports", "sabre-ngv-core/modules/Module", "sabre-ngv-xp/services/ExtensionPointService", "addpnrlistener/Context", "sabre-ngv-hints/HintXPConfig", "sabre-ngv-core/services/LayerService", "addpnrlistener/views/addPNRDialog"], function (require, exports, Module_1, ExtensionPointService_1, Context_2, HintXPConfig_1, LayerService_1, addPNRDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Main.prototype.init = function () {
            _super.prototype.init.call(this);
            // initialize your module here
            var xp = Context_2.getService(ExtensionPointService_1.ExtensionPointService);
            xp.addConfig(Main.HINT_ACTION_CODE, new HintXPConfig_1.HintXPConfig(function () {
                var layerservice = Context_2.getService(LayerService_1.LayerService);
                var dialog = new addPNRDialog_1.addPNRDialog();
                var options = {
                    title: 'add missing information to the PNR ',
                    cssClass: 'dn-panel add-to-pnr-modal',
                    actions: [
                        { caption: 'Cancel',
                            actionName: 'cancel',
                            type: 'secondary',
                            className: 'app.common.views.Button'
                        },
                        {
                            caption: 'Submit',
                            actionName: 'submit',
                            type: 'success',
                            className: 'app.common.views.Button'
                        }
                    ]
                };
                layerservice.showInModal(dialog, options);
            }));
        };
        return Main;
    }(Module_1.Module));
    // this should be the same as defined on the Java Side 
    Main.HINT_ACTION_CODE = "com.sabre.tn.redapp.sdk360.hintactioncode";
    exports.Main = Main;
});
///<amd-module name="addpnrlistener" />
define("addpnrlistener", ["require", "exports", "addpnrlistener/Main", "addpnrlistener/Context"], function (require, exports, Main_1, Context_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Module_addpnrlistener = (function (_super) {
        __extends(Module_addpnrlistener, _super);
        function Module_addpnrlistener(manifest) {
            var _this = _super.call(this, manifest) || this;
            Context_3.context.setModule(_this);
            return _this;
        }
        return Module_addpnrlistener;
    }(Main_1.Main));
    exports.default = Module_addpnrlistener;
});

//# sourceMappingURL=module.js.map

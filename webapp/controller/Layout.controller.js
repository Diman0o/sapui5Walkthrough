sap.ui.define([
	'./BaseController',
	'sap/ui/model/json/JSONModel',
], function (BaseController, JSONModel, formatter) {
	"use strict";
	return BaseController.extend("sap.ui.demo.bulletinboard.controller.Layout", {
		onInit: function () {
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			var oViewModel = new JSONModel({
					busy: false
				});
			this.getRouter().getRoute("Layout").attachPatternMatched(this._onPostMatched, this);
			this.setModel(oViewModel, "LayoutView");
		},
        onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {}, true);
			}
		}
	});
});
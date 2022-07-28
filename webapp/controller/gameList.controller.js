sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
    "../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.gameList", {
        formatter: formatter,
		onInit : function () {
			var oViewModel = new JSONModel({
				currency: "RUB"
			});
			this.getView().setModel(oViewModel, "view");
		},
		onFilterGames : function (oEvent) {

			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("GameName", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("gameList");
			var oBinding = oList.getBinding("items");
            var aDefaultFilters = oList.getBindingInfo("items").filters;
			oBinding.filter(aFilter.concat(aDefaultFilters));
		},
		onPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail", {
				gamePath: window.encodeURIComponent(oItem.getBindingContext("game").getPath().substr(1))
			});
		}

	});
});
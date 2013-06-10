/*
 * jquery.simpleui.js - jQuery plugin.
 *
 * Copyright (c) 2013 froop http://github.com/froop/jQueryUiSandbox
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
/*global jQuery */
(function ($) {
	"use strict";

	/**
	 * @param {Object} options
	 */
	$.fn.simpleTabs = function (options) {
		var $container = this;
		var defaults = {
			startTab: 0
		};
		var setting = $.extend(defaults, options);
		var $navi = $("> ul", $container);
		var $contents = $("> div", $container);

		function changeTab(index) {
			$contents.addClass("tab-hide");
			$contents.eq(index).removeClass("tab-hide");
			$("li", $navi).removeClass("tab-active");
			$("li", $navi).eq(index).addClass("tab-active");
		}

		$container.addClass("simple-tabs");
		$navi.addClass("tab-navi");
		$contents.addClass("tab-content");

		$navi.on("click", "li", function() {
			changeTab($("li", $navi).index(this));
		});

		changeTab(setting.startTab);
		return this;
	};

	$.fn.simpleTabsChange = function (index) {
		var $container = this;
		var $navi = $("ul.tab-navi", $container);
		$("li", $navi).eq(index).trigger("click");
		return this;
	};

	/**
	 * @param {Object} options
	 */
	$.fn.selectableTable = function (options) {
		var CSS_SELECTED = "ui-selected";
		var $elements = this;
		var $selectable = $("tbody", $elements);
		var defaults = {
			defaultSelect: false
		};
		var setting = $.extend(defaults, options);

		function triggerSelected($selected) {
			if ($selected.length !== 0) {
				$selected.closest($selectable).trigger("selected", $selected);
			}
		}

		function selectFirst() {
			var $firstRow = $("> tr:first-child", $selectable);
			$firstRow.addClass(CSS_SELECTED);
			triggerSelected($firstRow);
		}

		$elements.addClass("selectable-table");
		$selectable.selectable({
			filter : "tr",
			stop : function (event) {
				var $target = $(event.target);
				var $selected = $target.children("." + CSS_SELECTED + ":first");
				$selected.nextAll("." + CSS_SELECTED).removeClass(CSS_SELECTED);
				triggerSelected($selected);
			}
		});

		if (setting.defaultSelect) {
			selectFirst();
		}

		return this;
	};

	/**
	 * @param {Object} options
	 */
	$.fn.simplePopup = function (options) {
		var $elements = this;
//		var defaults = {
//			defaultSelect: false
//		};
//		var setting = $.extend(defaults, options);

		$elements.addClass("simple-popup");

		return this;
	};

	$.fn.simplePopupOpen = function ($target) {
		var $popup = this;
		$popup.show()
			.position({
				my : "left top",
				at : "left bottom",
				of : $target
			});

		return this;
	};

	$.fn.simplePopupClose = function () {
		var $popup = this;
		$popup.hide();
		return this;
	};
})(jQuery);

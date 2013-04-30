/*
 * jquery.simpleui.js - jQuery plugin.
 *
 * Created by froop http://github.com/froop/jquery-simpleui-ui
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
/*global jQuery, window, document */
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
		var $menu = $("> ul", $container);
		var $contents = $("> div", $container);

		function changeTab(index) {
			$contents.addClass("tab-hide");
			$contents.eq(index).removeClass("tab-hide");
			$("li", $menu).removeClass("tab-active");
			$("li", $menu).eq(index).addClass("tab-active");
		}

		$container.addClass("simple-tabs");
		$menu.addClass("tab-menu");
		$contents.addClass("tab-content");

		$menu.on("click", "li", function() {
			changeTab($("li", $menu).index(this));
		});

		changeTab(setting.startTab);
		return this;
	};

	$.fn.simpleTabsChange = function (index) {
		var $container = this;
		var $menu = $("> ul", $container);
		$("li", $menu).eq(index).trigger("click");
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
		};

		$elements.addClass("selectable-table");
		$selectable.selectable({
			filter : "tr",
			stop : function (event, ui) {
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
})(jQuery);

function initNavigation(){
	document.addEventListener("DOMContentLoaded", function () {
		const el = document.querySelector(".mobile-nav-toggle");
		el.addEventListener("click", function (event){
			const el = event.target;
			const toggled = !(el.getAttribute("aria-expanded") === "true");
			el.setAttribute("aria-expanded", toggled);
		});
	});
}

function initTabList(){
	const tabList = document.querySelector('[role="tablist"]');
	const tabs = tabList.querySelectorAll('[role="tab"]');
	const firstTab = tabs[0];
	const lastTab = tabs[tabs.length - 1];

	function markTabAndPanelUnselected(el) {
		el.setAttribute('tabindex', "-1");
		el.setAttribute('aria-selected', false);
		const panel = document.getElementById(el.getAttribute('aria-controls'));
		panel.setAttribute("hidden", true);
		const photo = document.getElementById(panel.getAttribute("data-photo"));
		photo.setAttribute("hidden", true);
	}

	function markTabAndPanelSelected(el) {
		el.setAttribute('tabindex', "0");
		el.setAttribute('aria-selected', "true");
		const panel = document.getElementById(el.getAttribute('aria-controls'));
		panel.removeAttribute("hidden");
		const photo = document.getElementById(panel.getAttribute("data-photo"));
		photo.removeAttribute("hidden");
		el.focus();
	}

	tabList.addEventListener('keydown', (e) => {
		const currentEl = e.target;

		let nextEl = null;
		switch (e.key) {
			case "ArrowRight":
				nextEl = currentEl.nextSibling || firstTab;
				break;

			case "ArrowLeft":
				nextEl = currentEl.previousSibling || lastTab;
				break;

			default:
				return;
		}

		if (!nextEl) {
			return;
		}

		markTabAndPanelUnselected(currentEl);
		markTabAndPanelSelected(nextEl);
	});
}

initNavigation();
initTabList();
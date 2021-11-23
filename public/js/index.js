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
	if (!tabList) {
		return
	}
	const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));

	const firstTab = tabs[0];
	const lastTab = tabs[tabs.length - 1];

	function markTabAndPanelUnselected(el) {
		el.setAttribute('aria-selected', false);
		const panel = document.getElementById(el.getAttribute('aria-controls'));
		panel.setAttribute("hidden", true);
		const photo = document.getElementById(panel.getAttribute("data-photo"));
		photo.setAttribute("hidden", true);
	}

	function markTabAndPanelSelected(el) {
		el.setAttribute('aria-selected', "true");
		const panel = document.getElementById(el.getAttribute('aria-controls'));
		panel.removeAttribute("hidden");
		const photo = document.getElementById(panel.getAttribute("data-photo"));
		photo.removeAttribute("hidden");
	}

	function switchFocus(from, to) {
		from.setAttribute('tabindex', "-1");
		to.setAttribute('tabindex', "0");
		to.focus();
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

			case "Home":
				nextEl = firstTab;
				break;

			case "End":
				nextEl = lastTab;
				break;

			default:
				return;
		}

		if (!nextEl) {
			return;
		}

		switchFocus(currentEl, nextEl);
	});

	tabList.addEventListener('click', (e) => {
		const currentEl = e.target;
		const tabEl = currentEl.closest('[role="tab"]')
		if (!tabEl) {
			return;
		}

		const selectedTabEl = tabs.filter(t => t.getAttribute('aria-selected') === 'true')[0];

		markTabAndPanelUnselected(selectedTabEl);
		markTabAndPanelSelected(tabEl);
	});

}

function initDotSlider () {
	const dotList = document.querySelector('.dot-indicators');
	if(!dotList) {
		return;
	}
	const dots = Array.from(dotList.querySelectorAll('button'));

	dotList.addEventListener('click', (e) => {
		const clickedDot = e.target.closest('button');
		if(!clickedDot){
			return;
		}

		const selectedDot = dots.find(dot => dot.getAttribute('aria-selected') === "true")
		const selectedDotSlide = document.getElementById(selectedDot.getAttribute('data-slide'))
		const selectedDotImage = document.getElementById(selectedDotSlide.getAttribute('data-image'))
		selectedDotSlide.setAttribute('hidden', "true");
		selectedDotImage.setAttribute('hidden', "true");
		selectedDot.setAttribute('aria-selected', "false")

		const clickedDotSlide = document.getElementById(clickedDot.getAttribute('data-slide'));
		const clickedDotImage = document.getElementById(clickedDotSlide.getAttribute('data-image'));
		clickedDotSlide.removeAttribute('hidden');
		clickedDotImage.removeAttribute('hidden');
	  clickedDot.setAttribute('aria-selected', "true")
	})

}



initNavigation();
initTabList();
initDotSlider();
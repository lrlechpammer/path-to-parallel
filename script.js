const newsletterForm = document.querySelector(".newsletter-form");

if (newsletterForm) {
	const newsletterStatus = newsletterForm.nextElementSibling;
	const submitButton = newsletterForm.querySelector("button[type='submit']");

	newsletterForm.addEventListener("submit", async (event) => {
		event.preventDefault();
		submitButton.disabled = true;
		submitButton.textContent = "Sending...";
		newsletterStatus.textContent = "";

		try {
			const formData = new FormData(newsletterForm);
			await fetch(newsletterForm.action, {
				method: "POST",
				body: new URLSearchParams(formData),
				mode: "no-cors"
			});

			newsletterForm.hidden = true;
			newsletterStatus.textContent = "Thanks! You are now subscribed.";
		} catch (error) {
			submitButton.disabled = false;
			submitButton.textContent = "Subscribe";
			newsletterStatus.textContent = "Something went wrong. Please try again.";
		}
	});
}

document.querySelectorAll(".subject-signup-form").forEach((signupForm) => {
	const status = signupForm.querySelector(".subject-signup-status");
	const submitButton = signupForm.querySelector("button[type='submit']");

	signupForm.addEventListener("submit", async (event) => {
		event.preventDefault();
		submitButton.disabled = true;
		submitButton.textContent = "Sending...";
		status.textContent = "";

		try {
			const response = await fetch(signupForm.action, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
				},
				body: JSON.stringify(Object.fromEntries(new FormData(signupForm)))
			});
			const result = await response.json();

			if (!response.ok || result.success === false || result.success === "false") {
				throw new Error(result.message || "Signup submission failed");
			}

			submitButton.textContent = "Request Sent";
			status.textContent = signupForm.dataset.successMessage || "Thank you! Your sign-up request has been sent. A member will reach out to you shortly!";
		} catch (error) {
			submitButton.disabled = false;
			submitButton.textContent = "Send Sign-Up Request";
			status.textContent = "We couldn't send your request. Please try again.";
		}
	});
});

document.querySelectorAll("[data-resource-dialog]").forEach((resourceCard) => {
	resourceCard.addEventListener("click", () => {
		const dialog = document.getElementById(resourceCard.dataset.resourceDialog);
		if (dialog) dialog.showModal();
	});
});

document.querySelectorAll(".resource-dialog").forEach((dialog) => {
	dialog.querySelector(".resource-dialog-close").addEventListener("click", () => dialog.close());
	dialog.addEventListener("click", (event) => {
		if (event.target === dialog) dialog.close();
	});
});

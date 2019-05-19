const wait = (time) => new Promise((r) => setTimeout(r, time)); const typingWaitMs = 80; const writeWords = async (words, element) => {
	await wait(250); for (let i = 0; i < words.length; i++) {
		const word = words[i]; if (i !== 0) { element.innerHTML += " "; await wait(typingWaitMs); }
		for (let z = 0; z < word.length; z++) {
			const char = word.charAt(z); element.innerHTML += char; if (z === word.length - 1 && word === "RUN") { element.innerHTML = element.innerHTML.slice(0, element.innerHTML.length - 3) + `<span class="syntax-red">RUN</span>`; }
			await wait(typingWaitMs);
		}
		await wait(typingWaitMs * 1.2);
	}
	await wait(100); element.innerHTML += "<br>";
}; const bodyBaseHtml = `
<span class="syntax-gray"># Your dev-env as code.</span><br>
<span class="syntax-red">FROM</span> codercom/ubuntu-dev<br>
<br>`; const mainTerminalElement = document.querySelector(".content .terminal"); const baseTerminalContent = mainTerminalElement.innerHTML; const reset = () => { mainTerminalElement.innerHTML = baseTerminalContent; }; const setActiveOutput = (title) => {
	const activeTitle = document.querySelector(".code .titles .active"); if (activeTitle) { activeTitle.classList.remove("active"); }
	const activePanel = document.querySelector(".code .panel .active"); if (activePanel) { activePanel.classList.remove("active"); }
	const titleEl = document.querySelector(".code .titles .title-" + title); if (!titleEl) { throw new Error("invalid output selection"); }
	const panelEl = document.querySelector(".code .panel .panel-" + title); if (!panelEl) { throw new Error("invalid panel selection"); }
	titleEl.classList.add("active"); panelEl.classList.add("active");
}; const playCodeAnimation = async () => {
	setActiveOutput("terminal"); const termPanel = document.querySelector(".code .panel-terminal .text"); if (!termPanel) { throw new Error("developer error: no code term panel"); }
	const codeBody = document.querySelector(".code .code-body .text"); if (!codeBody) { throw new Error("developer error: no code body"); }
	codeBody.innerHTML = bodyBaseHtml; termPanel.innerHTML = `<span class="syntax-green syntax-bold">~</span> `; await wait(750); await writeWords(["curl", "ifconfig.me"], termPanel); await wait(200); termPanel.innerHTML += `
Command 'curl' not found, but can be installed with:

sudo apt install curl

<span class="syntax-green syntax-bold">~ </span>`; await wait(500); termPanel.parentElement.classList.remove("focused"); codeBody.parentElement.classList.add("focused"); const fileAction = document.getElementById("file-action"); if (!fileAction) { throw new Error("developer error: no file action"); }
	setTimeout(() => { fileAction.className = "action save"; }, 250); await writeWords(["RUN", "apt-get", "install", "-y", "curl"], codeBody); fileAction.className = "action close"; await wait(100); termPanel.innerHTML = "Rebuilding container..."; await wait(1000); termPanel.innerHTML = `Rebuilt container!<br><br><span class="syntax-green syntax-bold">~</span> `; await wait(400); termPanel.parentElement.classList.add("focused"); codeBody.parentElement.classList.remove("focused"); await wait(250); await writeWords(["curl", "ifconfig.me"], termPanel); termPanel.innerHTML += `216.115.197.144<br><span class="syntax-green syntax-bold">~</span> `;
}; const projects = ["nhooyr/websocket", "cdr/flog", "cdr/code-server", "cdr/sshcode",]; const play = async () => {
	const words = ["sail", "run", projects[Math.floor(Math.random() * projects.length)],]; const textElement = document.getElementById("terminal-text"); await writeWords(words, textElement); textElement.innerHTML += `2019-05-03 <span class="syntax-blue">INFO</span> opening http://127.0.0.1:8130<br>`; await wait(550); const codeBox = document.querySelector(".code"); if (!codeBox) { throw new Error("developer error: no code found"); }
	codeBox.classList.add("active"); await playCodeAnimation(); await wait(2500); textElement.innerText = ""; codeBox.classList.remove("active"); await wait(500); reset(); play();
}; play();
function loadTabs() {
    const promises = tabNames.map(async tabName => {
        const container = document.getElementById(`${tabName}Tab`);
        const resp = await fetch(`${path}${tabName}.html`);
        const html = await resp.text();
        return container.innerHTML = html;
        });
    return Promise.all(promises);
};

loadTabs().then(() => {
    console.log("Tabs loaded!");

    // JS files
    const scripts = [
        "assets/js/dynamicRows.js",
        "assets/js/main.js",
        "assets/js/parseInputs.js",
        "assets/js/tagManager.js"
    ];
    scripts.forEach(src => {
        const script = document.createElement("script");
        script.src = src;
        script.defer = true;
        document.body.appendChild(script);
    });
});
window.location.hostname.endsWith(".flexisched.net") ? (() => {
    const registered = []
    const register = () => {
        document.getElementById("results").querySelectorAll("td[class^='alert-key']").forEach(event => {
            if (registered.includes(event)) return
            registered.push(event)
            event.addEventListener("click", () => {
                const { children } = event.parentElement
                const name = children[0].textContent
                const period = children[2].textContent
                alert(`Sniping ${name}@${period}`)
                alert("Cancel the next alert.")
                setInterval(() => {
                    fetch("clickToSched.php", {
                        method: "POST",
                        headers: {
                            "accept": "*/*",
                            "content-type": "application/x-www-form-urlencoded",
                            "cookie": document.cookie
                        },
                        body: `flex=${encodeURIComponent(name)}&day=${children.length - 3}&period=${period}`
                    }).then(res => res.text()).then(data => data === "You were successfully scheduled." || data === "You were already scheduled for that offering." ? alert(`Successfully sniped at ${new Date().toLocaleString()}`) : console.log(`[${new Date().toLocaleString()}]: ${data}`))
                }, 1000)
            })
        })
    }
    alert("Click the event you want to snipe!! :D")
    document.querySelectorAll("input[type='text']").forEach(input => input.addEventListener("input", register))
    register()
})() : alert("Only runnable on FlexiSCHED!")
document.addEventListener("DOMContentLoaded", () => {
    /* =========================       GitHub Projects    ========================= */
    const repoList = document.getElementById("repo-list");
    if (repoList) {        fetch(            "https://api.github.com/users/Nuhairalbusaidi/repos?sort=updated&per_page=6"        )            .then(response => {                if (!response.ok) {                    throw new Error("GitHub API error");                }
                return response.json();            })            .then(repos => {
                const projects = repos.filter(repo => !repo.fork);
                if (projects.length === 0) {                    repoList.innerHTML = `                        <p class="muted">                            Projects will appear here as repositories are added to GitHub.                        </p>                    `;
                    return;                }
                repoList.innerHTML = projects.map(repo => {
                    const language =                        repo.language || "PROJECT";
                    const description =                        repo.description ||                        "A project by Nuhair Al Busaidi.";
                    return `                        <article class="project">
                            <div class="eyebrow">                                ${escapeHTML(language)}                            </div>
                            <h3>                                ${escapeHTML(repo.name)}                            </h3>
                            <p>                                ${escapeHTML(description)}                            </p>
                            <a                                href="${repo.html_url}"                                target="_blank"                                rel="noopener noreferrer"                            >                                View repository ↗                            </a>
                        </article>                    `;
                }).join("");
            })            .catch(error => {
                console.error("GitHub projects error:", error);
                repoList.innerHTML = `                    <p class="muted">                        GitHub projects could not be loaded.                        <br>                        Visit my GitHub profile to see my projects.                    </p>                `;
            });    }

    /* =========================       Smooth Navigation    ========================= */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetID = link.getAttribute("href");
            if (!targetID || targetID === "#") {                return;            }
            const target = document.querySelector(targetID);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({                    behavior: "smooth",                    block: "start"                });
            }
        });
    });

    /* =========================       Reveal Animation    ========================= */
    const revealElements = document.querySelectorAll(        ".section, .grid article, .project, .contact"    );
    const observer = new IntersectionObserver(        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },        {            threshold: 0.12        }    );
    revealElements.forEach(element => {
        element.classList.add("reveal");
        observer.observe(element);
    });

    /* =========================       Navbar Scroll Effect    ========================= */
    const navbar = document.querySelector(".nav");
    window.addEventListener("scroll", () => {
        if (!navbar) {            return;        }
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    /* =========================       Mouse Glow Effect    ========================= */
    const glow = document.createElement("div");
    glow.className = "mouse-glow";
    document.body.appendChild(glow);
    document.addEventListener("mousemove", event => {
        glow.style.left = `${event.clientX}px`;        glow.style.top = `${event.clientY}px`;
    });

    /* =========================       Current Year    ========================= */
    const yearElements =        document.querySelectorAll("[data-year]");
    yearElements.forEach(element => {
        element.textContent =            new Date().getFullYear();
    });
});

/* =========================   Security / HTML Escape========================= */
function escapeHTML(value) {
    return String(value).replace(        /[&<>"']/g,        character => {
            const characters = {                "&": "&amp;",                "<": "&lt;",                ">": "&gt;",                '"': "&quot;",                "'": "&#039;"            };
            return characters[character];
        }    );
}

.reveal {
    opacity: 0;
    transform: translateY(35px);
    transition:
        opacity 0.8s ease,
        transform 0.8s ease;
}

.reveal.visible {
    opacity: 1;
    transform: translateY(0);
}

.nav.scrolled {
    background: rgba(7, 8, 11, 0.92);
    border-bottom-color: rgba(255, 255, 255, 0.12);
}

.mouse-glow {
    position: fixed;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;

    transform: translate(-50%, -50%);

    background: radial-gradient(
        circle,
        rgba(142, 167, 255, 0.08) 0%,
        rgba(142, 167, 255, 0.03) 35%,
        transparent 70%
    );

    transition:
        left 0.15s ease,
        top 0.15s ease;
}

const API = window.__HATCHABLE__?.api || '/api';

/* =========================================================
   NAVIGATION
   ========================================================= */

function nav() {
    return `
        <div class="wrap navin">
            <a class="brand" href="/">
                HIRE<span>WAY</span>
            </a>
            <div class="links">
                <a href="/services">Services</a>
                <a href="/about">About</a>
                <a href="/clients">Clients</a>
                <a href="/careers">Careers</a>
                <a href="/resource-request">Resource Desk</a>
            </div>
            <a class="navcta" href="/contact">
                Talk to us
            </a>
        </div>
    `;
}


/* =========================================================
   FOOTER
   ========================================================= */

function foot() {
    return `
        <footer>
            <div class="wrap footerin">
                <span>
                    © 2026 ElevateBridge Technologies
                </span>
                <span>
                    IT Services · Consulting · Workforce Solutions
                </span>
            </div>
        </footer>
    `;
}


/* =========================================================
   GLOBAL NAV + FOOTER
   ========================================================= */

function shell() {
    document.querySelectorAll('.nav').forEach(element => {
        element.innerHTML = nav();
    });
    document.querySelectorAll('.footer').forEach(element => {
        element.innerHTML = foot();
    });
}


/* =========================================================
   SCROLL REVEAL ANIMATION
   ========================================================= */

function reveal() {
    const elements = document.querySelectorAll('.reveal');

    if (!elements.length) {
        return;
    }

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    elements.forEach(element => {
        observer.observe(element);
    });
}


/* =========================================================
   3D CARD TILT
   ========================================================= */

function tilt() {
    document.querySelectorAll('.tilt').forEach(card => {

        card.addEventListener('pointermove', event => {
            const rect = card.getBoundingClientRect();

            const px =
                (event.clientX - rect.left) / rect.width - 0.5;

            const py =
                (event.clientY - rect.top) / rect.height - 0.5;

            card.style.transform = `
                perspective(900px)
                rotateX(${py * -5}deg)
                rotateY(${px * 7}deg)
                translateY(-5px)
            `;
        });

        card.addEventListener('pointerleave', () => {
            card.style.transform = '';
        });

    });
}


/* =========================================================
   FLOATING HERO OBJECTS
   ========================================================= */

function floatingObjects() {
    const hero = document.querySelector('.hero');

    if (!hero) {
        return;
    }
    const layer = document.createElement('div');

    layer.className = 'float-layer';

    layer.innerHTML = `
        <span
            class="orb orb-a"
            data-float=".025">
        </span>

        <span
            class="orb orb-b"
            data-float=".055">
        </span>

        <span
            class="cube cube-a"
            data-float=".04">
            EB
        </span>

        <span
            class="ring ring-a"
            data-float=".07">
        </span>

        <span
            class="dot-grid"
            data-float=".03">
        </span>

        <span
            class="mini-cube mini-cube-a"
            data-float=".035">
            &lt;/&gt;
        </span>

        <span
            class="mini-cube mini-cube-b"
            data-float=".05">
            AI
        </span>

        <span
            class="float-pill pill-a"
            data-float=".025">
            CLOUD
        </span>

        <span
            class="float-pill pill-b"
            data-float=".045">
            DATA
        </span>

        <span
            class="node node-a"
            data-float=".06">
        </span>

        <span
            class="node node-b"
            data-float=".035">
        </span>

        <span class="node-line line-a"></span>

        <span class="node-line line-b"></span>
    `;

    hero.appendChild(layer);


    /* Mouse movement */

    hero.addEventListener('pointermove', event => {
        const rect = hero.getBoundingClientRect();
        const x =
            (event.clientX - rect.left) / rect.width - 0.5;
        const y =
            (event.clientY - rect.top) / rect.height - 0.5;
        layer.style.transform = `
            translate3d(
                ${x * 22}px,
                ${y * 18}px,
                0
            )
        `;
    });

    hero.addEventListener('pointerleave', () => {
        layer.style.transform = '';
    });
}


/* =========================================================
   SCROLL PARALLAX + FLOATING MOTION
   ========================================================= */

function scrollMotion() {
    let ticking = false;
    const update = () => {
        document.documentElement.style.setProperty(
            '--scrollY',
            `${window.scrollY}px`
        );
        /* Parallax elements */
        document.querySelectorAll('.parallax').forEach(element => {
            const speed =
                Number(element.dataset.speed || 0.12);

            element.style.transform = `
                translate3d(
                    0,
                    ${window.scrollY * speed * -1}px,
                    0
                )
            `;
        });


        /* Floating objects */

        document.querySelectorAll('[data-float]').forEach(
            (element, index) => {

                const speed =
                    Number(element.dataset.float || 0.04);

                const drift =
                    Math.sin(
                        window.scrollY * 0.008 + index
                    ) * 10;

                const rotation =
                    Math.sin(
                        window.scrollY * 0.004 + index
                    ) * 2;

                element.style.transform = `
                    translate3d(
                        ${drift}px,
                        ${window.scrollY * speed * -1}px,
                        0
                    )
                    rotate(${rotation}deg)
                `;
            }
        );

        ticking = false;
    };


    window.addEventListener(
        'scroll',
        () => {

            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }

        },
        {
            passive: true
        }
    );


    update();
}


/* =========================================================
   CONTACT / LEAD FORM
   ========================================================= */

function setupLeadForm() {
    const form = document.querySelector('#leadForm');

    if (!form) {
        return;
    }

    form.addEventListener('submit', async event => {

        event.preventDefault();

        const body =
            Object.fromEntries(
                new FormData(form)
            );

        const notice =
            document.querySelector('#notice');

        try {

            const response = await fetch(
                API + '/leads',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify(body)
                }
            );

            if (!response.ok) {
                throw new Error('Lead submission failed');
            }

            notice.style.display = 'block';

            form.reset();

        } catch (error) {

            notice.textContent =
                'Something went wrong. Please try again.';

            notice.style.display = 'block';
        }
    });
}


/* =========================================================
   CAREERS / JOB LIST
   ========================================================= */

function setupJobs() {
    const jobs = document.querySelector('#jobs');

    if (!jobs) {
        return;
    }

    fetch(API + '/jobs')
        .then(response => response.json())
        .then(data => {

            jobs.innerHTML = data
                .map(job => {

                    return `
                        <div class="job tilt reveal">

                            <div>
                                <h3>
                                    ${job.title}
                                </h3>

                                <small>
                                    ${job.department}
                                    ·
                                    ${job.location}
                                    ·
                                    ${job.employment_type}
                                </small>

                                <p>
                                    ${job.description}
                                </p>
                            </div>

                            <a
                                class="btn primary"
                                href="/contact?role=${encodeURIComponent(job.title)}"
                            >
                                Apply / Enquire
                            </a>

                        </div>
                    `;

                })
                .join('');

        })
        .catch(() => {

            jobs.innerHTML = `
                <p>
                    Roles will be published here soon.
                </p>
            `;

        });
}


/* =========================================================
   PAGE INITIALIZATION
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    shell();

    reveal();

    tilt();

    floatingObjects();

    scrollMotion();

    setupLeadForm();

    setupJobs();

});
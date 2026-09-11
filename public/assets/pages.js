function layout(title, body) {
    return `
        <!doctype html>

        <html>
        <head>

            <meta charset="utf-8">

            <meta
                name="viewport"
                content="width=device-width,initial-scale=1"
            >

            <title>${title} | ElevateBridge</title>

            <link
                rel="stylesheet"
                href="/assets/styles.css"
            >

        </head>

        <body>

            <nav class="nav"></nav>

            ${body}

            <div class="footer"></div>

            <script src="/assets/app.js"></script>

        </body>
        </html>
    `;
}


/* =========================================================
   PAGE CONTENT
   ========================================================= */

const data = {

    /* -----------------------------------------------------
       SERVICES
       ----------------------------------------------------- */

    services: {

        k: 'Capabilities',

        h: 'Technology expertise for complex programs.',

        p:
            'From ServiceNow platforms to enterprise delivery teams, ' +
            'we bring specialist capability around your business requirements.',

        cards: [

            [
                'SN',
                'ServiceNow',
                'ITSM, ITOM, HRSD, ITAM, CMDB, CSM, SecOps, IRM/GRC and SPM.'
            ],

            [
                'AI',
                'AI & Automation',
                'Now Assist, GenAI, workflow automation and intelligent service experiences.'
            ],

            [
                'BA',
                'Business Analysis',
                'Discovery, process mapping, BRD/FRD, UAT and stakeholder alignment.'
            ],

            [
                'DEV',
                'Engineering',
                'Developers, integrations, custom applications and platform engineering.'
            ],

            [
                'QA',
                'Quality Engineering',
                'Functional, automation, performance and release validation.'
            ],

            [
                'PM',
                'Delivery Leadership',
                'Project managers, architects and program specialists for transformation initiatives.'
            ]

        ]
    },


    /* -----------------------------------------------------
       ABOUT
       ----------------------------------------------------- */

    about: {

        k: 'About us',

        h: 'We connect business ambition with technology execution.',

        p:
            'ElevateBridge is an IT services, consulting and workforce ' +
            'solutions company built around one simple idea: enterprise ' +
            'teams should be able to access the right expertise without ' +
            'unnecessary friction.',

        cards: [

            [
                '01',
                'Quality first',
                'We prioritize capability, relevance and professional readiness over volume.'
            ],

            [
                '02',
                'Client aligned',
                'We work within enterprise procurement, MSP and vendor-management ecosystems.'
            ],

            [
                '03',
                'Long-term thinking',
                'We support the full resource lifecycle from requirement through onboarding and delivery.'
            ]

        ]
    },


    /* -----------------------------------------------------
       CLIENTS
       ----------------------------------------------------- */

    clients: {

        k: 'Client ecosystem',

        h: 'Built to support enterprise technology organizations.',

        p:
            'Our operating model is designed for complex client ecosystems ' +
            'and high-volume, high-accountability technology programs.',

        cards: [

            [
                'D',
                'Deloitte',
                'Enterprise consulting and technology programs.'
            ],

            [
                'T',
                'TCS',
                'Technology delivery and specialist workforce requirements.'
            ],

            [
                'H',
                'HCLTech',
                'Platform, infrastructure and enterprise transformation.'
            ],

            [
                'I',
                'Infosys',
                'Technology consulting and digital delivery.'
            ],

            [
                'K',
                'KPMG',
                'Consulting, transformation and platform initiatives.'
            ],

            [
                'N',
                'NTT',
                'Enterprise technology and specialist capability needs.'
            ]

        ]
    }

};


/* =========================================================
   PAGE RENDERING
   ========================================================= */

function page(key) {

    const d = data[key];

    if (!d) {
        return;
    }


    return layout(
        d.h,

        `

        <!-- HERO SECTION -->

        <section class="hero">

            <div class="wrap">

                <div class="eyebrow">
                    ${d.k}
                </div>

                <h1>
                    ${d.h}
                </h1>

                <p>
                    ${d.p}
                </p>

            </div>

        </section>


        <!-- CARDS SECTION -->

        <section>

            <div class="wrap">

                <div class="grid3">

                    ${d.cards.map(card => {

                        return `

                            <div class="card">

                                <div class="icon">
                                    ${card[0]}
                                </div>

                                <h3>
                                    ${card[1]}
                                </h3>

                                <p>
                                    ${card[2]}
                                </p>

                            </div>

                        `;

                    }).join('')}

                </div>

            </div>

        </section>


        <!-- CTA SECTION -->

        <section class="dark">

            <div class="wrap">

                <div class="banner">

                    <div class="eyebrow">
                        Engage us
                    </div>

                    <h2>
                        Need specialists for a live requirement?
                    </h2>

                    <p>
                        Choose C2C, C2H or FTE and let our team
                        build a focused shortlist.
                    </p>

                    <a
                        class="btn"
                        style="background:white;color:#07111f"
                        href="/contact"
                    >
                        Talk to us →
                    </a>

                </div>

            </div>

        </section>

        `
    );
}


/* =========================================================
   EXPOSE RENDER FUNCTION
   ========================================================= */

window.renderPage = page;
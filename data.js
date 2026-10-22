// =====================================================================
// YOUR CONTENT LIVES HERE. Edit, save, then push to GitHub (Vercel redeploys).
//
// CERTIFICATE SLOTS: every block in `certificates` is one slot. "category" must be exactly one of:
//   "Job Simulations"  |  "Internships"  |  "Certifications"  |  "Workshops"
// To add a slot: copy a block, change the values, keep a comma between blocks.
//
// Certificate files: put the PDF/image in  assets/certificates/  and write
//   file_url: "assets/certificates/my-file.pdf"      (or a full https:// link)
// credential_url = optional verification link. Use "" when you don't have it yet.
// =====================================================================
window.PORTFOLIO_DATA = {
  projects: [
    {
      title: "StratInnings",
      description: "A platform delivering personalised cricket coaching and match-strategy recommendations through AI-based performance analysis, with an AI Coach Bot and a performance-tracking dashboard.",
      tech: ["Node.js", "Express.js", "MongoDB"],
      live_url: "",
      github_url: ""
    },
    {
      title: "Fake Productivity Detector",
      description: "A machine learning system that detects misleading productivity patterns in activity data using prediction, classification and behavioural analysis, with REST APIs, dashboards, CSV upload, historical tracking and automated reports.",
      tech: ["Python", "Scikit-learn", "REST APIs"],
      live_url: "",
      github_url: ""
    }
    // To add another project, copy one block above (with a comma between blocks).
  ],

  certificates: [
    // ---------- JOB SIMULATIONS ----------
    {
      category: "Job Simulations",
      title: "Software Engineering Job Simulation",
      issuer: "JPMorgan Chase & Co. (Forage)",
      issued_on: "Aug 2026",
      description: "Completed practical tasks in project setup, Kafka integration, H2 database integration, REST API integration and building a REST API controller.",
      file_url: "assets/certificate/jpmorgan.pdf",
      credential_url: ""
    },
    {
      category: "Job Simulations",
      title: "Data Visualisation: Empowering Business with Effective Insights",
      issuer: "Tata (Forage)",
      issued_on: "Aug 2026",
      description: "Framed a business scenario, chose the right visuals, created effective visuals and communicated insights and analysis.",
      file_url: "assets/certificate/tata.pdf",
      credential_url: ""
    },

    // ---------- INTERNSHIPS ----------
    {
      category: "Internships",
      title: "Web Development Intern",
      issuer: "InAmigos Foundation",
      issued_on: "Jun 2026",
      description: "Web development internship (1 Jun to 17 Jun 2026). Built website prototypes, analysed UI/UX for NGO-focused AI-powered web design projects and proposed feature improvements that enhanced usability.",
      file_url: "assets/certificate/internship.pdf",
      credential_url: ""
    },
    {
      category: "Internships",
      title: "Internship Offer Letter: Web Development",
      issuer: "InAmigos Foundation",
      issued_on: "Jun 2026",
      description: "Offer letter for the two-week Web Development internship at InAmigos Foundation.",
      file_url: "assets/certificate/internship-offer-letter.pdf",
      credential_url: ""
    },

    // ---------- CERTIFICATIONS ----------
    {
      category: "Certifications",
      title: "Python for Data Science and Machine Learning Bootcamp",
      issuer: "Udemy",
      issued_on: "Sep 2026",
      description: "25 hours of hands-on Python, data analysis and machine learning with Jose Portilla and Pierian Training.",
      file_url: "assets/certificate/python-bootcamp.pdf",
      credential_url: "https://ude.my/UC-d7683b37-e6f1-42cd-86c6-90907f5ad4d0"
    },
    {
      category: "Certifications",
      title: "Introduction to MS Excel",
      issuer: "Simplilearn SkillUP, powered by Microsoft",
      issued_on: "Aug 2026",
      description: "Core Excel skills for data work.",
      file_url: "assets/certificate/excel.pdf",
      credential_url: ""
    },
    {
      category: "Certifications",
      title: "Introduction to Generative AI Studio",
      issuer: "Google Cloud, via Simplilearn SkillUP",
      issued_on: "Apr 2026",
      description: "Online course on generative AI and Google Cloud's Generative AI Studio.",
      file_url: "assets/certificate/generative-ai.pdf",
      credential_url: ""
    },
    {
      category: "Certifications",
      title: "AI for Beginners",
      issuer: "HP LIFE (HP Foundation)",
      issued_on: "Dec 2024",
      description: "Basic understanding of AI concepts and applications, why data matters to AI, how it is used in business and its ethical implications.",
      file_url: "assets/certificate/hp-life-ai-for-beginners.pdf",
      credential_url: ""
    },

    // ---------- WORKSHOPS ----------
    {
      category: "Workshops",
      title: "Python (30 hours)",
      issuer: "Nirmala Memorial Foundation College of Commerce and Science",
      issued_on: "Mar 2024",
      description: "30 hours of value-added training in Python.",
      file_url: "assets/certificate/python-workshop.pdf",
      credential_url: ""
    },
    {
      category: "Workshops",
      title: "Ethical Hacking Workshop",
      issuer: "Nirmala Memorial Foundation, with Scienox Technologies",
      issued_on: "Sep 2024",
      description: "Workshop on ethical hacking (2 to 6 Sep 2024), conducted by the Department of B.Sc. Computer Science in association with Scienox Technologies Private Limited.",
      file_url: "assets/certificate/ethical-hacking.pdf",
      credential_url: ""
    },
    {
      category: "Workshops",
      title: "Artificial Intelligence and Machine Learning (30 hours)",
      issuer: "Nirmala Memorial Foundation College of Commerce and Science",
      issued_on: "Feb 2025",
      description: "30 hours of value-added training in Artificial Intelligence and Machine Learning.",
      file_url: "assets/certificate/ai-ml-workshop.pdf",
      credential_url: ""
    }
  ]
};

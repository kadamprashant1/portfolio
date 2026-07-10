export const portfolioData = {
  profile: {
    name: "PRASHANT KADAM",
    callsign: "PK_01",
    role: "SOFTWARE ENGINEER",
    version: "SYS v4.0",
    tagline: "\"Optimizing performance and building reliable systems.\"",
    badges: ["PYTHON", "REACT", "JENKINS", "DOCKER"],
    photo: "https://github.com/kadamprashant1.png", // Fallback to GitHub avatar
    email: "kadamprashantnotofficial@gmail.com", // Assumed from the username provided
    github: "https://github.com/kadamprashant1",
    linkedin: "https://www.linkedin.com/in/prashant-kadam-12552721a/"
  },
  bio: {
    paragraphs: [
      "I am an analytical and detail-oriented Software Engineer with experience in full-stack development, CI/CD pipelines, and test automation. I am passionate about improving system reliability, optimizing performance, and building scalable microservices.",
    ],
    highlights: [
      { text: "🏆 Leetcode 1700+", link: "https://leetcode.com/u/Oxima_e/" },
      { text: "🏆 Codeforces 1100+", link: "https://codeforces.com/profile/kadamprashantnotofficial" },
      { text: "📜 GATE CSE 2025 & 2026 Qualified" },
      { text: "🌐 Cisco CCNA Certified", link: "https://cp.certmetrics.com/cisco/en/public/verify/credential/0566bd6ec787438d9aaf9faaae031e65" },
      { text: "🌐 Cisco DevNet Certified", link: "https://cp.certmetrics.com/cisco/en/public/verify/credential/e161f189957e403182a6f92810b4e5df" }
    ]
  },
  experience: [
    {
      id: 1,
      title: "STE Trainee",
      organization: "Cisco | Bangaluru, India",
      dateRange: "Nov 2024 - Nov 2025",
      description: [
        "Contributed to development of STUBIT test framework, which enables hardware-less automation script bug fixing which reduces mean time to fix bugs around 41%.",
        "Developed microservices-based tool to detect flaky test cases at the iteration level, quantifying impact on test coverage and improving overall QA reliability.",
        "Built a tool to analyse cyclomatic complexity of code across GitHub repository using Streamlit, Docker, Python, Radon, and Jenkin significantly increasing Code Quality.",
        "Optimized SQL queries, improving execution time from ~1 min to 15 sec.",
        "Implemented redis caching, causing a significant improvement of 85.57% in application response time.",
        "Designed and maintained Jenkins CI/CD pipelines, automating workflows and significantly reducing manual tasks."
      ]
    }
  ],
  education: [
    {
      id: 1,
      degree: "Bachelor of Technology in Information Technology",
      institution: "Government College of Engineering, Aurangabad Maharashtra",
      dateRange: "Sept 2020 - Jun 2024",
      grade: "7.7 CGPA",
      notable: "Focus: Software Development, Networking, Data Structures & Algorithms"
    }
  ],
  skills: {
    "Programming Languages": ["C++", "JavaScript", "Python", "SQL"],
    "Web Technologies": ["Django", "Flask", "React", "Redux", "HTML"],
    "Databases": ["MySQL", "Redis", "MongoDB", "SQLite"],
    "Development Tools": ["VS Code", "PyCharm", "Docker", "Jenkins", "Linux", "GitHub", "Jira", "pytest"]
  },
  research: {
    paragraphs: [
      "My research and open-source contributions focus on improving system security, reliability, and asynchronous operations.",
      "• Open-Source: Contributed to the curl cffi Python library by implementing AsyncSession.upkeep() to provide essential protocol-level session maintenance and ensure reliability during asynchronous operations.",
      "• Research Paper published and presented at the 3rd IEEE International Conference on Blockchain and Distributed Systems Security 2024.",
      "• Research Paper accepted at IJISRT (ID: IJISRT24JUN1049)."
    ],
    keyTerms: ["curl cffi", "AsyncSession", "IEEE", "Blockchain", "Distributed Systems Security", "IJISRT"]
  },
  projects: [
    {
      id: 1,
      title: "Advance Plagiarism Tool",
      tags: ["Python", "Flask", "NLP", "NLTK"],
      description: "Built a plagiarism detection system using NLP techniques, custom Cosine Similarity algorithm, and Latent Semantic Analysis. Full-stack workflow using HTML, Flask, NLTK, Python, SQLite.",
      sourceLink: "https://github.com/kadamprashant1/Final_Year_Project"
    },
    {
      id: 3,
      title: "Brain Tumor Detection",
      tags: ["Python", "Machine Learning", "Computer Vision"],
      description: "Developed a Brain Tumor Detection Project utilizing Machine Learning techniques and image processing to accurately identify and classify tumors in medical scans.",
      sourceLink: "https://github.com/kadamprashant1/BrainTumorDetection_main"
    },
    {
      id: 4,
      title: "Forge Gym Application",
      tags: ["Flutter", "Dart", "Android"],
      description: "Built a Flutter-based Android gym guide application that helps users track their workouts, view exercise tutorials, and maintain their fitness regimes on the go.",
      sourceLink: "https://github.com/kadamprashant1/forge-gym-application"
    },
    {
      id: 5,
      title: "Flask Image Editing App",
      tags: ["Python", "Flask", "OpenCV"],
      description: "Created a web application using Flask and OpenCV that allows users to upload and edit images directly from their browser using advanced image processing algorithms.",
      sourceLink: "https://github.com/kadamprashant1/flask-image-editing-app"
    }
  ]
};

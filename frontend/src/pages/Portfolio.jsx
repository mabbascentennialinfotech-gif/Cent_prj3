import React, { useEffect, useState } from "react";
import "../css/portfolio.css";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaRocket,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCode,
  FaGraduationCap,
  FaCog,
  FaPaintBrush,
} from "react-icons/fa";
import {
  User,
  Briefcase,
  Link,
  ShieldCheck,
  Sparkles,
  Globe,
  FileText,
  Rocket,
  Smartphone,
  LayoutDashboard,
  Star,
  Menu,
  X,
} from "lucide-react";
import githubLogo from "../assets/github.png";
import linkedinLogo from "../assets/linkedin.png";

export default function Trial() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const iconMap = {
    code: <FaCode />,
    learn: <FaGraduationCap />,
    cog: <FaCog />,
    hobby: <FaPaintBrush />,
  };
  const getIcon = (key) => iconMap[key] || <FaCode />;

  const [editMode, setEditMode] = useState(false);

  const [headerSection, setHeaderSection] = useState({
    logo: "Portfolio",
    logoImage: "",
  });

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setHeaderSection({
        ...headerSection,
        logoImage: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };
  const removeLogo = () => {
    setHeaderSection({
      ...headerSection,
      logoImage: "",
    });
  };
  /*********Home section : Start ******* */
  const [heroSection, setHeroSection] = useState({
    greeting: "Hi, I'm",
    firstName: "Ashwani",
    lastName: "Kumar Chauhan",
    role: "MERN Stack Developer",
    description: "Passionate about creating responsive applications.",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    showGithub: true,
    showLinkedin: true,
    image: "/profile.png",
    cv: "",
  });
  /*************Image upload ************* */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setHeroSection({
        ...heroSection,
        image: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  /*************Cv upload ****** */
  const handleCVUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setHeroSection({
        ...heroSection,
        cv: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  /*********Home section : end ******* */

  /*********About section : Start ******* */
  const [aboutSection, setAboutSection] = useState({
    title: "About Me",
    cards: [
      {
        id: 1,
        icon: "code",
        title: "Web Development",
        description: "Passionate about creating responsive applications.",
      },

      {
        id: 2,
        icon: "learn",
        title: "Continuous Learning",
        description: "Always eager to learn new technologies.",
      },

      {
        id: 3,
        icon: "cog",
        title: "Problem Solving",
        description: "Enjoy tackling complex challenges.",
      },

      {
        id: 4,
        icon: "hobby",
        title: "My Hobby",
        description: "My aim is clear to become full stack developer.",
      },
    ],
  });

  /*********About section : End ******* */
  /*********skill  section : Start ******* */

  const [skillsSection, setSkillsSection] = useState({
    title: "Skills & Technologies",
    leftTitle: "Technical Proficiency",
    rightTitle: "Technologies I Work With",
    skills: [
      {
        id: 1,
        name: "AI",
        percentage: 85,
      },

      {
        id: 2,
        name: "ABC",
        percentage: 80,
      },

      {
        id: 3,
        name: "MERN Stack",
        percentage: 90,
      },

      {
        id: 4,
        name: "Generative AI",
        percentage: 70,
      },

      {
        id: 5,
        name: "HTML",
        percentage: 90,
      },

      {
        id: 6,
        name: "CSS",
        percentage: 79,
      },
    ],

    technologies: ["AI", "ABC", "MERN Stack", "Generative AI", "HTML", "CSS"],
  });

  /********* skill  section : End    ******* */
  /*********project section : Start ******* */
  const [projectsSection, setProjectsSection] = useState({
    title: "Recent Projects",
    githubText: "WANT TO SEE MORE OF MY WORK?",
    githubLink: "https://github.com/",
    projects: [
      {
        id: 1,

        title: "Sales Funnel Optimization",

        description:
          "Improved a company’s sales funnel to increase conversions.",

        tag: "Funnel steps (lead → call → close)",

        code: "#",

        demo: "#",

        hasDemo: true,
        showCode: true,
        showDemo: true,
      },

      {
        id: 2,

        title: "CRM Management Project",

        description: "Managed leads using tools like HubSpot or Salesforce.",

        tag: "Lead tracking system",

        code: "#",

        demo: "#",
        showCode: true,
        showDemo: true,
      },
    ],
  });
  /********* project section : End ******* */
  /*********Contact section : Start ******* */

  const [contactSection, setContactSection] = useState({
    title: "Get In Touch",
    leftTitle: "Contact Information",
    rightTitle: "Send me a Message",
    email: "Ashwanikumarchauhan014@gmail.com",
    phone: "9616129738",
    location: "U.P, INDIA",
    opportunityTitle: "Open for Opportunities",
    opportunityDescription:
      "I'm actively looking for entry-level MERN Stack Developer roles and internship opportunities. If you have an exciting project or role, feel free to connect with me!",
  });
  /*********Contact section : end ******* */
  /*********footer section : start ******* */
  const [footerSection, setFooterSection] = useState({
    name: "ashwani",

    description: "Building digital experiences with precision and passion.",

    github: "https://github.com/",

    linkedin: "https://linkedin.com/",

    email: "yourmail@gmail.com",

    showGithub: true,
    showLinkedin: true,
    showEmail: true,

    copyright: "© 2026 Ashwani kumar chauhan. All rights reserved.",

    location: "Lucknow, Uttar Pradesh, India",
  });

  /*********footer section : end ******* */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCurrentUser(null);
        navigate("/login");
        return;
      }

      try {
        // wait for auth token
        await user.getIdToken();

        setCurrentUser(user);

        setUsername(user.displayName || user.email.split("@")[0]);

        const portfolioRef = doc(db, "trialData", user.uid);
        console.log("USER:", user);
        console.log("UID:", user.uid);
        console.log("AUTH UID:", auth.currentUser?.uid);

        const portfolioSnap = await getDoc(portfolioRef);

        const userRef = doc(db, "users", user.uid);

        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();

          console.log("USER DATA:", userData);

          setIsPremium(userData?.premium === true);
        }

        if (portfolioSnap.exists()) {
          const data = portfolioSnap.data();

          if (data.headerSection) setHeaderSection(data.headerSection);
          if (data.heroSection) setHeroSection(data.heroSection);
          if (data.aboutSection) setAboutSection(data.aboutSection);
          if (data.skillsSection) setSkillsSection(data.skillsSection);
          if (data.projectsSection) setProjectsSection(data.projectsSection);
          if (data.contactSection) setContactSection(data.contactSection);
          if (data.footerSection) setFooterSection(data.footerSection);
        }
      } catch (error) {
        console.error("Firestore Error:", error);
      }
    });

    return () => unsubscribe();
  }, []);

  const savePortfolio = async () => {
    if (!currentUser) return;

    try {
      await setDoc(doc(db, "trialData", currentUser.uid), {
        headerSection,
        heroSection,
        aboutSection,
        skillsSection,
        projectsSection,
        contactSection,
        footerSection,
        updatedAt: Date.now(),
      });

      console.log("Portfolio Saved");
    } catch (error) {
      console.error("Error saving portfolio:", error);
    }
  };

  const logout = async () => {
    await signOut(auth);

    window.location.href = "/login?type=register";
  };

  return (
    <>
      {!isPremium && <div className="trial-watermark">TRIAL VERSION</div>}
      {/* Header */}
      <header className="dashboard header">
        <div className="logo">
          {editMode ? (
            <div className="logo-edit">
              <input
                value={headerSection.logo}
                onChange={(e) =>
                  setHeaderSection({
                    ...headerSection,
                    logo: e.target.value,
                  })
                }
                placeholder="Enter Logo Name"
              />

              <input type="file" accept="image/*" onChange={handleLogoUpload} />

              {headerSection.logoImage && (
                <button className="remove-btn" onClick={removeLogo}>
                  Remove
                </button>
              )}
            </div>
          ) : (
            <>
              {headerSection.logoImage && (
                <img
                  src={headerSection.logoImage}
                  alt="logo"
                  className="logo-img"
                />
              )}

              <span className="logo-display">{headerSection.logo}</span>
            </>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className={`navbar ${mobileMenu ? "mobile-open" : ""}`}>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>

          <div className="mobile-user-info">
            <span>{username}</span>

            <button onClick={logout} className="customize-btn">
              Signout
            </button>
          </div>
        </nav>

        {/* Always Visible Actions */}
        <div className="header-actions">
          <button
            className="customize-btn"
            onClick={async () => {
              if (editMode) {
                await savePortfolio();
              }
              setEditMode(!editMode);
            }}
          >
            {editMode ? "💾 Save" : "⚙️ Customize"}
          </button>

          {!isPremium && (
            <button
              onClick={() => navigate("/pricing")}
              className="premium-btn"
            >
              Premium
            </button>
          )}

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-left">
          {editMode ? (
            <div className="hero-edit">
              <input
                value={heroSection.greeting}
                onChange={(e) =>
                  setHeroSection({
                    ...heroSection,
                    greeting: e.target.value,
                  })
                }
                placeholder="Enter Greeting"
              />

              <input
                value={heroSection.firstName}
                onChange={(e) =>
                  setHeroSection({
                    ...heroSection,
                    firstName: e.target.value,
                  })
                }
                placeholder="Enter First Name"
              />

              <input
                value={heroSection.lastName}
                onChange={(e) =>
                  setHeroSection({
                    ...heroSection,
                    lastName: e.target.value,
                  })
                }
                placeholder="Enter Last Name"
              />

              <input
                value={heroSection.role}
                onChange={(e) =>
                  setHeroSection({
                    ...heroSection,
                    role: e.target.value,
                  })
                }
                placeholder="Enter Role"
              />

              <textarea
                value={heroSection.description}
                onChange={(e) =>
                  setHeroSection({
                    ...heroSection,
                    description: e.target.value,
                  })
                }
                placeholder="Enter Your Professional Tagline"
              />

              <input
                value={heroSection.github}
                onChange={(e) =>
                  setHeroSection({
                    ...heroSection,
                    github: e.target.value,
                  })
                }
                placeholder="Enter GitHub URL"
              />

              <input
                value={heroSection.linkedin}
                onChange={(e) =>
                  setHeroSection({
                    ...heroSection,
                    linkedin: e.target.value,
                  })
                }
                placeholder="Enter LinkedIn URL"
              />
              <label className="toggle-row">
                <input
                  type="checkbox"
                  checked={heroSection.showGithub}
                  onChange={(e) =>
                    setHeroSection({
                      ...heroSection,
                      showGithub: e.target.checked,
                    })
                  }
                />
                Show GitHub Icon
              </label>

              <label className="toggle-row">
                <input
                  type="checkbox"
                  checked={heroSection.showLinkedin}
                  onChange={(e) =>
                    setHeroSection({
                      ...heroSection,
                      showLinkedin: e.target.checked,
                    })
                  }
                />
                Show LinkedIn Icon
              </label>

              <label>Upload Profile Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />

              <label>Upload CV</label>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleCVUpload}
              />
            </div>
          ) : (
            <>
              <h1>
                {heroSection.greeting} <span>{heroSection.firstName}</span>
                <br />
                {heroSection.lastName}
              </h1>

              <h2>{heroSection.role}</h2>

              <p>{heroSection.description}</p>
            </>
          )}

          <div className="hero-buttons">
            <button
              className="cv-btn"
              onClick={() => {
                if (!isPremium) {
                  alert("Upgrade to premium to download CV");

                  return;
                }

                if (heroSection.cv) {
                  const link = document.createElement("a");

                  link.href = heroSection.cv;

                  link.download = "resume";

                  link.click();
                } else {
                  alert("No CV uploaded");
                }
              }}
            >
              {isPremium ? "DOWNLOAD CV" : "PREMIUM ONLY"}
            </button>

            <div className="social-icons">
              {heroSection.showGithub && (
                <a href={heroSection.github} target="_blank" rel="noreferrer">
                  <FaGithub size={28} />
                </a>
              )}

              {heroSection.showLinkedin && (
                <a href={heroSection.linkedin} target="_blank" rel="noreferrer">
                  <FaLinkedin size={28} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="image-circle">
            <img src={heroSection.image} alt="profile" />

            {!isPremium && <div className="image-watermark">TRIAL</div>}
          </div>
        </div>
      </section>
      <section className="about-section" id="about">
        <div className="section-title">
          <h2>
            {editMode ? (
              <input
                className="title-input"
                value={aboutSection.title}
                onChange={(e) =>
                  setAboutSection({
                    ...aboutSection,
                    title: e.target.value,
                  })
                }
                placeholder="Enter About Section title"
              />
            ) : (
              aboutSection.title
            )}
          </h2>
          <div className="underline"></div>
        </div>

        <div className="about-container">
          {aboutSection.cards.map((card, index) => (
            <div className="about-card" key={card.id}>
              <div className="icon">
                {editMode ? (
                  <select
                    value={card.icon}
                    onChange={(e) => {
                      const updated = [...aboutSection.cards];
                      updated[index].icon = e.target.value;

                      setAboutSection({
                        ...aboutSection,
                        cards: updated,
                      });
                    }}
                  >
                    <option value="">Select Icons</option>
                    <option value="code">Code</option>
                    <option value="learn">Learn</option>
                    <option value="cog">Cog</option>
                    <option value="hobby">Hobby</option>
                  </select>
                ) : (
                  getIcon(card.icon)
                )}
              </div>

              {editMode ? (
                <>
                  <input
                    value={card.title}
                    onChange={(e) => {
                      const updated = [...aboutSection.cards];

                      updated[index].title = e.target.value;

                      setAboutSection({
                        ...aboutSection,
                        cards: updated,
                      });
                    }}
                    placeholder="Enter Skill"
                  />

                  <textarea
                    value={card.description}
                    onChange={(e) => {
                      const updated = [...aboutSection.cards];

                      updated[index].description = e.target.value;

                      setAboutSection({
                        ...aboutSection,
                        cards: updated,
                      });
                    }}
                    placeholder="Enter Description"
                  />

                  <button
                    className="delete-btn"
                    onClick={() => {
                      const updated = aboutSection.cards.filter(
                        (item) => item.id !== card.id,
                      );

                      setAboutSection({
                        ...aboutSection,
                        cards: updated,
                      });
                    }}
                  >
                    🗑 Delete
                  </button>
                </>
              ) : (
                <>
                  <h3>{card.title}</h3>

                  <p>{card.description}</p>
                </>
              )}
            </div>
          ))}
          {editMode && (
            <button
              className="add-btn"
              onClick={() => {
                const newCard = {
                  id: Date.now(),
                  icon: "✨",
                  title: "New Skill",
                  description: "Add description here.",
                };

                setAboutSection({
                  ...aboutSection,
                  cards: [...aboutSection.cards, newCard],
                });
              }}
            >
              + Add Card
            </button>
          )}
        </div>
      </section>
      <section className="skills-section" id="skills">
        <div className="skills-title">
          <h2>
            {editMode ? (
              <input
                className="title-input"
                value={skillsSection.title}
                onChange={(e) =>
                  setSkillsSection({
                    ...skillsSection,
                    title: e.target.value,
                  })
                }
                placeholder="Enter Skill Section Title"
              />
            ) : (
              skillsSection.title
            )}
          </h2>

          <div className="skills-line"></div>
        </div>

        <div className="skills-container">
          {/* LEFT */}

          <div className="skills-left">
            {editMode ? (
              <input
                className="title-input"
                value={skillsSection.leftTitle}
                onChange={(e) =>
                  setSkillsSection({
                    ...skillsSection,
                    leftTitle: e.target.value,
                  })
                }
                placeholder="Enter Skills & Technology Title"
              />
            ) : (
              <h3>{skillsSection.leftTitle}</h3>
            )}

            {skillsSection.skills.map((skill, index) => (
              <div className="skill" key={skill.id}>
                <div className="skill-info">
                  {editMode ? (
                    <>
                      <input
                        value={skill.name}
                        onChange={(e) => {
                          const updated = [...skillsSection.skills];

                          updated[index].name = e.target.value;

                          setSkillsSection({
                            ...skillsSection,
                            skills: updated,
                          });
                        }}
                        placeholder="Enter Skill"
                      />

                      <input
                        type="number"
                        value={skill.percentage}
                        onChange={(e) => {
                          const updated = [...skillsSection.skills];

                          updated[index].percentage = e.target.value;

                          setSkillsSection({
                            ...skillsSection,
                            skills: updated,
                          });
                        }}
                        placeholder="Enter Proficiency Value"
                      />
                    </>
                  ) : (
                    <>
                      <span>{skill.name}</span>

                      <span>{skill.percentage}%</span>
                    </>
                  )}
                </div>

                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{
                      width: `${skill.percentage}%`,
                    }}
                  ></div>
                </div>
                {editMode && (
                  <button
                    className="delete-btn"
                    onClick={() => {
                      const updated = skillsSection.skills.filter(
                        (s) => s.id !== skill.id,
                      );

                      setSkillsSection({
                        ...skillsSection,
                        skills: updated,
                      });
                    }}
                  >
                    🗑
                  </button>
                )}
              </div>
            ))}
            {editMode && (
              <button
                className="add-btn"
                onClick={() => {
                  const newSkill = {
                    id: Date.now(),
                    name: "New Skill",
                    percentage: 50,
                  };

                  setSkillsSection({
                    ...skillsSection,
                    skills: [...skillsSection.skills, newSkill],
                  });
                }}
              >
                + Add Skill
              </button>
            )}
          </div>

          {/* RIGHT */}

          <div className="skills-right">
            {editMode ? (
              <input
                className="title-input"
                value={skillsSection.rightTitle}
                onChange={(e) =>
                  setSkillsSection({
                    ...skillsSection,
                    rightTitle: e.target.value,
                  })
                }
                placeholder="Enter Technology Title"
              />
            ) : (
              <h3>{skillsSection.rightTitle}</h3>
            )}

            <div className="tech-grid">
              {skillsSection.technologies.map((tech, index) => (
                <div className="tech-card" key={index}>
                  {editMode ? (
                    <input
                      value={tech}
                      onChange={(e) => {
                        const updated = [...skillsSection.technologies];
                        updated[index] = e.target.value;

                        setSkillsSection({
                          ...skillsSection,
                          technologies: updated,
                        });
                      }}
                      placeholder="Enter Skill"
                    />
                  ) : (
                    tech
                  )}

                  {/* DELETE BUTTON MOVED HERE (AFTER TEXT) */}
                  {editMode && (
                    <button
                      className="delete-btn"
                      onClick={() => {
                        const updated = skillsSection.technologies.filter(
                          (_, i) => i !== index,
                        );

                        setSkillsSection({
                          ...skillsSection,
                          technologies: updated,
                        });
                      }}
                    >
                      🗑
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* ADD BUTTON */}
            {editMode && (
              <button
                className="add-btn"
                onClick={() => {
                  setSkillsSection({
                    ...skillsSection,
                    technologies: [...skillsSection.technologies, "New Tech"],
                  });
                }}
              >
                + Add Tech
              </button>
            )}
          </div>
        </div>
      </section>
      <section className="projects-section" id="projects">
        <h1 className="section-title">
          {editMode ? (
            <input
              className="title-input"
              value={projectsSection.title}
              onChange={(e) =>
                setProjectsSection({
                  ...projectsSection,
                  title: e.target.value,
                })
              }
              placeholder="Enter Project Section Title"
            />
          ) : (
            projectsSection.title
          )}
        </h1>

        <div className="projects-grid">
          {projectsSection.projects.map((project, index) => (
            <div className="project-card" key={project.id}>
              <h2>
                <FaRocket className="rocket-icon" />

                {editMode ? (
                  <input
                    value={project.title}
                    onChange={(e) => {
                      const updated = [...projectsSection.projects];

                      updated[index].title = e.target.value;

                      setProjectsSection({
                        ...projectsSection,
                        projects: updated,
                      });
                    }}
                    placeholder="Enter Project Title"
                  />
                ) : (
                  project.title
                )}
              </h2>

              {editMode ? (
                <textarea
                  value={project.description}
                  onChange={(e) => {
                    const updated = [...projectsSection.projects];

                    updated[index].description = e.target.value;

                    setProjectsSection({
                      ...projectsSection,
                      projects: updated,
                    });
                  }}
                  placeholder="Enter Project Description"
                />
              ) : (
                <p>{project.description}</p>
              )}

              {editMode ? (
                <input
                  value={project.tag}
                  onChange={(e) => {
                    const updated = [...projectsSection.projects];

                    updated[index].tag = e.target.value;

                    setProjectsSection({
                      ...projectsSection,
                      projects: updated,
                    });
                  }}
                  placeholder="Enter Project Tag"
                />
              ) : (
                <span className="project-tag">{project.tag}</span>
              )}

              <div className="project-buttons">
                {editMode ? (
                  <>
                    {project.showCode && (
                      <input
                        value={project.code}
                        onChange={(e) => {
                          const updated = [...projectsSection.projects];
                          updated[index].code = e.target.value;

                          setProjectsSection({
                            ...projectsSection,
                            projects: updated,
                          });
                        }}
                        placeholder="Enter Project URL"
                      />
                    )}

                    <button
                      className="delete-btn"
                      onClick={() => {
                        const updated = [...projectsSection.projects];

                        updated[index] = {
                          ...updated[index],
                          showCode: !updated[index].showCode,
                        };

                        setProjectsSection({
                          ...projectsSection,
                          projects: updated,
                        });
                      }}
                    >
                      🗑 Toggle Code Button
                    </button>

                    {project.showDemo && (
                      <input
                        placeholder="Enter Project Demo URL"
                        value={project.demo}
                        onChange={(e) => {
                          const updated = [...projectsSection.projects];
                          updated[index].demo = e.target.value;

                          setProjectsSection({
                            ...projectsSection,
                            projects: updated,
                          });
                        }}
                      />
                    )}

                    <button
                      className="delete-btn"
                      onClick={() => {
                        const updated = [...projectsSection.projects];

                        updated[index] = {
                          ...updated[index],
                          showDemo: !updated[index].showDemo,
                        };

                        setProjectsSection({
                          ...projectsSection,
                          projects: updated,
                        });
                      }}
                    >
                      🗑 Toggle Demo Button
                    </button>
                  </>
                ) : (
                  <>
                    {project.showCode && (
                      <a href={project.code} className="btn-outline">
                        <FaGithub /> CODE
                      </a>
                    )}

                    {project.showDemo && (
                      <a
                        href={project.demo}
                        className="btn-filled"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaExternalLinkAlt /> LIVE DEMO
                      </a>
                    )}
                  </>
                )}
              </div>
              {editMode && (
                <button
                  className="delete-btn"
                  onClick={() => {
                    const updated = projectsSection.projects.filter(
                      (p) => p.id !== project.id,
                    );

                    setProjectsSection({
                      ...projectsSection,
                      projects: updated,
                    });
                  }}
                >
                  🗑 Delete Project
                </button>
              )}
            </div>
          ))}
          {editMode && (
            <button
              className="add-btn"
              onClick={() => {
                const newProject = {
                  id: Date.now(),
                  title: "New Project",
                  description: "Project description here...",
                  tag: "New Tag",
                  code: "#",
                  demo: "#",
                  showCode: true,
                  showDemo: true,
                };

                setProjectsSection({
                  ...projectsSection,
                  projects: [...projectsSection.projects, newProject],
                });
              }}
            >
              + Add Project
            </button>
          )}
        </div>

        <div className="github-section">
          {editMode ? (
            <>
              <input
                value={projectsSection.githubText}
                onChange={(e) =>
                  setProjectsSection({
                    ...projectsSection,
                    githubText: e.target.value,
                  })
                }
                placeholder="Enter More Projects title"
              />

              <input
                value={projectsSection.githubLink}
                onChange={(e) =>
                  setProjectsSection({
                    ...projectsSection,
                    githubLink: e.target.value,
                  })
                }
                placeholder="Enter More Projects URL"
              />
            </>
          ) : (
            <>
              <p>{projectsSection.githubText}</p>

              <a href={projectsSection.githubLink} className="github-btn">
                <FaGithub />
                VISIT MY GITHUB
              </a>
            </>
          )}
        </div>
      </section>
      <section className="contact-section" id="contact">
        <h1 className="contact-title">
          {editMode ? (
            <input
              className="title-input"
              value={contactSection.title}
              onChange={(e) =>
                setContactSection({
                  ...contactSection,
                  title: e.target.value,
                })
              }
              placeholder="Enter Contact Title"
            />
          ) : (
            contactSection.title
          )}
        </h1>

        <div className="contact-container">
          {/* LEFT */}

          <div className="contact-left">
            {editMode ? (
              <input
                className="title-input"
                value={contactSection.leftTitle}
                onChange={(e) =>
                  setContactSection({
                    ...contactSection,
                    leftTitle: e.target.value,
                  })
                }
                placeholder="Enter Contact Sub Title"
              />
            ) : (
              <h2>{contactSection.leftTitle}</h2>
            )}

            {/* EMAIL */}

            <div className="info-card">
              <div className="icon-box">
                <FaEnvelope />
              </div>

              <div>
                <span>EMAIL</span>

                {editMode ? (
                  <input
                    value={contactSection.email}
                    onChange={(e) =>
                      setContactSection({
                        ...contactSection,
                        email: e.target.value,
                      })
                    }
                    placeholder="Enter Contact Email"
                  />
                ) : (
                  <p>{contactSection.email}</p>
                )}
              </div>
            </div>

            {/* PHONE */}

            <div className="info-card">
              <div className="icon-box">
                <FaPhoneAlt />
              </div>

              <div>
                <span>PHONE</span>

                {editMode ? (
                  <input
                    value={contactSection.phone}
                    onChange={(e) =>
                      setContactSection({
                        ...contactSection,
                        phone: e.target.value,
                      })
                    }
                    placeholder="Enter Contact Number"
                  />
                ) : (
                  <p>{contactSection.phone}</p>
                )}
              </div>
            </div>

            {/* LOCATION */}

            <div className="info-card">
              <div className="icon-box">
                <FaMapMarkerAlt />
              </div>

              <div>
                <span>LOCATION</span>

                {editMode ? (
                  <input
                    value={contactSection.location}
                    onChange={(e) =>
                      setContactSection({
                        ...contactSection,
                        location: e.target.value,
                      })
                    }
                    placeholder="Enter Contact Address"
                  />
                ) : (
                  <p>{contactSection.location}</p>
                )}
              </div>
            </div>

            {/* OPPORTUNITY */}

            <div className="opportunity-card">
              {editMode ? (
                <>
                  <input
                    value={contactSection.opportunityTitle}
                    onChange={(e) =>
                      setContactSection({
                        ...contactSection,
                        opportunityTitle: e.target.value,
                      })
                    }
                    placeholder="Enter Opportunity Title"
                  />

                  <textarea
                    value={contactSection.opportunityDescription}
                    onChange={(e) =>
                      setContactSection({
                        ...contactSection,
                        opportunityDescription: e.target.value,
                      })
                    }
                    placeholder="Enter Opportunity Description"
                  />
                </>
              ) : (
                <>
                  <h3>{contactSection.opportunityTitle}</h3>

                  <p>{contactSection.opportunityDescription}</p>
                </>
              )}
            </div>
          </div>

          {/* RIGHT */}

          <div className="contact-right">
            {editMode ? (
              <input
                className="title-input"
                value={contactSection.rightTitle}
                onChange={(e) =>
                  setContactSection({
                    ...contactSection,
                    rightTitle: e.target.value,
                  })
                }
                placeholder="Enter Send Message Title"
              />
            ) : (
              <h2>{contactSection.rightTitle}</h2>
            )}

            <form className="contact-form">
              <input type="text" placeholder="Your Name" />

              <input type="email" placeholder="Email Address" />

              <textarea rows="6" placeholder="Your Message"></textarea>

              <button type="submit">
                <FaPaperPlane />
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-left">
            {editMode ? (
              <>
                <input
                  value={footerSection.name}
                  onChange={(e) =>
                    setFooterSection({
                      ...footerSection,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter Name"
                />

                <textarea
                  value={footerSection.description}
                  onChange={(e) =>
                    setFooterSection({
                      ...footerSection,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter Experience description"
                />
              </>
            ) : (
              <>
                <h1>{footerSection.name}</h1>

                <p>{footerSection.description}</p>
              </>
            )}
          </div>

          <div className="footer-icons">
            {editMode ? (
              <div className="footer-edit-links">
                <input
                  placeholder="GitHub Link"
                  value={footerSection.github}
                  onChange={(e) =>
                    setFooterSection({
                      ...footerSection,
                      github: e.target.value,
                    })
                  }
                  placeholder="Enter GitHub URL"
                />

                <input
                  placeholder="LinkedIn Link"
                  value={footerSection.linkedin}
                  onChange={(e) =>
                    setFooterSection({
                      ...footerSection,
                      linkedin: e.target.value,
                    })
                  }
                  placeholder="Enter LinkedIn URL"
                />

                <input
                  placeholder="Email"
                  value={footerSection.email}
                  onChange={(e) =>
                    setFooterSection({
                      ...footerSection,
                      email: e.target.value,
                    })
                  }
                  placeholder="Enter Email"
                />
                <label className="toggle-row">
                  <input
                    type="checkbox"
                    checked={footerSection.showGithub}
                    onChange={(e) =>
                      setFooterSection({
                        ...footerSection,
                        showGithub: e.target.checked,
                      })
                    }
                  />
                  Show GitHub
                </label>

                <label className="toggle-row">
                  <input
                    type="checkbox"
                    checked={footerSection.showLinkedin}
                    onChange={(e) =>
                      setFooterSection({
                        ...footerSection,
                        showLinkedin: e.target.checked,
                      })
                    }
                  />
                  Show LinkedIn
                </label>

                <label className="toggle-row">
                  <input
                    type="checkbox"
                    checked={footerSection.showEmail}
                    onChange={(e) =>
                      setFooterSection({
                        ...footerSection,
                        showEmail: e.target.checked,
                      })
                    }
                  />
                  Show Email
                </label>
              </div>
            ) : (
              <>
                {footerSection.showGithub && (
                  <a
                    href={footerSection.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub />
                  </a>
                )}

                {footerSection.showLinkedin && (
                  <a
                    href={footerSection.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaLinkedin />
                  </a>
                )}

                {footerSection.showEmail && (
                  <a href={`mailto:${footerSection.email}`}>
                    <FaEnvelope />
                  </a>
                )}
              </>
            )}
          </div>
        </div>

        <div className="footer-line"></div>

        <div className="footer-bottom">
          {editMode ? (
            <>
              <input
                value={footerSection.copyright}
                onChange={(e) =>
                  setFooterSection({
                    ...footerSection,
                    copyright: e.target.value,
                  })
                }
                placeholder="Enter Copyright Title URL"
              />

              <input
                value={footerSection.location}
                onChange={(e) =>
                  setFooterSection({
                    ...footerSection,
                    location: e.target.value,
                  })
                }
                placeholder="Enter Location"
              />
            </>
          ) : (
            <>
              <p>{footerSection.copyright}</p>

              <span>{footerSection.location}</span>
            </>
          )}
        </div>
      </footer>
    </>
  );
}

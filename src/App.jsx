import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import ToggleDisplayWarningToInDepthProject from "./ToggleDisplayWarningToInDepthProject";

// Project data
import projectData from "./project_data.json";

// Icons used in app
import { IoIosLink } from "react-icons/io";
import { FaServer } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { BiUpArrowAlt } from "react-icons/bi";
import { BiDownArrowAlt } from "react-icons/bi";
import WarningForBackendDelay from "./WarningForBackendDelay";

function App() {
  const overlay = useRef(null);
  const [multipleRepos, setMultipleRepos] = useState({});
  const [inDepthProject, setInDepthProject] = useState({});

  const [maxHeight, setMaxHeight] = useState(0);
  const inDepthProjectContentContainer = useRef(null);
  const warningContentContainer = useRef(null);
  const inDepthProjectContainerRef = useRef(null);

  const [displayWarning, setDisplayWarning] = useState({show: false, project: null}); // Object so that the project details can be carried through for a personalised warning
  const [displayWarningToInDepthProject, setDisplayWarningToInDepthProject] = useState(false);
  const [delayInInitialProjectRequest, setDelayInInitialProjectRequest] = useState(false); // Put in a variable to allow for transition delays 
  const [showPolyrepoLinks, setShowPolyrepoLinks] = useState(null);

  // Functions related to the display of an in-depth project
  const viewProjectInDepth = (project) => {
    setInDepthProject(project);
    overlay.current.style.display = "block";
  };

  const closeInDepthProject = () => {
    overlay.current.style.display = "none";
    setInDepthProject({});
    setDisplayWarningToInDepthProject(false);
    setShowPolyrepoLinks(null); // Resets the animation loop for
    setDelayInInitialProjectRequest(false);
  };

  const showDelayMessage = () => {
    setDisplayWarningToInDepthProject(true);
    setTimeout(() => setDelayInInitialProjectRequest(true), 300);
  };

  const continueToLiveLink = (inDepthProject) => {
    window.open(inDepthProject.liveLink.link, "_blank");
    setDisplayWarningToInDepthProject(false);
    setDelayInInitialProjectRequest(false);
  };

  const closeDelayMessage = () => {
    setTimeout(() => setDelayInInitialProjectRequest(false), 3000);
    setDisplayWarningToInDepthProject(false);
  };

  // Functions used to show warning from Home screen
  const openLiveLink = (event, project) => {
    event.stopPropagation();
    if (project.liveLink.delay) {
    overlay.current.style.display = "block";
    setDisplayWarning({show: true, project});
    } else {
    window.open(project.liveLink.link, "_blank");
    } 
  }

  // Functions related to the animation of the in-depth-projects
  useEffect(() => {
    if (inDepthProjectContainerRef.current) {
      console.log(inDepthProjectContainerRef.current);
      if (warningContentContainer.current) {
        console.log("displayWarning");
        setMaxHeight(
          inDepthProjectContainerRef.current.scrollHeight +
            warningContentContainer.current.scrollHeight
        );
      } else if (inDepthProjectContentContainer.current) {
        console.log("NOT displayWarning");
        setMaxHeight(
          inDepthProjectContainerRef.current.scrollHeight +
            inDepthProjectContentContainer.current.scrollHeight
        );
      }
    }
  }, [displayWarningToInDepthProject]);

  const toggleShowPolyrepoLinks = () => {
    if (showPolyrepoLinks === null) setShowPolyrepoLinks(true);
    else {
      setShowPolyrepoLinks((prev) => !prev);
    }
  };

  const getAnimationClass = (state) => {
    if (state === null) return "";
    return state ? "appear" : "disappear";
  };

  // Functions related to when the project is structured as a polyrepo
  const toggleMultipleRepos = (frontendURL, backendURL, event) => {
    event.stopPropagation(); // Prevents above functions taking precedence

    setMultipleRepos({ frontendURL, backendURL });
    overlay.current.style.display = "block";
  };

  const redirectToAMultipleRepo = (redirectURL) => {
    window.open(redirectURL, "_blank");
    overlay.current.style.display = "none";
    setMultipleRepos({});
  };

  const closeMultipleRepoBody = () => {
    overlay.current.style.display = "none";
    setMultipleRepos({});
  };

  return (
    <>
      <header>
        {/*</>Link to='/'>Home</Link>
        <Link to='/about-me'>About Me</Link>*/}
      </header>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>
        Welcome to <span className={"kiff's"}>Kiff's</span>
      </h1>
      <h1>
        <span className={"P title"}>P</span>
        <span className={"o title"}>o</span>
        <span className={"r title"}>r</span>
        <span className={"t title"}>t</span>
        <span className={"f title"}>f</span>
        <span className={"o title"}>o</span>
        <span className={"l title"}>l</span>
        <span className={"i title"}>i</span>
        <span className={"o title"}>o</span>
      </h1>

      <div className="projects-container">
        {projectData.map((project) => (
          <div
            className="project-div"
            key={project.key}
            onClick={() => viewProjectInDepth(project)}
          >
            <div className="screenshot-container">
              {project.screenshotPaths?.map((screenshot) => (
                <img
                  key={screenshot.id}
                  className="project-screenshot"
                  src={screenshot.path}
                  alt={screenshot.alt}
                  draggable={false}
                />
              ))}
            </div>

            <div className="project-header">
              <div className="project-top-left">
                <h2 className="project-name">{project.name}</h2>
              </div>
              <div className="project-top-right">
                {project.liveLink && (
                  <IoIosLink
                    size={24}
                    className="link-img"
                    onClick={(event) => openLiveLink(event, project)}
                  />
                )}
                <FaGithub
                  size={24}
                  className="github-link-project"
                  alt="GitHub Logo"
                  onClick={(event) => {
                    project.githubLinks.length > 1
                      ? toggleMultipleRepos(
                          project.githubLinks[0],
                          project.githubLinks[1],
                          event
                        )
                      : window.open(project.githubLinks[0], "_blank");
                  }}
                />
              </div>
            </div>
            <p className="project-brief">{project.brief}</p>
            <p className="view-more">Click to view more</p>
          </div>
        ))}
      </div>

      <div className="overlay" ref={overlay}>
        {
          // Dynamically shows this popup when the a github project with a polyrepo is selected
          Object.keys(multipleRepos).length > 0 && (
            <div className="multiple-repos-container">
              <div className="multiple-repos-header">
                <h2 className="multiple-repos-title">Polyrepos</h2>
                <h2
                  className="close-multiple-repos"
                  onClick={closeMultipleRepoBody}
                >
                  X
                </h2>
              </div>
              <div className="multiple-repos-body">
                <p style={{ marginBottom: "0" }}>
                  This project is <b>structured</b> as a{" "}
                  <b>
                    <span className="P">p</span>
                    <span className="o">o</span>
                    <span className="l">l</span>
                    <span className="y">y</span>repo (multiple-repositories).
                  </b>
                </p>
                <p>Please choose which repository you would like to view:</p>
                <div className="repo-links">
                  <div
                    className="frontend-repo-body"
                    onClick={() =>
                      redirectToAMultipleRepo(multipleRepos.frontendURL)
                    }
                  >
                    <p className="frontend-text">Frontend Repository</p>
                    <FaComputer size={24} />
                  </div>
                  <div
                    className="backend-repo-body"
                    onClick={() =>
                      redirectToAMultipleRepo(multipleRepos.backendURL)
                    }
                  >
                    <p className="backend-text">Backend Repository</p>
                    <FaServer size={24} />
                  </div>
                </div>
              </div>
            </div>
          )
        }

        {// Dynamically shows this popup when the a github project where the backend is hosted on render
       
        displayWarning.show &&
          <WarningForBackendDelay project={displayWarning.project} showWarning={displayWarning.show} setDisplayWarning={setDisplayWarning} overlay={overlay}/>
        }

        {
          // For when a user wants to view more information on a project.
          // {style={{ maxHeight: `${maxHeight}px` }}}
          Object.keys(inDepthProject).length > 0 && (
            <div className="project-container" ref={inDepthProjectContainerRef}>
              <div className="project-body">
                <div className="in-depth-screenshots-container">
                  {/*<div className='up-arrow scroll-arrow'><BiUpArrowAlt size={24}/></div>
                <div className='down-arrow scroll-arrow'><BiDownArrowAlt size={24} /></div>*/}
                  {inDepthProject.screenshotPaths?.map((screenshot) => (
                    <img
                      key={screenshot.id}
                      className="in-depth-project-screenshot"
                      src={screenshot.path}
                      alt={screenshot.alt}
                      draggable={false}
                    />
                  ))}
                </div>

                <div className="dividing-line"></div>

                <div className="content-container fade-in">
                  <div className="in-depth-project-header">
                    <h2 className="project-name">{inDepthProject.name}</h2>
                    <div className="in-depth-project-header-right">
                      <div
                        className={`in-depth-project-content-container ${
                          displayWarningToInDepthProject ? "fade-out" : "fade-in"
                        }`}
                        ref={inDepthProjectContentContainer}
                      >
                        <div className="in-depth-project-links">
                          {inDepthProject.githubLinks.length > 1 ? (
                            <div className="in-depth-repo-links">
                              <div className="github-link-container">
                                <FaGithub
                                  size={24}
                                  className="github-link-project"
                                  alt="GitHub Logo"
                                  onClick={toggleShowPolyrepoLinks}
                                />
                                <div className="polyrepo-title-container">
                                  <h4
                                    className={`polyrepo-title ${getAnimationClass(showPolyrepoLinks)}`}
                                  >
                                    <span className="P">P</span>
                                    <span className="o">o</span>
                                    <span className="l">l</span>
                                    <span className="y">y</span>repo
                                  </h4>
                                </div>
                                <div className="frontend-repo-container">
                                  <div
                                    className={`frontend-repo-body ${getAnimationClass(showPolyrepoLinks)}`}
                                    style={{opacity: getAnimationClass(showPolyrepoLinks).length > 0 ? "1" : "0"}}
                                    onClick={() => window.open(inDepthProject.githubLinks[0],"_blank")}
                                  >
                                    <p className="frontend-text">Frontend</p>
                                    <FaComputer size={20} />
                                  </div>
                                </div>
                                <div className="backend-repo-container">
                                  <div
                                    className={`backend-repo-body ${getAnimationClass(showPolyrepoLinks)}`}
                                    style={{opacity: getAnimationClass(showPolyrepoLinks).length > 0 ? "1" : "0"}}
                                    onClick={() => window.open(inDepthProject.githubLinks[1], "_blank")}
                                  >
                                    <FaServer size={20} />
                                    <p className="backend-text">Backend</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                              className="github-link-container"
                              onClick={() => window.open(inDepthProject.githubLinks[0], "_blank")}
                            >
                              <FaGithub
                                size={24}
                                className="github-link-project"
                                alt="GitHub Logo"
                              />
                            </div>
                          )}
                          {inDepthProject.liveLink && (
                            <div
                              className="live-link-container"
                              onClick={() => {
                                inDepthProject.liveLink.delay
                                  ? 
                                  showDelayMessage()
                                  :
                                  window.open(inDepthProject.liveLink.link, "_blank");
                              }}
                            >
                              <IoIosLink size={24} className="link-img" />
                            </div>
                          )}
                        </div>
                      </div>
                      <h2
                        className="close-in-depth-project"
                        onClick={closeInDepthProject}
                      >
                        X
                      </h2>
                    </div>
                  </div>
                  {delayInInitialProjectRequest ? ( // Warning provided to explain long initial wait time for appropriate projects
                    <ToggleDisplayWarningToInDepthProject
                      inDepthProject={inDepthProject}
                      warningContentContainer={warningContentContainer}
                      displayWarningToInDepthProject={displayWarningToInDepthProject}
                      continueToLiveLink={continueToLiveLink}
                      closeDelayMessage={closeDelayMessage}
                    />
                  ) : (
                    <div className="content-scroll-section">
                      <p className="in-depth-project-brief">
                        {inDepthProject.brief}
                      </p>
                      <p className="in-depth-project-description">
                        {inDepthProject.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        }
      </div>
    </>
  );
}

export default App;

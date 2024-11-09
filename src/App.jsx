import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";

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
import DisplayPolorepoPopUp from "./DisplayPolyrepoPopUp";

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
    // Returns nothing if the warning is displayed
    if (displayWarningToInDepthProject) return;

    setDisplayWarningToInDepthProject(true);
    setTimeout(() => setDelayInInitialProjectRequest(true), 300);
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
    // When delayInInitialProjectRequest is set to false (when cancel-btn is pressed in WarningForBackendDelay) the setDisplayWarningToInDepthProject is set accordingly
    setDisplayWarningToInDepthProject(delayInInitialProjectRequest)
  }, [delayInInitialProjectRequest])

  /*
  const githubLinkInDepthProjectRef = useRef(null);
  const liveLinkInDepthProjectRef = useState(null);
  useEffect(() => {
    console.log("DisplayInDepthWarning: ", displayWarningToInDepthProject)
    if (githubLinkInDepthProjectRef.current && liveLinkInDepthProjectRef.current) {
      console.log("gitHubPicCursor: ", githubLinkInDepthProjectRef.current.style.cursor)
      githubLinkInDepthProjectRef.current.style.cursor = (displayWarningToInDepthProject ? 'auto' : 'pointer');
      console.log("liveLinkCursor: ", liveLinkInDepthProjectRef.current.style.cursor)
      liveLinkInDepthProjectRef.current.style.cursor = (displayWarningToInDepthProject ? 'auto' : 'pointer');
    }
  }, [displayWarningToInDepthProject])

  /*
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
  */

  const toggleShowPolyrepoLinks = () => {
    // Returns nothing if the warning is displayed
    if (displayWarningToInDepthProject) return;

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
          <DisplayPolorepoPopUp multipleRepos={multipleRepos} setMultipleRepos={setMultipleRepos} overlay={overlay}/>
        }

        {// Dynamically shows this popup for a project where the backend is hosted on render
        displayWarning.show &&
          <WarningForBackendDelay project={displayWarning.project} setState={setDisplayWarning} overlay={overlay} inDepthProject={false}/>
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
                        <div className={`in-depth-project-links ${displayWarningToInDepthProject ? "no-pointer" : "" }`}>
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
                                    onClick={() => {
                                      if (displayWarningToInDepthProject) return;
                                      window.open(inDepthProject.githubLinks[0],"_blank")
                                    }}
                                  >
                                    <p className="frontend-text">Frontend</p>
                                    <FaComputer size={20} />
                                  </div>
                                </div>
                                <div className="backend-repo-container">
                                  <div
                                    className={`backend-repo-body ${getAnimationClass(showPolyrepoLinks)}`}
                                    style={{opacity: getAnimationClass(showPolyrepoLinks).length > 0 ? "1" : "0"}}
                                    onClick={() => {
                                      if (displayWarningToInDepthProject) return;
                                      window.open(inDepthProject.githubLinks[1], "_blank")
                                    }}
                                  >
                                    <FaServer size={20} />
                                    <p className="backend-text">Backend</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                              className={`github-link-container`}
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
                              className={`live-link-container ${displayWarningToInDepthProject ? "no-pointer" : "" }`}
                              onClick={() => {
                                inDepthProject.liveLink.delay
                                  ? 
                                  showDelayMessage()
                                  :
                                  window.open(inDepthProject.liveLink.link, "_blank");
                              }}
                            >
                              <IoIosLink  
                                size={24}
                                className="link-img"
                              />
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
                  {delayInInitialProjectRequest ? ( 
                    // Warning provided to explain long initial wait time for appropriate projects
                    <WarningForBackendDelay project={inDepthProject} setState={setDelayInInitialProjectRequest} overlay={overlay} inDepthProject={true}/>
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

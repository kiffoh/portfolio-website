import { useState, useRef, useEffect } from 'react';
import { IoIosLink } from "react-icons/io";
import { FaGithub } from "react-icons/fa";

const ProjectCard = ({ project, viewProjectInDepth, openLiveLink, toggleMultipleRepos }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const screenshotContainerRef = useRef(null);

  // In instance of manual scrolling or if the user is viewing a projectInDepth
  const preventInterval = useRef(false);
  const scrollTimeout = useRef(null); // Timeout ID storage
  
  useEffect(() => {
      const interval = setInterval(() => {
          setCurrentImageIndex(prevIndex => {
            if (preventInterval.current) return prevIndex; // If prevented, return the same index
            return (prevIndex + 1) % project.screenshotPaths.length;
        });
    }, 5000);
    
    return () => clearInterval(interval);
    }, [project.screenshotPaths.length]);

    useEffect(() => {
        if (screenshotContainerRef.current) {
            screenshotContainerRef.current.scrollTo({
                left: currentImageIndex * screenshotContainerRef.current.offsetWidth,
                behavior: 'smooth'
            });
        }
    }, [currentImageIndex]);

    useEffect(() => {
        const togglePreventInterval = () => {
            preventInterval.current = true;
            console.log('PreventInterval === TRUE')

            // Clear the existing timeout if it exists
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }

            // Set a new timeout to reset preventInterval when scrolling stops
            scrollTimeout.current = setTimeout(() => {
                preventInterval.current = false; // Set to false when scroll stops
                const scrolledToIndex = Math.floor(screenshotContainerRef.current.scrollLeft / screenshotContainerRef.current.offsetWidth);
                setCurrentImageIndex(scrolledToIndex)
            }, 500); 
        };        
    
        const currentScreenshotsRef = screenshotContainerRef.current;  // Copy the ref value to a variable to ensure consistency across renders
        
        if (currentScreenshotsRef) {
            currentScreenshotsRef.addEventListener("scroll", togglePreventInterval)
        }

        return () => {
            if (currentScreenshotsRef) {
                currentScreenshotsRef.removeEventListener("scroll", togglePreventInterval);
            }
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current); // Clear timeout on cleanup
            }
        }
    }, [])


    return (
        <div
        className="project-div"
        onClick={() => viewProjectInDepth(project)}
        >
            <div 
                className="screenshot-container"
                ref={screenshotContainerRef}
            >
                {project.screenshotPaths?.map((screenshot) => (
                <div key={screenshot.id} className="screenshot-slide">
                    <img
                    className="project-screenshot"
                    src={screenshot.path}
                    alt={screenshot.alt}
                    draggable={false}
                    />
                </div>
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
  );
};

export default ProjectCard;
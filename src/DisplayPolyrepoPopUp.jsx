import { FaServer } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";

function DisplayPolorepoPopUp ({multipleRepos, setMultipleRepos, overlay}) {

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
    )
}

export default DisplayPolorepoPopUp;
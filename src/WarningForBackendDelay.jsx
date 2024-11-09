

import { useRef, useState, useEffect } from "react";
import { IoIosWarning } from "react-icons/io";

function WarningForBackendDelay({project, inDepthProject, setState, overlay}) {
    // Determines if guestCredentials are needed
    const guestCredentials = project.liveLink.credentials;
    const [continueToGuestCredentials, setContinueToGuestCredentials] = useState(false);

    // Used for component transitions
    const [switchFade, setSwitchFade] = useState(false);

    const warningTextDiv = useRef(null);
    const [dimensions, setDimensions] = useState({ width: "auto", height: "auto" });

    // Capture dimensions of warningTextDiv after rendering
    useEffect(() => {
        if (warningTextDiv.current) {
            const { width, height } = warningTextDiv.current.getBoundingClientRect();
            setDimensions({ width, height });
        }
    }, [continueToGuestCredentials, switchFade]);


    const toggleBackBtn = () => {
        setSwitchFade(prev => !prev);
        setTimeout(() => setContinueToGuestCredentials(false), 300);
    }

    const toggleLiveLinkBtn = () => {
        window.open(project.liveLink.link, "_blank");
    }

    const toggleContinueBtn = () => {
        setSwitchFade(prev => !prev);
        setTimeout(() =>  setContinueToGuestCredentials(true), 300);
    }

    const toggleCancelBtn = () => {
        setSwitchFade(prev => !prev);
        if (inDepthProject) {
            setTimeout(() => {
                setState(false)
                setContinueToGuestCredentials(false);
            }, 300);
        } else {
            setTimeout(() => {
                setState({show: false, project: null})
                setContinueToGuestCredentials(false);
                overlay.current.style.display = "none";
            }, 300);
        }
    }

    return (
        <div className={inDepthProject ? "" : `delay-warning-container body`} style={inDepthProject ? null : { width: dimensions.width, height: dimensions.height }}>
            {continueToGuestCredentials ? (
                <div className={`delay-warning-container credentials ${switchFade ? "fade-in" : "fade-out"}`} >
                    <div className="credentials">  
                        <h3>Guest credentials</h3>
                        <p>Please use the following credentials to explore the capabilities of the app:</p>
                        <p><b>Username:</b> {project.liveLink.credentials.username}</p>
                        <p><b>Password:</b> {project.liveLink.credentials.password}</p>
                    </div>

                    <div className="back-liveLink-btns-container">
                        <button className="back-btn" onClick={toggleBackBtn}>Back</button>
                        <button className="liveLink-btn" onClick={toggleLiveLinkBtn}>Live Link</button>
                    </div>
                </div>
                ) : (
                <div ref={warningTextDiv} className={`delay-warning-container warning ${
                    switchFade ? "fade-out" : "fade-in"
                }`}>
                    <h3 className="warning-title home-screen">
                        <IoIosWarning size={24} className="warning-icon home-screen"/> Warning
                    </h3>
                    <p className="warning-text">
                        Please expect an initial <b>backend delay (~1-2 minutes)</b> when
                        loading the live link for <i>{project.name}</i>.
                    </p>
                    <p className="warning-text">
                        This delay occurs because the backend is hosted on Render’s free plan,
                        which powers down with inactivity. The delay will only affect the first
                        request; once the backend is active, subsequent responses will be
                        immediate.
                    </p>
                    
                    <div className="cancel-continue-btns-container">
                        <button className="cancel-btn" onClick={toggleCancelBtn}>Cancel</button>
                        <button className={guestCredentials ? "continue-btn" : 'liveLink-btn'} onClick={guestCredentials ? toggleContinueBtn : toggleLiveLinkBtn}>
                            {guestCredentials ? 'Continue' : 'Live Link'}
                        </button>
                    </div>
                </div>
                )
            }
        </div>
    )
}


export default WarningForBackendDelay;
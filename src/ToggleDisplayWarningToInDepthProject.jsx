import { IoIosWarning } from "react-icons/io";

function ToggleDisplayWarningToInDepthProject(props) {
return (
    // Warning provided to explain long initial wait time for appropriate projects
    <div
        className={`delay-warning-container ${
            props.displayWarningToInDepthProject ? "fade-in" : "fade-out"
        }`}
        ref={props.warningContentContainer}
        >
        <h3 className="warning-title">
            <IoIosWarning size={24} /> Warning
        </h3>
        <p className="warning-text">
            Please expect an initial <b>backend delay (~1-2 minutes)</b> when
            loading the live link for <i>{props.inDepthProject.name}</i>.
            <br />
            <br />
            This delay occurs because the backend is hosted on Render’s free plan,
            which powers down with inactivity. The delay will only affect the first
            request; once the backend is active, subsequent responses will be
            immediate.
        </p>
        <div className="cancel-continue-btns-container">
            <button className="cancel-btn" onClick={props.closeDelayMessage}>
            Cancel
            </button>
            <button
            className="continue-btn"
            onClick={() => props.continueToLiveLink(props.inDepthProject)}
            >
            Continue
            </button>
        </div>
    </div>
);
}

export default ToggleDisplayWarningToInDepthProject;
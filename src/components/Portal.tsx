import ReactDOM from "react-dom";

type TPortal = {
  children: React.ReactNode;
  containerId?: string;
};

const Portal = ({ children, containerId = "modal-root" }: TPortal) => {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`No container with id ${containerId} found.`);
    return null;
  }

  return ReactDOM.createPortal(children, container);
};

export default Portal;

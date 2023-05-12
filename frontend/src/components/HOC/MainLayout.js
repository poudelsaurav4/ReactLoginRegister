import { ToastContainer } from "react-toastify";

const MainLayout = (props) => {
  return (
    <div>
      {props.children}
      <ToastContainer />
    </div>
  );
};
export default MainLayout;

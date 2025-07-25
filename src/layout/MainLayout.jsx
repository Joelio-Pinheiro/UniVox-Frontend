import Header from "./Header";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const MainLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Header isMobile={isMobile}
      />
      <div
        className={`fixed h-full w-full transition-all duration-300 ease-in-out`}
        style={{ minHeight: "200px", maxHeight: "600px", overflowY: "auto" }}
      >
        <div className="w-full flex flex-row items-center">
          Sidebar
          {children}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
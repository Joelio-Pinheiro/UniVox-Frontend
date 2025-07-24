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
        className={`fixed h-full w-full transition-all duration-300 ease-in-out
                    ${!isMobile ? "ml-72" : ""}`}
        style={{ minHeight: "200px", maxHeight: "600px", overflowY: "auto" }}
      >
        {/* mexer nesse tamanho de div, principal problema de responsividade */}
        <div className="sm:w-4/5 w-full flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </>
  );
};

export default MainLayout;

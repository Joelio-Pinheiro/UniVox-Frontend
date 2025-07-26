import Header from "./Header";
import Sidebar from "./Sidebar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const MainLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-screen overflow-x-hidden">
      <Header isMobile={isMobile} />
      <div className="flex flex-1 overflow-hidden">
        {!isMobile && (
          <aside className="w-72 bg-white border-r border-gray-200 shadow-sm">
            <Sidebar isMobile={false} />
          </aside>
        )}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="flex justify-center max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

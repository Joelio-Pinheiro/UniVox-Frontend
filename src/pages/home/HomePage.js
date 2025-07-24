import MainLayout from '../../layout/MainLayout';
import FloatingActionButtons from '../../customComponents/buttons/CreatePostButton';

function HomePage() {
  return (
    <>
      <MainLayout >
        <FloatingActionButtons />
        <div className="home-container ">
          <div className="home-content">
            teste
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default HomePage;
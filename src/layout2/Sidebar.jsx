const Sidebar = ({ isMobile, onClose }) => {
  return (
    <nav className="flex flex-col gap-4 p-4 text-gray-800">
      <a href="#" className="hover:underline">Dashboard</a>
      <a href="#" className="hover:underline">Configurações</a>
      <a href="#" className="hover:underline">Usuários</a>
      <a href="#" className="hover:underline">Relatórios</a>
      {isMobile && (
        <button
          onClick={onClose}
          className="mt-4 text-sm text-blue-600 hover:underline"
        >
          Fechar menu
        </button>
      )}
    </nav>
  );
};

export default Sidebar;

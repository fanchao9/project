const Header = () => {
    return (
        <header className="items-center p-4 bg-gray-800 text-white">
        <h1 className="text-2xl ml-6 font-bold">Ball Stats</h1>
        <nav>
            <ul className="space-x-4">
            <li><a href="#home">NBA Teams</a></li>
            </ul>
        </nav>
        </header>
    );
}

export default Header;
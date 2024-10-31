type HeaderProps = {
    tittel: string;
};

function Header({ tittel }: HeaderProps) {
    return (
        <header>
            <h1>{tittel}</h1>
        </header>
    );
}

export default Header;
function Footer(props) {
    const date = new Date().getFullYear();
    return (
        <footer className="footer">
            {props.loggedIn ? (
        <p className="footer__author">&copy; {date} Анастасия Комкова</p>
      ) : null}
        </footer>
    )
}

export default Footer; 
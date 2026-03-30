import {footerLinks} from "../Constants/index.js";


const Footer = () => {
    return (
        <footer>
            <div className="info">
                <p>More ways to purchase the better future product to your home......</p>
                <img src="/logo.svg" alt="logo" />
            </div>

            <hr />
            <div className="links">
                <p>Copy rights from apple.com</p>

                <ul>
                    {footerLinks.map(({label, link}) =>(
                        <li key={label}>
                            <a href={link}>{label}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    )
}
export default Footer

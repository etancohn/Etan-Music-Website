import EmailIcon from '@mui/icons-material/EmailOutlined';
import PhoneIcon from '@mui/icons-material/LocalPhoneOutlined';
import { useContent } from './content';
import './Footer.css';

// Two-column footer in the same shape as the Chris Renaud and Alex Irwin
// sites: brand + contact on the left, copyright on the right.
export default function Footer() {
    // The hero tagline ("Drummer · Boston, MA") is admin-editable, so the
    // footer stays in sync with it instead of hardcoding a second copy.
    const { overline } = useContent().hero;

    return (
        <footer className="site-footer">
            <div className="site-footer__inner">
                <div className="site-footer__contact">
                    <a className="site-footer__brand" href="#/">
                        Etan Cohn
                    </a>
                    <a
                        className="site-footer__link"
                        href="mailto:etan.cohn@gmail.com"
                    >
                        <EmailIcon fontSize="inherit" />
                        etan.cohn@gmail.com
                    </a>
                    <a className="site-footer__link" href="tel:+19723106503">
                        <PhoneIcon fontSize="inherit" />
                        (972) 310-6503
                    </a>
                </div>

                <div className="site-footer__col site-footer__col--end">
                    <span className="site-footer__copyright">
                        © {new Date().getFullYear()} Etan Cohn
                    </span>
                    <span className="site-footer__tagline">{overline}</span>
                </div>
            </div>
        </footer>
    );
}

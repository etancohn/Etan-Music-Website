import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import PhoneIcon from '@mui/icons-material/LocalPhoneOutlined';
import ercLogo from './assets/erc.png';
import { useContent } from './content';
import './Footer.css';

const SOCIALS = [
    {
        href: 'https://www.instagram.com/etan_drums/',
        label: 'Instagram — @etan_drums',
        Icon: InstagramIcon,
    },
    {
        href: 'https://www.facebook.com/profile.php?id=100008408079481',
        label: 'Facebook',
        Icon: FacebookIcon,
    },
];

export default function Footer() {
    // The hero tagline ("Drummer · Boston, MA") is admin-editable, so the
    // footer stays in sync with it instead of hardcoding a second copy.
    const { overline } = useContent().hero;

    return (
        <footer className="site-footer">
            <div className="site-footer__inner">
                <div className="site-footer__left">
                    <a
                        className="site-footer__brand"
                        href="#/"
                        aria-label="Etan Cohn — home"
                    >
                        <img className="site-footer__logo" src={ercLogo} alt="" />
                        <span>Etan Cohn</span>
                    </a>
                    <span className="site-footer__divider" aria-hidden="true">
                        ♪
                    </span>
                    <span className="site-footer__tagline">{overline}</span>
                </div>

                <div className="site-footer__right">
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
                    <div className="site-footer__social">
                        {SOCIALS.map(({ href, label, Icon }) => (
                            <a
                                key={href}
                                className="site-footer__icon"
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                            >
                                <Icon fontSize="small" />
                            </a>
                        ))}
                    </div>
                    <span className="site-footer__copyright">
                        © {new Date().getFullYear()} Etan Cohn
                    </span>
                </div>
            </div>
        </footer>
    );
}

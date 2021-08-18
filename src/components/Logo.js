import logoSrc from 'src/images/logo.svg';

function Logo(props) {
  return <img alt='logo' src={logoSrc} {...props} />;
}

export default Logo;

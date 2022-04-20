import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://jingeunee.github.io/dev-log">
        https://jingeunee.github.io/dev-log
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
};

export default Footer;

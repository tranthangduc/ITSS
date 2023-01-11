import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: '1.8rem 1.2rem',
    boxShadow: '5px 10px #888888',
    borderRadius: 'var(--sm-border-radius)',
    cursor: 'pointer',
    backgroundColor: '#506DFA',
    transition: 'all 0.25s',

    minHeight: '8rem',
    height: '100%',

    '&:hover, &:active': {
      backgroundColor: '#1f44f3',
      boxShadow: '5px 10px #4e4e4e',
    },

    [theme.breakpoints.up('sm')]: {
      padding: '2.4rem 1.8rem',
    },

    [theme.breakpoints.up('md')]: {
      minHeight: '18rem',
    },
  },

  icon: {
    width: '4.2rem',
    height: '4.2rem',
    marginRight: '1.4rem',
  },

  title: {
    color: '#F0D94E',
    fontWeight: 600,
    fontSize: '2rem',
    letterSpacing: '0.5px',
  },

  subTitle: {
    display: 'none',
    marginTop: '0.6rem',
    color: 'white',
    fontSize: '1.4rem',
    fontWeight: 500,
    letterSpacing: '0.5px',

    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    padding: '1.2rem 0',
    borderBottom: 'solid 1px var(--border-color)',
    cursor: 'pointer',
    transition: 'all 0.35s',

    '&:hover, &:active': {
      borderBottom: 'solid 1px var(--accent-color)',
    },
  },

  wrapper_item: {
    display: 'flex',
  },

  picture: {
    display: 'inline-block',
    width: '5rem',
    height: '5rem',
  },

  name: {
    width: '500px',
    overflow: 'hidden',
    fontSize: '1.8rem',
    fontWeight: 500,
    color: 'var(--primary-color)',
  },

  description: {
    display: 'inline-block',
    width: '450px',
    overflow: 'hidden',
    whiteSpace: 'nowrap', 
    textOverflow: 'ellipsis',
    fontSize: '1.8rem',
    fontWeight: 500,
    color: 'var(--label-color)',
  },

  phonetic: {
    display: 'none',
  },

  mean: {
    fontSize: '1.6rem',
    color: 'var(--text-color)',
    maxWidth: '80%',
    lineHeight: 1.5,
  },
}));

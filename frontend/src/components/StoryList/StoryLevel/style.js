import { makeStyles } from '@material-ui/core/styles';
import {Image} from 'assets/images/Image';
export default makeStyles((theme) => ({
    bg: {
        backgroundImage: `url(${Image.NenToeic})`,
        height: '100%',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderRadius: '10px'
    },
    root: {
        boxShadow: 'var(--box-shadow-2)',
        borderRadius: 'var(--sm-border-radius)',
        cursor: 'pointer',
        backgroundColor: 'var(--bg-color-accent)',
        transition: 'all 0.25s',

        minHeight: '8rem',
        height: '100%',
        width: '52rem',
        margin: '2rem auto',

        '&:hover, &:active': {
            backgroundColor: 'var(--hover-color)',
        },

        [theme.breakpoints.up('sm')]: {
            padding: '2.4rem 1.8rem',
        },

        [theme.breakpoints.up('md')]: {
            minHeight: '14rem',
        },
    },

    icon: {
        width: '4.2rem',
        height: '4.2rem',
        marginRight: '1.4rem',
    },

    title: {
        color: 'var(--title-color)',
        fontWeight: 600,
        fontSize: '2rem',
        letterSpacing: '0.5px',
    },

    subTitle: {
        display: 'none',
        marginTop: '0.6rem',
        color: 'var(--label-color)',
        fontSize: '1.4rem',
        fontWeight: 500,
        letterSpacing: '0.5px',

        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
}));
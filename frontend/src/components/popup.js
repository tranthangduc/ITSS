import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(() => ({
    loader: {
        border: '6px solid gray',
        borderTopColor: 'blue',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        animation: '$spin 1s linear infinite'
    },
    mean: {
        position: 'absolute',
        width: '200px',
        height: '80px',
        backgroundColor: '#fff',
        top: 'calc(50% + 10px)',
        padding: '0 2px',
        right: 'calc(50% - 60px)',
        transform: 'transition(-50% -50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '6px',
        zIndex: '10000 !important',
        boxShadow: "rgba(0, 0, 0, 0.5) 0px 3px 8px"
    },
    bg: {
        backgroundImage: 'url(https://img5.thuthuatphanmem.vn/uploads/2021/12/11/anh-nen-powerpoint-dung-cu-hoc-tap_093919263.jpg)',
        height: '100%',
        width:'100%',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
}
  }));
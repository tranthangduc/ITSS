import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  wrapper: {
    height: 'calc(100vh - 20rem)',
  },
  color_button: {
    color: 'red',
  },
  skeleton: {
    borderTopLeftRadius: '64px',
    borderBottomRightRadius: '64px',
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

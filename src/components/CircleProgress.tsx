import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';

const CircleProgress = () => {
  return (
    <CircularProgress
      variant="indeterminate"
      disableShrink
      size={20}
      thickness={4}
      sx={{
        color: '#1a90ff',
        animationDuration: '550ms',
        [`& .${circularProgressClasses.circle}`]: {
          strokeLinecap: 'round',
        },
      }}
    />
  );
};

export default CircleProgress;

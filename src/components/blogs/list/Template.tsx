import Box from '@mui/material/Box';

const BlogListTemplate = () => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((_, i) => {
        return (
          <Box key={i} boxShadow={2}>
            test
          </Box>
        );
      })}
    </div>
  );
};

export default BlogListTemplate;

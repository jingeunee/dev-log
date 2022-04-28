import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import { useFetchBlogList } from 'hooks/todos/useFetchBlogList';
import styled from 'styled-components';

import CircleProgress from 'components/CircleProgress';

const BlogListTemplate = () => {
  const { isLoading, data } = useFetchBlogList();

  if (isLoading) {
    return <CircleProgress />;
  }

  return (
    <Grid container={true}>
      {data.map((o, i) => {
        const userimage = o.user?.image || '';
        const username = o.user?.name || '';
        const firstname = username.slice(0, 1);

        return (
          <BlogWrap key={o.id} elevation={3} variant="elevation">
            <CardHeader
              avatar={
                <Avatar src={userimage} alt={username}>
                  {firstname}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={o.title}
              subheader={o.createdAt}
            />
            <CardMediaWrap image={o.thumbnail} title="thumbnail" />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {o.body}
              </Typography>
            </CardContent>
          </BlogWrap>
        );
      })}
    </Grid>
  );
};

const BlogWrap = styled(Card)`
  width: 350px;
  height: 400px;
  margin: 5px;
`;
const CardMediaWrap = styled(CardMedia)`
  height: 0;
  padding-top: 56.25%; // 16.9
  background-color: #eeeeee;
`;

export default BlogListTemplate;

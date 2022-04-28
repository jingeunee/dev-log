import { ApolloError, gql, useQuery } from '@apollo/client';
import { blogsApolloClient } from 'libs/graphql';

const BLOG_LIST = gql`
  query {
    getList {
      id
      title
      body
      thumbnail
      createdAt
      updatedAt
      user {
        id
        name
        email
        image
      }
    }
  }
`;

interface IUser {
  id: number;
  name: string;
  email: string;
  image: string;
}
interface IBlog {
  id: number;
  title: string;
  body: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}
interface IReturned {
  isLoading: boolean;
  data: IBlog[];
  error?: ApolloError;
}
export const useFetchBlogList = (): IReturned => {
  const { loading, error, data } = useQuery(BLOG_LIST, {
    client: blogsApolloClient,
  });

  return {
    isLoading: loading,
    data: data?.getList || [],
    error,
  };
};

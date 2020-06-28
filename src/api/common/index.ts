import IO from '@/request';

const config: object[] = [
  {
    name: 'login',
    url: '/tokens',
    method: 'POST',
  },
  {
    name: 'settings',
    url: '/settings/site',
    method: 'GET',
  },
  {
    name: 'mock',
    url: 'https://www.easy-mock.com/mock/5acdce3c493fb7245688f209/example/cli/{id}/test',
    method: 'GET',
    noPre: true
  }
]

const api = new IO();

export default api.scope(
  config,
);

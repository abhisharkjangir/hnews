import image from '../assets/images/dummy.png';
const description = 'Hacker news app';

export default {
  default: {
    title: 'Hacker News',
    description,
    image,
    twitter: '',
    sep: ' | ',
    siteURL: 'https://hnews.abhisharjangir.com',
    keywords: 'hnews',
    facebookAppId: 'XXXXXXXXX',
    updated: new Date().toDateString(),
    published: new Date().toDateString(),
    contentType: 'website',
  },
  '/': {
    pathname: '/',
    id: 'home',
    title: 'News List',
    description: ' News listing page',
  },
  '/404': {
    pathname: '/404',
    id: 'notfound',
    title: 'oh! no',
    description: 'There&lsquo;s not much left here for you.',
  },
};

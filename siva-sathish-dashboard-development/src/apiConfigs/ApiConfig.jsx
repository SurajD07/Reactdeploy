export const baseUrl = import.meta.env.VITE_NODE_BACKEND_API_URL;


const siteUrls = {
  auth: {
    signin: `${baseUrl}/signin`,
    profileGet: `${baseUrl}/profile `,
  },
  event: {
    create: `${baseUrl}/event`,
  },
};
export default siteUrls;
